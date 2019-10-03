<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class herramientas extends Model
{
    public function getKeyName(){
        return "idherra";
    }
    public $timestamps = false;
    protected $table = "herramientas";
    protected $fillable = [ 
    	'idherra',
    	'nombre',
    	'activo'];
}
