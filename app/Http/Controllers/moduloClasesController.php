<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Http\Controllers\Controller;

class moduloClasesController extends Controller
{
    public function index()
    {
        $sql = "SELECT tema.idt, tema.nombre AS ntema ,subtema.ids, subtema.nombre AS nt , detalleclases.folio, niveles.nombre AS n, grados.nombre AS g,
        planeaciones.no_alu
        FROM tema, subtema, detalleclases, planeaciones, niveles, grados
        WHERE detalleclases.folio = planeaciones.folio  AND planeaciones.idt = tema.idt
        AND planeaciones.ids = subtema.ids AND planeaciones.idg = grados.idg AND planeaciones.idn = niveles.idn GROUP BY idt";

        $vista = DB::select($sql);
        return $vista;
    }

    public function store(Request $request)
    {
        $folio = $request->folio;
        $dc = DB::select("SELECT detalleclases.iddm, detalleclases.idac, area_del_conocimiento.nombre AS ac ,
        detalleclases.idsac,subareac.nombre AS sac, detalleclases.idherra, herramientas.nombre AS h, detalleclases.folio
        FROM detalleclases LEFT JOIN area_del_conocimiento ON 
        detalleclases.idac = area_del_conocimiento.idac
        LEFT JOIN subareac ON
        subareac.idsac = detalleclases.idsac LEFT JOIN 
        herramientas ON
        herramientas.idherra = detalleclases.idherra 
        WHERE detalleclases.folio = '$folio'");
        $plan = DB::select("SELECT * FROM planeaciones WHERE folio = '$folio' and activo = 1");
        $ret = [];
        $sesiones = [];
        array_push($ret, $dc, $plan);
        foreach ($plan as $p)
        {
           $sesion =  DB::select("SELECT * FROM sesiones where idsesion = $p->idsesion and activo = 1");
            array_push($sesiones, $sesion[0]);
        }
        // $ret = [$dc,$plan];
        array_push($ret, $sesiones);
        return $ret;
    }
}
