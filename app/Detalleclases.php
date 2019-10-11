<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Detalleclases extends Model
{
    public function getKeyName()
    {
    	return "iddm";
    }

    public $timestamps = false;
    protected $table = "detalleclases";
    protected $fillable = [ 
    	'iddm',
    	'idarchivo',
        'idac',
        'idsac',
        'idherra',
        'folio',
        'activo'
    ];


}
