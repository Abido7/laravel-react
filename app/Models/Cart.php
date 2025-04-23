<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{

    /** @use HasFactory<\Database\Factories\CartFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'status',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function cartProducts()
    {
        return $this->hasMany(\App\Models\CartProduct::class, 'cart_id');
    }

    // If each cart has one order:
    // public function order()
    // {
    //     return $this->hasOne(Order::class);
    // }
}
