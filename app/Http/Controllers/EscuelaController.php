<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use slidecom_robogenius\escuelas;
use Illuminate\Support\Facades\DB;
use Session;

class EscuelaController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    	return view('escuela',array('user' => Auth::user()));
    	
    }

    public function buscaresc(Request $request)    {
         $crit=$request->criterio;
         
            //buscar los datos en la BD mediante el proceso
              $escuela=DB::SELECT("SELECT * FROM escuelas WHERE nombre='$crit';");
              if ($escuela!=null) {
                  Session::flash('message','Su busqueda se realizo con exito');
                  return view('escuela',compact('escuela'));
              }
              else
              {
                  Session::flash('message', "No se Encontraron Resultados de ".$crit);
                  $escuela=\slidecom_robogenius\escuelas::paginate(4);
                  return view('escuela',compact('escuela'));
              }
          
        
    }
    public function borraresc($idesc)
    {
       escuelas::find($idesc)->delete();
        return view ('escuela');
        
    }

    

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
