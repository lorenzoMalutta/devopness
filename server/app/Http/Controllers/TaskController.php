<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $tasks = Task::all();
        } catch (\LogicException $e) {
            return response()->json([
                'message' => 'Erro lógico no sistema',
                'error' => $e->getMessage()
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro em obter as tarefas',
                'error' => $e->getMessage()
            ], 500);
        }
        return response()->json($tasks, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        try {
            $task = Task::create([
                'title' => $request->title,
                'description' => $request->description,
                'completed' => $request->completed,
                'user_id' => $request->user_id,
                'completed_at' => $request->completed_at,
                'due_date' => $request->due_date,
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json([
                'message' => 'Erro em criar a tarefa',
                'error' => $e->getMessage()
            ], 500);
        } catch (\LogicException $e) {
            return response()->json([
                'message' => 'Erro lógico no sistema',
                'error' => $e->getMessage()
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro em criar a tarefa',
                'error' => $e->getMessage()
            ], 500);
        }
        return response()->json($task, 201);
    }

    /**
     * Display the specified resource, find by user_id.
     */
    public function show($id)
    {
        try {
            $task = Task::where('user_id', $id)->get();
        } catch (\LogicException $e) {
            return response()->json([
                'message' => 'Erro lógico no sistema',
                'error' => $e->getMessage()
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro em obter a tarefa',
                'error' => $e->getMessage()
            ], 500);
        }
        return response()->json($task, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        try {
            $task = Task::find($task->id);
        } catch (\LogicException $e) {
            return response()->json([
                'message' => 'Erro lógico no sistema',
                'error' => $e->getMessage()
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro em obter a tarefa',
                'error' => $e->getMessage()
            ], 500);
        }
        return response()->json($task, 200);
    }

    /**
     * Update only the compleat_at the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, $id)
    {
        try {
            $task = Task::find($id);
            $task->update([
                'title' => $request->title,
                'description' => $request->description,
                'completed' => $request->completed,
                'user_id' => $request->user_id,
                'due_date' => $request->due_date,
                'completed_at' => $request->completed_at,
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json([
                'message' => 'Erro em atualizar a tarefa',
                'error' => $e->getMessage()
            ], 500);
        } catch (\LogicException $e) {
            return response()->json([
                'message' => 'Erro lógico no sistema',
                'error' => $e->getMessage()
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro em atualizar a tarefa',
                'error' => $e->getMessage()
            ], 500);
        }
        return response()->json($task, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $task = Task::findOrFail($id);
            $task->delete();
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json([
                'message' => 'Erro em deletar a tarefa',
                'error' => $e->getMessage()
            ], 500);
        } catch (\LogicException $e) {
            return response()->json([
                'message' => 'Erro lógico no sistema',
                'error' => $e->getMessage()
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro em deletar a tarefa',
                'error' => $e->getMessage()
            ], 500);
        }
        return response()->json(null, 204);
    }
}
