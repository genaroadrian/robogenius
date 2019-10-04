<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class moduloController extends Controller
{
    public function index(){
        $consultas = DB::select("SELECT area_del_conocimiento.idac, area_del_conocimiento.nombre AS nomarea,tema.idt, tema.nombre AS nomtema,  tema.idac AS idactema, subtema.ids, subtema.nombre AS nomsubt, subtema.idt AS idtsubtema
       FROM area_del_conocimiento, tema, subtema
       WHERE area_del_conocimiento.idac = tema.idac AND tema.idt = subtema.idt");
       return $consultas;
    }
}
