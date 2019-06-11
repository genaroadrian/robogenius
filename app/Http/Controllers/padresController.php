<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\Padres;
use Illuminate\Support\Facades\DB;
use function GuzzleHttp\json_encode;
use slidecom_robogenius\Detallepadres;

class padresController extends Controller
{
    public function index()
    {
        echo "Hola";
    }

    public function store(Request $request)
    {
        $id = $request->iddia;
        $sql = "SELECT horario.idh, horario.hora FROM dias INNER JOIN horario ON dias.iddia = horario.idd WHERE horario.idd = $id";
        $hora = DB::select("$sql");
        return $hora;
        
    }

    public function update(Request $request, $id)
    {
        $padres = Padres::find($id);
        $padres->nombrepad = $request->nombrepad;
        $padres->apellidospad = $request->apellidospad;
        $padres->domiciliopad = $request->domiciliopad;
        $padres->telefonopad = $request->telefonopad;
        $padres->correopad = $request->correopad;
        $padres->ocupacionpad = $request->ocupacionpad;
        $padres->nombremad = $request->nombremad;
        $padres->apellidosmad = $request->apellidosmad;
        $padres->domiciliomad = $request->domiciliomad;
        $padres->telefonomad = $request->telefonomad;
        $padres->correomad = $request->correomad;
        $padres->ocupacionmad = $request->ocupacionmad;
        $padres->usuario = $request->usuario;
        $padres->contra = $request->contra;
        $padres->activo = 1;
        $padres->save();
        echo json_encode($padres);
    }

    public function destroy($id)
    {
        $padres = DB::SELECT("UPDATE padres SET activo = 0 WHERE idpadres = '$id'");
        echo json_encode($padres);
    }

}
