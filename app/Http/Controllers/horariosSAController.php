<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Http\Controllers\Controller;

class horariosSAController extends Controller
{
    public function gethorarios()
    {
        return DB::select("SELECT dias.iddia, dias.dia, horario.idh, horario.hora FROM horario, dias");
    }
}
