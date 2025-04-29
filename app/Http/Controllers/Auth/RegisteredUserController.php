<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => 'required|string|max:20',
            'registerAsVendor' => 'nullable|boolean',
            'vendorName' => 'nullable|string|max:255',
        ]);
        // dd($request->registerAsVendor && $request->vendorName);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'type' => ($request->registerAsVendor && $request->vendorName) ? 'vendor' : 'customer',
            'status' => ($request->registerAsVendor && $request->vendorName) ? 'pending' : 'active',
        ]);

        // Vendor registration logic
        if ($request->registerAsVendor && $request->vendorName) {
            \App\Models\Vendor::create([
                'user_id' => $user->id,
                'name' => $request->vendorName,
                'status' => 'pending',
            ]);
            // Redirect to waiting page
            return redirect()->route('vendor.waiting');
        }
        event(new Registered($user));
        Auth::login($user);


        return redirect()->route('login')->with('success', 'تم التسجيل بنجاح.');
    }
}
