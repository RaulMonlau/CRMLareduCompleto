<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    protected $fillable = [
        'level',    // Nivel del log (e.g., info, warning, error)
        'message',  // Mensaje del log
        'context',  // Contexto adicional en formato JSON
    ];

    protected $casts = [
        'context' => 'array', // Se convierte el campo context a un arreglo
    ];
}