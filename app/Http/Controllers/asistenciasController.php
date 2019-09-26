<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\Asistencias;
use Illuminate\Support\Facades\DB;

class asistenciasController extends Controller
{
    public function index()
    {
        $asis = DB::select("SELECT * FROM asistencias");
        return $asis;
    }

    public function store(Request $request)
    {
        $asis = new Asistencias();
        $asis->idgru = $request->idgru;
        $asis->fecha= $request->fecha;
        $asis->dia = $request->dia;
        $asis->hora = $request->hora;
        $asis->idper = $request->idper;
        $asis->idalu = $request->idalu;
        $asis->idesc = $request->idesc;
        $asis->asis = $request->asis;
        $asis->save();
        return $asis;
    }


}
