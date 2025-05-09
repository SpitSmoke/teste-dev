<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CharacterController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aqui você define as rotas da API. Elas são automaticamente prefixadas com /api
| Exemplo: http://localhost:8000/api/characters
|
*/

// Rota para listar personagens com filtros e paginação
Route::get('/characters', [CharacterController::class, 'index']);

// Rota para obter os detalhes de um personagem pelo ID
Route::get('/characters/{id}', [CharacterController::class, 'show']);
