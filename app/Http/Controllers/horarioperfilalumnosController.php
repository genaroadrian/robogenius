<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Grupos_alumnos;
use slidecom_robogenius\Http\Controllers\Controller;

class horarioperfilalumnosController extends Controller
{
    public function index()
    {
        $sql = \DB::select('SELECT detallegrupos.iddgru, dias.dia, horario.hora, personal.nombre, personal.apellidos
        FROM detallegrupos, horario, dias, personal 
        WHERE detallegrupos.`idd` = dias.`iddia` AND horario.`idh` = detallegrupos.`idh` 
        AND detallegrupos.idp = personal.idper AND detallegrupos.activo = 1');
        return $sql;
    }


    public function store(Request $request)
    {
        $sql = new Grupos_alumnos();
        $sql->idalu = $request->idalu;
        $sql->idg = $request->idg;
        $sql->activo = 1;
        $sql->save();
        // return $request;
        return $sql;
    }
}
