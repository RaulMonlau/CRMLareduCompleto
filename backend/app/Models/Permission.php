<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Permission extends Model
{
use HasFactory;
protected $fillable = [
'name'];
// Relación con roles a través de role_permissions
public function roles()
{
// Un permiso puede asociarse a varios roles
return $this->belongsToMany(Role::class, 'role_permissions');
}
}