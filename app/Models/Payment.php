<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    /** @use HasFactory<\Database\Factories\PaymentFactory> */
    use HasFactory;

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // If you want to relate payments to users:
    // public function user()
    // {
    //     return $this->belongsTo(User::class);
    // }

    // If you want to relate payments to products:
    // public function product()
    // {
    //     return $this->belongsTo(Product::class);
    // }
}
