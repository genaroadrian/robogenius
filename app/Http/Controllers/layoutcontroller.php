<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class layoutcontroller extends Controller
{
    public function index()
    {
    	return view ('layout.content',array('user' => Auth::user());
    }

    public function prueba()
    {
    	return view ('prueba.prueba',array('user' => Auth::user());
    }
}
