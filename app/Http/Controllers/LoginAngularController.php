<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\LoginAngular;

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
        $login->password = $request->password;
        $login->nombre = $request->nombre;
        $login->apellidos = $request->apellidos;
        $login->activo = 1;
        $login->save();
        echo json_encode($login);
    }
}
