<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
use slidecom_robogenius\PasswordReset;
use slidecom_robogenius\userAdmin;

class emailController extends Controller
{

    public function index()
    {
      return view('email');
    }

    public function store(Request $request)
    {

      $email = $request->email;
        /* Titulo del mensaje */
      $exist=DB::select("SELECT count(id) as num from users where email = '$email'");
        foreach($exist as $e)
        {
         if($e->num != 1)
         {
           /* Si el correo no existe */
           return 3;
         }else{
          $persona = DB::SELECT("SELECT * FROM users WHERE email = '$email'");
          foreach($persona as $per)
          {
            $nombre = "$per->nombre $per->apellidos";
            $token = $per->id;
          }
           
           $data['title'] = "Recuperación de contraseña";
      $data['name'] = $nombre;
      $data['token'] = Crypt::encrypt($token);
 
        /* Mandar la vista */
        Mail::send('email', ['datos'=>$data], function($message) use($email, $nombre) {
 
            /* Destinatario: correo y nombre */
            $message->to("$email", "$nombre")
 
            /* Asunto del correo */
                    ->subject('Recuperación de contraseña');
        });
 
        if (Mail::failures()) {
          /* Si falla el envio del correo se cierra */
          return 0;
         }else{
           /* Si se manda el correo se guarda el token en la base de datos */
          $pReset = new PasswordReset();
          $pReset->email = $email;
          $pReset->token = $data['token'];
          $pReset->activo = 1;
          $pReset->save();
          return 1;
         }
         }
        }

     
    }
    
    public function update(Request $request, $id)
    {
      $pass = userAdmin::find(Crypt::decrypt($id));
      $pass->password = $request->password;
      $pass-save();
      return $pass;
    }
  }