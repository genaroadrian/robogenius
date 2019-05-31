<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\Detallepadres;
use Illuminate\Support\Facades\DB;

class detallepadresController extends Controller
{
    public function index ()
    {
        $dpadres = DB::SELECT("SELECT padres.nombrepad, padres.apellidospad, padres.nombremad, padres.apellidosmad, alumnos.nombre 
        FROM padres, detallepadres, alumnos 
        WHERE padres.idpadres = detallepadres.idpad AND alumnos.idalu = detallepadres.idalu");
        echo json_encode($dpadres);
    }
}
