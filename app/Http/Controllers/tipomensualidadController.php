<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use slidecom_robogenius\tipomensualidad;
use Illuminate\Support\Facades\DB;
use Session;

class tipomensualidadController extends Controller
{
   public function index()
    {
        $tmensualidad = DB::SELECT("SELECT * FROM tipomensualidad WHERE activo=1");
        echo json_encode($tmensualidad);
        
    }

     // Guarda nuevos registros
    public function store(Request $request)
    {
        $tmensualidad = new tipomensualidad();
        $tmensualidad->nombre = $request->nombre;
        $tmensualidad->fechainicial = $request->fechainicial;
        $tmensualidad->fechafinal = $request->fechafinal;
        $tmensualidad->idtmen = $request->idtmen;
        $tmensualidad->activo = 1;
        $tmensualidad->save();
        echo json_encode($tmensualidad);
    }

    // Actualiza registros
    public function update(Request $request, $id)
    {
        $tmensualidad = tipomensualidad::find($id);
        $tmensualidad->nombre = $request->nombre;
        $tmensualidad->fechainicial = $request->fechainicial;
        $tmensualidad->fechafinal = $request->fechafinal;
        $tmensualidad->idtmen = $request->idtmen;
        $tmensualidad->activo = 1;
        $tmensualidad->save();
        echo json_encode($tmensualidad);
    }

    // Elimina registros
    public function destroy($id)
    {
        $tmensualidad = DB::SELECT("UPDATE tipomensualidad SET activo = 0 WHERE idtmen = '$id'");
        echo json_encode($tmensualidad);
    }
}
