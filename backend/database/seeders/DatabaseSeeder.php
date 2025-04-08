<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Llamamos a nuestros seeders
        $this->call([
            RolesTableSeeder::class,
            UsersTableSeeder::class,
            CoursesTableSeeder::class,
            // Agrega más seeders si los tienes...
        ]);
    }
}
