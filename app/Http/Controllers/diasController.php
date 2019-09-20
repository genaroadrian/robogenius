<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;

class diasController extends Controller
{
    public function index()
    {
        $dias = \DB::select("SELECT  * from dias");
        return $dias;
    }
}
