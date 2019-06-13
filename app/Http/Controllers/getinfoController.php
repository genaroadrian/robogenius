<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class getinfoController extends Controller
{
    public function getdias(Request $request)
    {
        $dias = $request->date;
        $horario = DB::SELECT("SELECT DISTINCT horarios.idhor, horarios.hora FROM horarios  RIGHT JOIN detallegrupos ON horarios.idhor = detallegrupos.idh WHERE detallegrupos.idd = '$dias'");
            return response()->json($horario);
    }
}
