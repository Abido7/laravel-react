<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureVendorIsApproved
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        if ($user && $user->vendor) {
            if ($user->vendor->status !== 'approved') {
                // Redirect to the waiting page if vendor is not approved
                return redirect()->route('vendor.waiting');
            }
        }
        return $next($request);
    }
}
