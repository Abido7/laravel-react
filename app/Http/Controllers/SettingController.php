<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;

class SettingController extends Controller
{
    // List all settings
    public function index()
    {
        return response()->json(Setting::all());
    }

    // Show a single setting by key
    public function show($key)
    {
        $setting = Setting::where('key', $key)->first();
        if (!$setting) {
            return response()->json(['message' => 'Setting not found'], 404);
        }
        return response()->json($setting);
    }

    // Update a setting by key
    public function update(Request $request, $key)
    {
        $setting = Setting::where('key', $key)->first();
        if (!$setting) {
            return response()->json(['message' => 'Setting not found'], 404);
        }
        $setting->value = $request->input('value');
        $setting->save();
        return response()->json($setting);
    }
}
