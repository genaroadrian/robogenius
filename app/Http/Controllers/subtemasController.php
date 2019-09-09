<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\Subtema;
use Illuminate\Support\Facades\DB;

class subtemasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $personal = DB::SELECT("SELECT * FROM subtema WHERE activo=1");
        return $personal;
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
        $subtema = new Subtema();
        $subtema->nombre = $request->nombre;
        $subtema->idt = $request->idt;
        $subtema->activo = 1;
        $subtema->save();
        echo json_encode($subtema);
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
        $area = Subtema::find($id);
        $area->nombre = $request->nombre;
        $area->idt = $request->idt;
        $area->activo = 1;
        $area->save();
        echo json_encode($area);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $area = DB::SELECT("UPDATE subtema SET activo = 0 WHERE ids = '$id'");
        echo json_encode($area);
    }
}
