<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Detallepadres extends Model
{
    public $timestamps = false;
    protected $table = "detallepadres";
    protected $fillable = 
    [
        'iddpad',
        'idpad',
        'idalu',
        'activo',
        'idsuc'
    ];
}
