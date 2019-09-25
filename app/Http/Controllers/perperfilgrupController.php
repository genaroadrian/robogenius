<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;

class perperfilgrupController extends Controller
{
    public function store(Request $request)
    {
        $id = $request->idper;
        $sql = \DB::select("SELECT detallegrupos.iddgru, dias.dia, horario.hora, escuelas.nombre
        FROM detallegrupos, dias, horario, escuelas
        WHERE dias.iddia = detallegrupos.idd 
        AND horario.idh = detallegrupos.idh AND detallegrupos.idesc = escuelas.idesc AND detallegrupos.idp = '$id'");
        
        return $sql;
    }
}
