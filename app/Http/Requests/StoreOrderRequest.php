<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'user_id' => 'required|exists:users,id',
            'cart_id' => 'required|exists:carts,id',
            'status' => 'required|string',
            'shipping_address' => 'nullable|string',
            'city' => 'nullable|string',
            'payment_method' => 'nullable|string',
        ];
    }
}
