<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
})->name('home');
Route::get('/privacy-policy', function () {
    return view('welcome');
});
Route::get('/terms-and-conditions', function () {
    return view('welcome');
});

Route::middleware(['guest'])->group(function () {
    //
    //Route::post('/login', [LoginController::class, 'authenticate']);
    Route::get('login', function () {
        return view('welcome');
    })->name('login');
    Route::get('register', function () {
        return view('welcome');
    })->name('register');
    Route::get('reset-password/{token}', function () {
        return view('welcome');
    })->name('password.reset');
    Route::get('forgot-password', function () {
        return view('welcome');
    });
});

Route::middleware(['auth'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('change-password', function () {
        return view('welcome');
    });
});
