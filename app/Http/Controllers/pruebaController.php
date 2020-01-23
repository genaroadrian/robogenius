<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Http\Controllers\Controller;

class pruebaController extends Controller
{
    public function prueba()
    {
        $query = DB::select("SELECT alu.idalu, alu.nomalu as alum_nom, asis.fecha, asis.asis
        FROM alumnos AS alu 
        INNER JOIN asistencias AS asis
        ON asis.idalu = alu.idalu
        WHERE alu.idesc = 74
        ORDER BY asis.fecha asc");

        $q = DB::select("SELECT t1.idalu, asisPorMes(t1.idalu, 74) as pm FROM
        (SELECT alu.idalu FROM alumnos AS alu
        WHERE alu.idesc = 74) AS t1");

        return array($query, $q);
    }
}
