<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class LoginAngular extends Model
{
    public function getKeyName(){
        return "id";
    }

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
    	'avatar',
        'activo'
    ];
}
