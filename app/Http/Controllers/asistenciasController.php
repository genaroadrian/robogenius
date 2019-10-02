<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\Asistencias;
use Illuminate\Support\Facades\DB;
use \Illuminate\Support\Facades\Date;

class asistenciasController extends Controller
{
    public function index()
    {
        $asis = DB::select("SELECT * FROM asistencias");
        return $asis;
    }

    public function store(Request $request)
    {
        foreach($request->all() as $all)
        {
        $asis = new Asistencias();
        $asis->idgru = $all['iddgru'];
        $asis->fecha=  now()->toDateTimeString('Y-m-d');
        $asis->dia = $all['dia'];
        $asis->hora = $all['hora'];
        $asis->idper = $all['idper'];
        $asis->idalu = $all['idalu'];
        $asis->idesc = $all['idesc'];
        $asis->asis = $all['asis'];
        $asis->save();
        }
       return $request;
    }


}
