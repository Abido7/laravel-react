<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = \App\Models\Payment::with('order')->get();
        return Inertia::render('Payments', [
            'payments' => $payments
        ]);
    }

    public function show($id)
    {
        $payment = \App\Models\Payment::with('order')->findOrFail($id);
        return Inertia::render('PaymentShow', [
            'payment' => $payment
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'amount' => 'required|numeric',
            'method' => 'required|string',
            'status' => 'required|string',
        ]);
        $payment = \App\Models\Payment::create($data);
        return response()->json($payment, 201);
    }

    public function update(Request $request, $id)
    {
        $payment = \App\Models\Payment::findOrFail($id);
        $data = $request->validate([
            'status' => 'required|string',
        ]);
        $payment->update($data);
        return response()->json($payment);
    }

    public function destroy($id)
    {
        $payment = \App\Models\Payment::findOrFail($id);
        $payment->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
