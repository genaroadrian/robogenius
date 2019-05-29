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
    	'correo',
    	'fechanac',
    	'edad',
    	'sexo',
    	'domicilio',
		'iddom',
    	'alergias',
    	'cronica',
    	'medicacion',
    	'otro',
    	'idpadre',
    	'tel1cm',
    	'tel2cm',
    	'nomb1cm',
        'nomb2cm',
    	'ruta',
    	'evaluacion',
    	'psw',
    	'idgrupo',
    	'idcursos',
        'activo',
    	'idsuc'

    ];
}
