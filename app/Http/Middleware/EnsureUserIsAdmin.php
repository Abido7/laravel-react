<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        // Check if the user is not authenticated
        if (!Auth::check()) {
            return redirect('/login');  // Redirect to login if the user is not logged in
        }

        // If the user is authenticated but not an admin, redirect to the homepage
        if (!Auth::user()->is_admin) {
            // Avoid redirect loop if already on the homepage
            if ($request->is('/')) {
                return $next($request);  // Allow access if already on homepage
            }
            return redirect('/');  // Redirect non-admins to the homepage
        }

        // If the user is an admin, allow the request to continue
        // Avoid redirect loop if already on the /admin page
        if ($request->is('admin*')) {
            return $next($request);  // Allow access if already on an admin page
        }

        // Redirect admins to /admin if they are not on the admin page
        return redirect('/admin');
    }
}

