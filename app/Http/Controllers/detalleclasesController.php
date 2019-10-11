<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Detalleclases;
use slidecom_robogenius\Http\Controllers\Controller;

class detalleclasesController extends Controller
{
    // public function store(Request $request)
    // {
    //     $dc = new Detalleclases();
    //     $dc->idarchivo = $request->idarchivo;
    //     $dc->idac = $request->idac;
    //     $dc->idsac = $request->idsac;
    //     $dc->idherra = $request->idherra;
    //     $dc->folio = $request->folio;
    //     $dc->save();
    //     return $dc;
    // }

    public function store(Request $request)
    {
        foreach($request->all() as $all)
        {
            $dc = new Detalleclases();
            // $dc->idarchivo = $all['idarchivo'];
            $dc->idarchivo = 1;
            $dc->idac = $all['idac'];
            $dc->idsac = $all['idsac'];
            $dc->idherra = $all['idherra'];
            $dc->folio = $all['folio'];
            $dc->activo = 1;
            $dc->save(); 
        }
        return $request;
    }
}
