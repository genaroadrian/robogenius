<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Alumno;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use slidecom_robogenius\Detallegrupos;
use slidecom_robogenius\Grupos_alumnos;

class alumnoController extends Controller
{
    
    public function index()
    {
        // $personal = Personal::all();
        // echo json_encode($producto);
        // $alumno = DB::SELECT("SELECT * FROM alumnos WHERE activo = 1");
        $alumno = DB::SELECT("SELECT alumnos.idalu,alumnos.nomalu,alumnos.apealu,alumnos.fnacalu,
        alumnos.sexoalu,alumnos.domalu,
        alumnos.telalu,alumnos.correoalu,alumnos.medicacion,
        alumnos.alergias,alumnos.perfilalu,alumnos.cronica,alumnos.otro,
        alumnos.evaluacion,alumnos.usuarioalu,alumnos.pswalu,alumnos.nompad,
        alumnos.apepad,alumnos.dompad,alumnos.telpad,
        alumnos.correopad,alumnos.ocupad,alumnos.nommad,alumnos.apemad,
        alumnos.dommad,alumnos.telmad,alumnos.correomad,
        alumnos.ocupmad,alumnos.usuariopad,alumnos.pswpad,alumnos.activo,alumnos.finscripcion,
        alumnos.idsuc,alumnos.idesc, escuelas.nombre FROM alumnos LEFT JOIN escuelas ON
        alumnos.idesc = escuelas.idesc WHERE  alumnos.activo = 1");

        echo json_encode($alumno);
    }

    public function store(Request $request)
    {

        $data = $request->all();
        // |unique:alumnos
        $reglas = array(
            'nomalu' => 'required',
            'apealu' => 'required',
            'fnacalu' => 'required',
            'sexoalu' => 'required',
            'domalu' => 'required',
            'telalu' => 'required',
            'correoalu' => 'required',
            'usuarioalu' => 'required',
            'pswalu' => 'required',
            'nompad' => 'required',
            'apepad' => 'required',
            'dompad' => 'required',
            'telpad' => 'required',
            'correopad' => 'required',
            'ocupad' => 'required',
            'nommad' => 'required',
            'apemad' => 'required',
            'dommad' => 'required',
            'telmad' => 'required',
            'correomad' => 'required',
            'ocupmad' => 'required',

        );
        $mensajes = array(
            'apealu.required' => 'Todos los campos son obligatorios',
            'nomalu.required' => 'Todos los campos son obligatorios',
            'fnacalu.required' => 'Todos los campos son obligatorios',
            'sexoalu.required' => 'Todos los campos son obligatorios',
            'domalu.required' => 'Todos los campos son obligatorios',
            'telalu.required' => 'Todos los campos son obligatorios',
            'correoalu.required' => 'Todos los campos son obligatorios',
            'usuarioalu.required' => 'Todos los campos son obligatorios',
            'pswalu.required' => 'Todos los campos son obligatorios',
            'nompad.required' => 'Todos los campos son obligatorios',
            'apepad.required' => 'Todos los campos son obligatorios',
            'dompad.required' => 'Todos los campos son obligatorios',
            'telpad.required' => 'Todos los campos son obligatorios',
            'correopad.required' => 'Todos los campos son obligatorios',
            'ocupad.required' => 'Todos los campos son obligatorios',
            'nommad.required' => 'Todos los campos son obligatorios',
            'apemad.required' => 'Todos los campos son obligatorios',
            'dommad.required' => 'Todos los campos son obligatorios',
            'telmad.required' => 'Todos los campos son obligatorios',
            'correomad.required' => 'Todos los campos son obligatorios',
            'ocupmad.required' => 'Todos los campos son obligatorios',

        );
        // Comparamos lo que recupera con las reglas y si hay un error lo muestra en json
        $validacion = Validator::make($data, $reglas, $mensajes);
        if ($validacion->fails()) {
            $errores = $validacion->errors();
            return new JsonResponse($errores, 422);
        }


        $alumno = new Alumno();
        $date = now()->toDateTimeString('Y-m-d');
        $alumno->nomalu  = $data["nomalu"];
        $alumno->apealu = $data["apealu"];
        $alumno->fnacalu = $data["fnacalu"];
        $alumno->sexoalu = $data["sexoalu"];
        $alumno->domalu = $data["domalu"];
        $alumno->telalu = $data["telalu"];
        $alumno->correoalu = $data["correoalu"];
        $alumno->medicacion = $data["medicacion"];
        $alumno->alergias = $data["alergias"];
        // $alumno->perfilalu = $dataperfilalu;
        $alumno->cronica = $data["cronica"];
        $alumno->otro = $data["otro"];
        $alumno->idesc = $data["idesc"];
        $alumno->usuarioalu = $data["usuarioalu"];
        $alumno->pswalu = Crypt::encrypt($data["pswalu"]);
        $alumno->nompad = $data["nompad"];
        $alumno->apepad = $data["apepad"];
        $alumno->dompad = $data["dompad"];
        $alumno->telpad = $data["telpad"];
        $alumno->correopad = $data["correopad"];
        $alumno->ocupad = $data["ocupad"];
        $alumno->nommad = $data["nommad"];
        $alumno->apemad = $data["apemad"];
        $alumno->dommad = $data["dommad"];
        $alumno->telmad = $data["telmad"];
        if ($data["perfilalu"] == null) {
            $alumno->perfilalu = "default.jpg";
        } else {
            $alumno->perfilalu = $data["perfilalu"];
        }
        $alumno->correomad = $data["correomad"];
        $alumno->ocupmad = $data["ocupmad"];
        $alumno->activo = 1;
        $alumno->finscripcion = $date;
        $alumno->escuela = $data["escuela"];
        $alumno->idsuc = $data["idsuc"];
        $alumno->save();
        if ($data['idesc'] == null) {


            echo json_encode($alumno);
        } else {
            $escuela = DB::select("SELECT escuelas.nombre, escuelas.direccion, tipomembresia.nombre as nm, tipomembresia.costo, tipomembresia.clases 
            FROM escuelas INNER JOIN tipomembresia ON
            escuelas.idesc = tipomembresia.idesc
            WHERE escuelas.idesc = ?", [$data['idesc']]);
            $grupoEscuela = DB::select("SELECT * FROM detallegrupos WHERE idesc = ?", [$data['idesc']]);
            foreach ($grupoEscuela as $grupoEscuela) {
                $ga = new Grupos_alumnos();
                $ga->idg = $grupoEscuela->iddgru;
                $ga->idalu = $alumno->idalu;
                $ga->activo = 1;
                $ga->save();
            }

            return json_encode($escuela[0]);
        }
    }
    
    
    public function update(Request $request, $id)
    {

        $alumno = Alumno::find($id);
        $alumno->nomalu = $request->nomalu;
        $alumno->apealu = $request->apealu;
        $alumno->fnacalu = $request->fnacalu;
        $alumno->sexoalu = $request->sexoalu;
        $alumno->domalu = $request->domalu;
        $alumno->telalu = $request->telalu;
        $alumno->correoalu = $request->correoalu;
        $alumno->medicacion = $request->medicacion;
        $alumno->alergias = $request->alergias;
        $alumno->perfilalu = $request->perfilalu;
        $alumno->cronica = $request->cronica;
        $alumno->otro = $request->otro;
        $alumno->escuela = $request->escuela;
        $alumno->usuarioalu = $request->usuarioalu;
        $alumno->pswalu = $request->pswalu;
        $alumno->nompad = $request->nompad;
        $alumno->apepad = $request->apepad;
        $alumno->dompad = $request->dompad;
        $alumno->telpad = $request->telpad;
        $alumno->correopad = $request->correopad;
        $alumno->ocupad = $request->ocupad;
        $alumno->nommad = $request->nommad;
        $alumno->apemad = $request->apemad;
        $alumno->dommad = $request->dommad;
        $alumno->telmad = $request->telmad;
        $alumno->correomad = $request->correomad;
        $alumno->ocupmad = $request->ocupmad;
        $alumno->activo = 1;
        $alumno->finscripcion = $request->finscripcion;
        $alumno->idsuc = $request->idsuc;
        $alumno->save();
        echo json_encode($alumno);
    }

    
    public function destroy($id)
    {
        $alumno = DB::SELECT("UPDATE alumnos SET activo = 0 WHERE idalu = '$id'");
        echo json_encode($alumno);
    }

    public function inactive()
    {
        // $alumnos = Alumno::select('idalu','nomalu', 'apealu', 'TIMESTAMPDIFF(YEAR, fnacalu, CURDATE()) as fnacalu', 'sexoalu')->where('activo', 0)->get();
        $alumnos = DB::select("SELECT idalu, nomalu, apealu, TIMESTAMPDIFF(YEAR, fnacalu, CURDATE()) as fnacalu, sexoalu, idsuc
        from alumnos where activo = ?", [0]);
        return $alumnos;
    }

    public function restore($id)
    {
        // return $id;
        $alumno = Alumno::find($id);
        $alumno->activo = 1;
        $alumno->save();
        // return "Alumno restaurado exitosamente";
        
    }
}
