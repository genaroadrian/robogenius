<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Grupos_alumnos extends Model
{
    public function getKeyName()
    {
        return "idgalu";
    }

    public $timestamps = false;
    protected $table = "grupos_alumnos";
    protected $fillable = [ 
        'idgalu',
        'idg',
        'idalu'
    ];
}
