<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $hash = md5(strtolower('info@tritekconsulting.co.uk'));
        $user = User::create([
            'name' => 'Admin',
            'username' => 'admin',
            'avatar' => 'https://www.gravatar.com/avatar/'.$hash,
            'email' => 'info@tritekconsulting.co.uk',
            'password' => Hash::make('Tritek@2021'),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        $user->markEmailAsVerified();

        $user->assignRole('admin');

        $user->profile()->create([
            'name' => 'Admin',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }
}