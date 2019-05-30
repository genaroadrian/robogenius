<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Padres extends Model
{
    public $timestamps = false;
    protected $table = "personal";
    protected $fillable = 
    [
        'idpadres',
        'nombrepad',
        'apellidospad',
        'domiciliopad',
        'telefonopad',
        'correopad',
        'ocupacionpad',
        'nombrepmad',
        'apellidospmad',
        'domiciliopmad',
        'telefonopmad',
        'correopmad',
        'ocupacionpmad',
        'usuario',
        'contra',
        'activo',
        'idsuc'
    ];
}
