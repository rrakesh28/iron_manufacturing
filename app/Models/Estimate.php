<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estimate extends Model
{
    use HasFactory;
    protected $with = ['customer','estimateProducts'];

    protected $appends = ['amount'];

    public function customer(){
        return $this->belongsTo(Customer::class);
    }

    public function estimateProducts(){
        return $this->hasMany(EstimateProducts::class);
    }

    public function getAmountAttribute(){
        $sum = EstimateProducts::where("estimate_id",$this->id)->sum('final_amount');
        return $sum + $this->loading_charges + $this->crimping_charges - $this->discount;
    }
}
