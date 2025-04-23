<?php
namespace App\Filament\Resources;

use App\Filament\Resources\SettingsResource\Pages;
use App\Models\Setting;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;

class SettingsResource extends Resource
{
    protected static ?string $model = Setting::class;
    protected static ?string $navigationIcon = 'heroicon-o-cog';
    protected static ?string $navigationLabel = 'الإعدادات';
    protected static ?string $label = 'إعداد';
    protected static ?string $pluralLabel = 'الإعدادات';

    public static function form(Forms\Form $form): Forms\Form
    {
        return $form->schema([
            TextInput::make('key')
                ->label('المفتاح')
                ->required()
                ->unique(ignoreRecord: true),
            TextInput::make('value')
                ->label('القيمة')
                ->required()
                ->visible(fn ($record) => $record?->key !== 'banner_image'),
            FileUpload::make('value')
                ->label('صورة البانر')
                ->image()
                ->directory('banners')
                ->imagePreviewHeight('200')
                ->helperText('يرجى رفع صورة بانر عالية الجودة. الحجم المثالي 1200x300 بكسل.')
                ->disk('public')
                ->preserveFilenames()
                ->dehydrateStateUsing(fn ($state) =>
                    is_array($state)
                        ? (count($state) > 0
                            ? (is_string(array_values($state)[0]) ? array_values($state)[0] : null)
                            : null)
                        : $state
                )
                ->visible(fn ($record) => $record?->key === 'banner_image'),
            FileUpload::make('value')
                ->label('شعار الموقع')
                ->image()
                ->directory('logos')
                ->imagePreviewHeight('100')
                ->helperText('يرجى رفع صورة شعار مربعة (مثال: 300x300 بكسل).')
                ->disk('public')
                ->preserveFilenames()
                ->dehydrateStateUsing(fn ($state) =>
                    is_array($state)
                        ? (count($state) > 0
                            ? (is_string(array_values($state)[0]) ? array_values($state)[0] : null)
                            : null)
                        : $state
                )
                ->visible(fn ($record) => $record?->key === 'logo'),
        ]);
    }

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table->columns([
            TextColumn::make('key')->label('المفتاح')->searchable(),
            TextColumn::make('value')->label('القيمة')->searchable(),
        ])
        ->actions([
            Tables\Actions\EditAction::make(),
        ])
        ->bulkActions([
            Tables\Actions\DeleteBulkAction::make(),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSettings::route('/settings'),
            'edit' => Pages\EditSetting::route('/settings/{record}/edit'),
            'create' => Pages\CreateSetting::route('/settings/create'),
        ];
    }
}
