<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Card;
use App\Models\User;
use App\Models\Order;

class StatisticsWidget extends BaseWidget
{
    protected function getCards(): array
    {
        $ordersCount = Order::count();
        $completedOrders = Order::where('status', 'completed')->count();
        $earnings = Order::where('status', 'completed')->sum('total');
        $lastMonthEarnings = Order::where('status', 'completed')
            ->whereBetween('created_at', [now()->subMonth(), now()])
            ->sum('total');
        $earningsDiff = $lastMonthEarnings > 0 ? (($earnings - $lastMonthEarnings) / $lastMonthEarnings) * 100 : 0;

        return [
            Card::make('👤 المستخدمين', User::count())
                ->description('مستخدمين نشطين')
                ->color('success')
                ->chart([2, 4, 6, 8, 12, 14, 16])
                ->descriptionIcon('heroicon-o-arrow-trending-up')
                ->descriptionColor('success'),

            Card::make('🛒 الطلبات', $ordersCount)
                ->description('إجمالي الطلبات | مكتمل: ' . $completedOrders)
                ->color('primary')
                ->chart([3, 4, 6, 8, 7, 9, 10])
                ->descriptionIcon($ordersCount >= $completedOrders ? 'heroicon-o-arrow-trending-up' : 'heroicon-o-arrow-trending-down')
                ->descriptionColor($ordersCount >= $completedOrders ? 'primary' : 'danger'),

            Card::make('🛍️ السلات', \App\Models\Cart::count())
                ->description('سلات العملاء')
                ->color('warning')
                ->chart([1, 2, 3, 4, 5, 7, 6]),

            Card::make('📦 المنتجات', \App\Models\Product::count())
                ->description('عدد المنتجات')
                ->color('info')
                ->chart([7, 6, 5, 8, 9, 10, 12]),

            Card::make('📂 التصنيفات', \App\Models\Category::count())
                ->description('تنوع الأصناف')
                ->color('gray')
                ->chart([2, 3, 4, 5, 6, 7, 8]),

            Card::make('💰 الإيرادات', number_format($earnings, 2) . ' جنيه')
                ->description('آخر 30 يوم: ' . number_format($lastMonthEarnings, 2) . ' جنيه')
                ->color('success')
                ->chart([5, 7, 6, 8, 12, 15, 14])
                ->descriptionIcon($earningsDiff >= 0 ? 'heroicon-o-arrow-trending-up' : 'heroicon-o-arrow-trending-down')
                ->descriptionColor($earningsDiff >= 0 ? 'success' : 'danger')
                ->description($earningsDiff >= 0 ? 'زيادة ' . number_format($earningsDiff, 1) . '%' : 'انخفاض ' . number_format(abs($earningsDiff), 1) . '%'),
        ];
    }
}
