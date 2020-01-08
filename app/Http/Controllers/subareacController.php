<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Subareac;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class subareacController extends Controller
{
    public function index()
    {
        $subac = DB::select("SELECT * FROM subareac WHERE activo = 1");
        return $subac;
    }

    public function store(Request $request)
    {
        $data=$request->all();

        $reglas = array('nombre' => 'required|unique:subareac',

        
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

        $subac = new Subareac();
		$subac->nombre  =  $data["nombre"];
        $subac->idsuc = $request->idsuc;
        $subac->activo = 1;
        $subac->save();
        return $subac;
    }

    public function update(Request $request,$id)
    {
        $data=$request->all();

        // $reglas = array('nombre' => 'unique:subareac',

        
        // 	            );
        // $mensajes= array('nombre.unique' =>  'El nombre debe ser unico',
        // 	             );
        // // Comparamos lo que recupera con las reglas y si hay un error lo muestra en json
        // $validacion = Validator::make($data, $reglas, $mensajes);
        // if ($validacion->fails())
        // {
		// 	 $errores = $validacion->errors(); 
		// 	 return new JsonResponse($errores, 422); 
        // }

        $subac = Subareac::find($id);
		$subac->nombre  =  $data["nombre"];
        $subac->save();
        return $subac;
    }

    public function destroy($id)
    {
        $subac = DB::select("UPDATE subareac SET activo = 0 WHERE idsac = $id");
        return $subac;
    }

}
