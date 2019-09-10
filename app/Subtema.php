<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Subtema extends Model
{
    public function getKeyName(){
        return "ids";
    }

    public $timestamps = false;
    protected $table = "subtema";
    protected $fillable = [ 
    	'ids', 
    	'nombre', 
    	'idt', 
        'activo'
    ];
}
