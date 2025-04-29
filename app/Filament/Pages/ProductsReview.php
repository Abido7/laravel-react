<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Tables;
use Filament\Tables\Concerns\InteractsWithTable;
use App\Models\Product;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ProductsReview extends Page implements Tables\Contracts\HasTable
{
    use InteractsWithTable;
    protected static string $view = 'filament.pages.products-review';
    protected static ?string $navigationIcon = 'heroicon-o-check-circle';
    protected static ?string $navigationLabel = 'مراجعة المنتجات الجديدة';
    protected static ?string $navigationGroup = 'ادارة';
    protected static ?string $title = 'مراجعة المنتجات الجديدة';
    protected static ?string $slug = 'products/review';

    public static function shouldRegisterNavigation(): bool
    {
        return auth()->check() && auth()->user()->hasRole('admin');
    }

    public function getTableQuery(): Builder
    {
        return Product::query()->where('status', 'pending');
    }

    protected function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('id')->label('تسلسل'),
            Tables\Columns\TextColumn::make('name')->label('الاسم'),
            Tables\Columns\TextColumn::make('vendor.name')->label('البائع'),
            Tables\Columns\TextColumn::make('category.name')->label('القسم'),
            Tables\Columns\TextColumn::make('status')->label('الحالة'),
            Tables\Columns\TextColumn::make('created_at')->dateTime(),
        ];
    }


    protected function getTableActions(): array
    {
        return [
            // Tables\Actions\EditAction::make(),
            Tables\Actions\Action::make('approve')
                ->label('قبول')
                ->action(fn($record) => $record->update(['status' => 'approved']))
                ->color('success')
                ->visible(fn($record) => $record->status === 'pending'),
            Tables\Actions\Action::make('reject')
                ->label('رفض')
                ->action(fn($record) => $record->update(['status' => 'rejected']))
                ->color('danger')
                ->visible(fn($record) => $record->status === 'pending'),
        ];
    }

    public function getTableActionsColumnLabel(): ?string
    {
        return 'الإجراءات';
    }

    protected function getTableBulkActions(): array
    {
        return [
            Tables\Actions\BulkAction::make('approve')
                ->label('Approve Selected')
                ->action(fn($records) => $records->each->update(['status' => 'approved']))
                ->color('success'),
            Tables\Actions\BulkAction::make('reject')
                ->label('Reject Selected')
                ->action(fn($records) => $records->each->update(['status' => 'rejected']))
                ->color('danger'),
        ];
    }
}
