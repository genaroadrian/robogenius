<?php

namespace cursos\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use cursos\Perfilview;
use cursos\Exports\perfilExport;
use Maatwebsite\Excel\Facades\Excel;

class perfilviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
   
    public function perfilview()
    {
       $perfilview = DB::SELECT("SELECT perfil.id_perfil, empleados.id_emp, empleados.nombre_emp, empleados.app_emp, empleados.apm_emp, cursos.num_accion , cursos.nombre_accion, perfil.hrs_accion, perfil.modalidad, perfil.fecha_accion, perfil.calif_accion FROM empleados, cursos, perfil WHERE empleados.id_emp = perfil.id_empl AND cursos.num_accion = perfil.no_accion");

       return view ('perfilview', compact('perfilview'));
    }

    public function excel()
    {
        return Excel::download(new perfilExport, 'Perfil.xlsx');
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
        //
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

        $empleados = DB::SELECT("SELECT *  FROM empleados");
        $cursos = DB::SELECT("SELECT *  FROM cursos");
        $perfil = DB::SELECT("SELECT * from perfil where id_perfil=$id");
        // return view ('editarcursos', ['cursos'=>$cursos[0]]);
        // return $empleados;
        return view ('editperfil',['perfil'=>$perfil[0]] , compact('cursos','empleados'));
        // return $perfil;
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
        $id_perfil = $request->id_perfil;
        $id_empl = $request->id_empl;
        $no_accion = $request->no_accion;
        $hrs_accion = $request->hrs_accion;
        $modalidad = $request->modalidad;
        $fecha_accion = $request->fecha_accion;
        $calif_accion = $request->calif_accion;
        $perfilview = DB::SELECT("SELECT perfil.id_perfil, empleados.id_emp, empleados.nombre_emp, empleados.app_emp, empleados.apm_emp, cursos.num_accion , cursos.nombre_accion, perfil.hrs_accion, perfil.modalidad, perfil.fecha_accion, perfil.calif_accion FROM empleados, cursos, perfil WHERE empleados.id_emp = perfil.id_empl AND cursos.num_accion = perfil.no_accion");
        // return $perfil;
        return redirect ('/perfilview'); 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $cursos = DB::SELECT("DELETE from perfil where id_perfil = '$id'");
        return redirect ('/perfilview');
        // return $id;
    }
}
