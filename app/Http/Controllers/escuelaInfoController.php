<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Http\Controllers\Controller;

class escuelaInfoController extends Controller
{
    public function destroy($id)
    {
        $response = array();
        $alumnos = DB::select("SELECT idalu, nomalu, apealu, perfilalu, fnacalu FROM alumnos WHERE activo = 1 AND idesc = ?", [$id]);
        array_push($response, $alumnos);
        $membresia = DB::select("SELECT idtmem, nombre, costo, clases FROM tipomembresia WHERE activo = 1 AND idesc = ?", [$id]);
        if($membresia)
        {
            array_push($response, $membresia[0]);
        }else{
            array_push($response, $membresia);
        }
        $horario = DB::select("SELECT detallegrupos.iddgru, dias.iddia, dias.dia, horario.idh, horario.hora, personal.idper, personal.apellidos, personal.nombre
        FROM detallegrupos INNER JOIN personal ON personal.idper = detallegrupos.idp
        INNER JOIN horario ON horario.idh = detallegrupos.idh 
        INNER JOIN dias ON dias.iddia = detallegrupos.idd AND detallegrupos.idesc = ?", [$id]);
        array_push($response, $horario);
        return $response;
    }
}
