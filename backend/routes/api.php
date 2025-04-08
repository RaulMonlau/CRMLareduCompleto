<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\SubmissionController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\CalendarEventController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\RoleController;


// Rutas públicas (No requieren token)
Route::post('/register', [AuthController::class, 'register']); //Registro
Route::post('/login', [AuthController::class, 'login']); // Login

// Rutas protegidas (Requieren token)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']); // Logout
    Route::get('/me', [AuthController::class, 'me']); // Obtener datosdel usuario autenticado
});
Route::middleware('auth:sanctum')->group(function () {
    // Endpoint para obtener todos los cursos del usuario autenticado
    Route::get('/courses', [CourseController::class, 'index']);
    // Endpoint para asignar un curso al usuario autenticado
    Route::post('/courses', [CourseController::class, 'store']);
    // Endpoint para obtener un curso específico (por ID) asignado al usuario autenticado
    Route::get('/courses/{id}', [CourseController::class, 'show']);    // Endpoint para desasignar un curso por ID
    Route::delete('/courses/{id}', [CourseController::class, 'destroy']);
    Route::put('/courses/{id}', [CourseController::class, 'update']);
});

Route::middleware('auth:sanctum')->group(function () {
    // Endpoint para obtener todos los cursos del usuario autenticado
    Route::get('/subjects', [SubjectController::class, 'index']);
    // Endpoint para asignar un curso al usuario autenticado
    Route::post('/subjects', [SubjectController::class, 'store']);
    // Endpoint para obtener un curso específico (por ID) asignado al usuario autenticado
    Route::get('/subjects/{id}', [SubjectController::class, 'show']);    // Endpoint para desasignar un curso por ID
    Route::put('/subjects/{id}', [SubjectController::class, 'update']);
    Route::delete('/subjects/{id}', [SubjectController::class, 'destroy']);
    
});
Route::middleware('auth:sanctum')->group(function () {
    // CRUD de assignments
    Route::get('/assignments', [AssignmentController::class, 'index']);
    Route::post('/assignments', [AssignmentController::class, 'store']);
    Route::get('/assignments/{id}', [AssignmentController::class, 'show']);
    Route::put('/assignments/{id}', [AssignmentController::class, 'update']);
    Route::delete('/assignments/{id}', [AssignmentController::class, 'destroy']);
    // CRUD de submissions
    Route::get('/submissions', [SubmissionController::class, 'index']);
    Route::post('/submissions', [SubmissionController::class, 'store']);
    Route::get('/submissions/{id}', [SubmissionController::class, 'show']);
    Route::put('/submissions/{id}', [SubmissionController::class, 'update']);
});

Route::middleware('auth:sanctum')->group(function () {
    // CRUD de eventos del calendario
    Route::get('/calendar', [CalendarEventController::class, 'index']);
    Route::post('/calendar', [CalendarEventController::class, 'store']);
    Route::get('/calendar/{id}', [CalendarEventController::class, 'show']);
    Route::put('/calendar/{id}', [CalendarEventController::class, 'update']);
    Route::delete('/calendar/{id}', [CalendarEventController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {
    // Mensajería
    Route::get('/messages', [MessageController::class, 'index']);
    Route::post('/messages', [MessageController::class, 'store']);
    Route::get('/messages/conversation/{userId}', [MessageController::class, 'conversation']);
    Route::put('/messages/{id}/read', [MessageController::class, 'markAsRead']);
    Route::delete('/messages/{id}', [MessageController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {
    // Roles
    Route::get('/roles', [RoleController::class, 'index']);
    Route::post('/roles', [RoleController::class, 'store']);
    Route::post('/users/{userId}/assign-role', [RoleController::class, 'assignRole']);
    Route::delete('/users/{userId}/remove-role', [RoleController::class, 'removeRole']);
});