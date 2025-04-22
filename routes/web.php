<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/products', [\App\Http\Controllers\ProductController::class, 'index']);
Route::get('/products/{id}', [\App\Http\Controllers\ProductController::class, 'show']);

Route::get('/categories', [\App\Http\Controllers\CategoryController::class, 'index']);
Route::get('/categories/{id}', [\App\Http\Controllers\CategoryController::class, 'show']);

Route::get('/cart', [\App\Http\Controllers\CartController::class, 'index']);
Route::get('/cart/{id}', [\App\Http\Controllers\CartController::class, 'show']);
Route::post('/cart', [\App\Http\Controllers\CartController::class, 'store'])->middleware('auth');
Route::put('/cart/{id}', [\App\Http\Controllers\CartController::class, 'update'])->middleware('auth');
Route::delete('/cart/{id}', [\App\Http\Controllers\CartController::class, 'destroy'])->middleware('auth');

Route::get('/orders', [\App\Http\Controllers\OrderController::class, 'index']);
Route::get('/orders/{id}', [\App\Http\Controllers\OrderController::class, 'show']);
Route::post('/orders', [\App\Http\Controllers\OrderController::class, 'store']);
Route::post('/orders/{id}/cancel', [\App\Http\Controllers\OrderController::class, 'cancel'])->middleware('auth');

Route::get('/checkout', function () {
    $user = auth()->user();
    $cart = $user ? \App\Models\Cart::where('user_id', $user->id)->where('status', 'active')->first() : null;
    $items = [];
    $total = 0;
    if ($cart) {
        $items = \App\Models\CartProduct::with('product')
            ->where('cart_id', $cart->id)
            ->get();
        foreach ($items as $item) {
            $total += $item->product->price * $item->quantity;
        }
    }
    return Inertia::render('Checkout', [
        'user' => $user,
        'cart' => $cart,
        'total' => $total
    ]);
});

Route::get('/profile', function () {
    $user = auth()->user();
    return Inertia::render('Profile', [
        'user' => $user,
    ]);
})->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/test-auth', function () {
    return response()->json(['user' => auth()->user()]);
})->middleware('auth');

// Route::get('/dashboard', function () {
//     return view('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';
