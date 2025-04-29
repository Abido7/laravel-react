<?php

namespace App\Services;

use App\Models\User;
use App\Models\Product;

class CartService
{
    public function addToCart(User $user, $productId, $quantity = 1)
    {
        // 1. Find or create active cart
        $cart = $user->carts()->firstOrCreate(['status' => 'active']);

        // 2. Update or create product in cart_products
        $cartProduct = $cart->products()->where('product_id', $productId)->first();
        if ($cartProduct) {
            // Update quantity (add to existing) using updateExistingPivot
            $newQuantity = $cartProduct->pivot->quantity + $quantity;
            $cart->products()->updateExistingPivot($productId, ['quantity' => $newQuantity]);
        } else {
            // Attach new product
            $cart->products()->attach($productId, ['quantity' => $quantity]);
        }
        return 'تم الاضافه للسلة';
    }

    public function updateCart(User $user, $productId, $quantity)
    {
        $cart = $user->carts()->where('status', 'active')->first();
        if (!$cart) {
            return 'لا يوجد سلة نشطة';
        }
        $cartProduct = $cart->products()->where('product_id', $productId)->first();
        if ($cartProduct) {
            $cartProduct->pivot->quantity = $quantity;
            $cartProduct->pivot->save();
            return 'تم التحديث السله';
        }
        return 'العنصر غير موجود في السلة';
    }

    public function removeFromCart(User $user, $productId)
    {
        $cart = $user->carts()->where('status', 'active')->first();
        if ($cart) {
            $cart->products()->detach($productId);
            return 'تم الحذف من السلة';
        }
        return 'لا يوجد سلة نشطة';
    }
}
