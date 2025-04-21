<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CartProduct;

class CartProductSeeder extends Seeder
{
    public function run(): void
    {
        // Seed 50 cart_product records
        CartProduct::factory()->count(50)->create();
    }
}
