<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PreventVendorAccess
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check() && Auth::user()->type === 'vendor') {
            Auth::logout();
            return redirect()->route('filament.admin.pages.dashboard');
        }
        return $next($request);
    }
}
