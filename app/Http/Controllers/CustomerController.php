<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::all();
        return Inertia::render('Customer/Index', compact('customers'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Customer/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $customer = new Customer();
        $customer->full_name = $request->full_name;
        $customer->mobile_number = $request->mobile_number;
        $customer->email = $request->email;
        $customer->company = $request->company;
        $customer->address = $request->address;
        $customer->save();

        if ($customer) {
            Session::flash('success', 'Customer created sucessfully!!');
        } else {
            Session::flash('error', 'Error in creating the customer!!');
        }

        return redirect(route('customer.index'));
    }

    public function getCusomter(Customer $customer)
    {
        return $customer;
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
    public function edit(Customer $customer)
    {
        return Inertia::render('Customer/Edit', compact('customer'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Customer $customer)
    {
        $customer->full_name = $request->full_name;
        $customer->mobile_number = $request->mobile_number;
        $customer->email = $request->email;
        $customer->company = $request->company;
        $customer->address = $request->address;
        $customer->save();

        if ($customer) {
            Session::flash('success', 'Customer created sucessfully!!');
        } else {
            Session::flash('error', 'Error in creating the customer!!');
        }

        return redirect(route('customer.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        if ($customer->delete()) {
            Session::flash('success', 'Product deleted sucessfully!!');
        } else {
            Session::flash('error', 'Error in deleting the product');
        }

        return redirect(route('customer.index'));
    }
}
