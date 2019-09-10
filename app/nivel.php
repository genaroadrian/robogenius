<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class nivel extends Model
{
    public function getKeyName()
    {
    	return "idn";
    }
    public $timestamps = false;
    protected $table = "niveles";
    protected $fillable = [ 
    	'idn',
        'nombre',
        'activo'
        ];
}
