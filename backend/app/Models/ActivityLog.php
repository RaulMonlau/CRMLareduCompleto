<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    use HasFactory;

    // Campos asignables masivamente
    protected $fillable = [
        'user_id',
        'table_name',
        'changes',
    ];

    // Relaciones

    /**
     * Relación con el usuario asociado a la actividad.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}