<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Detallegrupos;

class detallegruposController extends Controller
{
    public function index()
    {
        $dgrupos = DB::SELECT("SELECT * FROM grupos_alumnos WHERE activo=1");
        echo json_encode($dgrupos);
    }

    public function store(Request $request )
    {
        $dgrupos = new Detallegrupos();
        $dgrupos->idd = $request->idd;
        $dgrupos->idh = $request->idh;
        $dgrupos->idp = $request->idp;
        $dgrupos->idesc = $request->idesc;
        $dgrupos->idsuc = $request->idsuc;
        $dgrupos->activo = 1;
        $dgrupos->save();
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
        return $dg;
    }

    public function destroy($id)
    {
        $dg = Detallegrupos::find($id);
        $dg->activo = 0;
        $dg->save();
        return $dg;
    }
}
