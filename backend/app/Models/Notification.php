<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    // Campos asignables masivamente
    protected $fillable = [
        'notifiable_type',
        'notifiable_id',
        'type',
        'data',
        'read_at',
    ];

    // Casting de atributos
    protected $casts = [
        'data'    => 'array',
        'read_at' => 'datetime',
    ];

    /**
     * Relación polimórfica con el modelo notifiable.
     */
    public function notifiable()
    {
        return $this->morphTo();
    }
}