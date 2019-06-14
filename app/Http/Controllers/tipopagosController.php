<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\Tipomembresia;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Tipopagos;

class tipopagosController extends Controller
{
    public function index()
    {
        $tpago = DB::SELECT("SELECT * FROM tipopagos WHERE activo = 1");
        return $tpago;
    }

    public function store(Request $request)
    {
        $tpago = new Tipopagos();
        $tpago->nombre = $request->nombre;
        $tpago->activo = 1;
        $tpago->save();
        return $tpago;
    }

    public function update(Request $request, $id)
    {
        $tpago = Tipopagos::find($id);
        $tpago->nombre = $request->nombre;
        $tpago->activo = 1;
        $tpago->save();
        return $tpago;
    }

    public function destroy($id)
    {
        $tmem = DB::SELECT("UPDATE tipopagos SET activo = 0 WHERE idtipopago = $id");
        return $tmem;
    }
}
