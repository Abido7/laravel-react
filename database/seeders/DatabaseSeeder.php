<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a test user
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Seed categories
        $categories = \App\Models\Category::factory(5)->create();

        // Seed products for each category
        $categories->each(function ($category) {
            \App\Models\Product::factory(10)->create([
                'category_id' => $category->id,
            ]);
        });

        // Seed carts for the user
        $carts = \App\Models\Cart::factory(2)->create([
            'user_id' => $user->id,
        ]);

        // Seed orders for the user, each linked to a cart
        $carts->each(function ($cart) use ($user) {
            $order = \App\Models\Order::factory()->create([
                'user_id' => $user->id,
                'cart_id' => $cart->id,
            ]);
            // Seed payment for each order
            \App\Models\Payment::factory()->create([
                'order_id' => $order->id,
                'amount' => $order->total,
            ]);
        });
    }
}
