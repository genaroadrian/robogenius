<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Memalumno extends Model
{
    public function getKeyName()
    {
        return "idmalu";
    }

    public $timestamps = false;
    protected $table = "memalumno";
    protected $fillable = 
    [
    	'idmalu',
    	'idalu',
    	'idmem',
    	'idtpago',
        'adelanto',
        'restante',
        'total',
        'fechainicio',
        'activo'
    ];
}
