<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\codigodesc;
use Illuminate\Support\Facades\DB;

class codigodescController extends Controller
{
    public function index()
    {
    	$codigos = DB::SELECT("SELECT * FROM codigodesc WHERE activo=1");
        echo json_encode($codigos);
    	
    }

     // Guarda nuevos registros
    public function store(Request $request)
    
    {
        $codigos = new codigodesc();
        $codigos->id = $request->id;
        $codigos->codigo = $request->codigo;
        $codigos->porcentaje = $request->porcentaje;
        $codigos->lugar  = $request->lugar ;
        $codigos->fecha = $request->fecha;
        $codigos->idsuc = $request->idsuc;
        $codigos->activo = 1;
        $codigos->save();
        echo json_encode($codigos);
    }

    // Actualiza registros
    public function update(Request $request, $id)
    {
        $codigos = codigodesc::find($id);
        $codigos->id = $request->id;
        $codigos->codigo = $request->codigo;
        $codigos->porcentaje = $request->porcentaje;
        $codigos->lugar = $request->lugar;
        $codigos->fecha = $request->fecha;
        $codigos->activo = 1;
        $codigos->save();
        echo json_encode($codigos);
    }


    public function destroy($id)
    {
        $codigos = DB::SELECT("UPDATE codigodesc SET activo = 0 WHERE id = '$id'");
        echo json_encode($codigos);
    }
}
