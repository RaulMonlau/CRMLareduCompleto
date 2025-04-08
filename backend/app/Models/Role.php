<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
use HasFactory;
// Campos que se pueden asignar masivamente
protected $fillable = [
'name'
];
// Relación con usuarios a través de user_roles
public function users()
{
// Un rol puede pertenecer a muchos usuarios
return $this->belongsToMany(User::class, 'user_roles');
}
// Relación con permisos a través de role_permissions
public function permissions()
{
// Un rol puede tener varios permisos
return $this->belongsToMany(Permission::class,
'role_permissions');
}
}