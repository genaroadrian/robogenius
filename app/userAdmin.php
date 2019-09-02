<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class userAdmin extends Model
{
    public $timestamps = false;
    protected $table = "users";
    protected $fillable = [ 
    	'id',
		'subname',
		'email',
    	'password',
    	'nombre',
    	'apellidos',
    	'telefono',
    	'activo'];
}
