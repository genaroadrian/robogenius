<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\Tema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class temasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tema = DB::SELECT("SELECT * FROM tema WHERE activo=1");
        return $tema;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
       //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data=$request->all();

        $reglas = array('nombre' => 'required|unique:tema',
                        'idac' => 'required',
        	            );
        $mensajes= array('nombre.required' =>  'Ingresar nombre es obligatorio',
                         'nombre.unique' =>  'El nombre debe ser unico',
                         'idac.required' =>  'Todos los campos son obligatorios',
        	             );
        // Comparamos lo que recupera con las reglas y si hay un error lo muestra en json
        $validacion = Validator::make($data, $reglas, $mensajes);
        if ($validacion->fails())
        {
			 $errores = $validacion->errors(); 
			 return new JsonResponse($errores, 422); 
        }


        $tema = new Tema();
		$tema->nombre  =  $data["nombre"];
        $tema->idac = $data["idac"];
        $tema->idsuc = $data["idsuc"];
        $tema->activo = 1;
        $tema->save();
        echo json_encode($tema);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data=$request->all();

        $reglas = array('nombre' => 'unique:tema',
                        
        	            );
        $mensajes= array(
                         'nombre.unique' =>  'El nivel debe ser unico',
        	             );
        // Comparamos lo que recupera con las reglas y si hay un error lo muestra en json
        $validacion = Validator::make($data, $reglas, $mensajes);
        if ($validacion->fails())
        {
			 $errores = $validacion->errors(); 
			 return new JsonResponse($errores, 422); 
        }
        
        $tema = Tema::find($id);
        $tema->nombre = $data["nombre"];
        $tema->idac = $data["idac"];
        $tema->activo = 1;
        $tema->save();
        echo json_encode($tema);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tema = DB::SELECT("UPDATE tema SET activo = 0 WHERE idt = '$id'");
        echo json_encode($tema);
    }
}
