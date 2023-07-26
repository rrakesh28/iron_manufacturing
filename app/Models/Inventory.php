<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $with = ['product','logs'];

    protected $appends = ['opening','utilized','remaining'];
    public function product(){
        return $this->belongsTo(Product::class);
    }

    public function logs(){
        return $this->hasMany(InventoryLog::class);
    }

    public function getOpeningAttribute(){
        $yesterday = Carbon::yesterday();
        if($this->unit_type == 'Weight'){
            $in_sum = InventoryLog::where('inventory_id',$this->id)->where('log_type','in')->sum('weight');
            $out_sum = InventoryLog::where('inventory_id',$this->id)->where('log_type','out')->whereDate('created_at','<=',$yesterday)->sum('weight');
        }else{
            $in_sum = InventoryLog::where('inventory_id',$this->id)->where('log_type','in')->sum('quantity');
            $out_sum = InventoryLog::where('inventory_id',$this->id)->where('log_type','out')->whereDate('created_at','<=',$yesterday)->sum('quantity');
        }
        return $in_sum - $out_sum;
    }

    public function getUtilizedAttribute(){
        $today = Carbon::today();
        if($this->unit_type == 'Weight'){
            return InventoryLog::where('inventory_id',$this->id)->where('log_type','out')->whereDate('created_at',$today)->sum('weight');
        }else{
            return InventoryLog::where('inventory_id',$this->id)->where('log_type','out')->whereDate('created_at',$today)->sum('quantity');
        }
    }

    public function getRemainingAttribute(){
        if($this->unit_type == 'Weight'){
            $in_sum = InventoryLog::where('inventory_id',$this->id)->where('log_type','in')->sum('weight');
            $out_sum = InventoryLog::where('inventory_id',$this->id)->where('log_type','out')->sum('weight');
        }else{
            $in_sum = InventoryLog::where('inventory_id',$this->id)->where('log_type','in')->sum('quantity');
            $out_sum = InventoryLog::where('inventory_id',$this->id)->where('log_type','out')->sum('quantity');
        }
        return $in_sum - $out_sum;
    }
}
