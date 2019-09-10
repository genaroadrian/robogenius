<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class codigodesc extends Model
{
    public $timestamps = false;
    protected $table = "codigodesc";
    protected $fillable = [ 
    	'id',
    	'codigo',
    	'porcentaje',
    	'lugar',
    	'fecha',
    	'activo'];
}
