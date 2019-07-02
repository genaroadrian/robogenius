<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class perfilController extends Controller
{
    public function index(Request $request)
    {
       
    }

    public function store(Request $request)
    {
        $id = $request->idalu;
        $sql = "SELECT tipomembresia.nombre as nommem, tipopagos.nombre, 
        memalumno.adelanto, memalumno.restante, memalumno.total, 
        memalumno.fechainicio
        FROM memalumno, tipopagos, tipomembresia
        WHERE memalumno.idmem = tipomembresia.idtmem 
        AND memalumno.idtpago = tipopagos.idtipopago 
        AND memalumno.idalu =  '$id' order by memalumno.fechainicio desc";
        $sql = DB::select("$sql");
        return $sql;
    }

    public function update(Request $request, $id)
    {
        $sql = "SELECT dias.dia, horario.hora, personal.nombre, personal.apellidos
        FROM detallegrupos, grupos_alumnos, dias, horario, personal
        WHERE detallegrupos.idd = dias.iddia AND detallegrupos.idh = horario.idh 
        AND detallegrupos.idp = personal.idper 
        AND detallegrupos.iddgru = grupos_alumnos.idg AND grupos_alumnos.idalu = '$id'
         AND grupos_alumnos.activo = 1";
        $sql = DB::SELECT("$sql");
        return $sql;
    }
}
