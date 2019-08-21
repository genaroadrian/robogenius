<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Contabilidad extends Model
{
    public function getKeyName()
    {
    	return "idCont";
    }
    public $timestamps = false;
    protected $table = "contabilidad";
    protected $fillable = [ 
    	'idCont',
    	'concepto',
    	'fecha',
    	'tipo',
    	'idcate',
    	'monto',
    	'iduser',
    	'nombre',
    	'idsuc',
		'activo',
		'status',
		'adelanto',
		'restante ',
		'suma '
		];
}
