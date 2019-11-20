<?php

namespace computecnology;

use Illuminate\Database\Eloquent\Model;

class Productos extends Model
{
    public $timestamps = false;
    protected $table = "productos";
    protected $primaryKey = 'idprod';
    protected $fillable = [ 
    	'num_serie',
    	'nom_prod',
        'modelo_prod',
        'precio_in_prod',
        'precio_out_prod',
        'descripcion_prod',
        'imagen_prod',
        'estado_prod',
        'idcat_prod',
        'activo',
        'tipo_procesador',
        'modelo_procesador',
        'nucleos_procesador',
        'tipo_ram',
        'capacidad_ram',
        'capacidad_disc_duro',
        'marc_gpu',
        'interfaz_gpu',
        'modelo_gpu',
        'resulucion_pantalla',
        'color',
        'ancho',
        'alto',
        'grueso',
        'peso',
        'unidad_optica' ,
        'cap_bateria',
        'camara_frontal',
        'camara_trasera',
        'flash',
        'tipo_audio',
        'lector_huella',
        'sistema_operativo'
    ];
}
