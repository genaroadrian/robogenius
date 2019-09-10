<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class grado extends Model
{
    public function getKeyName()
    {
    	return "idg";
    }
    public $timestamps = false;
    protected $table = "grados";
    protected $fillable = [ 
    	'idg',
        'nombre',
        'activo'
    	];
}
