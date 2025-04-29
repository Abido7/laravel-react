<?php

namespace App\Services;

use App\Models\User;
use App\Models\Order;
use Illuminate\Support\Facades\DB;

class OrderService
{
    /**
     * Place a new order for the user.
     */
    public function placeOrder(User $user, array $orderData)
    {
        return DB::transaction(function () use ($user, $orderData) {
            $order = $user->orders()->create([
                'total' => $orderData['total'],
                'address' => $orderData['address'],
                'status' => 'pending',
            ]);
            // Attach products to order
            foreach ($orderData['products'] as $productId => $details) {
                $order->products()->attach($productId, [
                    'quantity' => $details['quantity'],
                    'price' => $details['price'],
                ]);
            }
            return $order;
        });
    }

    /**
     * Update the status of an order.
     */
    public function updateOrderStatus(Order $order, $status)
    {
        $order->status = $status;
        $order->save();
        return $order;
    }

    /**
     * Cancel an order.
     */
    public function cancelOrder(Order $order)
    {
        $order->status = 'cancelled';
        $order->save();
        return $order;
    }
}
