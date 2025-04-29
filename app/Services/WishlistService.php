<?php

namespace App\Services;

use App\Models\User;

class WishlistService
{
    public function toggleWishlist(User $user, $productId)
    {
        if ($user->wishlist()->where('product_id', $productId)->exists()) {
            $user->wishlist()->detach($productId);
            return 'تم الحذف من المفضله';
        } else {
            $user->wishlist()->attach($productId);
            return 'تم الاضافه للمفضله';
        }
    }
}
