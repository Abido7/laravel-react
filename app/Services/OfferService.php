<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Offer;

class OfferService
{
    // Get the best active offer for a product (by product or category)
    public function getActiveOffer(Product $product)
    {
        // Prefer product-specific offers
        $offer = $product->activeOffer();
        if ($offer) {
            return $offer;
        }

        // Then check category offers
        if ($product->category) {
            $now = now();
            $categoryOffer = Offer::where('category_id', $product->category->id)
                ->where(function($q) use ($now) {
                    $q->whereNull('start_at')->orWhere('start_at', '<=', $now);
                    $q->whereNull('end_at')->orWhere('end_at', '>=', $now);
                })
                ->orderByDesc('discount')
                ->first();
            if ($categoryOffer) {
                return $categoryOffer;
            }
        }
        return null;
    }

    // Calculate discounted price for a product
    public function getDiscountedPrice(Product $product)
    {
        $offer = $this->getActiveOffer($product);
        $price = $product->price;
        if ($offer) {
            if ($offer->type === 'percentage') {
                $price -= $price * ($offer->discount / 100);
            } else {
                $price -= $offer->discount;
            }
            $price = max($price, 0);
        }
        return $price;
    }
}
