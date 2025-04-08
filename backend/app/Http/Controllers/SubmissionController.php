<?php

namespace App\Http\Controllers;
use App\Models\Submission;
use Illuminate\Http\Request;

class SubmissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Submission::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'assignment_id' => 'required|exists:assignments,id',
            'submitted_at' => 'nullable|date',
            'grade' => 'nullable|numeric|min:0|max:10',
        ]);
        $submission = Submission::create($request->all());
        return response()->json([
            'message' => 'Submission recorded successfully',
            'submission' => $submission
        ], 201);
    }
            /**
            * Show a specific submission (Mostrar entrega).
            */
    public function show($id)
    {
        $submission = Submission::find($id);
        if (!$submission) {
            return response()->json(['message' => 'Submission not found'], 404);
        }
        return response()->json($submission, 200);
    }
    /**
    * Update submission (e.g. grading) (Actualizar entrega).
    */
    public function update(Request $request, $id)
    {
        $submission = Submission::find($id);
        if (!$submission) {
            return response()->json(['message' => 'Submission not found'], 404);
        }
        $request->validate([
            'grade' => 'required|numeric|min:0|max:10',
        ]);
        $submission->update($request->only(['grade']));
        return response()->json([
            'message' => 'Grade updated successfully',
            'submission' => $submission
        ], 200);
    }
}
