<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\nivel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;



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
        $data=$request->all();

        $reglas = array('nombre' => 'required|unique:niveles',
        	            'idsuc' => 'required',
        	            'activo' => 'required',
        	            );
        $mensajes= array('nombre.required' =>  'Ingresar nivel es obligatorio',
                         'nombre.unique' =>  'El nivel debe ser unico',
                         'idsuc.required' =>  'Ingresar Sucursal es obligatorio',
                         'activo.required' =>  'Ingresar Sucursal es obligatorio',
        	             );
        // Comparamos lo que recupera con las reglas y si hay un error lo muestra en json
        $validacion = Validator::make($data, $reglas, $mensajes);
        if ($validacion->fails())
        {
			 $errores = $validacion->errors(); 
			 return new JsonResponse($errores, 422); 
        }

        $nivel= new nivel;
		$nivel->nombre  =  $data["nombre"];
		$nivel->activo  =  $data["activo"];
        $nivel->idsuc  =  $data["idsuc"];
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
