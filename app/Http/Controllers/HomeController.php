<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class HomeController extends Controller
{
    public function index()
    {
        $categories = \App\Models\Category::withCount('products')->get();
        $products = \App\Models\Product::with(['category', 'offers'])->latest()->take(12)->get();
        // Ensure discounted_price is included for each product
        $products->each(function($product) {
            $product->discounted_price = $product->discounted_price;
        });
        
        // Statistics
        $ordersCount = \App\Models\Order::count();
        $usersCount = \App\Models\User::count();
        $activeCartsCount = \App\Models\Cart::where('status', 'active')->count();

        $bannerImage = \App\Models\Setting::where('key', 'banner_image')->value('value') ?? '/images/banner.jpg';
        // Fetch active offers (now between start_at and end_at)
        $now = now();
        $offers = \App\Models\Offer::with(['product', 'category'])
            ->where(function($q) use ($now) {
                $q->whereNull('start_at')->orWhere('start_at', '<=', $now);
                $q->whereNull('end_at')->orWhere('end_at', '>=', $now);
            })
            ->get();
        return Inertia::render('Home', [
            'categories' => $categories,
            'products' => $products,
            'ordersCount' => $ordersCount,
            'usersCount' => $usersCount,
            'activeCartsCount' => $activeCartsCount,
            'bannerImage' => $bannerImage,
            'offers' => $offers,
        ]);
    }
}
