<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\User;

class OrderController extends Controller
{
    public function index()
    {
        $user = User::where('email', 'test@example.com')->first();
        $orders = $user ? Order::where('user_id', $user->id)->get() : [];
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
        ]);
        $order = Order::create($data);
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
}
