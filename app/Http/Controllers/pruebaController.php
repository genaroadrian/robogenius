<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Http\Controllers\Controller;

class pruebaController extends Controller
{
    public function prueba(Request $request)
    {
        // return $request->idesc;
        $query = DB::select("SELECT alu.idalu, alu.nomalu, alu.apealu as alum_nom, asis.fecha, asis.asis
        FROM alumnos AS alu 
        INNER JOIN asistencias AS asis
        ON asis.idalu = alu.idalu
        WHERE alu.idesc = '$request->idesc'
        ORDER BY asis.fecha asc");

        $q = DB::select("SELECT t1.idalu, asisPorMes(t1.idalu, ?) as pm FROM
        (SELECT alu.idalu FROM alumnos AS alu
        WHERE alu.idesc = ?) AS t1",[$request->idesc, $request->idesc] );

        $m = DB::select("SELECT costo from tipomembresia where idesc = ?", [$request->idesc]);

        return array($query, $q, $m[0]);
    }
}
