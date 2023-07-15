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
            $data = array('value' => $customer->id, 'label' => $customer->mobile_number . '(' . $customer->company . ')');
            array_push($customers, $data);
        }
        return Inertia::render('Bill/Create', compact('products', 'customers'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $bill_id = 1000;

        $lastRecord = Bill::latest()->first();

        if ($lastRecord) {
            $bill_id = $lastRecord->bill_id + 1;
        }

        $bill = new Bill();
        $bill->customer_id = $request->customer;
        $bill->bill_id = $bill_id;
        $bill->final_total_kgs = 0;
        $bill->final_loading_charges = 0;
        $bill->final_crimping_charges = 0;
        $bill->final_amount = 0;
        $bill->save();

        $total = 0;
        $total_bill_kgs = 0;

        foreach ($request->products as $product) {
            if ($product['product']['unit_type'] == 'Feet') {
                if ($product['unit'] == 'Feet' || $product['unit'] == 'Inches') {
                    $feets = $product['feet'];
                    $inches = $product['inches'];
                    $kgsPerFeet = $product['product']['in_kgs'];
                    $price_per_kg = $product['product']['price_per_kg'];
                    $total_kgs = (($feets * $kgsPerFeet) + (($inches / 12) * $kgsPerFeet)) * $product['quantity'];
                    $total_bill_kgs += $total_kgs;
                    $answer = ((($feets * $kgsPerFeet * $price_per_kg) + (($inches / 12) * $kgsPerFeet * $price_per_kg)) * $product['quantity']);
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
                    $billProduct->final_feets = $product['feet'];
                    $billProduct->final_inches = $product['inches'];
                    $billProduct->final_discount = $product['discount'];
                    $billProduct->final_amount = round($answer, 2);
                    $billProduct->final_total_amount = round($final_amount, 2);
                    $billProduct->final_kgs = $product['kgs'];
                    $billProduct->final_total_kgs = $total_kgs;
                    $billProduct->save();
                }
                if ($product['unit'] == 'Kgs') {

                    $price_per_kg = $product['product']['price_per_kg'];
                    $total_bill_kgs += $product['kgs'] * $product['quantity'];
                    $answer = (($product['kgs'] * $price_per_kg) * $product['quantity']);
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
                    $billProduct->final_feets = $product['feet'];
                    $billProduct->final_inches = $product['inches'];
                    $billProduct->final_kgs = $product['kgs'];
                    $billProduct->final_total_kgs = ($product['kgs'] * $product['quantity']);
                    $billProduct->final_discount = $product['discount'];
                    $billProduct->final_amount = round($answer, 2);
                    $billProduct->final_total_amount = round($final_amount, 2);
                    $billProduct->save();
                }
            } else if ($product['product']['unit_type'] == 'Unit') {
                $price_per_unit = $product['product']['price_per_unit'];
                $answer = $price_per_unit * $product['quantity'];
                $final_amount = $answer - ($answer * ($product['discount'] / 100));
                $total += $final_amount;

                $billProduct = new BillsProduct();
                $billProduct->bill_id = $bill->id;
                $billProduct->product_id = $product['product']['id'];
                $billProduct->product_name = $product['product']['name'];
                $billProduct->unit_type = $product['product']['unit_type'];
                $billProduct->price_per_unit = $product['product']['price_per_unit'];
                $billProduct->unit_selected = "Unit";
                $billProduct->final_quantity = $product['quantity'];
                $billProduct->final_feets = $product['feet'];
                $billProduct->final_inches = $product['inches'];
                $billProduct->final_kgs = $product['kgs'];
                $billProduct->final_discount = $product['discount'];
                $billProduct->final_amount = round($answer, 2);
                $billProduct->final_total_amount = round($final_amount, 2);
                $billProduct->save();
            } else {
                if ($product['unit'] == 'Kgs') {

                    $price_per_kg = $product['product']['price_per_kg'];
                    $total_bill_kgs += $product['kgs'] * $product['quantity'];
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
                    $billProduct->final_feets = $product['feet'];
                    $billProduct->final_inches = $product['inches'];
                    $billProduct->final_kgs = $product['kgs'];
                    $billProduct->final_total_kgs = ($product['kgs'] * $product['quantity']);
                    $billProduct->final_discount = $product['discount'];
                    $billProduct->final_amount = round($answer, 2);
                    $billProduct->final_total_amount = round($final_amount, 2);
                    $billProduct->save();
                }
            }
        }
        $bill->final_total_kgs = $total_bill_kgs;
        $bill->final_amount = round($total, 2);
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
    public function edit(Bill $bill)
    {
        return Inertia::render('Bill/Edit', compact('bill'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bill $bill)
    {
        // dd($request->all());
        $total = 0;
        $total_bill_kgs = 0;

        foreach ($request->products as $product) {

            if ($product['unit_selected'] == 'Feet' || $product['unit_selected'] == 'Inches') {
                $feets = $product['final_feets'];
                $inches = $product['final_inches'];
                $kgsPerFeet = $product['in_kgs'];
                $price_per_kg = $product['price_per_kg'];
                $total_kgs = (($feets * $kgsPerFeet) + (($inches / 12) * $kgsPerFeet)) * $product['final_quantity'];
                $total_bill_kgs += $total_kgs;
                $answer = ((($feets * $kgsPerFeet * $price_per_kg) + (($inches / 12) * $kgsPerFeet * $price_per_kg)) * $product['final_quantity']);
                $final_amount = $answer - ($answer * ($product['final_discount'] / 100));
                $total += $final_amount;

                $billProduct = BillsProduct::where('id', $product['id'])->first();
                $billProduct->final_quantity = $product['final_quantity'];
                $billProduct->final_feets = $product['final_feets'];
                $billProduct->final_inches = $product['final_inches'];
                $billProduct->final_discount = $product['final_discount'];
                $billProduct->final_amount = round($answer, 2);
                $billProduct->final_total_amount = round($final_amount, 2);
                $billProduct->final_kgs = $product['final_kgs'];
                $billProduct->final_total_kgs = $total_kgs;
                $billProduct->save();
            }
            if ($product['unit_selected'] == 'Kgs') {

                $price_per_kg = $product['price_per_kg'];
                $total_bill_kgs += $product['final_kgs'] * $product['final_quantity'];
                $answer = (($product['final_kgs'] * $price_per_kg) * $product['final_quantity']);
                $final_amount = $answer - ($answer * ($product['final_discount'] / 100));
                $total += $final_amount;

                $billProduct = BillsProduct::where('id', $product['id'])->first();
                $billProduct->final_quantity = $product['final_quantity'];
                $billProduct->final_feets = $product['final_feets'];
                $billProduct->final_inches = $product['final_inches'];
                $billProduct->final_kgs = $product['final_kgs'];
                $billProduct->final_total_kgs = ($product['final_kgs'] * $product['final_quantity']);
                $billProduct->final_discount = $product['final_discount'];
                $billProduct->final_amount = round($answer, 2);
                $billProduct->final_total_amount = round($final_amount, 2);
                $billProduct->save();
            }

            if ($product['unit_selected'] == 'Unit') {
                $price_per_unit = $product['price_per_unit'];
                $answer = $price_per_unit * $product['final_quantity'];
                $final_amount = $answer - ($answer * ($product['final_discount'] / 100));
                $total += $final_amount;

                $estimateProduct = BillsProduct::where('id', $product['id'])->first();
                $estimateProduct->final_quantity = $product['final_quantity'];
                $estimateProduct->final_discount = $product['final_discount'];
                $estimateProduct->final_amount = round($answer, 2);
                $estimateProduct->final_total_amount = round($final_amount, 2);
                $estimateProduct->save();
            }
        }

        $bill->final_total_kgs = $total_bill_kgs;
        $bill->final_amount = $bill->final_loading_charges + $bill->final_crimping_charges + round($total, 2);
        $bill->save();

        return redirect(route('bill.show', ['bill' => $bill->id]));
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

    public function editWeight(Bill $bill){
        return Inertia::render("Bill/EditWeight",compact('bill'));
    }

    public function updateWeight(Request $request,Bill $bill){
        // dd($request->all());
        $total = 0;
        $total_bill_kgs = 0;

        foreach ($request->products as $product) {

            if ($product['unit_selected'] == 'Feet' || $product['unit_selected'] == 'Inches' || $product['unit_selected'] == 'Kgs') {
                $price_per_kg = $product['price_per_kg'];
                $answer = $product['final_total_kgs'] * $price_per_kg;
                $total_bill_kgs += $product['final_total_kgs'];
                $final_amount = $answer - ($answer * ($product['final_discount'] / 100));
                $total += $final_amount;

                $billProduct = BillsProduct::where('id', $product['id'])->first();
                $billProduct->final_amount = round($answer, 2);
                $billProduct->final_total_amount = round($final_amount, 2);
                $billProduct->final_total_kgs = $product['final_total_kgs'];
                $billProduct->save();
            }
        }

        $bill->final_total_kgs = $total_bill_kgs;
        $bill->final_amount = $bill->final_loading_charges + $bill->final_crimping_charges + round($total, 2);
        $bill->save();

        return redirect(route('bill.show', ['bill' => $bill->id]));
    }


    public function addCrimpingCharges(Request $request, Bill $bill)
    {
        $total_amount = $bill->final_amount - $bill->crimping_charges + $request->crimping_charges;
        $bill->final_crimping_charges = $request->crimping_charges;
        $bill->final_amount = $total_amount;
        if ($bill->save()) {
            return 1;
        } else {
            return 0;
        }
    }

    public function addLoadingCharges(Request $request, Bill $bill)
    {
        $total_amount = $bill->final_amount - $bill->final_loading_charges + ($bill->final_total_kgs * $request->loading_charges);
        $bill->final_loading_charges = $bill->final_total_kgs * $request->loading_charges;
        $bill->final_amount = $total_amount;
        if ($bill->save()) {
            return 1;
        } else {
            return 0;
        }
    }
}
