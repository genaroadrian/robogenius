<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use slidecom_robogenius\sucursal;
use Illuminate\Support\Facades\DB;
use Session;

class sucursalController extends Controller
{
    public function index()
    {
    	$sucursal = DB::SELECT("SELECT * FROM sucursal WHERE activo=1");
        echo json_encode($sucursal);

    }

     // Guarda nuevos registros
    public function store(Request $request)
    {
        $sucursal = new sucursal();
        $sucursal->nombre = $request->nombre;
        $sucursal->direccion = $request->direccion;
        $sucursal->encargado = $request->encargado;
        $sucursal->usuario = $request->usuario;
        $sucursal->psw = $request->psw;
        $sucursal->idsuc = $request->idsuc;
        $sucursal->activo = 1;
        $sucursal->save();
        echo json_encode($sucursal);
    }

    // Actualiza registros
    public function update(Request $request, $id)
    {
        $sucursal = sucursal::find($id);
        $sucursal->nombre = $request->nombre;
        $sucursal->direccion = $request->direccion;
        $sucursal->encargado = $request->encargado;
        $sucursal->usuario = $request->usuario;
        $sucursal->psw = $request->psw;
        $sucursal->idsuc = $request->idsuc;
        $sucursal->activo = 1;
        $sucursal->save();
        echo json_encode($sucursal);
    }

    // Elimina registros
    public function destroy($id)
    {
        $sucursal = DB::SELECT("UPDATE sucursal SET activo = 0 WHERE idsuc = '$id'");
        echo json_encode($sucursal);
    }
}
