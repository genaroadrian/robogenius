<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;

class layoutcontroller extends Controller
{
    public function index()
    {
    	return view ('layout.content');
    }

    public function prueba()
    {
    	return view ('prueba.prueba');
    }
}
