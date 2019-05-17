<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\Detallegrupos;
use Illuminate\Support\Facades\DB;

class detallegruposController extends Controller
{
    public function index()
    {
        $dgrupos = DB::SELECT("SELECT * FROM detallegrupos WHERE activo=1");
        echo json_encode($dgrupos);
    }

    public function store(Request $request )
    {
        $dgrupos = new Detallegrupos();
        $dgrupos->idh = $request->idh;
        $dgrupos->idd = $request->idd;
        $dgrupos->idp = $request->idp;
        $dgrupos->idalu = $request->idalu;
        $dgrupos->activo = 1;
        $dgrupos->save();
        echo json_encode($dgrupos);
    }
}
