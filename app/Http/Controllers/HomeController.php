<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class HomeController extends Controller
{
    public function index()
    {
        $categories = \App\Models\Category::withCount('products')->get();
        $products = \App\Models\Product::with('category')->latest()->take(12)->get();
        
        return Inertia::render('Home', [
            'categories' => $categories,
            'products' => $products,
            
        ]);
    }
}
