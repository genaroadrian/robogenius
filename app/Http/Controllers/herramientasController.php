<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\herramientas;

class herramientasController extends Controller
{
    public function index()
    {
        $herramientas  = DB::SELECT("SELECT * FROM herramientas WHERE activo=1");
        echo json_encode($herramientas);
    }
    public function store(Request $request)
    
    {
        $herramientas = new herramientas();
        $herramientas->idherra = $request->idherra;
        $herramientas->nombre = $request->nombre;
        $herramientas->activo = 1;
        $herramientas->save();
        echo json_encode($herramientas);
    }
}
