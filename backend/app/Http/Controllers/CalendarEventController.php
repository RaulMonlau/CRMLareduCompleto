<?php

namespace App\Http\Controllers;
use App\Models\CalendarEvent;
use Illuminate\Http\Request;

class CalendarEventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(CalendarEvent::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start' => 'required|date',
            'end' => 'required|date|after_or_equal:start',
            'user_id' => 'required|exists:users,id',
        ]);
        $event = CalendarEvent::create($request->all());
        return response()->json([
            'message' => 'Event created successfully',
            'event' => $event
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $event = CalendarEvent::find($id);
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }
        return response()->json($event, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $event = CalendarEvent::find($id);
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }
        $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'start' => 'nullable|date',
            'end' => 'nullable|date|after_or_equal:start',
        ]);
        $event->update($request->all());
        return response()->json([
            'message' => 'Event updated successfully',
            'event' => $event
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $event = CalendarEvent::find($id);
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }
        $event->delete();
        return response()->json(['message' => 'Event deleted successfully'], 200);
    }
}
