<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class EpisodeController extends Controller
{
    public function getEpisodes($ids)
    {
        $idsArray = explode(',', $ids);

        $url = 'https://rickandmortyapi.com/api/episode/' . implode(',', $idsArray);
        $response = Http::get($url);

        if (!$response->successful()) {
            return response()->json(['error' => 'Erro ao buscar episódios'], 500);
        }

        $data = $response->json();

        
        if (isset($data['id'])) {
            $data = [$data];
        }

        return response()->json($data);
    }
}