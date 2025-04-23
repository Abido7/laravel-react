<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;
    protected $fillable = [
        'title', 'description', 'discount', 'type', 'start_at', 'end_at', 'product_id', 'category_id'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    // Helper: Check if offer is active now
    public function isActive()
    {
        $now = now();
        return (!$this->start_at || $this->start_at <= $now)
            && (!$this->end_at || $this->end_at >= $now);
    }
}
