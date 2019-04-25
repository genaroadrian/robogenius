<?php

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
});

Route::get('layout','layoutcontroller@index');

Route::get('prueba','layoutcontroller@prueba');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/escuela', 'EscuelaController@index')->name('escuela');
Route::get('/Mescuela', 'EscuelaController@mostrar')->name('escuela');

/*Ruta para mostrar el perfil de usuario modificacion*/
Route::post('profile', 'UserController@update_avatar');
Route::get('profile', 'UserController@profile')->name('profile');
Route::post('editar/{id}', 'UsuarioController@update')->name('editar');

