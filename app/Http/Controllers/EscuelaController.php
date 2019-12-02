<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Crypt;
use slidecom_robogenius\escuelas;
use Illuminate\Support\Facades\DB;
use Session;
use slidecom_robogenius\userAdmin;

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
        $escuelas->correouno = $request->correouno;
        $escuelas->telefono = $request->telefono;
        $escuelas->idesc = $request->idesc;
        $escuelas->idscu = $request->idsuc;
        $escuelas->activo = 1;
        $escuelas->save();

        $user = new userAdmin();
        $user->subname = $request->nombre;
        $user->nombre = $request->representante;
        $user->telefono = $request->telefono;
        $user->email = $request->correouno;
        $user->password = Crypt::encrypt($request->pws);
        $user->activo = 1;
        $user->save();

        return $escuelas;
    }

    // Actualiza registros
    public function update(Request $request, $id)
    {
        $escuelas = escuelas::find($id);
        $escuelas->nombre = $request->nombre;
        $escuelas->representante = $request->representante;
        $escuelas->direccion = $request->direccion;
        $escuelas->correouno = $request->correouno;
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
