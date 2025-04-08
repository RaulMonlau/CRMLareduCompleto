<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Course;
class CoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Course::create([
            'name' => 'Curso de Laravel',
            'description' => 'Aprendiendo Laravel 11',
        ]);
        Course::create([
            'name' => 'Curso de React',
            'description' => 'Introducción a React 19',
        ]);
        Course::create([
            'name' => 'Curso de PHP Básico',
            'description' => 'Fundamentos de PHP',
        ]);
    }
}
