<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreOrderRequest;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\User;

use App\Services\OrderService;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }
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
        $order = Order::with('cart', 'orderItems','orderItems.product','user')->findOrFail($id);
        return Inertia::render('OrderShow', [
            'order' => $order
        ]);
    }

    public function store(StoreOrderRequest $request)
    {
        $data = $request->validated();
        $order = $this->orderService->placeOrder($request->user(), $data);
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
