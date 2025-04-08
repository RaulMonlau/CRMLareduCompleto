<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\User;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Role::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name'
            ]);
        $role = Role::create($request->only(['name']));
        return response()->json([
            'message' => 'Role created successfully',
            'role' => $role
        ], 201);
    }

    public function assignRole(Request $request, $userId)
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id'
        ]);
        $user = User::findOrFail($userId);
        $user->roles()->attach($request->role_id);
        return response()->json(['message' => 'Role assigned successfully'], 200);
    }

    public function removeRole(Request $request, $userId)
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id'
        ]);
        $user = User::findOrFail($userId);
        $user->roles()->detach($request->role_id);
        return response()->json(['message' => 'Role removed successfully'], 200);
    }
}
