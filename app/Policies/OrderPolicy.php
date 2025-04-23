<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Order;

class OrderPolicy
{
    public function update(User $user, Order $order): bool
    {
        // Only admins can update orders (including status)
        return $user->is_admin;
    }
}
