<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\User;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $orders = $user ? Order::where('user_id', $user->id)->orderBy('created_at', 'desc')->get() : [];
        return Inertia::render('Orders', [
            'orders' => $orders
        ]);
    }

    public function show($id)
    {
        $order = Order::with('cart', 'user')->findOrFail($id);
        return Inertia::render('OrderShow', [
            'order' => $order
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'cart_id' => 'required|exists:carts,id',
            'total' => 'required|numeric',
            'status' => 'required|string',
            'shipping_address' => 'nullable|string',
            'city' => 'nullable|string',
            'payment_method' => 'nullable|string',
        ]);
        $order = Order::create($data);

        // Save order items (order details)
        $cartProducts = \App\Models\CartProduct::where('cart_id', $data['cart_id'])->get();
        foreach ($cartProducts as $cartProduct) {
            \App\Models\OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $cartProduct->product_id,
                'quantity' => $cartProduct->quantity,
                'price' => $cartProduct->product->price, // Save price at time of order
            ]);
        }

        // Mark the cart as ordered (do NOT delete it)
        $cart = \App\Models\Cart::find($data['cart_id']);
        if ($cart) {
            $cart->status = 'ordered';
            $cart->save();
        }

        // Return order with items
        $order->load('orderItems.product');
        return response()->json($order, 201);
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $data = $request->validate([
            'status' => 'required|string',
        ]);
        $order->update($data);
        return response()->json($order);
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(['message' => 'Deleted']);
    }

    /**
     * Cancel a pending order (user action)
     */
    public function cancel(Request $request, $id)
    {
        $user = $request->user();
        $order = Order::where('id', $id)->where('user_id', $user ? $user->id : null)->firstOrFail();
        if ($order->status !== 'pending') {
            return response()->json(['message' => 'Only pending orders can be cancelled.'], 403);
        }
        $order->status = 'cancelled';
        $order->save();
        return response()->json(['message' => 'Order cancelled.']);
    }
}
