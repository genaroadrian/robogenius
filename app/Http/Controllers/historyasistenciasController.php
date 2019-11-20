<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;

class historyasistenciasController extends Controller
{
    public function store(Request $request)
    {
        $id = $request->iddgru;

        $history =  \DB::SELECT("SELECT asistencias.idgru, asistencias.fecha, asistencias.dia, asistencias.hora, 
        asistencias.idper, alumnos.nomalu, alumnos.apealu, asistencias.asis, personal.nombre, personal.apellidos
        FROM asistencias, alumnos, personal
        WHERE asistencias.idalu = alumnos.idalu AND asistencias.idper = personal.idper 
        AND asistencias.idgru = $id");

        return $history;
    }
}
