<?php

namespace cursos\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use cursos\Perfil;

class perfilController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function perfil()
    {
        $perfil = DB::SELECT("SELECT * from perfil");
        return view ('perfil', compact('perfil'));
    }

    public function create()
    {
         $empleados = DB::SELECT("SELECT *  FROM empleados");
        $cursos = DB::SELECT("SELECT *  FROM cursos");
        return view ('altaperfil', compact('cursos','empleados'));
    }

    public function store(Request $request)
    {
        $perfil = new Perfil();
        $perfil->id_perfil = $request->id_perfil;
        $perfil->id_empl = $request->id_empl;
        $perfil->no_accion = $request->no_accion;
        $perfil->hrs_accion = $request->hrs_accion;
        $perfil->modalidad = $request->modalidad;
        $perfil->fecha_accion = $request->fecha_accion;
        $perfil->calif_accion = $request->calif_accion;
        $perfil->save();
        return redirect ('/perfilview');
    }

    public function edit($id)
    {
        $perfil = DB::SELECT("SELECT * from perfil where id_perfil=$id");
        //return $perfil;
        return view ('editarperfil', ['perfil'=>$perfil[0]]);
        
    }

        public function update(Request $request)
    {
        $id_perfil = $request->id_perfil;
        $id_empl = $request->id_empl;
        $no_accion = $request->no_accion;
        $hrs_accion = $request->hrs_accion;
        $modalidad = $request->modalidad;
        $fecha_accion = $request->fecha_accion;
        $calif_accion = $request->calif_accion;
        $perfil = DB::SELECT("UPDATE perfil set id_empl = '$id_empl', no_accion = '$no_accion', hrs_accion = '$hrs_accion', modalidad = '$modalidad', fecha_accion = '$fecha_accion', calif_accion = '$calif_accion' where id_perfil = '$id_perfil'");
        
        return redirect ('/perfilview'); 
    }
    public function destroy($id)
    {
        $perfil = DB::SELECT("DELETE from perfil where id_perfil = '$id'");
        return redirect ('/perfil');
    }

    }
        
