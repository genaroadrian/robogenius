<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\AreDelConocimiento;
use Illuminate\Support\Facades\DB;

class areaDelConocimientoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $area = DB::SELECT("SELECT * FROM area_del_conocimiento WHERE activo=1");
        return $area;
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
        $area = new AreDelConocimiento();
        $area->nombre = $request->nombre;
        $area->activo = $request=1;
        $area->save();
        echo json_encode($area);
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
        $area = AreDelConocimiento::find($id);
        $area->nombre = $request->nombre;
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
        $area = DB::SELECT("UPDATE area_del_conocimiento SET activo = 0 WHERE idac = '$id'");
        echo json_encode($area);
    }
}
