<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use slidecom_robogenius\escuelas;
use Illuminate\Support\Facades\DB;
use Session;

class EscuelaController extends Controller
{

    public function index()
    {
    	$escuela = DB::SELECT("SELECT * FROM escuelas WHERE activo=1");
        echo json_encode($escuela);
    	
    }

}
