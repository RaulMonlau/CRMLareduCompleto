<?php
namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
    * Register a new user (Registro de un nuevo usuario)
    */
    public function register(Request $request)
    {
        // Validación de campos
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);
        // Crear al usuario
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ], 201);
    }
     /**
    * Login a user (Iniciar sesión)
    */
    public function login(Request $request)
    {
        // Validación de campos
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        // Verificar si el usuario existe
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
        // Crear un token para el usuario
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user
        ], 200);
    }
    /**
    * Logout a user (Cerrar sesión)
    */
    public function logout(Request $request)
    {
        // Revocar todos los tokens del usuario autenticado
        $request->user()->tokens()->delete();
        return response()->json([
            'message' => 'Logout successful'
        ], 200);
    }
    /**
    * Get current user (Obtener datos del usuario autenticado)
    */
    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user()
        ], 200);
    }
}