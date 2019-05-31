<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('personal', 'personalController');
Route::resource('tipopersonal', 'tipopersonalController');
Route::resource('productos', 'productosController');
Route::resource('escuelas', 'EscuelaController');
Route::resource('dgrupos', 'detallegruposController');
Route::resource('tipomensualidad', 'tipomensualidadController');
Route::resource('alumnos', 'alumnoController');
Route::resource('padres', 'padresController');
Route::resource('dpadres', 'detallepadresController');
