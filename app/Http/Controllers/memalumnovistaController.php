<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use DB;

class memalumnovistaController extends Controller
{
    public function index()
    {
        $malu = DB::SELECT("SELECT * FROM controlMembrecias WHERE activo = 1");
        return $malu;
    }

}
