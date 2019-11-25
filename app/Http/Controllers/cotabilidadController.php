<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\Contabilidad;
use Illuminate\Support\Facades\DB;

class cotabilidadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contabilidad = DB::SELECT("SELECT * FROM contabilidad");
        return $contabilidad;
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
        $contabilidad = new Contabilidad();
        $contabilidad->Concepto = $request->Concepto;
        $contabilidad->fecha = $request->fecha;
        $contabilidad->tipo = $request->tipo;
        $contabilidad->idcate = $request->idcate;
        $contabilidad->monto = $request->monto;
        $contabilidad->iduser = $request->iduser;
        $contabilidad->nombre = $request->nombre;
        $contabilidad->status = $request->status;
        $contabilidad->adelanto = $request->adelanto;
        $contabilidad->restante = $request->restante;
        $contabilidad->suma = $request->suma;
        // id sucursal
        $contabilidad->idscu = $request->idscu;
        $contabilidad->activo = 1;
        $contabilidad->save();
        echo json_encode($contabilidad);
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
        $contabilidad = Contabilidad::find($id);
        $contabilidad->Concepto = $request->Concepto;
        $contabilidad->fecha = $request->fecha;
        $contabilidad->tipo = $request->tipo;
        $contabilidad->idcate = $request->idcate;
        $contabilidad->monto = $request->monto;
        $contabilidad->iduser = $request->iduser;
        $contabilidad->nombre = $request->nombre;
        $contabilidad->activo = 1;
        $contabilidad->status = $request->status;
        $contabilidad->adelanto = $request->adelanto;
        $contabilidad->restante = $request->restante;
        $contabilidad->suma = $request->suma;
        $contabilidad->save();
        echo json_encode($contabilidad);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $contabilidad = DB::SELECT("UPDATE contabilidad SET activo = 0 WHERE  idCont= '$id'");
        echo json_encode($contabilidad);
    }
}
