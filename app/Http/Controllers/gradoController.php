<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\grado;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

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
        $data=$request->all();

        $reglas = array('nombre' => 'required|unique:grados',
        	            );
        $mensajes= array('nombre.required' =>  'Ingresar nombre es obligatorio',
                         'nombre.unique' =>  'El nombre debe ser unico',
        	             );
        // Comparamos lo que recupera con las reglas y si hay un error lo muestra en json
        $validacion = Validator::make($data, $reglas, $mensajes);
        if ($validacion->fails())
        {
			 $errores = $validacion->errors(); 
			 return new JsonResponse($errores, 422); 
        }

        $grados = new grado();
        $grados->nombre = $data["nombre"];
        $grados->idsuc = $data["idsuc"];
        $grados->activo = 1;
        $grados->save();
        echo json_encode($grados);
    }

    // Actualiza registros
    public function update(Request $request, $id)
    {
        
        $data=$request->all();

        $reglas = array('nombre' => 'required|unique:grados',
        	            );
        $mensajes= array('nombre.required' =>  'Ingresar nombre es obligatorio',
                         'nombre.unique' =>  'El nombre debe ser unico',
        	             );
        // Comparamos lo que recupera con las reglas y si hay un error lo muestra en json
        $validacion = Validator::make($data, $reglas, $mensajes);
        if ($validacion->fails())
        {
			 $errores = $validacion->errors(); 
			 return new JsonResponse($errores, 422); 
        }

        $grados = grado::find($id);
        $grados->nombre = $request["nombre"];
        $grados->save();
        echo json_encode($grados);
    }
    public function destroy($id)
    {
        $grados = DB::SELECT("UPDATE grados SET activo = 0 WHERE idg = '$id'");
        echo json_encode($grados);
    }
}
