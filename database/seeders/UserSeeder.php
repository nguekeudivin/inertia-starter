<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Teacher;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->delete();

        $user = User::create([
            'email' => 'afrikakemi@gmail.com',
            'name' => 'Afrika Kemi',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

    }
}
