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

    public function update(Request $request, $id)
    {
        $personal = Tipopersonal::find($id);
        $personal->tipo = $request->tipo;
        $personal->activo = 1;
        $personal->save();
        echo json_encode($personal);
    }

    public function show(Request $request)
    {
        $id = $request ->idtper;
        $tpersonal = Tipopersonal::find($id);
        $tpersonal->tipo = $request->tipo;
        $tpersonal->activo = 1;
        $tpersonal->save();
        echo json_encode($tpersonal);
    }
}
