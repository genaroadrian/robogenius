<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\LoginAngular;
use Illuminate\Support\Facades\Crypt;


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
        $login = new LoginAngular();
        $login->email = $request->email;
        // $login->password = $request->password;
        $login->nombre = $request->nombre;
        $login->password = Crypt::encrypt($request->password);
        $login->apellidos = $request->apellidos;
        $login->activo = 1;
        $login->save();
        echo json_encode($login);
    }
    public function validation(Request $request)
    {
        $email = $request->email;
        $clave = $request->password;
        // return $contraseña;
        // validacion en el where
        $em = DB::SELECT("SELECT email FROM users where email='$email'");
        $ps = DB::SELECT("SELECT password FROM users where email='$email'");
      
        $exist=DB::select("SELECT count(id) as num from users where email = '$email'");
        foreach($exist as $e)
        {
         if($e->num == 1)
                {
                    foreach($ps as $p)
                    {
                    $nombre = "$p->password";
                    $x=Crypt::decrypt($nombre);
                    //   return $x;
                    }
                foreach($em as $m)
                {
                  $nombre = "$m->email";
                }

    
        if(($x==$clave) && ($nombre==$email)){
            $x=1;
            // return "Login ingresado";
            return $x;
        }else{
            $x=0;
            return $x;
        }


                }else{
            
            $x=0;
            return $x;
                    }
        }
        
               
        
        
           
}

}
