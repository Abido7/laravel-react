<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Offer;

class OfferController extends Controller
{
    public function index()
    {
        $now = now();
        $offers = Offer::with(['product', 'category'])
            ->where(function ($q) use ($now) {
                $q->whereNull('start_at')->orWhere('start_at', '<=', $now);
                $q->whereNull('end_at')->orWhere('end_at', '>=', $now);
            })
            ->get();
        // Ensure discounted_price is included for each product
        $offers->each(function ($offer) {
            if ($offer->product) {
                $offer->product->discounted_price = $offer->product->discounted_price;
            }
        });

        return Inertia::render('Offers', [
            'offers' => $offers,
        ]);
    }
}
