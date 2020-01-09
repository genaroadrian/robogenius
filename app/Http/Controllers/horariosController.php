<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use slidecom_robogenius\Horarios;
use Illuminate\Support\Facades\DB;
use Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

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
        $data=$request->all();

        $reglas = array('hora' => 'required',
        	            );
        $mensajes= array('hora.required' =>  'Ingresar hora es obligatorio',
                         
        	             );
        // Comparamos lo que recupera con las reglas y si hay un error lo muestra en json
        $validacion = Validator::make($data, $reglas, $mensajes);
        if ($validacion->fails())
        {
			 $errores = $validacion->errors(); 
			 return new JsonResponse($errores, 422); 
        }

        $horario = new Horarios();
        $horario->hora = $data["hora"];
        $horario->idsuc = $data["idsuc"];
        $horario->activo = 1;
        $horario->save();
        echo json_encode($horario);
    }

    // Actualiza registros
    public function update(Request $request, $id)
    {
        $data=$request->all();

        // $reglas = array('hora' => 'unique:horario',
        // 	            );
        // $mensajes= array('hora.unique' =>  'La hora debe ser unico',
        // 	             );
        // // Comparamos lo que recupera con las reglas y si hay un error lo muestra en json
        // $validacion = Validator::make($data, $reglas, $mensajes);
        // if ($validacion->fails())
        // {
		// 	 $errores = $validacion->errors(); 
		// 	 return new JsonResponse($errores, 422); 
        // }

        $horario = Horarios::find($id);
        $horario->hora = $data["hora"];
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
