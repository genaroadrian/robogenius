<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use slidecom_robogenius\escuelas;
use Illuminate\Support\Facades\DB;
use Session;

class EscuelaController extends Controller
{

    public function index()
    {
    	$escuelas = DB::SELECT("SELECT * FROM escuelas WHERE activo=1");
        echo json_encode($escuelas);
    	
    }

     // Guarda nuevos registros
    public function store(Request $request)
    {
        $escuelas = new escuelas();
        $escuelas->nombre = $request->nombre;
        $escuelas->representante = $request->representante;
        $escuelas->direccion = $request->direccion;
        $escuelas->correo = $request->correo;
        $escuelas->telefono = $request->telefono;
        $escuelas->idesc = $request->idesc;
        $escuelas->activo = 1;
        $escuelas->save();
        echo json_encode($escuelas);
    }

    // Actualiza registros
    public function update(Request $request, $id)
    {
        $escuelas = escuelas::find($id);
        $escuelas->nombre = $request->nombre;
        $escuelas->representante = $request->representante;
        $escuelas->direccion = $request->direccion;
        $escuelas->correo = $request->correo;
        $escuelas->telefono = $request->telefono;
        $escuelas->idesc = $request->idesc;
        $escuelas->activo = 1;
        $escuelas->save();
        echo json_encode($escuelas);
    }

    // Elimina registros
    public function destroy($id)
    {
        $escuelas = DB::SELECT("UPDATE escuelas SET activo = 0 WHERE idesc = '$id'");
        echo json_encode($escuelas);
    }

}
