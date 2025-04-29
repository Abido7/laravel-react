<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;

class VendorDashboard extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-home';
    protected static string $view = 'filament.pages.vendor-dashboard';

    public static function shouldRegisterNavigation(): bool
    {
        return auth()->check() && auth()->user()->type === 'vendor';
    }

    public function mount(): void
    {
        abort_unless(auth()->user()->type === 'vendor', 403);
    }
}
