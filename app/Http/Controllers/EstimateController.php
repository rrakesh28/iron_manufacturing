<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\BillsProduct;
use App\Models\Customer;
use App\Models\Estimate;
use App\Models\EstimateProducts;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\Mailer\Transport\Smtp\EsmtpTransport;

class EstimateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $estimates = Estimate::all();
        return Inertia::render('Estimate/Index', compact('estimates'));
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
        do {
            $estimate_id = 'EST' . uniqid();
        } while (Estimate::where('estimate_id', $estimate_id)->exists());


        $estimate = new Estimate();
        $estimate->customer_id = $request->customer;
        $estimate->estimate_id = $estimate_id;
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
                    $answer = (($feets * $kgsPerFeet * $price_per_kg) + (($inches / 12) * $kgsPerFeet * $price_per_kg)) * $product['quantity'];
                    $total += $answer;

                    $estimateProduct = new EstimateProducts();
                    $estimateProduct->estimate_id = $estimate->id;
                    $estimateProduct->product_id = $product['product']['id'];
                    $estimateProduct->product_name = $product['product']['name'];
                    $estimateProduct->unit_type = $product['product']['unit_type'];
                    $estimateProduct->in_kgs = $product['product']['in_kgs'];
                    $estimateProduct->price_per_kg = $product['product']['price_per_kg'];
                    $estimateProduct->unit_selected = $product['unit'];
                    $estimateProduct->quantity = $product['quantity'];
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

        return redirect(route('estimate.show', ['estimate' => $estimate->id]));
    }

    /**
     * Display the specified resource.
     */
    public function show(Estimate $estimate)
    {
        return Inertia::render('Estimate/Show', compact('estimate'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Estimate $estimate)
    {

        $products = Product::all();
        return Inertia::render('Estimate/Edit', compact('estimate', 'products'));
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

    public function convertCreate(Estimate $estimate)
    {
        return Inertia::render('Estimate/Convert', compact('estimate'));
    }

    public function convertStore(Request $request)
    {
        do {
            $bill_id = 'BILL' . uniqid();
        } while (Bill::where('bill_id', $bill_id)->exists());


        $bill = new bill();
        $bill->customer_id = $request->estimate['customer']['id'];
        $bill->bill_id = $bill_id;
        $bill->estimated_total_amount = $request->estimate['total_amount'];
        $bill->final_amount = 0;
        $bill->save();

        $total = 0;

        foreach ($request->products as $product) {

            if ($product['unit_selected'] == 'Feet' || $product['unit_selected'] == 'Inches') {
                $feets = $product['final_feets'];
                $inches = $product['final_inches'];
                $kgsPerFeet = $product['in_kgs'];
                $price_per_kg = $product['price_per_kg'];
                $answer = (($feets * $kgsPerFeet * $price_per_kg) + (($inches / 12) * $kgsPerFeet * $price_per_kg)) * $product['final_quantity'];
                $total += $answer;

                $billProducts = new BillsProduct();
                $billProducts->bill_id = $bill->id;
                $billProducts->product_id = $product['product_id'];
                $billProducts->product_name = $product['product_name'];
                $billProducts->unit_type = $product['unit_type'];
                $billProducts->in_kgs = $product['in_kgs'];
                $billProducts->price_per_kg = $product['price_per_kg'];
                $billProducts->unit_selected = $product['unit_selected'];
                $billProducts->estimated_quantity = $product['quantity'];
                $billProducts->estimated_feets = $product['feets'];
                $billProducts->estimated_inches = $product['inches'];
                $billProducts->estimated_amount = $product['amount'];
                $billProducts->final_quantity = $product['final_quantity'];
                $billProducts->final_feets = $product['final_feets'];
                $billProducts->final_inches = $product['final_inches'];
                $billProducts->final_amount = $answer;
                $billProducts->save();
            }
            if ($product['unit_selected'] == 'Kgs') {

                $price_per_kg = $product['price_per_kg'];
                $answer = $product['final_kgs'] * $price_per_kg;
                $total += $answer;

                $billProducts = new EstimateProducts();
                $billProducts->bill = $bill->id;
                $billProducts->product_id = $product['product_id'];
                $billProducts->product_name = $product['product_name'];
                $billProducts->unit_type = $product['unit_type'];
                $billProducts->in_kgs = $product['in_kgs'];
                $billProducts->price_per_kg = $product['price_per_kg'];
                $billProducts->unit_selected = $product['unit_selected'];
                $billProducts->estimated_kgs = $product['kgs'];
                $billProducts->final_kgs = $product['final_kgs'];
                $billProducts->estimate_amount = $product['amount'];
                $billProducts->final_amount = $answer;
                $billProducts->save();
            }
        }

        $bill->final_amount = $total;
        $bill->save();

        return redirect(route('bill.show', ['bill' => $bill->id]));
    }

    public function invoice(){
        return Inertia::render('Estimate/Invoice');
    }
}
