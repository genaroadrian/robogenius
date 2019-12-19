<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\codigodesc;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

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
        $data=$request->all();

        $reglas = array(
        'codigo' => 'required|unique:codigodesc',
        'porcentaje' => 'required',
        'lugar' => 'required',
        'fecha' => 'required',
        	            );
        $mensajes= array('codigo.required' =>  'Ingresar nombre es obligatorio',
                         'codigo.unique' =>  'Todos los campos son requeridos',
                         'porcentaje.required' =>  'Todos los campos son requeridos',
                         'lugar.required' =>  'Todos los campos son requeridos',
                         'fecha.required' =>  'Todos los campos son requeridos',
        	             );
        // Comparamos lo que recupera con las reglas y si hay un error lo muestra en json
        $validacion = Validator::make($data, $reglas, $mensajes);
        if ($validacion->fails())
        {
			 $errores = $validacion->errors(); 
			 return new JsonResponse($errores, 422); 
        }

        $codigos = new codigodesc();
        $codigos->codigo = $data["codigo"];
        $codigos->porcentaje = $data["porcentaje"];
        $codigos->lugar  = $data["lugar"];
        $codigos->fecha = $data["fecha"];
        $codigos->idsuc = $data["idsuc"];
        $codigos->activo = 1;
        $codigos->save();
        echo json_encode($codigos);
    }

    // Actualiza registros
    public function update(Request $request, $id)
    {
        $data=$request->all();

        $reglas = array(
        'codigo' => 'unique:codigodesc',
        	            );
        $mensajes= array(
                         'codigo.unique' =>  'Todos los campos son requeridos',
        	             );
        // Comparamos lo que recupera con las reglas y si hay un error lo muestra en json
        $validacion = Validator::make($data, $reglas, $mensajes);
        if ($validacion->fails())
        {
			 $errores = $validacion->errors(); 
            
        }  
        $codigos = codigodesc::find($id);
        $codigos->codigo = $data["codigo"];
        $codigos->porcentaje = $data["porcentaje"];
        $codigos->lugar  = $data["lugar "];
        $codigos->fecha = $data["fecha"];
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
