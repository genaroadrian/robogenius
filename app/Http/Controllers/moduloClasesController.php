<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Http\Controllers\Controller;

class moduloClasesController extends Controller
{
    public function index()
    {
        $sql = "SELECT sesiones.idsesion, tema.idt, tema.nombre ,subtema.ids, subtema.nombre AS nt , sesiones.nombre, detalleclases.folio
        FROM tema, subtema, sesiones, detalleclases, planeaciones  
	WHERE detalleclases.folio = planeaciones.folio AND planeaciones.idsesion = sesiones.idsesion AND planeaciones.idt = tema.idt
    AND planeaciones.ids = subtema.ids
    GROUP BY idsesion";

        $vista = DB::select($sql);
        return $vista;
    }

    public function store(Request $request)
    {
        $folio = $request->folio;
        $dc = DB::select("SELECT * FROM detalleclases WHERE folio = '$folio'");
        $plan = DB::select("SELECT * FROM planeaciones WHERE folio = '$folio'");
        $ret = [];
        $sesiones = [];
        array_push($ret, $dc, $plan);
        foreach ($plan as $p)
        {
           $sesion =  DB::select("SELECT * FROM sesiones where idsesion = $p->idsesion");
            array_push($sesiones, $sesion);
        }
        // $ret = [$dc,$plan];
        array_push($ret, $sesiones);
        return $ret;
    }
}
