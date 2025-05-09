<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Character;



class CharacterController extends Controller
{
    
    public function index(Request $request)
    {
        $query = Character::query();

        // filtros 
        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('species')) {
            $query->where('species', $request->species);
        }

        if ($request->filled('gender')) {
            $query->where('gender', $request->gender);
        }

        // ordenação por paginas
        $characters = $query->paginate(10);
        
        
        return response()->json($characters);
        
    }

    public function show($id)
    {
        $character = Character::find($id);

        if (!$character) {
            return response()->json(['error' => 'Personagem não encontrado'], 404);
        }

        return response()->json($character);
    }
}
