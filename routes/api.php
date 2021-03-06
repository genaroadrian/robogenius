<?php

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\alumnoController;

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
Route::resource('dpadres', 'detallepadresController');
Route::resource('dias', 'diasController');
Route::resource('horas', 'padresController');
Route::resource('sucursal', 'sucursalController');
Route::resource('horarios', 'horariosController');
Route::resource('tipopago', 'tipopagoController');
Route::resource('memalumnovista', 'memalumnovistaController');
Route::resource('tmembresia', 'tipomembresiaController');
Route::resource('memalumno', 'memalumnoController');
Route::resource('galumnos', 'detallegruposController');
Route::resource('malu', 'perfilController');
Route::resource('login', 'LoginAngularController');
Route::resource('useradmin', 'userAdminController');
Route::resource('categorias', 'categoriasController');
Route::resource('contabilidad', 'cotabilidadController');

Route::resource('ingresos', 'ingresosController');
Route::resource('egresos', 'egresosController');

Route::resource('sumaegresos', 'sumaegresosController');
Route::resource('sumaingresos', 'sumaingresosController');

Route::resource('semana', 'SemanaController');
Route::resource('semanaegresos', 'semanaEgresosController');

Route::resource('mesingreso', 'mesController');
Route::resource('mesegreso', 'mesegresoController');
Route::resource('utilidad', 'mesUtilidadController');
Route::resource('restapendiente', 'restantePendienteCOntroller');
Route::resource('pendiente', 'pendientesController');
Route::resource('fotosalumnos', 'fotoAlumnosController');
Route::resource('codigos', 'codigodescController');
Route::resource('nivel', 'nivelController');
Route::resource('grados', 'gradoController');

Route::resource('fotosadmin', 'fotoAdminController');
Route::resource('fotospersonal', 'fotopersonalController');
Route::resource('areadelconocimiento', 'areaDelConocimientoController');
Route::resource('tema', 'temasController');
Route::resource('subtema', 'subtemasController');
Route::resource('confirmtoken', 'passwordResetController');
Route::resource('clases', 'moduloController');
Route::resource('herramientas', 'herramientasController');
Route::post('validation','LoginAngularController@validation')->name('validation');

Route::resource('pmem', 'panelMembreciaController');

Route::resource('email', 'emailController');
Route::resource('perfilalumnoshorario', 'perfilAlumnosHorarioController');
Route::resource('horariopersonal', 'horariosPersonalController');

Route::resource('horarioperfilalumnos', 'horarioperfilalumnosController');
Route::resource('perfilpersonalgrupos', 'perperfilgrupController');
Route::resource('asistencias', 'asistenciasController');
Route::resource('historyasis', 'historyasistenciasController');
Route::resource('subareac', 'subareacController');
Route::resource('sesiones', 'sesionesController');
Route::resource('detalleclases', 'detalleclasesController');
Route::resource('planeaciones', 'planeacionesController');
Route::resource('vistamodulo', 'moduloClasesController');
Route::resource('files', 'FilesController');
Route::get('filesdownload', 'FilesController@download');
Route::resource('moduloescuelas', 'moduloEscuelasController');
Route::get('getdias_horas','horariosSAController@gethorarios');
Route::get('getMaestros','horariosSAController@getMaestros');
Route::post('pruebaAsistencias','pruebaController@prueba');
Route::resource('fecthschool', 'escuelaInfoController');
Route::resource('historialmem', 'historialController');
Route::get('inactive_students', 'alumnoController@inactive');
Route::delete('restore_student/{id}', 'alumnoController@restore');
Route::get('inactive_employees','personalController@inactive');
Route::delete('restore_employee/{id}','personalController@restore');