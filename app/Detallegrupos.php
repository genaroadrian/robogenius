<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class Detallegrupos extends Model
{
    public function getKeyName(){
        return "iddgru";
    }

    public $timestamps = false;
    protected $table = "detallegrupos";
    protected $fillable = [ 
        'iddgru',
        'idh',
        'idd',
        'idp',
        'activo',
        'idsuc',
        'idesc'
    ];
}
