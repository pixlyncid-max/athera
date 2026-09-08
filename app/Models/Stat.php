<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stat extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
        'value',
        'suffix',
        'description',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'value' => 'integer',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];
}
