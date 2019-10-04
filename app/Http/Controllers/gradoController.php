<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\grado;
use Illuminate\Support\Facades\DB;

class gradoController extends Controller
{
    public function index()
    {
    	$grados = DB::SELECT("SELECT * FROM grados where activo=1");
        echo json_encode($grados);
    	
    }

     // Guarda nuevos registros
    public function store(Request $request)
    
    {
        $grados = new grado();
        $grados->idg = $request->idg;
        $grados->nombre = $request->nombre;
        $grados->activo = 1;
        $grados->save();
        echo json_encode($grados);
    }

    // Actualiza registros
    public function update(Request $request, $id)
    {
        $grados = grado::find($id);
        $grados->nombre = $request->nombre;
        $grados->activo = $request->activo;
        $grados->save();
        echo json_encode($grados);
    }
    public function destroy($id)
    {
        $grados = DB::SELECT("UPDATE grados SET activo = 0 WHERE idg = '$id'");
        echo json_encode($grados);
    }
}
