<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\Tipopersonal;
use Illuminate\Support\Facades\DB;

class tipopersonalController extends Controller
{
   public function index()
   {
    $tpersonal = DB::SELECT("SELECT * FROM tipopersonal WHERE activo=1");
    echo json_encode($tpersonal);
   }

   public function store(Request $request)
   {
    $tpersonal = new Tipopersonal();
    $tpersonal->tipo = $request->tipo;
    $tpersonal->activo = $request->activo;
    $tpersonal->save();
    echo json_encode($tpersonal);
    }
}
