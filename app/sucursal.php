<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class sucursal extends Model
{
    public function getKeyName()
    {
    	return "idesc";
    }
    public $timestamps = false;
    protected $table = "sucursal";
    protected $fillable = [
    	'idsuc',
    	'nombre',
    	'direccion',
    	'encargado',
    	'usuario',
    	'psw',
    	'activo'];
}
