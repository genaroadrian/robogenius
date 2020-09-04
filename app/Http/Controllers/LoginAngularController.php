<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\LoginAngular;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class LoginAngularController extends Controller
{
    public function index()
    {
        // $personal = Personal::all();
        // echo json_encode($producto);
        $login = DB::SELECT("SELECT * FROM users WHERE activo=1");
        return $login;
    }
    public function store(Request $request)
    {
        $data = $request->all();

        $reglas = array(
            'email' => 'required|unique:users',
        );
        $mensajes = array(
            'email.required' =>  'Ingresar nombre es obligatorio',
            'email.unique' =>  'Email ya registrado',
        );
        // Comparamos lo que recupera con las reglas y si hay un error lo muestra en json
        $validacion = Validator::make($data, $reglas, $mensajes);
        if ($validacion->fails()) {
            $errores = $validacion->errors();
            return new JsonResponse($errores, 422);
        }

        $login = new LoginAngular();
        $login->email = $data["email"];
        $login->nombre = $data["nombre"];
        $login->password = Crypt::encrypt($data["password"]);
        $login->apellidos = $data["apellidos"];
        $login->activo = 1;
        $login->save();
        echo json_encode($login);
    }
    public function validation(Request $request)
    {

        $email = $request->email;
        $clave = $request->password;

        $em = DB::SELECT("SELECT email FROM users where email='$email'");
        $al = DB::SELECT("SELECT usuarioalu FROM alumnos where usuarioalu='$email'");
        $pe = DB::SELECT("SELECT usuario FROM personal where usuario='$email'");

        if ($em <> null) {
            // return array($em,"Aadmin"); 
            $ps = DB::SELECT("SELECT password FROM users where email='$email'");
            $foto = DB::SELECT("SELECT fotoadmin FROM users where email='$email'");
            $exist = DB::select("SELECT count(id) as num from users where email = '$email'");
            foreach ($exist as $e) {
                if ($e->num == 1) {
                    foreach ($ps as $p) {
                        $nombre = "$p->password";
                        $x = Crypt::decrypt($nombre);
                        //   return $x;
                    }
                    foreach ($em as $m) {
                        $nombre = "$m->email";
                    }
                    foreach ($foto as $f) {
                        $fotito = "$f->fotoadmin";
                    }


                    if (($x == $clave) && ($nombre == $email)) {
                        $x = 1;
                        // return "Login ingresado";
                        $y = 1;
                        return array($x, $fotito, $y);
                    } else {
                        $x = 0;
                        return $x;
                    }
                } else {

                    $x = 0;
                    return $x;
                }
            }
        } else if ($al <> null) {
            // return array($al,"Alumnos"); 
            $email = $request->email;
            $clave = $request->password;

            $ps = DB::SELECT("SELECT pswalu FROM alumnos where usuarioalu='$email'");
            $foto = DB::SELECT("SELECT perfilalu FROM alumnos where usuarioalu='$email'");
            $exist = DB::select("SELECT count(idalu) as num from alumnos where usuarioalu = '$email'");
            // return array($exist);
            foreach ($exist as $e) {
                if ($e->num == 1) {
                    foreach ($ps as $p) {
                        $nombre = "$p->pswalu";
                        $x = Crypt::decrypt($nombre);
                        //   return $x;
                    }
                    foreach ($al as $m) {
                        $nombre = "$m->usuarioalu";
                        // return $nombre;
                    }
                    foreach ($foto as $f) {
                        $fotito = "$f->perfilalu";
                    }


                    if (($x == $clave) && ($nombre == $email)) {
                        // return array($x,$clave,$nombre,$email);
                        $x = 1;
                        // return "Login ingresado";
                        $y = 3;
                        return array($x, $fotito, $y);
                    } else {
                        $x = 0;
                        return $x;
                    }
                } else {

                    $x = 0;
                    return $x;
                }
            }
        } else if ($pe <> null) {
            // return array($pe,"Personal"); 
            $ps = DB::SELECT("SELECT contra FROM personal where usuario='$email'");
            $foto = DB::SELECT("SELECT fotopersonal FROM personal where usuario='$email'");
            $exist = DB::select("SELECT count(idper) as num from personal where usuario = '$email'");

            foreach ($exist as $e) {
                if ($e->num == 1) {
                    foreach ($ps as $p) {
                        $nombre = "$p->contra";
                        $x = Crypt::decrypt($nombre);
                        //   return $x;
                    }
                    foreach ($pe as $m) {
                        $nombre = "$m->usuario";
                        // return $nombre;
                    }
                    foreach ($foto as $f) {
                        $fotito = "$f->fotopersonal";
                    }


                    if (($x == $clave) && ($nombre == $email)) {
                        $x = 1;
                        // return "Login ingresado";
                        $y = 2;
                        return array($x, $fotito, $y);
                    } else {
                        $x = 0;
                        return $x;
                    }
                } else {

                    $x = 0;
                    return $x;
                }
            }
        } else {
            return "no hay registro asociados";
        }
    }
}
