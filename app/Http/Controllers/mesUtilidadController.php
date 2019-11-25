<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use DB;


class mesUtilidadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
//         $utilidad = DB::SELECT("
//         SELECT (( SELECT SUM(suma) AS suma 
//         FROM contabilidad
//            WHERE DATE_FORMAT(fecha, '%m') = (SELECT MONTH(CURDATE())) 
//            )-( SELECT SUM(monto) AS egreso
//         FROM contabilidad
//            WHERE DATE_FORMAT(fecha, '%m') = (SELECT MONTH(CURDATE()))
//            AND tipo=2)) AS utilidad FROM contabilidad
//  WHERE DATE_FORMAT(fecha, '%m') = (SELECT MONTH(CURDATE()))LIMIT 0,1
//         ");
            $utilidad=DB::SELECT(" SELECT monto,idscu
            FROM contabilidad
            WHERE DATE_FORMAT(fecha, '%m') = (SELECT MONTH(CURDATE()))
            AND tipo=2");
            
             $utilidads=DB::SELECT(" SELECT suma,idscu
             FROM contabilidad
             WHERE DATE_FORMAT(fecha, '%m') = (SELECT MONTH(CURDATE()))");
       
            
            return array($utilidads, $utilidad);
            
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
