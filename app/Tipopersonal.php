<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Tipopersonal extends Model
{
    public function getKeyName(){
        return "idtper";
    }

    public $timestamps = false;
    protected $table = "tipopersonal";
    protected $fillable = [ 
    	'idtper', 
        'tipo',
        'activo'
    ];
}
