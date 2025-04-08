<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    // Campos asignables masivamente
    protected $fillable = [
        'course_id',
        'name',
        'description',
    ];

    /**
     * Relación con el curso al que pertenece la asignatura.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Relación con las calificaciones asociadas a la asignatura.
     */
    public function grades()
    {
        return $this->hasMany(Grade::class);
    }
}