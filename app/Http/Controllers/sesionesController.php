<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\Sesiones;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class sesionesController extends Controller
{
    public function index()
    {
        $sesiones = DB::select("SELECT * FROM sesiones WHERE activo = 1");
        return $sesiones;
    }

    public function store(Request $request)
    {
        $data=$request->all();

        $reglas = array(
        'nombre' => 'required',
        'apren_clave' => 'required',
        'objetivo' => 'required',
        'mat_necesario' => 'required',
        'introduccion' => 'required',
        'ice_break' => 'required',
        'contenido' => 'required',
        'descanso' => 'required',
        'cierre' => 'required',
        'desarrollo' => 'required',
        'contenido' => 'required',
        	            );
        $mensajes= array('nombre.required' =>  'Ingresar nombre es obligatorio',
                         'apren_clave.required' =>  'Todos los campos son requeridos',
                         'objetivo.required' =>  'Todos los campos son requeridos',
                         'mat_necesario.required' =>  'Todos los campos son requeridos',
                         'introduccion.required' =>  'Todos los campos son requeridos',
                         'ice_break.required' =>  'Todos los campos son requeridos',
                         'contenido.required' =>  'Todos los campos son requeridos',
                         'descanso.required' =>  'Todos los campos son requeridos',
                         'cierre.required' =>  'Todos los campos son requeridos',
                         'desarrollo.required' =>  'Todos los campos son requeridos',
                         'contenido.required' =>  'Todos los campos son requeridos',
        	             );
        // Comparamos lo que recupera con las reglas y si hay un error lo muestra en json
        $validacion = Validator::make($data, $reglas, $mensajes);
        if ($validacion->fails())
        {
			 $errores = $validacion->errors(); 
			 return new JsonResponse($errores, 422); 
        }

        $sesion = new Sesiones();
        $sesion->nombre = $data["nombre"];
        $sesion->apren_clave = $data["apren_clave"];
        $sesion->objetivo = $data["objetivo"];
        $sesion->mat_necesario = $data["mat_necesario"];
        $sesion->introduccion = $data["introduccion"];
        $sesion->ice_break = $data["ice_break"];
        $sesion->contenido = $data["contenido"];
        $sesion->descanso = $data["descanso"];
        $sesion->cierre = $data["cierre"];
        $sesion->desarrollo = $data["desarrollo"];
        $sesion->activo = 1;
        $sesion->save();
        return $sesion;   
    }

    public function update(Request $request, $id)
    {
        $data=$request->all();

        // $reglas = array(
        // 'nombre' => 'required',
        // 'apren_clave' => 'required',
        // 'objetivo' => 'required',
        // 'mat_necesario' => 'required',
        // 'introduccion' => 'required',
        // 'ice_break' => 'required',
        // 'contenido' => 'required',
        // 'descanso' => 'required',
        // 'cierre' => 'required',
        // 'desarrollo' => 'required',
        // 'contenido' => 'required',
        // 	            );
        // $mensajes= array('nombre.required' =>  'Ingresar nombre es obligatorio',
        //                  'apren_clave.required' =>  'Todos los campos son requeridos',
        //                  'objetivo.required' =>  'Todos los campos son requeridos',
        //                  'mat_necesario.required' =>  'Todos los campos son requeridos',
        //                  'introduccion.required' =>  'Todos los campos son requeridos',
        //                  'ice_break.required' =>  'Todos los campos son requeridos',
        //                  'contenido.required' =>  'Todos los campos son requeridos',
        //                  'descanso.required' =>  'Todos los campos son requeridos',
        //                  'cierre.required' =>  'Todos los campos son requeridos',
        //                  'desarrollo.required' =>  'Todos los campos son requeridos',
        //                  'contenido.required' =>  'Todos los campos son requeridos',
        // 	             );
        // // Comparamos lo que recupera con las reglas y si hay un error lo muestra en json
        // $validacion = Validator::make($data, $reglas, $mensajes);
        // if ($validacion->fails())
        // {
		// 	 $errores = $validacion->errors(); 
		// 	 return new JsonResponse($errores, 422); 
        // }
        
        $sesion = Sesiones::find($id);
        $sesion->nombre = $data["nombre"];
        $sesion->apren_clave = $data["apren_clave"];
        $sesion->objetivo = $data["objetivo"];
        $sesion->mat_necesario = $data["mat_necesario"];
        $sesion->introduccion = $data["introduccion"];
        $sesion->ice_break = $data["ice_break"];
        $sesion->contenido = $data["contenido"];
        $sesion->descanso = $data["descanso"];
        $sesion->cierre = $data["cierre"];
        $sesion->desarrollo = $data["desarrollo"];
        $sesion->save();
        return $sesion;
    }

    public function destroy($id)
    {
        $sesion  = DB::select("UPDATE sesiones set activo = 0 where idsesion = $id");
        DB::select("UPDATE planeaciones set activo = 0 where idsesion = $id");
        return $sesion;
    }
}
