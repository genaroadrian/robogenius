<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\Padres;
use Illuminate\Support\Facades\DB;
use function GuzzleHttp\json_encode;
use slidecom_robogenius\Detallepadres;

class padresController extends Controller
{
    public function index()
    {
        echo "Hola";
    }

    public function store(Request $request)
    {
        $id = $request->iddia;
        $sql = "SELECT DISTINCT horario.idh, horario.hora ,horario.idsuc
        FROM detallegrupos INNER JOIN horario 
        ON detallegrupos.idh = horario.idh 
        WHERE detallegrupos.idd = $id";
        $hora = DB::select("$sql");
        return $hora;
        
    }

    public function update(Request $request, $id)
    {
        $idh = $request->idh;
        $idd = $request->idd;
         $sql = "SELECT DISTINCT detallegrupos.idp ,personal.nombre, personal.idsuc,personal.apellidos, detallegrupos.iddgru
         FROM detallegrupos INNER JOIN personal 
         ON detallegrupos.idp = personal.idper
         INNER JOIN tipopersonal
         ON tipopersonal.idtper = personal.idtper
         WHERE detallegrupos.idd = $idd AND detallegrupos.idh = $idh AND tipopersonal.maestro =1";
        $personal = DB::SELECT("$sql");
        return $personal;
    }

    public function destroy($id)
    {
        $padres = DB::SELECT("UPDATE padres SET activo = 0 WHERE idpadres = '$id'");
        echo json_encode($padres);
    }

}
