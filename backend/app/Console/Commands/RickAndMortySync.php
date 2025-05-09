<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Character;
use Illuminate\Support\Facades\Http;

class RickAndMortySync extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:rick-and-morty-sync';
    

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sincroniza os personagens da API Rick and Morty com o banco de dados';


    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('*burp* Morty, começa a puxar esses dados logo antes que o tempo colapse!');

        $url = 'https://rickandmortyapi.com/api/character';
        
        do {
            $response = Http::get($url);

            if ($response->failed()) {
                $this->error('Erro ao buscar dados da API.');
                return 1;
            }

            $data = $response->json();
            foreach ($data['results'] as $item) {
                Character::updateOrCreate(
                    ['id' => $item['id']],
                    [
                        'name' => $item['name'],
                        'status' => $item['status'],
                        'species' => $item['species'],
                        'type' => $item['type'],
                        'gender' => $item['gender'],
                        'image' => $item['image'],
                        'origin' => $item['origin'],
                        'location' => $item['location'],
                    ]
                );
            }

            $url = $data['info']['next'] ?? null;

        } while ($url);

        $this->info('*burp* Morty, terminamos! Os dados tão mais sincronizados que meu fígado depois de três shots de tequila interdimensional');
        return 0;
    }
}