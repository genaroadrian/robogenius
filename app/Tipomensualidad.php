<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class escuelas extends Model
{
    public function getKeyName()
    {
    	return "idesc";
    }
    public $timestamps = false;
    protected $table = "escuelas";
    protected $fillable = [ 'idesc','nombre','activo'];
}