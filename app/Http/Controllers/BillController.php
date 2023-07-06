<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\BillsProduct;
use App\Models\Customer;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bills = Bill::all();
        return Inertia::render('Bill/Index', compact('bills'));
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
        return Inertia::render('Bill/Create', compact('products', 'customers'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        do {
            $bill_id = 'BILL' . uniqid();
        } while (Bill::where('bill_id', $bill_id)->exists());


        $bill = new Bill();
        $bill->customer_id = $request->customer;
        $bill->bill_id = $bill_id;
        $bill->final_amount = 0;
        $bill->save();

        $total = 0;

        foreach ($request->products as $product) {
            if ($product['product']['unit_type'] == 'Feet') {
                if ($product['unit'] == 'Feet' || $product['unit'] == 'Inches') {
                    $feets = $product['feet'];
                    $inches = $product['inches'];
                    $kgsPerFeet = $product['product']['in_kgs'];
                    $price_per_kg = $product['product']['price_per_kg'];
                    $total_kgs = (($feets * $kgsPerFeet) + (($inches / 12) * $kgsPerFeet)) * $product['quantity'];
                    $answer = ((($feets * $kgsPerFeet * $price_per_kg) + (($inches / 12) * $kgsPerFeet * $price_per_kg)) * $product['quantity']) + ($total_kgs * $product['loading_charges']);
                    $final_amount = $answer - ($answer * ($product['discount'] / 100));
                    $total += $final_amount;

                    $billProduct = new BillsProduct();
                    $billProduct->bill_id = $bill->id;
                    $billProduct->product_id = $product['product']['id'];
                    $billProduct->product_name = $product['product']['name'];
                    $billProduct->unit_type = $product['product']['unit_type'];
                    $billProduct->in_kgs = $product['product']['in_kgs'];
                    $billProduct->price_per_kg = $product['product']['price_per_kg'];
                    $billProduct->unit_selected = $product['unit'];
                    $billProduct->final_quantity = $product['quantity'];
                    $billProduct->final_loading_charges = $product['loading_charges'];
                    $billProduct->final_feets = $product['feet'];
                    $billProduct->final_inches = $product['inches'];
                    $billProduct->final_discount = $product['discount'];
                    $billProduct->final_amount = $answer;
                    $billProduct->final_total_amount = $final_amount;
                    $billProduct->final_kgs = $product['kgs'];
                    $billProduct->final_total_kgs = $total_kgs;
                    $billProduct->save();
                }
                if ($product['unit'] == 'Kgs') {

                    $price_per_kg = $product['product']['price_per_kg'];
                    $answer = (($product['kgs'] * $price_per_kg) * $product['quantity']) + (($product['kgs'] * $product['quantity']) * $product['loading_charges']);
                    $final_amount = $answer - ($answer * ($product['discount'] / 100));
                    $total += $final_amount;

                    $billProduct = new BillsProduct();
                    $billProduct->bill_id = $bill->id;
                    $billProduct->product_id = $product['product']['id'];
                    $billProduct->product_name = $product['product']['name'];
                    $billProduct->unit_type = $product['product']['unit_type'];
                    $billProduct->in_kgs = $product['product']['in_kgs'];
                    $billProduct->price_per_kg = $product['product']['price_per_kg'];
                    $billProduct->unit_selected = $product['unit'];
                    $billProduct->final_quantity = $product['quantity'];
                    $billProduct->final_loading_charges = $product['loading_charges'];
                    $billProduct->final_feets = $product['feet'];
                    $billProduct->final_inches = $product['inches'];
                    $billProduct->final_kgs = $product['kgs'];
                    $billProduct->final_total_kgs = ($product['kgs'] * $product['quantity']);
                    $billProduct->final_discount = $product['discount'];
                    $billProduct->final_amount = $answer;
                    $billProduct->final_total_amount = $final_amount;
                    $billProduct->save();
                }
            } else {
                if ($product['unit'] == 'Kgs') {

                    $price_per_kg = $product['product']['price_per_kg'];
                    $answer = (($product['kgs'] * $price_per_kg) * $product['quantity']) + (($product['kgs'] * $product['quantity']) * $product['loading_charges']);
                    $final_amount = $answer - ($answer * ($product['discount'] / 100));
                    $total += $final_amount;

                    $billProduct = new BillsProduct();
                    $billProduct->bill_id = $bill->id;
                    $billProduct->product_id = $product['product']['id'];
                    $billProduct->product_name = $product['product']['name'];
                    $billProduct->unit_type = $product['product']['unit_type'];
                    $billProduct->in_kgs = $product['product']['in_kgs'];
                    $billProduct->price_per_kg = $product['product']['price_per_kg'];
                    $billProduct->unit_selected = $product['unit'];
                    $billProduct->final_quantity = $product['quantity'];
                    $billProduct->final_loading_charges = $product['loading_charges'];
                    $billProduct->final_feets = $product['feet'];
                    $billProduct->final_inches = $product['inches'];
                    $billProduct->final_kgs = $product['kgs'];
                    $billProduct->final_total_kgs = ($product['kgs'] * $product['quantity']);
                    $billProduct->final_discount = $product['discount'];
                    $billProduct->final_amount = $answer;
                    $billProduct->final_total_amount = $final_amount;
                    $billProduct->save();
                }
            }
        }

        $bill->final_amount = $total;
        $bill->save();

        return redirect(route('bill.show', ['bill' => $bill->id]));
    }

    /**
     * Display the specified resource.
     */
    public function show(Bill $bill)
    {
        return Inertia::render('Bill/Show', compact('bill'));
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
    public function destroy(Bill $bill)
    {
        $bill->billProducts()->delete();
        $bill->delete();
    }

    public function invoice(Bill $bill)
    {
        return Inertia::render('Bill/Invoice', compact('bill'));
    }
}
