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
<<<<<<< HEAD
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
=======
    	'nomalu',
    	'apealu',
    	'fnacalu',
    	'sexoalu',
    	'domalu',
    	'telalu',
		'correoalu',
    	'medicacion',
    	'alergias',
    	'perfilalu',
    	'cronica',
    	'otro',
    	'evaluacion',
    	'usuarioalu',
    	'pswalu',
        'nompad',
    	'apepad',
    	'dompad',
    	'telpad',
		'correopad',
    	'ocupad',
        'nommad',
		'apemad',
		'dommad',
		'telmad',
		'correomad',
		'ocupmad',
		'nommem',
		'costomem',
		'fechaini',
		'fechafin',
		'total',
		'adelanto',
		'restante',
		'usuariopad',
		'pswpad',
		'activo',
		'idsuc'
>>>>>>> aac913ae98fc4fce93a069aaeb0b7d092c212619


    ];
}
