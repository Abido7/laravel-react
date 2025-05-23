<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void {}

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Globally share auth and cartCount with all Inertia responses
        \Inertia\Inertia::share([
            'auth' => function () {
                return [
                    'user' => auth()->user(),
                ];
            },
            'cartCount' => function () {
                $user = auth()->user();
                if ($user) {
                    $cart = \App\Models\Cart::where('user_id', $user->id)->first();
                    if ($cart) {
                        return $cart->products()->count();
                    }
                }
                return 0;
            },
            'wishlistCount' => function () {
                $user = auth()->user();
                if ($user) {
                    return $user->wishlist()->count();
                }
                return 0;
            },
            // Robust logo URL logic: handles public/images, storage, and absolute URLs
            'logoUrl' => function () {
                $logo = \App\Models\Setting::where('key', 'logo')->value('value');
                if (!$logo) {
                    return null;
                }
                $logo = \Illuminate\Support\Str::replaceFirst('storage/', '', $logo);
                return asset($logo);
            },
        ]);
    }
}
