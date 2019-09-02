<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use Mail;
use Illuminate\Support\Facades\DB;

class emailController extends Controller
{
    public function store(Request $request)
    {

      $email = $request->email;
        /* Titulo del mensaje */

        $persona = DB::SELECT("SELECT * FROM users WHERE email = '$email'");


        foreach($persona as $persona)
        {
          $nombre = "'$persona->nombre'"."'$persona->apellidos'";
            
        }

        $data['title'] = "Recuperación de contraseña";
 
        /* Mandar la vista */
        Mail::send('email', $data, function($message) use($email, $nombre) {
 
            /* Destinatario: correo y nombre */
            $message->to("'$email'", "'$nombre'")
 
            /* Asunto del correo */
                    ->subject('Recuperación de contraseña');
        });
 
        if (Mail::failures()) {
           return "bad";
         }else{
           return $persona;
         }
    }
}
