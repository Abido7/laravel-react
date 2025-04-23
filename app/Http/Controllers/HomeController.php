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
        $products = \App\Models\Product::with('category')->latest()->take(12)->get();
        
        // Statistics
        $ordersCount = \App\Models\Order::count();
        $usersCount = \App\Models\User::count();
        $activeCartsCount = \App\Models\Cart::where('status', 'active')->count();

        $bannerImage = \App\Models\Setting::where('key', 'banner_image')->value('value') ?? '/images/banner.jpg';
        return Inertia::render('Home', [
            'categories' => $categories,
            'products' => $products,
            'ordersCount' => $ordersCount,
            'usersCount' => $usersCount,
            'activeCartsCount' => $activeCartsCount,
            'bannerImage' => $bannerImage,
        ]);
    }
}
