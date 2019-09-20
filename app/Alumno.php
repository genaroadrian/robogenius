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
    	'escuela',
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
		'usuariopad',
		'pswpad',
		'finscripcion',
		'idesc',
		'activo',
		'idsuc'
    ];
}
