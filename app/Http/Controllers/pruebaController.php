<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Http\Controllers\Controller;

class pruebaController extends Controller
{
    public function prueba()
    {
        $query = DB::select("SELECT asistencias.idalu, asistencias.idasis,asistencias.fecha,asistencias.dia,asistencias.hora,
		IF(asistencias.asis = 1, '✓', '✖') AS asis,
		personal.nombre AS person_nom, personal.apellidos AS person_ape,
        alumnos.nomalu AS alum_nom,alumnos.apealu AS alumno_apell,
        escuelas.nombre AS esc_name
FROM slidecom_robogenius.asistencias
INNER JOIN slidecom_robogenius.personal ON personal.idper = asistencias.idper
INNER JOIN slidecom_robogenius.alumnos ON alumnos.idalu = asistencias.idalu
INNER JOIN slidecom_robogenius.escuelas ON escuelas.idesc = asistencias.idesc
ORDER BY asistencias.fecha DESC;");
        return $query;
    }
}
