<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cart;
use App\Models\Product;

class CartController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $cart = $user ? \App\Models\Cart::where('user_id', $user->id)->where('status', 'active')->first() : null;
        $items = [];
        if ($cart) {
            $items = \App\Models\CartProduct::with('product')
                ->where('cart_id', $cart->id)
                ->get()
                ->map(function ($cartProduct) {
                    return [
                        'id' => $cartProduct->id,
                        'product' => $cartProduct->product,
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

    public function store(Request $request)
    {
        // Add product to cart
        $user = $request->user();
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        // Find or create the user's active cart
        $cart = \App\Models\Cart::firstOrCreate(
            [
                'user_id' => $user->id,
                'status' => 'active',
            ]
        );

        // Add or update the product in the cart
        $cartProduct = \App\Models\CartProduct::where('cart_id', $cart->id)
            ->where('product_id', $data['product_id'])
            ->first();
        if ($cartProduct) {
            // Update quantity (add to existing)
            $cartProduct->quantity += $data['quantity'];
            $cartProduct->save();
        } else {
            // Create new cart product
            \App\Models\CartProduct::create([
                'cart_id' => $cart->id,
                'product_id' => $data['product_id'],
                'quantity' => $data['quantity'],
            ]);
        }

        return redirect()->back()->with('success', 'Product added to cart!');
    }

    public function update(Request $request, $id)
    {
        $user = $request->user();
        $cart = \App\Models\Cart::where('user_id', $user->id)->where('status', 'active')->first();
        if (!$cart) {
            return redirect()->back()->with('error', 'Cart not found.');
        }
        $cartProduct = \App\Models\CartProduct::where('cart_id', $cart->id)->where('id', $id)->first();
        if (!$cartProduct) {
            return redirect()->back()->with('error', 'Cart item not found.');
        }
        $data = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);
        $cartProduct->quantity = $data['quantity'];
        $cartProduct->save();
        return redirect()->back()->with('success', 'Cart updated!');
    }

    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        $cart = \App\Models\Cart::where('user_id', $user->id)->where('status', 'active')->first();
        if (!$cart) {
            return redirect()->back()->with('error', 'Cart not found.');
        }
        $cartProduct = \App\Models\CartProduct::where('cart_id', $cart->id)->where('id', $id)->first();
        if (!$cartProduct) {
            return redirect()->back()->with('error', 'Cart item not found.');
        }
        $cartProduct->delete();
        return redirect()->back()->with('success', 'Item removed!');
    }
}
