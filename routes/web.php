<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\QueryController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::post('/query', [QueryController::class, 'index']);


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', [UserController::class,'dashboard'])->name('dashboard');
    Route::post('/user/change-mode', [UserController::class,'changeMode'])->name('changeMode');

    Route::get('overview', [UserController::class, 'overview'])->name('overview');

    Route::get('/quizzes', function () {
        return Inertia::render('quizzes');
    });

    Route::resource('courses', CourseController::class);
    Route::resource('modules', ModuleController::class);
    Route::resource('lessons', LessonController::class);

    Route::get('dashboard/company', function () {
        return Inertia::render('dashboard/company');
    })->name('dasbboard.company');

    Route::post('companies', [CompanyController::class,'store'])->name('register.company');
    Route::post('company/step', [CompanyController::class,'step'])->name('register.step');
});

require __DIR__.'/auth.php';
