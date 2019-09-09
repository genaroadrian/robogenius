<?php

namespace slidecom_robogenius;

use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    public function getKeyName()
    {
        return "id";
    }

    public $timestamps = false;
    protected $table = "password_resets";
    protected $fillable = [
        'id',
        'email',
        'token',
        'created_at',
        'activo'
    ];
}
