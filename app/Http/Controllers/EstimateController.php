<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\BillsProduct;
use App\Models\Customer;
use App\Models\Estimate;
use App\Models\EstimateProducts;
use App\Models\Inventory;
use App\Models\InventoryLog;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\Mailer\Transport\Smtp\EsmtpTransport;

class EstimateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $estimates = Estimate::orderBy('created_at', 'DESC')->get();

        if ($request->search) {
            $search = $request->search;
            $estimates = Estimate::where('estimate_id', 'LIKE', '%' . $search . '%')
                ->orWhere('created_at', 'LIKE', '%' . $search . '%')
                ->orWhereHas('customer', function ($query) use ($search) {
                    $query->where('full_name', 'LIKE', '%' . $search . '%')
                        ->orWhere('email', 'LIKE', '%' . $search . '%')
                        ->orWhere('company', 'LIKE', '%' . $search . '%')
                        ->orWhere('mobile_number', 'LIKE', '%' . $search . '%');
                })
                ->orderBy('created_at', 'DESC')
                ->get();
        }

        if ($request->wantsJson()) {
            return $estimates;
        }
        return Inertia::render('Estimate/Index', compact('estimates'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $productsData = Product::all();
        $customersData = Customer::all();
        $customers = array();
        $products = array();
        foreach ($customersData as $customer) {
            $data = array('value' => $customer->id, 'label' => $customer->mobile_number . '(' . $customer->company . ')');
            array_push($customers, $data);
        }

        foreach ($productsData as $product) {
            $data = array('value' => $product->id, 'label' => $product->name);
            array_push($products, $data);
        }
        return Inertia::render('Estimate/Create', compact('products', 'customers'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $estimate_id = 1000;

        $lastRecord = Estimate::latest()->first();

        if ($lastRecord) {
            $estimate_id = $lastRecord->estimate_id + 1;
        }

        $estimate = new Estimate();
        $estimate->customer_id = $request->customer;
        $estimate->estimate_id = $estimate_id;
        $estimate->total_amount = 0;
        $estimate->total_kgs = 0;
        $estimate->loading_charges = 0;
        $estimate->crimping_charges = 0;
        $estimate->discount = 0;
        $estimate->save();

        $total = 0;
        $total_estimate_kgs = 0;

        foreach ($request->products as $product) {
            if ($product['product']['unit_type'] == 'Feet') {
                if ($product['unit'] == 'Feet' || $product['unit'] == 'Inches') {
                    $feets = $product['feet'];
                    $inches = $product['inches'];
                    $kgsPerFeet = $product['product']['in_kgs'];
                    $price_per_kg = $product['price_per_kg'];
                    $total_kgs = (($feets * $kgsPerFeet) + (($inches / 12) * $kgsPerFeet)) * ($product['quantity']);
                    $total_estimate_kgs += $total_kgs;
                    $answer = ((($feets * $kgsPerFeet * $price_per_kg) + (($inches / 12) * $kgsPerFeet * $price_per_kg)) * $product['quantity']);
                    $final_amount = $answer;
                    $total += $final_amount;


                    $estimateProduct = new EstimateProducts();
                    $estimateProduct->estimate_id = $estimate->id;
                    $estimateProduct->product_id = $product['product']['id'];
                    $estimateProduct->product_name = $product['product']['name'];
                    $estimateProduct->unit_type = $product['product']['unit_type'];
                    $estimateProduct->in_kgs = $product['product']['in_kgs'];
                    $estimateProduct->price_per_kg = $product['price_per_kg'];
                    $estimateProduct->unit_selected = $product['unit'];
                    $estimateProduct->quantity = $product['quantity'];
                    $estimateProduct->feets = $product['feet'];
                    $estimateProduct->color = $product['color'];
                    $estimateProduct->inches = $product['inches'];
                    $estimateProduct->total_kgs = $total_kgs;
                    if ($product['showProduct'] == true) {
                        $estimateProduct->type = NULL;
                    } else {
                        $estimateProduct->type = 'variant';
                    }
                    $estimateProduct->amount = round($answer, 2);
                    $estimateProduct->final_amount = round($final_amount, 2);
                    $estimateProduct->save();
                }
                if ($product['unit'] == 'Kgs') {

                    $price_per_kg = $product['price_per_kg'];
                    $total_estimate_kgs += $product['kgs'] * $product['quantity'];
                    $answer = (($product['kgs'] * $price_per_kg) * $product['quantity']);
                    $final_amount = $answer;
                    $total += $final_amount;

                    $estimateProduct = new EstimateProducts();
                    $estimateProduct->estimate_id = $estimate->id;
                    $estimateProduct->product_id = $product['product']['id'];
                    $estimateProduct->product_name = $product['product']['name'];
                    $estimateProduct->unit_type = $product['product']['unit_type'];
                    $estimateProduct->in_kgs = $product['product']['in_kgs'];
                    $estimateProduct->price_per_kg = $product['price_per_kg'];
                    $estimateProduct->unit_selected = $product['unit'];
                    $estimateProduct->quantity = $product['quantity'];
                    $estimateProduct->feets = $product['feet'];
                    $estimateProduct->inches = $product['inches'];
                    $estimateProduct->kgs = $product['kgs'];
                    $estimateProduct->total_kgs = ($product['kgs'] * $product['quantity']);
                    if ($product['showProduct'] == true) {
                        $estimateProduct->type = NULL;
                    } else {
                        $estimateProduct->type = 'variant';
                    }
                    $estimateProduct->amount = round($answer, 2);
                    $estimateProduct->final_amount = round($final_amount, 2);
                    $estimateProduct->save();
                }
            } else if ($product['product']['unit_type'] == 'Unit') {
                $price_per_unit = $product['price_per_unit'];
                $answer = $price_per_unit * $product['quantity'];
                $final_amount = $answer;
                $total += $final_amount;

                $estimateProduct = new EstimateProducts();
                $estimateProduct->estimate_id = $estimate->id;
                $estimateProduct->product_id = $product['product']['id'];
                $estimateProduct->product_name = $product['product']['name'];
                $estimateProduct->unit_type = $product['product']['unit_type'];
                $estimateProduct->price_per_unit = $product['price_per_unit'];
                $estimateProduct->unit_selected = "Unit";
                $estimateProduct->quantity = $product['quantity'];
                $estimateProduct->feets = $product['feet'];
                $estimateProduct->inches = $product['inches'];
                $estimateProduct->kgs = $product['kgs'];
                $estimateProduct->amount = round($answer, 2);
                $estimateProduct->final_amount = round($final_amount, 2);
                $estimateProduct->save();
            } else {
                if ($product['unit'] == 'Kgs') {

                    $price_per_kg = $product['price_per_kg'];
                    $total_estimate_kgs += $product['kgs'] * $product['quantity'];
                    $answer = (($product['kgs'] * $price_per_kg) * $product['quantity']);
                    $final_amount = $answer;
                    $total += $final_amount;

                    $estimateProduct = new EstimateProducts();
                    $estimateProduct->estimate_id = $estimate->id;
                    $estimateProduct->product_id = $product['product']['id'];
                    $estimateProduct->product_name = $product['product']['name'];
                    $estimateProduct->unit_type = $product['product']['unit_type'];
                    $estimateProduct->in_kgs = $product['product']['in_kgs'];
                    $estimateProduct->price_per_kg = $product['price_per_kg'];
                    $estimateProduct->unit_selected = $product['unit'];
                    $estimateProduct->quantity = $product['quantity'];
                    $estimateProduct->feets = $product['feet'];
                    $estimateProduct->inches = $product['inches'];
                    $estimateProduct->kgs = $product['kgs'];
                    $estimateProduct->total_kgs = ($product['kgs'] * $product['quantity']);
                    if ($product['showProduct'] == true) {
                        $estimateProduct->type = NULL;
                    } else {
                        $estimateProduct->type = 'variant';
                    }
                    $estimateProduct->amount = round($answer, 2);
                    $estimateProduct->final_amount = round($final_amount, 2);
                    $estimateProduct->save();
                }
            }
        }

        $estimate->total_amount = round($total, 2);
        $estimate->totaL_kgs = $total_estimate_kgs;
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

        $productsData = Product::all();
        $products = array();
        foreach ($productsData as $product) {
            $data = array('value' => $product->id, 'label' => $product->name);
            array_push($products, $data);
        }
        return Inertia::render('Estimate/Edit', compact('estimate', 'products'));
    }

    public function update(Request $request, Estimate $estimate)
    {
        $total = 0;
        $total_estimate_kgs = 0;

        foreach ($request->products as $product) {
            if ($product['product']['unit_type'] == 'Feet') {
                if ($product['unit'] == 'Feet' || $product['unit'] == 'Inches') {
                    $feets = $product['feet'];
                    $inches = $product['inches'];
                    $kgsPerFeet = $product['product']['in_kgs'];
                    $price_per_kg = $product['price_per_kg'];
                    $total_kgs = (($feets * $kgsPerFeet) + (($inches / 12) * $kgsPerFeet)) * ($product['quantity']);
                    $total_estimate_kgs += $total_kgs;
                    $answer = ((($feets * $kgsPerFeet * $price_per_kg) + (($inches / 12) * $kgsPerFeet * $price_per_kg)) * $product['quantity']);
                    $final_amount = $answer;
                    $total += $final_amount;

                    if (isset($product['id'])) {
                        $estimateProduct = EstimateProducts::where('id', $product['id'])->first();
                    } else {
                        $estimateProduct = new EstimateProducts();
                    }
                    $estimateProduct->estimate_id = $estimate->id;
                    $estimateProduct->product_id = $product['product']['id'];
                    $estimateProduct->product_name = $product['product']['name'];
                    $estimateProduct->unit_type = $product['product']['unit_type'];
                    $estimateProduct->in_kgs = $product['product']['in_kgs'];
                    $estimateProduct->price_per_kg = $product['price_per_kg'];
                    $estimateProduct->unit_selected = $product['unit'];
                    $estimateProduct->quantity = $product['quantity'];
                    $estimateProduct->feets = $product['feet'];
                    $estimateProduct->color = $product['color'];
                    $estimateProduct->inches = $product['inches'];
                    if ($product['showProduct'] = true && $product['type'] != 'variant') {
                        $estimateProduct->type = NULL;
                    } else {
                        $estimateProduct->type = 'variant';
                    }
                    $estimateProduct->total_kgs = $total_kgs;
                    $estimateProduct->amount = round($answer, 2);
                    $estimateProduct->final_amount = round($final_amount, 2);
                    $estimateProduct->save();
                }
                if ($product['unit'] == 'Kgs') {

                    $price_per_kg = $product['price_per_kg'];
                    $total_estimate_kgs += $product['kgs'] * $product['quantity'];
                    $answer = (($product['kgs'] * $price_per_kg) * $product['quantity']);
                    $final_amount = $answer;
                    $total += $final_amount;

                    if (isset($product['id'])) {
                        $estimateProduct = EstimateProducts::where('id', $product['id'])->first();
                    } else {
                        $estimateProduct = new EstimateProducts();
                    }
                    $estimateProduct->estimate_id = $estimate->id;
                    $estimateProduct->product_id = $product['product']['id'];
                    $estimateProduct->product_name = $product['product']['name'];
                    $estimateProduct->unit_type = $product['product']['unit_type'];
                    $estimateProduct->in_kgs = $product['product']['in_kgs'];
                    $estimateProduct->price_per_kg = $product['price_per_kg'];
                    $estimateProduct->unit_selected = $product['unit'];
                    $estimateProduct->quantity = $product['quantity'];
                    $estimateProduct->feets = $product['feet'];
                    $estimateProduct->inches = $product['inches'];
                    $estimateProduct->kgs = $product['kgs'];
                    $estimateProduct->total_kgs = ($product['kgs'] * $product['quantity']);
                    if ($product['showProduct'] = true && $product['type'] != 'variant') {
                        $estimateProduct->type = NULL;
                    } else {
                        $estimateProduct->type = 'variant';
                    }
                    $estimateProduct->amount = round($answer, 2);
                    $estimateProduct->final_amount = round($final_amount, 2);
                    $estimateProduct->save();
                }
            } else if ($product['product']['unit_type'] == 'Unit') {
                $price_per_unit = $product['price_per_unit'];
                $answer = $price_per_unit * $product['quantity'];
                $final_amount = $answer;
                $total += $final_amount;


                if (isset($product['id'])) {
                    $estimateProduct = EstimateProducts::where('id', $product['id'])->first();
                } else {
                    $estimateProduct = new EstimateProducts();
                }
                $estimateProduct->estimate_id = $estimate->id;
                $estimateProduct->product_id = $product['product']['id'];
                $estimateProduct->product_name = $product['product']['name'];
                $estimateProduct->unit_type = $product['product']['unit_type'];
                $estimateProduct->price_per_unit = $product['price_per_unit'];
                $estimateProduct->unit_selected = "Unit";
                $estimateProduct->quantity = $product['quantity'];
                $estimateProduct->feets = $product['feet'];
                $estimateProduct->inches = $product['inches'];
                $estimateProduct->kgs = $product['kgs'];
                if ($product['showProduct'] = true && $product['type'] != 'variant') {
                    $estimateProduct->type = NULL;
                } else {
                    $estimateProduct->type = 'variant';
                }
                $estimateProduct->amount = round($answer, 2);
                $estimateProduct->final_amount = round($final_amount, 2);
                $estimateProduct->save();
            } else {
                if ($product['unit'] == 'Kgs') {

                    $price_per_kg = $product['price_per_kg'];
                    $total_estimate_kgs += $product['kgs'] * $product['quantity'];
                    $answer = (($product['kgs'] * $price_per_kg) * $product['quantity']);
                    $final_amount = $answer;
                    $total += $final_amount;
                    if (isset($product['id'])) {
                        $estimateProduct = EstimateProducts::where('id', $product['id'])->first();
                    } else {
                        $estimateProduct = new EstimateProducts();
                    }
                    $estimateProduct->estimate_id = $estimate->id;
                    $estimateProduct->product_id = $product['product']['id'];
                    $estimateProduct->product_name = $product['product']['name'];
                    $estimateProduct->unit_type = $product['product']['unit_type'];
                    $estimateProduct->in_kgs = $product['product']['in_kgs'];
                    $estimateProduct->price_per_kg = $product['price_per_kg'];
                    $estimateProduct->unit_selected = $product['unit'];
                    $estimateProduct->quantity = $product['quantity'];
                    $estimateProduct->feets = $product['feet'];
                    $estimateProduct->inches = $product['inches'];
                    $estimateProduct->kgs = $product['kgs'];
                    $estimateProduct->total_kgs = ($product['kgs'] * $product['quantity']);
                    if ($product['showProduct'] = true && $product['type'] != 'variant') {
                        $estimateProduct->type = NULL;
                    } else {
                        $estimateProduct->type = 'variant';
                    }
                    $estimateProduct->amount = round($answer, 2);
                    $estimateProduct->final_amount = round($final_amount, 2);
                    $estimateProduct->save();
                }
            }
        }

        $estimate->total_amount = round($total, 2);
        $estimate->totaL_kgs = $total_estimate_kgs;
        $estimate->save();

        return redirect(route('estimate.show', ['estimate' => $estimate->id]));
    }

    /**
     * Update the specified resource in storage.
     */

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Estimate $estimate)
    {
        $estimate->estimateProducts()->delete();

        $estimate->delete();
    }

    public function convertCreate(Estimate $estimate)
    {

        $bill_id = 1000;

        $lastRecord = Bill::latest()->first();

        if ($lastRecord) {
            $bill_id = $lastRecord->bill_id + 1;
        }
        $customer = $estimate->customer;
        $bill = new bill();
        $bill->customer_id = $customer->id;
        $bill->bill_id = $bill_id;
        $bill->estimated_total_kgs = $estimate->total_kgs;
        $bill->estimated_loading_charges = $estimate->loading_charges;
        $bill->estimated_crimping_charges = $estimate->crimping_charges;
        $bill->estimated_total_amount = $estimate->total_amount;
        $bill->estimated_discount = $estimate->discount;
        $bill->final_total_kgs = $estimate->total_kgs;
        $bill->final_loading_charges = $estimate->loading_charges;
        $bill->final_crimping_charges = $estimate->crimping_charges;
        $bill->final_amount = $estimate->total_amount;
        $bill->final_transport_charges = 0;
        $bill->final_discount = $estimate->discount;
        $bill->save();

        $total = 0;

        $products = $estimate->estimateProducts;

        foreach ($products as $product) {
            $billProducts = new BillsProduct();
            $billProducts->bill_id = $bill->id;
            $billProducts->product_id = $product->product_id;
            $billProducts->product_name = $product->product_name;
            $billProducts->unit_type = $product->unit_type;
            $billProducts->in_kgs = $product->in_kgs;
            $billProducts->price_per_kg = $product->price_per_kg;
            $billProducts->unit_selected = $product->unit_selected;
            $billProducts->estimated_quantity = $product->quantity;
            $billProducts->estimated_feets = $product->feets;
            $billProducts->estimated_inches = $product->inches;
            if ($product->type != 'variant') {
                $billProducts->estimated_total_kgs = $product->total_kgs;
            }
            $billProducts->estimated_amount = $product->amount;
            $billProducts->estimated_final_amount = $product->final_amount;

            $billProducts->color = $product->color;
            $billProducts->final_quantity = $product->quantity;
            $billProducts->final_feets = $product->feets;
            $billProducts->final_inches = $product->inches;

            if ($product->type != 'variant') {
                $billProducts->final_total_kgs = $product->total_kgs;
            }
            $billProducts->final_amount = $product->amount;
            $billProducts->final_total_amount = $product->final_amount;
            $billProducts->save();

            $inventory = Inventory::where('product_id', $product->product_id)->first();
            if ($inventory) {
                $inventoryLog = new InventoryLog();
                if ($inventoryLog) {
                    $inventoryLog->inventory_id = $inventory->id;
                    $inventoryLog->bill_id = $bill_id;
                    if ($inventory->unit_type == 'Weight') {
                        $inventoryLog->weight = $product->total_kgs;
                    } else {
                        $inventoryLog->quantity = $product->quantity;
                    }
                    $inventoryLog->log_type = 'out';
                    $inventoryLog->save();
                }
            }
        }

        return redirect(route('bill.show', ['bill' => $bill->id]));

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
                $total_kgs = ($feets * $kgsPerFeet) + (($inches / 12) * $kgsPerFeet);
                $answer = ((($feets * $kgsPerFeet * $price_per_kg) + (($inches / 12) * $kgsPerFeet * $price_per_kg)) * $product['final_quantity']) + ($total_kgs * $product['loading_charges']);
                $final_amount = $answer + ($answer * ($product['discount'] / 100));
                $total += $final_amount;

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
                $billProducts->estimated_total_kgs = $product['total_kgs'];
                $billProducts->estimated_amount = $product['amount'];
                $billProducts->final_quantity = $product['final_quantity'];
                $billProducts->final_feets = $product['final_feets'];
                $billProducts->final_inches = $product['final_inches'];
                $billProducts->final_total_kgs = $total_kgs;
                $billProducts->final_amount = round($answer);
                $billProducts->save();
            }
            if ($product['unit_selected'] == 'Kgs') {

                $price_per_kg = $product['price_per_kg'];
                $answer = ($product['final_kgs'] * $price_per_kg) * $product['final_quantity'];
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

    public function invoice(Estimate $estimate)
    {
        return Inertia::render('Estimate/Invoice', compact('estimate'));
    }

    public function addCrimpingCharges(Request $request, Estimate $estimate)
    {
        $total_amount = ($estimate->total_amount - $estimate->crimping_charges) + $request->crimping_charges;
        $estimate->crimping_charges =  $request->crimping_charges;
        $estimate->total_amount = $total_amount;
        if ($estimate->save()) {
            return 1;
        } else {
            return 0;
        }
    }

    public function addLoadingCharges(Request $request, Estimate $estimate)
    {
        $total_amount = ($estimate->total_amount - $estimate->loading_charges) + ($estimate->total_kgs * $request->loading_charges);
        $estimate->loading_charges = ($estimate->total_kgs * $request->loading_charges);
        $estimate->total_amount = $total_amount;
        if ($estimate->save()) {
            return 1;
        } else {
            return 0;
        }
    }

    public function addDiscount(Request $request, Estimate $estimate)
    {
        $sum = EstimateProducts::where('estimate_id', $estimate->id)->sum('final_amount');
        $total_amount = ($sum + $estimate->loading_charges + $estimate->crimping_charges) - $request->discount;
        $estimate->discount = $request->discount;
        $estimate->total_amount = $total_amount;
        if ($estimate->save()) {
            return 1;
        } else {
            return 0;
        }
    }

    public function deleteProduct(EstimateProducts $product)
    {
        return $product->delete();
    }
}
