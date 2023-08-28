<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
});

Route::group(['prefix' => 'appointment'], function () {
    Route::get('/', 'App\Http\Controllers\AppointmentController@index');
    Route::post('/', 'App\Http\Controllers\AppointmentController@store');
    Route::get('/{appointment}', 'App\Http\Controllers\AppointmentController@show');
    Route::put('/{appointment}', 'App\Http\Controllers\AppointmentController@update');
    Route::delete('/{appointment}', 'App\Http\Controllers\AppointmentController@destroy');
    Route::get('/patient/{patient_id}', 'App\Http\Controllers\AppointmentController@getAppointmentsByPatient');
    Route::get('/doctor/{doctor_id}', 'App\Http\Controllers\AppointmentController@getAppointmentsByDoctor');
});

Route::group(['prefix' => 'specialty'], function () {
    Route::get('/', 'App\Http\Controllers\SpecialtyController@index');
});

Route::group(['prefix'=>'users'],function(){
    Route::get('/specialty/{specialty_id}', 'App\Http\Controllers\UserController@getUsersBySpecialty');
});