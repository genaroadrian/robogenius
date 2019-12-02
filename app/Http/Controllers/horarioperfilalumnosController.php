<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Grupos_alumnos;
use slidecom_robogenius\Http\Controllers\Controller;

class horarioperfilalumnosController extends Controller
{
    public function index()
    {
        $sql = \DB::select('SELECT detallegrupos.iddgru, dias.dia, horario.hora, personal.nombre, personal.apellidos, personal.idsuc
        FROM detallegrupos, horario, dias, personal , tipopersonal
        WHERE detallegrupos.`idd` = dias.`iddia` AND horario.`idh` = detallegrupos.`idh`
         AND detallegrupos.idp = personal.idper AND personal.idtper = tipopersonal.idtper AND personal.activo =1
        AND detallegrupos.activo = 1 AND tipopersonal.maestro =1');
        return $sql;
    }


    public function store(Request $request)
    {
        $sql = new Grupos_alumnos();
        $sql->idalu = $request->idalu;
        $sql->idg = $request->iddgru;
        $sql->activo = 1;
        $sql->save();
        // return $request;
        return $sql;
    }
}
