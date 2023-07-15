<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\InventoryLog;
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
        return Inertia::render('Inventory/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());

        $inventory = new Inventory();
        $inventory->coil_code = $request->coil_code;
        $inventory->weight = $request->weight;
        $inventory->thickness = $request->thickness;
        $inventory->color = $request->color;
        $inventory->grade = $request->grade;
        $inventory->company = $request->company;
        $inventory->cost = $request->cost;
        $inventory->save();

        $inventoryLog = new InventoryLog();
        $inventoryLog->inventory_id = $inventory->id;
        $inventoryLog->stock = $request->quantity;
        $inventoryLog->save();

        return redirect(route('inventory.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Inventory $inventory)
    {
        //
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
    public function destroy(string $id)
    {
        //
    }
}
