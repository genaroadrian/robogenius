<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\Planeaciones;

class planeacionesController extends Controller
{
    public function store(Request $request)
    {
        $plan = new Planeaciones();
        $plan->idt = $request->idt;
        $plan->ids = $request->ids;
        $plan->idsesion = $request->idsesion;
        $plan->idg = $request->idg;
        $plan->fecha = $request->fecha;
        $plan->no_sesiones = $request->no_sesiones;
        $plan->no_alu = $request->no_alum;
        $plan->idn = $request->idn;
        $plan->folio = $request->folio;
        $plan->activo = 1;
        $plan->save();
        return $plan;
    }
}
