<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Personal;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;


class personalController extends Controller
{
    // Muestra los registros con JSon
    public function index()
    {
        // $personal = Personal::all();
        // echo json_encode($producto);
        $personal = DB::SELECT("SELECT * FROM personal WHERE activo=1");
        return $personal;
    }

    // Guarda nuevos registros
    public function store(Request $request)
    {
        $personal = new Personal();
        $personal->nombre = $request->nombre;
        $personal->apellidos = $request->apellidos;
        $personal->usuario = $request->usuario;
        // $personal->contra = $request->contra;
        $personal->contra = Crypt::encrypt($request->contra);
        $personal->fechanac = $request->fechanac;
        $personal->sexo = $request->sexo;
        $personal->curp = $request->curp;
        $personal->estadocivil = $request->estadocivil;
        $personal->domicilio = $request->domicilio;
        $personal->fechaingreso = $request->fechaingreso;
        $personal->horasalida = $request->horasalida;
        $personal->horaentrada = $request->horaentrada;
        $personal->perfilprofesional = $request->perfilprofesional;
        $personal->especialidad = $request->especialidad;
        $personal->fecharegistro = new \DateTime();
        $personal->salariomensual = $request->salariomensual;
        $personal->tareasasignadas = $request->tareasasignadas;
        $personal->idsuc = $request->idsuc;
        $personal->idtper = $request->idtper;
        $personal->activo = 1;

        $personal->save();
        echo json_encode($personal);
    }

    // Actualiza registros
    public function update(Request $request, $id)
    {
        $personal = Personal::find($id);
        $personal->nombre = $request->nombre;
        $personal->apellidos = $request->apellidos;
        $personal->usuario = $request->usuario;
        $personal->contra = $request->contra;
        $personal->fechanac = $request->fechanac;
        $personal->sexo = $request->sexo;
        $personal->curp = $request->curp;
        $personal->estadocivil = $request->estadocivil;
        $personal->domicilio = $request->domicilio;
        $personal->fechaingreso = $request->fechaingreso;
        $personal->horasalida = $request->horasalida;
        $personal->horaentrada = $request->horaentrada;
        $personal->perfilprofesional = $request->perfilprofesional;
        $personal->especialidad = $request->especialidad;
        $personal->salariomensual = $request->salariomensual;
        $personal->tareasasignadas = $request->tareasasignadas;
        $personal->idtper = $request->idtper;
        $personal->activo = 1;
        $personal->save();
        echo json_encode($personal);
    }

    // Elimina registros
    public function destroy($id)
    {
        $personal = DB::SELECT("UPDATE personal SET activo = 0 WHERE idper = '$id'");
        echo json_encode($personal);
    }
}
