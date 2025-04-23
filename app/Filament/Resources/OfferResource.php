<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OfferResource\Pages;
use App\Filament\Resources\OfferResource\RelationManagers;
use App\Models\Offer;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class OfferResource extends Resource
{
    protected static ?string $model = Offer::class;
    protected static ?string $navigationLabel = 'العروض';
    protected static ?string $label = 'عرض';
    protected static ?string $pluralLabel = 'العروض';
    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')->label('عنوان العرض')->required(),
                Forms\Components\Textarea::make('description')->label('الوصف')->rows(2),
                Forms\Components\Select::make('product_id')->label('المنتج')->relationship('product', 'name')->searchable()->nullable(),
                Forms\Components\Select::make('category_id')->label('القسم')->relationship('category', 'name')->searchable()->nullable(),
                Forms\Components\TextInput::make('discount')->label('قيمة الخصم')->numeric()->required(),
                Forms\Components\Select::make('type')->label('نوع الخصم')->options([
                    'percentage' => 'نسبة مئوية',
                    'fixed' => 'قيمة ثابتة',
                ])->required(),
                Forms\Components\DateTimePicker::make('start_at')->label('تاريخ البداية')->nullable(),
                Forms\Components\DateTimePicker::make('end_at')->label('تاريخ النهاية')->nullable(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')->label('عنوان العرض'),
                Tables\Columns\TextColumn::make('description')->label('الوصف'),
                Tables\Columns\TextColumn::make('product.name')->label('المنتج'),
                Tables\Columns\TextColumn::make('category.name')->label('القسم'),
                Tables\Columns\TextColumn::make('discount')->label('قيمة الخصم'),
                Tables\Columns\TextColumn::make('type')->label('نوع الخصم'),
                Tables\Columns\TextColumn::make('start_at')->label('تاريخ البداية'),
                Tables\Columns\TextColumn::make('end_at')->label('تاريخ النهاية'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOffers::route('/'),
            'create' => Pages\CreateOffer::route('/create'),
            'edit' => Pages\EditOffer::route('/{record}/edit'),
        ];
    }
}
