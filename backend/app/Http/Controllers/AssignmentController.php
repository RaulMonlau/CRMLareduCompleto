<?php

namespace App\Http\Controllers;
use App\Models\Assignment;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Assignment::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'subject_id' => 'required|exists:subjects,id',
        ]);
        $assignment = Assignment::create($request->all());
        return response()->json([
            'message' => 'Assignment created successfully',
            'assignment' => $assignment
        ], 201);
    }
    /**
    * Show a specific assignment (Mostrar tarea).
    */
    public function show($id)
    {
        $assignment = Assignment::find($id);
        if (!$assignment) {
            return response()->json(['message' => 'Assignment not found'], 404);
        }
        return response()->json($assignment, 200);
    }
    /**
    * Update an assignment (Actualizar tarea).
    */
    public function update(Request $request, $id)
    {
        $assignment = Assignment::find($id);
        if (!$assignment) {
            return response()->json(['message' => 'Assignment not found'], 404);
        }
        $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'subject_id' => 'nullable|exists:subjects,id',
        ]);
        $assignment->update($request->all());
        return response()->json([
            'message' => 'Assignment updated successfully',
            'assignment' => $assignment
        ], 200);
    }
    /**
    * Delete an assignment (Eliminar tarea).
    */
    public function destroy($id)
    {
        $assignment = Assignment::find($id);
        if (!$assignment) {
            return response()->json(['message' => 'Assignment not found'], 404);
        }
        $assignment->delete();
        return response()->json(['message' => 'Assignment deleted successfully'], 200);
    }
}