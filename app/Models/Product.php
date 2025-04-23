<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function offers()
    {
        return $this->hasMany(Offer::class);
    }
    public function activeOffer()
    {
        return $this->offers()->where(function($q){
            $now = now();
            $q->whereNull('start_at')->orWhere('start_at', '<=', $now);
            $q->whereNull('end_at')->orWhere('end_at', '>=', $now);
        })->orderByDesc('discount')->first();
    }
    public function getDiscountedPriceAttribute()
    {
        $offer = $this->activeOffer();
        if ($offer) {
            if ($offer->type === 'percentage') {
                return round($this->price * (1 - $offer->discount / 100), 2);
            } else {
                return max(0, $this->price - $offer->discount);
            }
        }
        return $this->price;
    }

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
