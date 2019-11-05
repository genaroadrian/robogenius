<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Detalleclases;
use slidecom_robogenius\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Planeaciones;

class detalleclasesController extends Controller
{
    // public function store(Request $request)
    // {
    //     $dc = new Detalleclases();
    //     $dc->idarchivo = $request->idarchivo;
    //     $dc->idac = $request->idac;
    //     $dc->idsac = $request->idsac;
    //     $dc->idherra = $request->idherra;
    //     $dc->folio = $request->folio;
    //     $dc->save();
    //     return $dc;
    // }

    public function store(Request $request)
    {
        foreach($request->all() as $all)
        {
            $dc = new Detalleclases();
            // $dc->idarchivo = $all['idarchivo'];
            $dc->idarchivo = 1;
            $dc->idac = $all['idac'];
            $dc->idsac = $all['idsac'];
            $dc->idherra = $all['idherra'];
            $dc->folio = $all['folio'];
            $dc->activo = 1;
            $dc->save(); 
        }
        return $request;
    }

    public function update(Request $request, $id)
    {
        DB::select("DELETE from detalleclases where folio = '$id'");

        $nrequest = $request[0];
        $urequest = $request[1];
        
        foreach($nrequest as $all)
        {
            $dc = new Detalleclases();
            // $dc->idarchivo = $all['idarchivo'];
            $dc->idarchivo = 1; 
            $dc->idac = $all['idac'];
            $dc->idsac = $all['idsac'];
            $dc->idherra = $all['idherra'];
            $dc->folio = $id;
            $dc->activo = 1;
            $dc->save();  
        }
        $dc = DB::select("SELECT detalleclases.iddm, detalleclases.idac, area_del_conocimiento.nombre AS ac ,
        detalleclases.idsac,subareac.nombre AS sac, detalleclases.idherra, herramientas.nombre AS h, detalleclases.folio
        FROM detalleclases LEFT JOIN area_del_conocimiento ON 
        detalleclases.idac = area_del_conocimiento.idac
        LEFT JOIN subareac ON
        subareac.idsac = detalleclases.idsac LEFT JOIN 
        herramientas ON
        herramientas.idherra = detalleclases.idherra 
        WHERE detalleclases.folio = '$id'");

        $plan = Planeaciones::where('folio',$id)->get();
        $plan = $plan[0];
        $idp = $plan['idp'];
        $p = Planeaciones::find($idp);
        $p->idt = $urequest['tema'];
        $p->ids = $urequest['subtema'];
        $p->idg = $urequest['grado'];
        $p->idn = $urequest['nivel'];
        $p->save();

        return $dc;
    }

    public function destroy($id)
    {
        DB::SELECT("UPDATE detalleclases SET activo = 0 WHERE folio = '$id'");
    }
}
