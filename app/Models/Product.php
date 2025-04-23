<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'price',
        'stock',
        'description',
        'image',
    ];
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function carts()
    {
        return $this->belongsToMany(Cart::class);
    }

    // If you want to relate payments:
    // public function payments()
    // {
    //     return $this->hasMany(Payment::class);
    // }

    public function getImageAttribute($value)
    {
        if ($value && \Illuminate\Support\Str::contains($value, 'placehold.co')) {
            return $value;
        } elseif ($value) {
            return asset('storage/' . $value);
        } else {
            return null;
        }
    }
}
