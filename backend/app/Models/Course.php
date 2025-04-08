<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    // Campos asignables masivamente
    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Relación con los subjects (asignaturas) del curso.
     */
    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }

    /**
     * Relación con los usuarios a través de la tabla pivote course_user.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'course_user')
                    ->withPivot('role')
                    ->withTimestamps();
    }
}