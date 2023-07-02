<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    use HasFactory;

    protected $with = ['customer','billProducts'];

    public function customer(){
        return $this->belongsTo(Customer::class);
    }

    public function billProducts(){
        return $this->hasMany(BillsProduct::class);
    }
}
