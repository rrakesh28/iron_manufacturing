<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estimate extends Model
{
    use HasFactory;
    protected $with = ['customer','estimateProducts'];

    public function customer(){
        return $this->belongsTo(Customer::class);
    }

    public function estimateProducts(){
        return $this->hasMany(EstimateProducts::class);
    }
}