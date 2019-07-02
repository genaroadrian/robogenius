<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
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
        $dgrupos = new Grupos_alumnos();
        $dgrupos->idg = $request->idg;
        $dgrupos->idalu = $request->idalu;
        $dgrupos->activo = 1;
        $dgrupos->save();
        echo json_encode($dgrupos);
    }
}
