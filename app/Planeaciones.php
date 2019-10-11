<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Planeaciones extends Model
{
    public function getKeyName()
    {
    	return "idp";
    }

    public $timestamps = false;
    protected $table = "planeaciones";
    protected $fillable = [ 
    	'idp',
    	'idt',
        'ids',
        'idsesion',
        'idg',
        'fecha',
        'no_sesiones',
        'no_alum',
        'idn',
        'folio',
        'activo'
    ];
}
