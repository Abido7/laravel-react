<x-filament::page>
    <div class="max-w-4xl mx-auto mt-10">
        <!-- Header Card -->
        <div class="bg-gradient-to-r from-primary-50 to-blue-50 shadow rounded-xl p-8 flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div class="flex items-center gap-4 mb-4 md:mb-0">
                <div class="bg-primary-100 rounded-full p-3">
                    <x-heroicon-o-rectangle-stack class="w-8 h-8 text-primary-500" />
                </div>
                <div>
                    <h2 class="text-3xl font-bold text-primary-900">Order #{{ $order->id }}</h2>
                    <div class="mt-1 text-sm text-gray-500">Placed on {{ $order->created_at->format('F j, Y, g:i a') }}</div>
                </div>
            </div>
            <div>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
                    @if($order->status === 'pending') bg-yellow-100 text-yellow-800
                    @elseif($order->status === 'completed') bg-green-100 text-green-800
                    @elseif($order->status === 'cancelled') bg-red-100 text-red-800
                    @else bg-gray-200 text-gray-800 @endif">
                    <!-- <x-heroicon-o-badge-check class="w-5 h-5 mr-1" /> -->
                    {{ ucfirst($order->status) }}
                </span>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Main Details -->
            <div class="md:col-span-2">
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
                        <x-heroicon-o-information-circle class="w-5 h-5 text-primary-400" /> Order Details
                    </h3>
                    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                        <div>
                            <dt class="font-semibold">Total</dt>
                            <dd class="text-lg">${{ number_format($order->total, 2) }}</dd>
                        </div>
                        <div>
                            <dt class="font-semibold">Payment Method</dt>
                            <dd>{{ $order->payment_method }}</dd>
                        </div>
                        <div class="sm:col-span-2">
                            <dt class="font-semibold">Shipping Address</dt>
                            <dd>{{ $order->shipping_address }}</dd>
                        </div>
                        <div>
                            <dt class="font-semibold">City</dt>
                            <dd>{{ $order->city }}</dd>
                        </div>
                    </dl>
                </div>
            </div>

            <!-- Sidebar: User & Cart -->
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
                        <x-heroicon-o-user class="w-5 h-5 text-primary-400" /> Customer
                    </h3>
                    <div class="flex items-center gap-3">
                        <x-heroicon-o-identification class="w-6 h-6 text-primary-300" />
                        <span class="font-medium">{{ $order->user?->name ?? 'N/A' }}</span>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
                        <x-heroicon-o-shopping-cart class="w-5 h-5 text-primary-400" /> Cart
                    </h3>
                    <div class="flex items-center gap-3">
                        <x-heroicon-o-hashtag class="w-6 h-6 text-primary-300" />
                        <span class="font-medium">{{ $order->cart?->id ?? 'N/A' }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-filament::page>
