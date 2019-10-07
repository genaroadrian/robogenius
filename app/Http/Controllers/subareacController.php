<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use slidecom_robogenius\Subareac;

class subareacController extends Controller
{
    public function index()
    {
        $subac = DB::select("SELECT * FROM subareac WHERE activo = 1");
        return $subac;
    }

    public function store(Request $request)
    {
        $subac = new Subareac();
        $subac->nombre = $request->nombre;
        $subac->activo = 1;
        $subac->save();
        return $subac;
    }

    public function update(Request $request,$id)
    {
        $subac = Subareac::find($id);
        $subac->nombre = $request->nombre;
        $subac->save();
        return $subac;
    }

    public function destroy($id)
    {
        $subac = DB::select("UPDATE subareac SET activo = 0 WHERE idsac = $id");
        return $subac;
    }

}
