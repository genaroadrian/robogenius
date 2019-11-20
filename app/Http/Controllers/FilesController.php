<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use slidecom_robogenius\Http\Controllers\Controller;
use slidecom_robogenius\Files;

class FilesController extends Controller
{
    public function index(Request $request)
    {
        // return $request->filename;
        $ruta = $request->ruta;
        $ruta=str_replace('"','',$ruta);
        $ruta = 'archivos/'.$ruta;
        $name = $request->filename;
        $name=str_replace('"','',$name);
        return response()->download(public_path($ruta), $name);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $path = public_path().'/';
        $dir_files = 'archivos';
        $directories = ['','manuales','programacion','presentacion','planeacion'];

        if (!file_exists($path.$dir_files)) {
            mkdir($path.$dir_files, 0777, true);
        }

        if (!file_exists($path.$dir_files.'/'.$directories[$request->idt])) {
            mkdir($path.$dir_files.'/'.$directories[$request->idt], 0777, true);
        }
 
        $id = array();
        for ($i=0; $i < count($request->file('file')); $i++) { 
            $file = $request->file('file')[$i];
            $destination = $path.$dir_files.'/'.$directories[$request->idt];
            $files = $file->getClientOriginalName();
            $filename = time().'_'.$files;
            $file->move($destination,$filename);

            $data_files = [
                'tipo'  => $request->idt
                ,'ruta' => $directories[$request->idt].'/'.$filename
                ,'ids' => intval($request->ids)
            ];

            $f  = Files::create($data_files);
            $id[] = $f->id;
        }

        $data= [
            'ok'    => '200'
            ,'id'   => $id
        ];
        return json_encode($data);
    }

    
    public function show($id)
    {
        
    }

   
    public function edit($id)
    {
        //
    }

    
    public function update(Request $request, $id)
    {
        $name = $request->filename;
        $ruta = 'archivos'.$request->ruta;
        $headers = [
            'Content-Type' => 'application/pdf',
         ];
        /* Sintaxis del return
            return response()->download(public_path($ruta, $nombre)
        */
        return response()->download(public_path('archivos/manuales/Alta.pdf_1573754852.pdf'), "prueba.blade.pdf");
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
