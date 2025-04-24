<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $wishlist = $request->user()->wishlist()->with('category', 'offers')->get();
        return Inertia::render('Wishlist', ['products' => $wishlist]);
    }

    public function toggle(Request $request, $productId)
    {
        $user = $request->user();
        if ($user->wishlist()->where('product_id', $productId)->exists()) {
            $user->wishlist()->detach($productId);
            $status = 'تم الحذف من المفضله';
        } else {
            $user->wishlist()->attach($productId);
            $status = 'تم الاضافه للمفضله';
        }
        return redirect()->back()->with('status', $status);
    }
}
