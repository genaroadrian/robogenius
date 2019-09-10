<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\nivel;
use Illuminate\Support\Facades\DB;


class nivelController extends Controller
{
    public function index()
    {
    	$nivel = DB::SELECT("SELECT * FROM niveles where activo=1");
        echo json_encode($nivel);
    	
    }

     // Guarda nuevos registros
    public function store(Request $request)
    
    {
        $nivel = new nivel();
        $nivel->idn = $request->idn;
        $nivel->nombre = $request->nombre;
        $nivel->save();
        echo json_encode($nivel);
    }

    // Actualiza registros
    public function update(Request $request, $id)
    {
        $nivel = nivel::find($id);
        $nivel->nombre = $request->nombre;
        $nivel->activo = $request->activo;

        $nivel->save();
        echo json_encode($nivel);
    }
    public function destroy($id)
    {
        $grados = DB::SELECT("UPDATE niveles SET activo = 0 WHERE idn = '$id'");
        echo json_encode($grados);
    }


 
}
