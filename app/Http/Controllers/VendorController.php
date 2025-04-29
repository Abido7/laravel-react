<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterVendorRequest;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VendorController extends Controller
{
    // Vendor registration (user applies to become a vendor)
    public function register(RegisterVendorRequest $request)
    {
        $user = $request->user();
        // Create vendor and assign role
        $vendor = Vendor::create([
            'user_id' => $user->id,
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'status' => 'pending',
        ]);
        $user->assignRole('vendor');
        return redirect()->back()->with('success', 'تم تقديم طلب البائع بنجاح، في انتظار الموافقة.');
    }

    // Vendor dashboard (only for approved vendors)
    public function dashboard(Request $request)
    {
        $user = $request->user();
        $vendor = $user->vendor;
        if (!$vendor || $vendor->status !== 'approved') {
            abort(403, 'Vendor not approved.');
        }
        $products = $vendor->products;
        return view('vendor.dashboard', compact('vendor', 'products'));
    }
}
