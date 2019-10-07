<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class AreDelConocimiento extends Model
{
    public function getKeyName(){
        return "idac";
    }

    public $timestamps = false;
    protected $table = "area_del_conocimiento";
    protected $fillable = [ 
    	'idac', 
    	'nombre', 
    	'idsuc', 
        'activo'
    ];
}
