<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\Tipomembresia;
use Illuminate\Support\Facades\DB;

class tipomembresiaController extends Controller
{
    public function index ()
    {
        $tmem = DB::SELECT("SELECT * FROM tipomembresia WHERE activo=1");
        return $tmem;
    }

    public function store (Request $request)
    {
        $tmem = new Tipomembresia();
        $tmem->nombre = $request->nombre;
        $tmem->costo = $request->costo;
        $tmem->clases = $request->clases;
        $tmem->idesc = $request->idesc;
        $tmem->idsuc = $request->idsuc;
        $tmem->activo = 1;
        $tmem->save();
        return $tmem;

    }

    public function update (Request $request, $id)
    {
        $tmem = Tipomembresia::find($id);
        $tmem->nombre = $request->nombre;
        $tmem->costo = $request->costo;
        $tmem->clases = $request->clases;
        // $tmem->idesc = $request->idesc;
        // $tmem->activo = 1;
        $tmem->save();
        return $tmem;
    }

    public function destroy ($id)
    {
        $tmem = DB::SELECT("UPDATE tipomembresia SET activo = 0 WHERE idtmem = $id");
        return $tmem;
    }
}
