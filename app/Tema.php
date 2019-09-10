<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Tema extends Model
{
    public function getKeyName(){
        return "idt";
    }

    public $timestamps = false;
    protected $table = "tema";
    protected $fillable = [ 
    	'idt', 
    	'nombre', 
    	'idac', 
        'activo'
    ];
}
