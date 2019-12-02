<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Http\Controllers\Controller;

class moduloEscuelasController extends Controller
{
    public function update(Request $request, $id)
    {
        $alu = DB::select("SELECT * from alumnos where idesc = $id");
        return $alu;
    }

}
