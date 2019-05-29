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
        $alumno->correo = $request->correo;
        $alumno->fechanac = $request->fechanac;
        $alumno->edad = $request->edad;
        $alumno->iddom = $request->iddom;
        $alumno->alergias = $request->alergias;
        $alumno->cronica = $request->cronica;
        $alumno->medicacion = $request->medicacion;
        $alumno->otro = $request->otro;
        $alumno->idpadre = $request->idpadre;
        $alumno->tel1cm = $request->tel1cm;
        $alumno->tel2cm = $request->tel2cm;
        $alumno->nomb1cm = $request->nomb1cm;
        $alumno->nomb2cm = $request->nomb2cm;
        $alumno->ruta = $request->ruta;
        $alumno->evaluacion = $request->evaluacion;
        $alumno->idgrupo = $request->idgrupo;
        $alumno->idcursos = $request->idcursos;
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
        $alumno->correo = $request->correo;
        $alumno->fechanac = $request->fechanac;
        $alumno->edad = $request->edad;
        $alumno->sexo = $request->sexo;
        $alumno->domicilio = $request->domicilio;
        $alumno->iddom = $request->iddom;
        $alumno->alergias = $request->alergias;
        $alumno->cronica = $request->cronica;
        $alumno->medicacion = $request->medicacion;
        $alumno->otro = $request->otro;
        $alumno->idpadre = $request->idpadre;
        $alumno->tel1cm = $request->tel1cm;
        $alumno->tel2cm = $request->tel2cm;
        $alumno->nomb1cm = $request->nomb1cm;
        $alumno->nomb2cm = $request->nomb2cm;
        $alumno->ruta = $request->ruta;
        $alumno->evaluacion = $request->evaluacion;
        $alumno->idgrupo = $request->idgrupo;
        $alumno->idcursos = $request->idcursos;
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
