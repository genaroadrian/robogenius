<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;

class perperfilgrupController extends Controller
{
    public function index(Request $request)
    {
        
        $dbase = strtotime('2019-09-25');
        $dbase = date("N", $dbase);
        $dia = date("N");
        $respues[0] = $dia;
        
        if($dia == $dbase)
        {
            $respues[1] = 1;
            return $respues;
        }else{
            $respues[1] = 2;
            return $respues;
        }
    }

    public function store(Request $request)
    {
        
        $id = $request->idper;
        // $sql = \DB::select("SELECT detallegrupos.iddgru, dias.dia, horario.hora, escuelas.idesc,escuelas.nombre
        // FROM detallegrupos, dias, horario, escuelas
        // WHERE dias.iddia = detallegrupos.idd 
        // AND horario.idh = detallegrupos.idh AND detallegrupos.idesc = escuelas.idesc AND detallegrupos.idp = '$id'");
        
        $sql = \DB::select("SELECT detallegrupos.iddgru, dias.dia, horario.hora, escuelas.nombre, sucursal.nombre AS nomsuc
        FROM  dias, horario, 
        detallegrupos LEFT JOIN escuelas ON
        detallegrupos.idesc = escuelas.idesc
        LEFT JOIN sucursal ON
        detallegrupos.idsuc = sucursal.idsuc
        WHERE dias.iddia = detallegrupos.idd 
        AND horario.idh = detallegrupos.idh AND detallegrupos.idp = '$id'");


        return $sql;
    }

    public function update (Request $request, $id)
    {
        $lalumnos = \DB::select("SELECT alumnos.idalu, alumnos.nomalu, alumnos.apealu 
        FROM alumnos, grupos_alumnos
        WHERE grupos_alumnos.idg = $id AND grupos_alumnos.idalu = alumnos.idalu 
        AND alumnos.activo = 1 AND grupos_alumnos.activo = 1");

        return $lalumnos;
    }

    
}
