<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;

    // Campos asignables masivamente
    protected $fillable = [
        'user_id',      // ID del usuario creador o asignado (ajustar según la migración)
        'title',        // Título de la asignación
        'description',  // Descripción detallada
        'due_date',     // Fecha límite
        'subject_id', // Estado de completación
    ];

    // Cast de atributos
    protected $casts = [
        'due_date'     => 'datetime',
        'is_completed' => 'boolean',
    ];

    /**
     * Relación con el usuario asignado o creador de la asignación.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}