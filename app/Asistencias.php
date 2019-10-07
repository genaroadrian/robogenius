<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Asistencias extends Model
{
    public function getKeyName()
    {
        return 'idasis';
    }

    public $timestamps = false;
    protected $table = "asistencias";
    protected $fillable = 
    [ 
    	'idasis',
    	'idgru',
    	'fecha',
    	'dia',
    	'hora',
    	'idper',
        'idalu',
        'idesc',
        'asis'
    ];
}
