<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use slidecom_robogenius\Horarios;
use Illuminate\Support\Facades\DB;
use Session;

class horariosController extends Controller
{
    public function index()
    {
    	$horario = DB::SELECT("SELECT * FROM horario WHERE activo=1");
        echo json_encode($horario);
    	
    }

     // Guarda nuevos registros
    public function store(Request $request)
    {
        $horario = new Horarios();
        $horario->idh = $request->idh;
        $horario->hora = $request->hora;
        $horario->idd = $request->idd;
        $horario->activo = 1;
        $horario->save();
        echo json_encode($horario);
    }

    // Actualiza registros
    public function update(Request $request, $id)
    {
        $horario = Horarios::find($id);
        $horario->idh = $request->idh;
        $horario->hora = $request->hora;
        $horario->idd = $request->idd;
        $horario->activo = 1;
        $horario->save();
        echo json_encode($horario);
    }

    // Elimina registros
    public function destroy($id)
    {
        $horario = DB::SELECT("UPDATE horario SET activo = 0 WHERE idh = '$id'");
        echo json_encode($horario);
    }
}
