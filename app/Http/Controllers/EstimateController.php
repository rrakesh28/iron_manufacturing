<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Estimate;
use App\Models\EstimateProducts;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EstimateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Estimate/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::all();
        $customersData = Customer::all();
        $customers = array();
        foreach ($customersData as $customer) {
            $data = array('value' => $customer->id, 'label' => $customer->mobile_number);
            array_push($customers, $data);
        }
        return Inertia::render('Estimate/Create', compact('products', 'customers'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        dd($request->all());

        $estimate = new Estimate();
        $estimate->user_id = $request->customer;
        $estimate->total_amount = 0;
        $estimate->save();

        $total = 0;

        foreach ($request->products as $product) {
            if ($product['product']['unit_type'] == 'Feet') {
                if ($product['unit'] == 'Feet' || $product['unit'] == 'Inches') {
                    $feets = $product['feet'];
                    $inches = $product['inches'];
                    $kgsPerFeet = $product['product']['in_kgs'];
                    $price_per_kg = $product['product']['price_per_kg'];
                    $answer = ($feets * $kgsPerFeet * $price_per_kg) + (($inches / 12) * $kgsPerFeet * $price_per_kg);
                    $total += $answer;

                    $estimateProduct = new EstimateProducts();
                    $estimateProduct->estimate_id = $estimate->id;
                    $estimateProduct->product_id = $product['product']['id'];
                    $estimateProduct->product_name = $product['product']['name'];
                    $estimateProduct->unit_type = $product['product']['unit_type'];
                    $estimateProduct->in_kgs = $product['product']['in_kgs'];
                    $estimateProduct->price_per_kg = $product['product']['price_per_kg'];
                    $estimateProduct->unit_selected = $product['unit'];
                    $estimateProduct->feets = $product['feet'];
                    $estimateProduct->inches = $product['inches'];
                    $estimateProduct->amount = $answer;
                    $estimateProduct->save();
                }
                if ($product['unit'] == 'Kgs') {

                    $price_per_kg = $product['product']['price_per_kg'];
                    $answer = $product['kgs'] * $price_per_kg;
                    $total += $answer;

                    $estimateProduct = new EstimateProducts();
                    $estimateProduct->estimate_id = $estimate->id;
                    $estimateProduct->product_id = $product['product']['id'];
                    $estimateProduct->product_name = $product['product']['name'];
                    $estimateProduct->unit_type = $product['product']['unit_type'];
                    $estimateProduct->in_kgs = $product['product']['in_kgs'];
                    $estimateProduct->price_per_kg = $product['product']['price_per_kg'];
                    $estimateProduct->unit_selected = $product['unit'];
                    $estimateProduct->feets = $product['feet'];
                    $estimateProduct->inches = $product['inches'];
                    $estimateProduct->kgs = $product['kgs'];
                    $estimateProduct->amount = $answer;
                    $estimateProduct->save();
                }
            }
        }

        $estimate->total_amount = $total;
        $estimate->save();
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
