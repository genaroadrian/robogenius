<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Alumno extends Model
{

    public function getKeyName(){
        return "idalu";
    }

    public $timestamps = false;
    protected $table = "alumnos";
    protected $fillable = [ 
        'idalu',
		'nombre',
		'apellidos',
		'fechanac',
		'sexo',
		'domicilio',
		'telefono',
    	'correo',
		'medicacion',
    	'alergias',
    	'ruta',
    	'cronica',
    	'otro',
		'evaluacion',
		'usuario',
    	'psw',
        'activo',
    	'idsuc'


    ];
}
