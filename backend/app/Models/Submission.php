<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    use HasFactory;

    // Campos asignables masivamente
    protected $fillable = [
        'assignment_id',
        'user_id',
        'content',
        'submitted_at',
    ];

    // Casting de atributos
    protected $casts = [
        'submitted_at' => 'datetime',
    ];

    /**
     * Relación con la asignación a la que pertenece la entrega.
     */
    public function assignment()
    {
        return $this->belongsTo(Assignment::class);
    }

    /**
     * Relación con el usuario que realizó la entrega.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}