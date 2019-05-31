<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Alumno;



class alumnoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
          // $personal = Personal::all();
        // echo json_encode($producto);
        $alumno = DB::SELECT("SELECT * FROM alumnos WHERE activo=1");
        echo json_encode($alumno);
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
        $alumno = new Alumno();
        $alumno->nombre = $request->nombre;
        $alumno->apellidos = $request->apellidos;
        $alumno->fechanac = $request->fechanac;
        $alumno->sexo = $request->sexo;
        $alumno->domicilio = $request->domicilio;
        $alumno->telefono = $request->telefono;
        $alumno->correo = $request->correo;
        $alumno->medicacion = $request->medicacion;
        $alumno->alergias = $request->alergias;
        $alumno->ruta = $request->ruta;
        $alumno->cronica = $request->cronica;
        $alumno->otro = $request->otro;
        $alumno->evaluacion = $request->evaluacion;
        $alumno->usuario = $request->usuario;
        $alumno->psw = $request->psw;
        $alumno->idsuc = $request->idsuc;
        $alumno->activo = 1;
        $alumno->save();
        echo json_encode($alumno);
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
        
        $alumno = Alumno::find($id);
        $alumno->nombre = $request->nombre;
        $alumno->apellidos = $request->apellidos;
        $alumno->fechanac = $request->fechanac;
        $alumno->sexo = $request->sexo;
        $alumno->domicilio = $request->domicilio;
        $alumno->telefono = $request->telefono;
        $alumno->correo = $request->correo;
        $alumno->medicacion = $request->medicacion;
        $alumno->alergias = $request->alergias;
        $alumno->ruta = $request->ruta;
        $alumno->cronica = $request->cronica;
        $alumno->otro = $request->otro;
        $alumno->evaluacion = $request->evaluacion;
        $alumno->usuario = $request->usuario;
        $alumno->psw = $request->psw;
        $alumno->idsuc = $request->idsuc;
        $alumno->activo = 1;
        $alumno->save();
        echo json_encode($alumno);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $alumno = DB::SELECT("UPDATE alumnos SET activo = 0 WHERE idalu = '$id'");
        echo json_encode($alumno);
    }
}
