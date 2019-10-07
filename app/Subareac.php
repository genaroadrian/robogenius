<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Subareac extends Model
{
    public function getKeyName()
    {
        return "idsac";
    }

    public $timestamps = false;
    protected $table = "subareac";
    protected $fillable = [ 
    	'idsac',
    	'nombre',
        'activo'
    ];
}
