<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Detallegrupos;
use slidecom_robogenius\Http\Controllers\Controller;

class horariosPersonalController extends Controller
{
    public function store(Request $request)
    {
       $horario = new Detallegrupos();
       $horario->idh = $request->idh;
       $horario->idd = $request->idd;
       $horario->idp = $request->idp;
       $horario->activo = 1;
       $horario->save();
       return $horario; 
    }
}
