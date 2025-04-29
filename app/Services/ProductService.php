<?php

namespace App\Services;

use App\Models\Product;

class ProductService
{
    public function deleteProduct($productId)
    {
        $product = Product::findOrFail($productId);
        $product->delete();
        return 'تم الحذف';
    }
}
