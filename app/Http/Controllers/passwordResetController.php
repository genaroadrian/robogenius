<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\userAdmin;
use Illuminate\Support\Facades\Crypt;

class passwordResetController extends Controller
{
    public function store(Request $request)
    {
       $token = $request->token;
        $personal = DB::SELECT("SELECT COUNT(*) AS exist FROM password_resets WHERE token = '$token'");
        return $personal;
    }

    public function update(Request $request, $id)
    {
        $token = crypt::decrypt($id);
        $password = $request->passc;
        DB::select("UPDATE users set password = '$password' where id = $token");
        DB::select("DELETE FROM password_resets where token = '$id'");
        return $token;
    }
}
