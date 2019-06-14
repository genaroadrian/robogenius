<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Tipopagos extends Model
{
    public function getKeyName()
    {
        return "idtipopago";
    }

    public $timestamps = false;
    protected $table = "tipopagos";
    protected $fillable = 
    [
    	'idtipopago',
    	'nombre',
        'activo'
    ];
}
