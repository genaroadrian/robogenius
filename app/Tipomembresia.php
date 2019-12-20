<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Tipomembresia extends Model
{
    public function getKeyName()
    {
    	return "idtmem";
    }
    public $timestamps = false;
    protected $table = "tipomembresia";
    protected $fillable = 
    [
    	'idtmem',
    	'nombre',
    	'costo',
    	'clases',
        'activo',
        'idesc',
        'idsuc'

    ];
}
