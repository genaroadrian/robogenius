<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Horarios extends Model
{
    public function getKeyName()
    {
    	return "idh";
    }
    public $timestamps = false;
    protected $table = "horario";
    protected $fillable = [ 
    	'idh',
    	'hora',
    	'activo'];
}
