<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Categorias extends Model
{
    public function getKeyName()
    {
    	return "idCategoria";
    }
    public $timestamps = false;
    protected $table = "categorias";
    protected $fillable = [ 
    	'idCategoria',
    	'categoria',
    	'activo',
    	'idsuc'];
}
