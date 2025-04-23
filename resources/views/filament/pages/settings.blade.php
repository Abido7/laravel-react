@extends('filament::page')

@section('content')
    <div class="flex flex-col items-center justify-center py-8">
        <h2 class="text-2xl font-bold mb-4">الإعدادات</h2>
        <form wire:submit.prevent="save" class="w-full max-w-lg space-y-6 bg-white p-6 rounded shadow">
            {{ $this->form }}
            <button type="submit" class="filament-button filament-button--primary w-full">
                <span class="inline-flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                    حفظ الإعدادات
                </span>
            </button>
        </form>
        @if($banner_image)
            <div class="mt-8">
                <span class="block mb-2 text-gray-600">صورة البانر الحالية:</span>
                <img src="{{ Storage::url($banner_image) }}" alt="صورة البانر" class="rounded shadow max-h-56 border" style="max-width:100%;height:auto;">
            </div>
        @endif
        @php $logo = \App\Models\Setting::where('key', 'logo')->value('value'); @endphp
        @if($logo)
            <div class="mt-8">
                <span class="block mb-2 text-gray-600">الشعار الحالي:</span>
                <img src="{{ Storage::url($logo) }}" alt="شعار الموقع" class="rounded shadow max-h-32 border" style="max-width:100%;height:auto;">
            </div>
        @endif
    </div>
@endsection
