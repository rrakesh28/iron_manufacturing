<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Customer;
use App\Models\Estimate;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use Illuminate\Support\Facades\Hash;

class HomeController extends Controller
{
    public function index()
    {
        $productsCount = Product::count();
        $customersCount = Customer::count();
        $estimatesCount = Estimate::count();
        $billsCount = Bill::count();

        $crimpingCharges = Bill::sum('final_crimping_charges');
        $loadingCharges = Bill::sum('final_loading_charges');
        $transportCharges = Bill::sum('final_transport_charges');

        return Inertia::render('Index', compact('productsCount', 'customersCount', 'estimatesCount', 'billsCount', 'crimpingCharges', 'loadingCharges', 'transportCharges'));
    }

    public function settings()
    {
        return Inertia::render('Settings');
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        Auth::logout();

        return redirect(route('login'));
    }
}
