<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    use HasFactory;

    protected $with = ['customer','billProducts'];
    protected $appends = ['amount'];

    public function customer(){
        return $this->belongsTo(Customer::class);
    }

    public function billProducts(){
        return $this->hasMany(BillsProduct::class);
    }

    public function getAmountAttribute(){
        $sum = BillsProduct::where("bill_id",$this->id)->sum('final_total_amount');
        return $sum + $this->final_loading_charges + $this->final_crimping_charges - $this->final_discount;
    }
}
