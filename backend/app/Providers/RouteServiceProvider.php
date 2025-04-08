<?php
namespace App\Providers;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as
ServiceProvider;
class RouteServiceProvider extends ServiceProvider
{
    /**
    * Bootstrap any application services.
    */
    public function boot()
    {
        // Aquí registramos las rutas de la API y las rutas web
        $this->routes(function () {
            // Rutas API
            Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));
            // Rutas Web
            Route::middleware('web')
            ->group(base_path('routes/web.php'));
        });
    }
}