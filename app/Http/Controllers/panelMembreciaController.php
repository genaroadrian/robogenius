<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class panelMembreciaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pendiente = DB::SELECT("SELECT m.idmalu,m.adelanto,m.restante,m.total,m.fechainicio,m.fechatermino,m.meses,m.idsuc,m.fechainicio,
        a.nomalu,a.apealu,a.telmad,a.telpad,a.correoalu,a.nompad,a.nommad,a.apemad,a.apepad,
        tm.nombre as nombres,tm.costo,tm.clases,
        tpp.nombre
     FROM memalumno AS m,
     alumnos AS a,
     tipomembresia AS tm,
     tipopagos AS tpp
     WHERE m.idalu=a.idalu
     AND m.idmem=tm.idtmem
     AND m.idtpago=tpp.idtipopago");
        return $pendiente;
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
        //
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
