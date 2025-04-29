<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreProductRequest;
use Inertia\Inertia;
use App\Models\Product;

use App\Services\ProductService;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }
    public function index(Request $request)
    {
        $query = Product::with(['category', 'offers']);

        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $products = $query->get();
        // Ensure discounted_price is included for each product
        $products->each(function($product) {
            $product->discounted_price = $product->discounted_price;
        });
        $categories = \App\Models\Category::all();
        return Inertia::render('Products', [
            'products' => $products,
            'categories' => $categories,
            'search' => $request->search,
        ]);
    }

    public function show($id)
    {
        $product = Product::with(['category', 'offers'])->findOrFail($id);
        $product->discounted_price = $product->discounted_price;
        return Inertia::render('ProductDetails', [
            'product' => $product,
        ]);
    }

    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        $product = Product::create($data);
        return response()->json($product, 201);
    }

    public function update(StoreProductRequest $request, $id)
    {
        $product = Product::findOrFail($id);
        $data = $request->validated();
        $product->update($data);
        return response()->json($product);
    }

    public function destroy($id)
    {
        $message = $this->productService->deleteProduct($id);
        return response()->json(['message' => $message]);
    }
}
