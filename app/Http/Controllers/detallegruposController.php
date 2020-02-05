<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Detallegrupos;
use slidecom_robogenius\Grupos_alumnos;

class detallegruposController extends Controller
{
    public function index()
    {
        $dgrupos = DB::SELECT("SELECT * FROM grupos_alumnos WHERE activo=1");
        echo json_encode($dgrupos);
    }

    public function store(Request $request )
    {
        // return $request;
        $dgrupos = new Detallegrupos();
        $dgrupos->idd = $request->idd;
        $dgrupos->idh = $request->idh;
        $dgrupos->idp = $request->idp;
        $dgrupos->idesc = $request->idesc;
        $dgrupos->idsuc = $request->idsuc;
        $dgrupos->activo = 1;
        $dgrupos->save();
        
        if($request->idesc)
        {
            $alumnos = DB::Select("SELECT idalu FROM alumnos WHERE idesc = ?",[$request->idesc]);
            foreach($alumnos as $alumnos)
            {
                $ga = new Grupos_alumnos();
                $ga->idg = $dgrupos->iddgru;
                $ga->idalu = $alumnos->idalu;
                $ga->activo = 1;
                $ga->save();
            }
        }
        echo json_encode($dgrupos);

    }

    public function update(Request $request, $id)
    {
        $dg = Detallegrupos::find($id);
		$dg->idd = $request->idd;
        $dg->idh = $request->idh;
        $dg->idp = $request->idp;
        $dg->idesc = $request->idesc;
        $dg->idsuc = $request->idsuc;
        $dg->save();
        return $request;
    }

    public function destroy($id)
    {
        $dg = Detallegrupos::find($id);
        $dg->activo = 0;
        $dg->save();
        return $dg;
    }
}
