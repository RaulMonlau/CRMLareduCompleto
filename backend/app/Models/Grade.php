<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    use HasFactory;

    // Campos asignables masivamente
    protected $fillable = [
        'user_id',
        'subject_id',
        'score',
    ];

    // Casting de atributos
    protected $casts = [
        'score' => 'float',
    ];

    /**
     * Relación con el usuario.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relación con la asignatura.
     */
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}