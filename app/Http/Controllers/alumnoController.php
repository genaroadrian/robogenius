<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Alumno;
use Illuminate\Support\Facades\Crypt;




class alumnoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
       //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     * Reac
     */
    public function store(Request $request)
    {

            // $file = $request->file('perfilalu');
            // echo $request->perfilalu;
            // $name = time().$file->getClientOriginalName();
            // $path = public_path('/alumnosperfil');
            // $file->move($path, $name);

        $alumno = new Alumno();
        $date = now()->toDateTimeString('Y-m-d');
        $alumno->nomalu = $request->nomalu;
        $alumno->apealu = $request->apealu;
        $alumno->fnacalu = $request->fnacalu;
        $alumno->sexoalu = $request->sexoalu;
        $alumno->domalu = $request->domalu;
        $alumno->telalu = $request->telalu;
        $alumno->correoalu = $request->correoalu;
        $alumno->medicacion = $request->medicacion;
        $alumno->alergias = $request->alergias;
        // $alumno->perfilalu = $request->perfilalu;
        $alumno->cronica = $request->cronica;
        $alumno->otro = $request->otro;
        $alumno->idesc = $request->idesc;
        $alumno->usuarioalu = $request->usuarioalu;
        $alumno->pswalu = Crypt::encrypt($request->pswalu);
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
        $alumno->finscripcion = $date;
        $alumno->idsuc = $request->idsuc;

        $alumno->save();
        echo json_encode($alumno);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $alumno = DB::SELECT("UPDATE alumnos SET activo = 0 WHERE idalu = '$id'");
        echo json_encode($alumno);
    }
}
