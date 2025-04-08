<?php
namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;
    /**
    * The attributes that are mass assignable.
    *
    * @var list<string>
    */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];
    /**
    * The attributes that should be hidden for serialization.
    *
    * @var list<string>
    */
    protected $hidden = [
        'password',
        'remember_token',
    ];
    /**
    * Get the attributes that should be cast.
    *
    * @return array<string, string>
    */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles');
    }
    /**
    * Relación con asignaturas (profesor).
    * Un profesor puede tener muchas asignaturas.
    */
    public function subjects()
    {
        return $this->hasMany(Subject::class, 'teacher_id');
    }
    /**
    * Relación con cursos a través de la tabla course_user.
    * Permite asignar estudiantes y profesores a cursos.
    */
    public function courses()
    {
        return $this->belongsToMany(Course::class, 'course_user')->withPivot('role');
    }
    /**
    * Relación con entregas de tareas (submissions).
    */
    public function submissions()
    {
        return $this->hasMany(Submission::class);
    }
    /**
    * Relación con eventos del calendario (CalendarEvent).
    */
    public function calendarEvents()
    {
        return $this->hasMany(CalendarEvent::class);
    }
}