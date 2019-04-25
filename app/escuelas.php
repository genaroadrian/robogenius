<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class escuelas extends Model
{
    
   protected $primaryKey = 'idesc';
   protected $fillable = [ 'idesc','nombre','activo'];
   protected $date=['deleted_at'];
    
}