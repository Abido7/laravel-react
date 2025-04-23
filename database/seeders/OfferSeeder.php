<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Offer;
use App\Models\Product;
use Carbon\Carbon;

class OfferSeeder extends Seeder
{
    public function run(): void
    {
        $product = Product::first();
        if ($product) {
            Offer::create([
                'title' => 'خصم رمضان',
                'description' => 'احصل على خصم 20% بمناسبة شهر رمضان',
                'discount' => 20,
                'type' => 'percentage',
                'start_at' => Carbon::now()->subDay(),
                'end_at' => Carbon::now()->addDays(10),
                'product_id' => $product->id,
            ]);
        }
        // Fixed discount example
        $product2 = Product::skip(1)->first();
        if ($product2) {
            Offer::create([
                'title' => 'عرض خاص',
                'description' => 'خصم 50 جنيه على هذا المنتج',
                'discount' => 50,
                'type' => 'fixed',
                'start_at' => Carbon::now()->subDay(),
                'end_at' => Carbon::now()->addDays(5),
                'product_id' => $product2->id,
            ]);
        }
    }
}
