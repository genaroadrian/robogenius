<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use slidecom_robogenius\tipopagos;
use Illuminate\Support\Facades\DB;
use Session;

class tipopagoController extends Controller
{
  public function index()
  {
    $tipopago = DB::SELECT("SELECT * FROM tipopagos WHERE activo=1");
      echo json_encode($tipopago);

  }

   // Guarda nuevos registros
  public function store(Request $request)
  {
      $tipopago = new tipopago();
      $tipopago->nombre = $request->nombre;
      $tipopago->idtipopago = $request->idtipopago;
      $tipopago->activo = 1;
      $tipopago->save();
      echo json_encode($tipopago);
  }

  // Actualiza registros
  public function update(Request $request, $id)
  {
      $tipopago = tipopago::find($id);
      $tipopago->nombre = $request->nombre;
      $tipopago->idtipopago = $request->idtipopago;
      $tipopago->activo = 1;
      $tipopago->save();
      echo json_encode($tipopago);
  }

  // Elimina registros
  public function destroy($id)
  {
      $tipopago = DB::SELECT("UPDATE tipopagos SET activo = 0 WHERE idtipopago = '$id'");
      echo json_encode($tipopago);
  }
}
