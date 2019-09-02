<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use DB;
use slidecom_robogenius\userAdmin;

class userAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        //
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
        //  // $usuario="erick@gmail.com";
        //  recupera del servicio el email y lo valida con la base de datos despues regresa un array con todos los datos
         $usuario= $request->email;
         $user  = DB::SELECT("SELECT * FROM users WHERE email='$usuario'");
         return $user;
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
        $perfil = userAdmin::find($id);
        $perfil->subname = $request->subname;
        $perfil->email = $request->email;
        $perfil->password = $request->password;
        $perfil->nombre = $request->nombre;
        $perfil->apellidos = $request->apellidos;
        $perfil->telefono = $request->telefono;
        $perfil->activo = 1;
        $perfil->save();
        echo json_encode($perfil);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
