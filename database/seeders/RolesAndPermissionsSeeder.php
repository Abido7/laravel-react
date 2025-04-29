<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        Permission::firstOrCreate(['name' => 'manage products']);
        Permission::firstOrCreate(['name' => 'view orders']);
        Permission::firstOrCreate(['name' => 'manage vendors']);
        Permission::firstOrCreate(['name' => 'place orders']);
        Permission::firstOrCreate(['name' => 'view own orders']);

        // Create roles and assign permissions
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());

        $vendor = Role::firstOrCreate(['name' => 'vendor']);
        $vendor->givePermissionTo(['manage products', 'view orders']);

        $customer = Role::firstOrCreate(['name' => 'customer']);
        $customer->givePermissionTo(['place orders', 'view own orders']);
    }
}
