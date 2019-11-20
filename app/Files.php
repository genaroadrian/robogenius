<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Files extends Model
{
    public $timestamps = false;
    protected $table = 'archivos';
    protected $fillable = [
        'idarchivo'
        ,'tipo'
        ,'ruta'
        ,'ids'
    ];
}
