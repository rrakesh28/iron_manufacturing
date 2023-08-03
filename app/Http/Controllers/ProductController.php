<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Facades\Session ;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $products = Product::all();
        if($request->search){
            $search = $request->search;
            $products = Product::where('name','LIKE','%'.$search.'%')->get();
        }

        if($request->wantsJson()){
            return $products;
        }
        return Inertia::render('Product/Index',compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Product/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // dd($request->all());
        $product = new Product();
        $product->name = $request->product_name;
        $product->unit_type = $request->unit_type;
        if($request->unit_type == 'Feet'){
            $product->in_kgs = $request->in_kgs;
        }
        $product->price_per_kg = $request->price_per_kg;
        $product->price_per_unit = $request->price_per_unit;
        $product->save();

        if($product){
            Session::flash('success','Product Created Sucessfully!!');
        }
        else{
            Session::flash('error','Error in Creating the product');
        }

        return redirect(route('product.index'));
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
    public function edit(Product $product)
    {
        return Inertia::render('Product/Edit',compact('product'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        
        $product->name = $request->product_name;
        $product->unit_type = $request->unit_type;
        if($request->unit_type == 'Feet'){
            $product->in_kgs = $request->in_kgs;
        }
        $product->price_per_kg = $request->price_per_kg;
        $product->price_per_unit = $request->price_per_unit;
        $product->save();

        if($product){
            Session::flash('success','Product Updated Sucessfully!!');
        }
        else{
            Session::flash('error','Error in Updating the product');
        }

        return redirect(route('product.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if($product->delete()){
            Session::flash('success','Product deleted sucessfully!!');
        }else{
            Session::flash('error','Error in deleting the product');
        }

        return redirect(route('product.index'));
    }
}
