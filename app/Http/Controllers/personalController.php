<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Personal;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;


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
        $data=$request->all();
        //   if para validar en tipo de usuario
            $reglas = array('nombre' => 'required',
            'apellidos' => 'required',
            'fechanac' => 'required',
            'sexo' => 'required',
            'curp' => 'required|unique:personal',
            'estadocivil' => 'required',
            'domicilio' => 'required',
            'horasalida' => 'required',
            'horaentrada' => 'required',
            'perfilprofesional' => 'required',
            'especialidad' => 'required',
            'salariomensual' => 'required',
            'tareasasignadas' => 'required',

            );
        

      
        $mensajes= array('nombre.required' =>  'Ingresar nombre es obligatorio',
                        'apellidos.required' =>  'Ingresar apellidos es obligatorio',
                        'usuario.required' =>  'Ingresar usuario es obligatorio',
                        'fechanac.required' =>  'Ingresar fecha de nacimiento es obligatorio',
                        'sexo.required' =>  'Ingresar sexo es obligatorio',
                        'curp.required' =>  'Ingresar curp es obligatorio',
                        'estadocivil.required' =>  'Ingresar estado civil es obligatorio',
                        'domicilio.required' =>  'Ingresar domicilio es obligatorio',
                         'horasalida.required' =>  'La  hora de salida es obligatorio',
                         'horaentrada.required' =>  'La hora de entrada es obligatorio',
                         'perfilprofesional.required' =>  'El perfil profesional es obligatorio',
                         'especialidad.required' =>  'La especialidad es obligatorio',
                         'salariomensual.required' =>  'El salrio es obligatorio',
                         'tareasasignadas.required' =>  'Las tareas asignadas es obligatorio',
                         'usuario.unique' =>  'El usuario debe ser unico',
                         'curp.unique' =>  'El curp debe ser unico',

        	             );
        // Comparamos lo que recupera con las reglas y si hay un error lo muestra en json
        $validacion = Validator::make($data, $reglas, $mensajes);
        if ($validacion->fails())
        {
			 $errores = $validacion->errors(); 
			 return new JsonResponse($errores, 422); 
        }


        $personal = new Personal();
        $personal->nombre = $data["nombre"];
        $personal->apellidos =$data["apellidos"];
        $personal->usuario = $data["usuario"];
        $personal->contra = Crypt::encrypt($data["contra"]);
        $personal->fechanac = $data["fechanac"];
        $personal->sexo = $data["sexo"];
        $personal->curp = $data["curp"];
        $personal->estadocivil = $data["estadocivil"];
        $personal->domicilio = $data["domicilio"];
        $personal->fechaingreso = $data["fechaingreso"];
        $personal->horasalida = $data["horasalida"];
        $personal->horaentrada = $data["horaentrada"];
        $personal->perfilprofesional = $data["perfilprofesional"];
        $personal->especialidad = $data["especialidad"];
        $personal->fecharegistro = new \DateTime();
        if($data["fotopersonal"]==null){
            $personal->fotopersonal="default.jpg";
        }else{
            $personal->fotopersonal = $data["fotopersonal"];
        }
        $personal->salariomensual = $data["salariomensual"];
        $personal->tareasasignadas = $data["tareasasignadas"];
        $personal->idsuc = $data["idsuc"];
        $personal->idtper = $data["idtper"];
        $personal->activo = 1;

        $personal->save();
        echo json_encode($personal);
    }

    // Actualiza registros
    public function update(Request $request, $id)
    {
        $data=$request->all();

        // $reglas = array('apellidos' => 'required',
        // 	            'usuario' => 'required|unique:personal',
        // 	            'curp' => 'required|unique:personal',
        // 	            );
        // $mensajes= array('apellidos.unique' =>  'El apellido debe ser unico',
        //                  'usuario.unique' =>  'El usuario debe ser unico',
        //                  'curp.unique' =>  'El curp debe ser unico',
        //                  );
          
        // // Comparamos lo que recupera con las reglas y si hay un error lo muestra en json
        // $validacion = Validator::make($data, $reglas, $mensajes);
        // if ($validacion->fails())
        // {
		// 	 $errores = $validacion->errors(); 
		// 	 return new JsonResponse($errores, 422); 
        // }

        $personal = Personal::find($id);
        $personal->nombre = $data["nombre"];
        $personal->apellidos =$data["apellidos"];
        $personal->usuario = $data["usuario"];
        $personal->contra = Crypt::encrypt($data["contra"]);
        $personal->fechanac = $data["fechanac"];
        $personal->sexo = $data["sexo"];
        $personal->curp = $data["curp"];
        $personal->estadocivil = $data["estadocivil"];
        $personal->domicilio = $data["domicilio"];
        $personal->fechaingreso = $data["fechaingreso"];
        $personal->horasalida = $data["horasalida"];
        $personal->horaentrada = $data["horaentrada"];
        $personal->perfilprofesional = $data["perfilprofesional"];
        $personal->especialidad = $data["especialidad"];
        $personal->fecharegistro = new \DateTime();
        $personal->salariomensual = $data["salariomensual"];
        $personal->tareasasignadas = $data["tareasasignadas"];
        $personal->idsuc = $data["idsuc"];
        $personal->idtper = $data["idtper"];
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
