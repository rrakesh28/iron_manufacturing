<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\InventoryLog;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $inventory = Inventory::all();
        return Inertia::render('Inventory/Index',compact('inventory'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::all();
        return Inertia::render('Inventory/Create',compact('products'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id'=> ['required','unique:'.Inventory::class],
        ]);

        $inventory = new Inventory();
        $inventory->product_id = $request->product_id;
        $inventory->unit_type = $request->unit_type;
        $inventory->save();


        $inventoryLog = new InventoryLog();
        $inventoryLog->inventory_id = $inventory->id;
        $inventoryLog->weight = round($request->weight,2);
        $inventoryLog->quantity = $request->quantity;
        $inventoryLog->log_type = 'in';
        $inventoryLog->save();


        return redirect(route('inventory.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Inventory $inventory)
    {
        if($inventory->unit_type == 'Weight'){
            $balance = InventoryLog::where('inventory_id',$inventory->id)->where('log_type','in')->sum('weight') - InventoryLog::where('inventory_id',$inventory->id)->where('log_type','out')->sum('weight');
        }else{
            $balance = InventoryLog::where('inventory_id',$inventory->id)->where('log_type','in')->sum('quantity') - InventoryLog::where('inventory_id',$inventory->id)->where('log_type','out')->sum('quantity');
        }
        return Inertia::render('Inventory/Show',compact('inventory','balance'));
    }

    public function add(Inventory $inventory,Request $request){
        // dd($inventory->id);
        $inventoryLog = new InventoryLog();
        $inventoryLog->inventory_id = $inventory->id;
        if($inventory->unit_type == 'Weight'){
            $inventoryLog->weight = round($request->in,2);
        }else{
            $inventoryLog->quantity = $request->in;
        }
        $inventoryLog->log_type = 'in';
        $inventoryLog->save();

        return redirect(route('inventory.show',['inventory'=>$inventory->id]));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inventory $inventory)
    {
        return Inertia::render('Inventory/Edit',compact('inventory'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Inventory $inventory)
    {
        $inventory->coil_code = $request->coil_code;
        $inventory->weight = $request->weight;
        $inventory->thickness = $request->thickness;
        $inventory->color = $request->color;
        $inventory->grade = $request->grade;
        $inventory->company = $request->company;
        $inventory->cost = $request->cost;
        $inventory->save();

        return redirect(route('inventory.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inventory $inventory)
    {
       $inventory->logs()->delete();
       
       $inventory->delete();
    }
}
