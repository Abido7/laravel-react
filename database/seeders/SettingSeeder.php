<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        // Example: default banner image
        Setting::updateOrCreate([
            'key' => 'banner_image',
        ], [
            'value' => '/images/banner.jpg',
        ]);

        // Default logo
        Setting::updateOrCreate([
            'key' => 'logo',
        ], [
            // You can replace this with your actual logo path
            'value' => 'images/logo-premium.svg',
        ]);
    }
}
