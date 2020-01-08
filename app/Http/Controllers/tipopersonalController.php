<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\Tipopersonal;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class tipopersonalController extends Controller
{
   public function index()
   {
    $tpersonal = DB::SELECT("SELECT * FROM tipopersonal WHERE activo=1");
    echo json_encode($tpersonal);
   }

   public function store(Request $request)
   {
    $data=$request->all();

    $reglas = array('tipo' => 'required|unique:tipopersonal',
                    'idsuc' => 'required',
                  );
    $mensajes= array('tipo.required' =>  'Ingresar tipo es obligatorio',
                     'tipo.unique' =>  'El tipo debe ser unico',

                   );
    // Comparamos lo que recupera con las reglas y si hay un error lo muestra en json
    $validacion = Validator::make($data, $reglas, $mensajes);
    if ($validacion->fails())
    {
   $errores = $validacion->errors(); 
   return new JsonResponse($errores, 422); 
    }

    $tpersonal= new Tipopersonal;
    $tpersonal->tipo  =  $data["tipo"];
    $tpersonal->permisos  =  $data["permisos"];
    $tpersonal->maestro  =  $data["maestro"];
    $tpersonal->activo = 1;
    $tpersonal->idsuc  =  $data["idsuc"];
    $tpersonal->save();
    echo json_encode($tpersonal);
    }

    public function update(Request $request, $id)
    {
      $data=$request->all();

  //   $reglas = array('tipo' => 'required',
  //                 );
  //   $mensajes= array('tipo.required' =>  'El tipo debe ser obligatorio',
  //                  );
  //   // Comparamos lo que recupera con las reglas y si hay un error lo muestra en json
  //   $validacion = Validator::make($data, $reglas, $mensajes);
  //   if ($validacion->fails())
  //   {
  //  $errores = $validacion->errors(); 
  //  return new JsonResponse($errores, 422); 
  //   }

    $tpersonal= Tipopersonal::find($id);
    $tpersonal->tipo  =  $data["tipo"];
    $tpersonal->permisos  =  $data["permisos"];
    $tpersonal->maestro  =  $data["maestro"];
    $tpersonal->save();
    echo json_encode($tpersonal);
    }


  // Elimina registros
  public function destroy($id)
  {
      $tipopago = DB::SELECT("UPDATE tipopersonal SET activo = 0 WHERE idtper = '$id'");
      echo json_encode($tipopago);
  }
}
