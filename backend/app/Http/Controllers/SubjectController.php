<?php

namespace App\Http\Controllers;
use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function index()
    {
        return response()->json(Subject::all(), 200);
    }
    /**
    * Create a new subject (Crear una nueva asignatura).
    */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'course_id' => 'required|exists:courses,id',
            'teacher_id' => 'nullable|exists:users,id',
        ]);
        $subject = Subject::create($request->all());
        return response()->json([
            'message' => 'Subject created successfully',
            'subject' => $subject
        ], 201);
    }
    /**
    * Show a specific subject (Mostrar asignatura por ID).
    */
    public function show($id)
    {
        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }
        return response()->json($subject, 200);
    }
    /**
    * Update a subject (Actualizar asignatura).
    */
    public function update(Request $request, $id)
    {
        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }
        $request->validate([
            'name' => 'nullable|string|max:255',
            'course_id' => 'nullable|exists:courses,id',
            'teacher_id' => 'nullable|exists:users,id',
        ]);
        $subject->update($request->all());
        return response()->json([
            'message' => 'Subject updated successfully',
            'subject' => $subject
        ], 200);
    }
    /**
    * Delete a subject (Eliminar asignatura).
    */
    public function destroy($id)
    {
        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }
        $subject->delete();
        return response()->json(['message' => 'Subject deleted successfully'], 200);
    }
}

