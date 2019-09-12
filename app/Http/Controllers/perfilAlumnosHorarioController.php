<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Detallegrupos;
use slidecom_robogenius\Grupos_alumnos;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Http\Controllers\Controller;

class perfilAlumnosHorarioController extends Controller
{
    public function update(Request $request, $id)
    {
        $dgrupo = Grupos_alumnos::find($id);
        $dgrupo->idg = $request->iddgru;
        $dgrupo->save();
        return $dgrupo;
    }

    public function destroy($id)
    {
        $dgrupo = DB::SELECT("UPDATE grupos_alumnos SET activo = 0 WHERE idgalu = '$id'");
        return $dgrupo;
    }
}
