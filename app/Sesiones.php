<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Sesiones extends Model
{
    public function getKeyName()
    {
        return "idsesion";
    }

    public $timestamps = false;
    protected $table = "sesiones";
    protected $fillable = [ 
    	'idsesion', 
        'nombre',
        'apren_clave' ,
        'objetivo',
        'mat_necesario' ,
        'introduccion' ,
        'ice_break' ,
        'contenido' ,
        'descanso' ,
        'desarrollo' ,
        'cierre' ,
        'activo'
    ];
}
