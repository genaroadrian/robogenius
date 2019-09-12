<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Personal extends Model
{
    public function getKeyName(){
        return "idper";
    }

    public $timestamps = false;
    protected $table = "personal";
    protected $fillable = [ 
    	'idper', 
    	'nombre',
        'apellidos',
        'usuario',
        'contra',
        'fechanac',
        'sexo',
        'curp',
        'estadocivil',
        'domicilio',
        'fechaingreso',
        'horasalida',
        'horaentrada',
        'perfilprofesional',
        'especialidad',
        'salariomensual',
        'tareasasignadas',
        'fecharegistro',
        'idtper',
        'activo'
    ];
}
