<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\Padres;
use Illuminate\Support\Facades\DB;
use function GuzzleHttp\json_encode;

class padresController extends Controller
{
    public function index()
    {
        $padres = DB::select("SELECT * FROM padres WHERE activo = 1");
        echo json_encode($padres);
    }
}
