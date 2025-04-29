<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;
use Inertia\Inertia;
use App\Models\Cart;
use App\Models\Product;

use App\Services\CartService;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }
    public function index()
    {
        $user = auth()->user();
        $cart = $user ? \App\Models\Cart::where('user_id', $user->id)->where('status', 'active')->first() : null;
        $items = [];
        if ($cart) {
            $items = \App\Models\CartProduct::with(['product.offers'])
                ->where('cart_id', $cart->id)
                ->get()
                ->map(function ($cartProduct) {
                    $product = $cartProduct->product;
                    $product->discounted_price = $product->discounted_price;
                    return [
                        'id' => $cartProduct->id,
                        'product' => $product,
                        'quantity' => $cartProduct->quantity,
                    ];
                });
        }
        return Inertia::render('Cart', [
            'cart' => $cart,
            'items' => $items
        ]);
    }

    public function show($id)
    {
        $cart = Cart::with('user')->findOrFail($id);
        // For demo, use same items logic
        $items = [];
        $products = Product::inRandomOrder()->take(3)->get();
        foreach ($products as $product) {
            $items[] = [
                'id' => $product->id,
                'product' => $product,
                'quantity' => rand(1, 3)
            ];
        }
        return Inertia::render('Cart', [
            'cart' => $cart,
            'items' => $items
        ]);
    }

    public function store(StoreCartRequest $request)
    {
        $user = $request->user();
        $data = $request->validated();
        $message = $this->cartService->addToCart($user, $data['product_id'], $data['quantity']);
        return redirect()->back()->with('success', $message);
    }

 
    public function update(UpdateCartRequest $request, $id)
    {
        $user = $request->user();
        $cart = \App\Models\Cart::where('user_id', $user->id)->where('status', 'active')->first();
        if (!$cart) {
            return redirect()->back()->with('error', 'لا يوجد سلة');
        }
        $cartProduct = \App\Models\CartProduct::where('cart_id', $cart->id)->where('id', $id)->first();
        if (!$cartProduct) {
            return redirect()->back()->with('error', 'العنصر غير موجود في السلة');
        }
        $data = $request->validated();
        $cartProduct->quantity = $data['quantity'];
        $cartProduct->save();
        return redirect()->back()->with('success', 'تم التحديث السله');
    }

    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        $cart = \App\Models\Cart::where('user_id', $user->id)->where('status', 'active')->first();
        if (!$cart) {
            return redirect()->back()->with('error', 'لا يوجد سلة ');
        }
        $cartProduct = \App\Models\CartProduct::where('cart_id', $cart->id)->where('id', $id)->first();
        if (!$cartProduct) {
            return redirect()->back()->with('error', 'العنصر غير موجود في السلة');
        }
        $cartProduct->delete();
        return redirect()->back()->with('success', 'تم الحذف من السلة');
    }
}
