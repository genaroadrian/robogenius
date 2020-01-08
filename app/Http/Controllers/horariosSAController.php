<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Http\Controllers\Controller;

class horariosSAController extends Controller
{
    public function gethorarios()
    {
        return DB::select("SELECT dias.iddia, dias.dia, horario.idh, horario.hora,horario.idsuc FROM horario, dias");
    }

    public function getMaestros()
    {
        return DB::select("SELECT personal.nombre, personal.apellidos, personal.idsuc
        FROM personal, tipopersonal
        WHERE personal.idtper = tipopersonal.idtper AND tipopersonal.maestro =1 AND personal.activo = 1");
    }
}
