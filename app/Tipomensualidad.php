<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class tipomensualidad extends Model
{
    public function getKeyName()
    {
    	return "idtmen";
    }
    public $timestamps = false;
    protected $table = "Tipomensualidad";
    protected $fillable = [ 
    	'idtmen',
    	'nombre',
    	'fechainicial',
    	'fechafinal',
    	'activo'];
}