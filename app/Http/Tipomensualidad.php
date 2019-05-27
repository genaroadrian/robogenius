<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Tipomensualidad extends Model
{
    public function getKeyName()
    {
    	return "idtmen";
    }
    public $timestamps = false;
    protected $table = "tipomensualidad";
    protected $fillable = [ 
    	'idtmen',
    	'nombre',
    	'fechainicial',
    	'fechafinal',
    	'activo'];
}