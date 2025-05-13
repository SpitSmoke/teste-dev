<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

// IMPORTANTE: Se ainda não tiver, importe aqui o comando
use App\Console\Commands\RickAndMortySync;

class Kernel extends ConsoleKernel
{
    /**
     * Register the commands for the application.
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }

    /**
     * Custom Commands.
     */
    protected $commands = [
        \App\Console\Commands\RickAndMortySync::class,
        
    ];
}
