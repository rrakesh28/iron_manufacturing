<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConversionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::all();
        return Inertia::render('Conversion/Create',compact('products'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $product = Product::find($request->product['id']);
        $price_per_kg = $product->price_per_kg;

        $answer = '';
        if($product->unit_type == 'Feet'){
            $feets = $request->feets;
            $inches = $request->inches;
            $kgsPerFeet = $product->in_kgs;
            $answer = ($feets*$kgsPerFeet*$price_per_kg) + (($inches/12)*$kgsPerFeet*$price_per_kg);
        }

        if($product->unit_type == 'Kgs'){
            $answer = $request->kg*$price_per_kg;
        }

        return $answer;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
