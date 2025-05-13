<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CharacterController;
use App\Http\Controllers\EpisodeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aqui você define as rotas da API. Elas são automaticamente prefixadas com /api
| Exemplo: http://localhost:8000/api/characters
|
*/


Route::get('/characters', [CharacterController::class, 'index']);

Route::get('/characters/{id}', [CharacterController::class, 'show']);

Route::get('/episodes/{ids}', [EpisodeController::class, 'getEpisodes']);
