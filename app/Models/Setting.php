<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['key', 'value'];

    public function getValueAttribute($value)
    {
        if ($value && \Illuminate\Support\Str::contains($value, 'placehold.co')) {
            return $value;
        } elseif ($value) {
            return asset('storage/' . $value);
        } else {
            return null;
        }
    }
}
