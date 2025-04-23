<div dir="rtl" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
    <!-- جميع الطلبات -->
    <div class="bg-white rounded-lg shadow p-6 flex items-center w-full">
        <div class="flex items-center justify-center w-14 h-14 rounded-full mr-4 bg-primary-100 text-primary-600">
            <!-- Shopping Bag Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14l1 12H4L5 8zm2 0V6a5 5 0 0110 0v2" />
            </svg>
        </div>
        <div>
            <div class="text-3xl font-extrabold text-gray-800">{{ $orders }}</div>
            <div class="text-md font-bold text-gray-500">جميع الطلبات</div>
        </div>
    </div>
    <!-- طلبات مكتمله -->
    <div class="bg-white rounded-lg shadow p-6 flex items-center w-full">
        <div class="flex items-center justify-center w-14 h-14 rounded-full mr-4 bg-green-100 text-green-600">
            <!-- Check Circle Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2l4-4" />
            </svg>
        </div>
        <div>
            <div class="text-3xl font-extrabold text-gray-800">{{ $completedOrders }}</div>
            <div class="text-md font-bold text-gray-500">طلبات مكتمله</div>
        </div>
    </div>
    <!-- الارباح -->
    <div class="bg-white rounded-lg shadow p-6 flex items-center w-full">
        <div class="flex items-center justify-center w-14 h-14 rounded-full mr-4 bg-yellow-200 text-yellow-700">
            <!-- Currency Dollar Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V4m0 8v8" />
            </svg>
        </div>
        <div>
            <div class="text-3xl font-extrabold text-gray-800">{{ $earnings }}</div>
            <div class="text-md font-bold text-gray-500">الارباح</div>
        </div>
    </div>
    <!-- المستخدمين -->
    <div class="bg-white rounded-lg shadow p-6 flex items-center w-full">
        <div class="flex items-center justify-center w-14 h-14 rounded-full mr-4 bg-purple-100 text-purple-600">
            <!-- Users Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M15 7a4 4 0 11-8 0 4 4 0 018 0zm6 13v-2a4 4 0 00-3-3.87M9 20h6" />
            </svg>
        </div>
        <div>
            <div class="text-3xl font-extrabold text-gray-800">{{ $users }}</div>
            <div class="text-md font-bold text-gray-500">المستخدمين</div>
        </div>
    </div>
    <!-- عدد السلات النشطه -->
    <div class="bg-white rounded-lg shadow p-6 flex items-center w-full">
        <div class="flex items-center justify-center w-14 h-14 rounded-full mr-4 bg-yellow-100 text-yellow-600">
            <!-- Shopping Cart Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 001-1v-1.3a1 1 0 00-.29-.7L17 13M7 13V6a1 1 0 011-1h6a1 1 0 011 1v7" />
            </svg>
        </div>
        <div>
            <div class="text-3xl font-extrabold text-gray-800">{{ $activeCarts }}</div>
            <div class="text-md font-bold text-gray-500">عدد السلات النشطه</div>
        </div>
    </div>
    <!-- طلبات قيد الانتظار -->
    <div class="bg-white rounded-lg shadow p-6 flex items-center w-full">
        <div class="flex items-center justify-center w-14 h-14 rounded-full mr-4 bg-yellow-100 text-yellow-600">
            <!-- Clock Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
            </svg>
        </div>
        <div>
            <div class="text-3xl font-extrabold text-gray-800">{{ $pendingOrders }}</div>
            <div class="text-md font-bold text-gray-500">طلبات قيد الانتظار</div>
        </div>
    </div>
    <!-- طلبات ملغاه -->
    <div class="bg-white rounded-lg shadow p-6 flex items-center w-full">
        <div class="flex items-center justify-center w-14 h-14 rounded-full mr-4 bg-red-100 text-red-600">
            <!-- X Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
        <div>
            <div class="text-3xl font-extrabold text-gray-800">{{ $cancelledOrders }}</div>
            <div class="text-md font-bold text-gray-500">طلبات ملغاه</div>
        </div>
    </div>
</div>
