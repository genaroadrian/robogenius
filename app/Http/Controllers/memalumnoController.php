<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\Memalumno;
use Illuminate\Support\Facades\DB;
use DateTime;

class memalumnoController extends Controller
{
    public function index()
    {
        $malu = DB::SELECT("SELECT * FROM memalumno WHERE activo = 1");
        return $malu;
    }

    public function store(Request $request)
    {
         $date = now()->toDateTimeString('Y-m-d');
        $malu = new Memalumno();
        $malu->idalu = $request->idalu;
        $malu->idmem = $request->idmem;
        $malu->idtpago = $request->idtpago;
        $malu->adelanto = $request->adelanto;
        $malu->restante = $request->restante;
        $malu->total = $request->total;
        $malu->fechainicio = $date;
        $malu->idsuc=$request->idsuc;
        $malu->activo = 1;
        $malu->save();
        return $malu;
   }

   public function update(Request $request, $id)
   {
        $malu = Memalumno::find($id);
       /*  $malu->idalu = $request->idalu;
        $malu->idmem = $request->idmem;
        $malu->idtpago = $request->idtpago; */
        $malu->adelanto = $request->adelanto;
        $malu->restante = $request->restante;
        $malu->total = $request->total;
     //    $malu->fechainico = $request->fechainicio;
        $malu->activo = 1;
        $malu->save();
        return $malu;
   }

   public function destroy($id)
   {
        $malu = DB::SELECT("UPDATE memalumno SET activo = 0 WHERE idmalu = $id");
        return $malu;
   }
}
