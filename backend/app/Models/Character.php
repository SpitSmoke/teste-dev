<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'status',
        'species',
        'type',
        'gender',
        'image',
        'origin',
        'location',
        'episode',
    ];

    protected $casts = [
        'origin' => 'array',
        'location' => 'array',
        'episode' => 'array',
    ];
}
