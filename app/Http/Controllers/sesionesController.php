<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\Sesiones;

class sesionesController extends Controller
{
    public function index()
    {
        $sesiones = DB::select("SELECT * FROM sesiones WHERE activo = 1");
        return $sesiones;
    }

    public function store(Request $request)
    {
        $sesion = new Sesiones();
        $sesion->idsesion = $request->idsesion;
        $sesion->nombre = $request->nombre;
        $sesion->apren_clave = $request->apren_clave;
        $sesion->objetivo = $request->objetivo;
        $sesion->mat_necesario = $request->mat_necesario;
        $sesion->introduccion = $request->introduccion;
        $sesion->ice_break = $request->ice_break;
        $sesion->contenido = $request->contenido;
        $sesion->descanso = $request->descanso;
        $sesion->cierre = $request->cierre;
        $sesion->activo = 1;
        $sesion->save();
        return $sesion;   
    }

    public function update(Request $request, $id)
    {
        $sesion = Sesiones::find($id);
        $sesion->idsesion = $request->idsesion;
        $sesion->nombre = $request->nombre;
        $sesion->apren_clave = $request->apren_clave;
        $sesion->objetivo = $request->objetivo;
        $sesion->mat_necesario = $request->mat_necesario;
        $sesion->introduccion = $request->introduccion;
        $sesion->ice_break = $request->ice_break;
        $sesion->contenido = $request->contenido;
        $sesion->descanso = $request->descanso;
        $sesion->cierre = $request->cierre;
        $sesion->save();
        return $sesion();
    }

    public function destroy($id)
    {
        $sesion  = DB::select("UPDATE sesiones set activo = 0 where idsesion = $id");
        return $sesion;
    }
}
