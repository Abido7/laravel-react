<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class OrderResource extends Resource
{
    protected static ?string $navigationGroup = 'البائعين';

    public static function getEloquentQuery(): Builder
    {
        $user = auth()->user();
        if ($user && $user->hasRole('vendor')) {
            // Only show orders that contain this vendor's products
            return parent::getEloquentQuery()
                ->whereHas('orderItems.product', function ($query) use ($user) {
                    $query->where('vendor_id', $user->vendor->id ?? 0);
                });
        }
        return parent::getEloquentQuery();
    }

    public static function canViewAny(): bool
    {
        // Only vendors and admins can see this resource in navigation
        return auth()->check() && auth()->user()->hasAnyRole(['admin', 'vendor']);
    }

    protected static ?string $navigationLabel = 'الطلبات';
    protected static ?string $label = 'طلب';
    protected static ?string $pluralLabel = 'الطلبات';

    public static function getViewForm(): ?Form
    {
        return Form::make()
            ->schema([
                Forms\Components\Card::make([
                    Forms\Components\Placeholder::make('order_summary')
                        ->content(fn ($record) =>
                            '<div class="flex items-center gap-3 mb-3">'
                            . '<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold '
                            . ($record->status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ($record->status === 'completed' ? 'bg-green-100 text-green-800' : ($record->status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-200 text-gray-800')))
                            . '">' . ucfirst($record->status) . '</span>'
                            . '</div>'
                            . '<div class="text-3xl font-bold text-primary-900">Order #' . $record->id . '</div>'
                            . '<div class="mt-1 text-sm text-gray-500">Placed on ' . $record->created_at->format('F j, Y, g:i a') . '</div>'
                        )
                        ->html()
                        ->extraAttributes(['class' => 'mb-6']),
                    Forms\Components\Grid::make(2)
                        ->schema([
                            Forms\Components\Placeholder::make('Total')
                                ->content(fn ($record) => '$' . number_format($record->total, 2)),
                            Forms\Components\Placeholder::make('Payment Method')
                                ->content(fn ($record) => $record->payment_method),
                            Forms\Components\Placeholder::make('Shipping Address')
                                ->content(fn ($record) => $record->shipping_address),
                            Forms\Components\Placeholder::make('City')
                                ->content(fn ($record) => $record->city),
                        ]),
                ]),
                Forms\Components\Section::make('Customer & Cart')
                    ->schema([
                        Forms\Components\Placeholder::make('Customer')
                            ->label('Customer')
                            ->content(fn ($record) => $record->user?->name ?? 'N/A'),
                        Forms\Components\Placeholder::make('Cart')
                            ->label('Cart ID')
                            ->content(fn ($record) => $record->cart?->id ?? 'N/A'),
                    ])
                    ->columns(2),
            ]);
    }
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        // Only allow status to be edited on the edit page
        $isEdit = request()->routeIs('filament.admin.resources.orders.edit');

        return $form->schema(
            $isEdit
                ? [
                    Forms\Components\Select::make('status')
                        ->options([
                            'pending' => 'Pending',
                            'completed' => 'Completed',
                            'cancelled' => 'Cancelled',
                        ])
                        ->required(),
                  ]
                : [
                    Forms\Components\Select::make('user_id')
                        ->relationship('user', 'name')
                        ->required(),
                    Forms\Components\Select::make('cart_id')
                        ->relationship('cart', 'id')
                        ->required(),
                    Forms\Components\TextInput::make('total')
                        ->numeric()
                        ->required(),
                    Forms\Components\Select::make('status')
                        ->options([
                            'pending' => 'Pending',
                            'completed' => 'Completed',
                            'cancelled' => 'Cancelled',
                        ])
                        ->required(),
                    Forms\Components\TextInput::make('shipping_address'),
                    Forms\Components\TextInput::make('city'),
                    Forms\Components\TextInput::make('payment_method'),
                    Forms\Components\DateTimePicker::make('created_at'),
                ]
        );
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->sortable(),
                Tables\Columns\TextColumn::make('user.name')->label('User'),
                Tables\Columns\TextColumn::make('cart.id')->label('Cart'),
                Tables\Columns\TextColumn::make('total')->money('usd'),
                Tables\Columns\TextColumn::make('status')->badge(),
                Tables\Columns\TextColumn::make('shipping_address')->limit(30),
                Tables\Columns\TextColumn::make('city')->limit(20),
                Tables\Columns\TextColumn::make('payment_method')->limit(20),
                Tables\Columns\TextColumn::make('created_at')->dateTime()->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('view')
                    ->label('View')
                    ->icon('heroicon-o-eye')
                    ->url(fn ($record) => static::getUrl('view', ['record' => $record->getKey()]))
                    ->openUrlInNewTab(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }


    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
            'view' => Pages\ViewOrder::route('/{record}/view'),
        ];
    }
}
