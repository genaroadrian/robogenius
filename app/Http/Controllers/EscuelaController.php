<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Crypt;
use slidecom_robogenius\escuelas;
use Illuminate\Support\Facades\DB;
use Session;
use slidecom_robogenius\userAdmin;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

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
        $data=$request->all();

        $reglas = array('nombre' => 'required',
                        'representante' => 'required',
                        'direccion' => 'required',
                        'correouno' => 'required',
                        'telefono' => 'required',
        	            );
        $mensajes= array('nombre.required' =>  'Ingresar nombre es obligatorio',
                         'representante.required' =>  'El representante debe ser obligatorio',
                         'direccion.required' =>  'Ingresar direccion es obligatorio',
                         'correouno.required' =>  'Ingresar correo es obligatorio',
                         'telefono.required' =>  'Ingresar telefono es obligatorio',
        	             );
        // Comparamos lo que recupera con las reglas y si hay un error lo muestra en json
        $validacion = Validator::make($data, $reglas, $mensajes);
        if ($validacion->fails())
        {
			 $errores = $validacion->errors(); 
			 return new JsonResponse($errores, 422); 
        }

        $escuelas = new escuelas();
        $escuelas->nombre = $data["nombre"];
        $escuelas->representante = $data["representante"];
        $escuelas->direccion = $data["direccion"];
        $escuelas->correouno = $data["correouno"];
        $escuelas->telefono = $data["telefono"];
        $escuelas->idscu = $data["idsuc"];
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
        $data=$request->all();

        // $reglas = array('nombre' => 'unique:escuelas',
        //                 'representante' => 'required',
        //                 'direccion' => 'required',
        //                 'correouno' => 'required',
        //                 'telefono' => 'required',
        // 	            );
        // $mensajes= array(
        //                  'nombre.unique' =>  'El nombre debe ser unico',
        //                  'representante.required' =>  'El representante debe ser obligatorio',
        //                  'direccion.required' =>  'Ingresar direccion es obligatorio',
        //                  'correouno.required' =>  'Ingresar correo es obligatorio',
        //                  'telefono.required' =>  'Ingresar telefono es obligatorio',
        // 	             );
        // // Comparamos lo que recupera con las reglas y si hay un error lo muestra en json
        // $validacion = Validator::make($data, $reglas, $mensajes);
        // if ($validacion->fails())
        // {
		// 	 $errores = $validacion->errors(); 
		// 	 return new JsonResponse($errores, 422); 
        // }

        $escuelas = escuelas::find($id);
        $escuelas->nombre = $data["nombre"];
        $escuelas->representante = $data["representante"];
        $escuelas->direccion = $data["direccion"];
        $escuelas->correouno = $data["correouno"];
        $escuelas->telefono = $data["telefono"];
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
