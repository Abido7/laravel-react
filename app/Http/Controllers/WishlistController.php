<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreWishlistRequest;
use Inertia\Inertia;
use App\Models\Product;

use App\Services\WishlistService;

class WishlistController extends Controller
{
    protected $wishlistService;

    public function __construct(WishlistService $wishlistService)
    {
        $this->wishlistService = $wishlistService;
    }

    public function index(Request $request)
    {
        $wishlist = $request->user()->wishlist()->with('category', 'offers')->get();
        return Inertia::render('Wishlist', ['products' => $wishlist]);
    }

    public function toggle(StoreWishlistRequest $request, $productId)
    {
        $user = $request->user();
        // Validation is handled by StoreWishlistRequest if needed
        $status = $this->wishlistService->toggleWishlist($user, $productId);
        return redirect()->back()->with('status', $status);
    }
}
