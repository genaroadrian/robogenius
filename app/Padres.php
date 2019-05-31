<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Padres extends Model
{

    public function getKeyName(){
        return "idpadres";
    }

    public $timestamps = false;
    protected $table = "padres";
    protected $fillable = 
    [
        'idpadres',
        'nombrepad',
        'apellidospad',
        'domiciliopad',
        'telefonopad',
        'correopad',
        'ocupacionpad',
        'nombremad',
        'apellidosmad',
        'domiciliomad',
        'telefonomad',
        'correomad',
        'ocupacionmad',
        'usuario',
        'contra',
        'activo',
        'idsuc'
    ];
}
