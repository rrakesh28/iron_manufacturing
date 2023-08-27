<?php

use App\Http\Controllers\BillController;
use App\Http\Controllers\ConversionController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EstimateController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
        
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/',[HomeController::class,'index'])->name('home');
    Route::get('/settings',[HomeController::class,'settings'])->name('settings');
    Route::post('/settings',[HomeController::class,'update'])->name('settings.update');
    
    Route::get('/estimate',[EstimateController::class,'index'])->name('estimate.index');
    Route::get('estimate/create',[EstimateController::class,'create'])->name('estimate.create');
    Route::post('estimate',[EstimateController::class,'store'])->name('estimate.store');
    Route::get('/estimate/{estimate}/convert',[EstimateController::class,'convertCreate'])->name('estimate.convert.create');
    Route::post('/estimate-convert',[EstimateController::class,'convertStore'])->name('estimate.convert.store');
    Route::get('estimate/{estimate}/show',[EstimateController::class,'show'])->name('estimate.show');
    Route::get('estimate/{estimate}/invoice',[EstimateController::class,'invoice'])->name('estimate.invoice');
    Route::get('estimate/{estimate}/edit',[EstimateController::class,'edit'])->name('estimate.edit');
    Route::post('estimate/{estimate}/update',[EstimateController::class,'update'])->name('estimate.update');
    Route::post('estimate/{estimate}/destroy',[EstimateController::class,'destroy'])->name('estimate.destroy');
    Route::post('estimate/{estimate}/addCrimpingCharges',[EstimateController::class,'addCrimpingCharges'])->name('estimate.addCrimpingCharges');
    Route::post('estimate/{estimate}/addLoadingCharges',[EstimateController::class,'addLoadingCharges'])->name('estimate.addLoadingCharges');
    Route::post('estimate/{estimate}/addDiscount',[EstimateController::class,'addDiscount'])->name('estimate.addDiscount');
    Route::post('estimate/{product}/delete',[EstimateController::class,'deleteProduct'])->name('estimate.delete.product');
    
    Route::get('/bill',[BillController::class,'index'])->name('bill.index');
    Route::get('/bill/create',[BillController::class,'create'])->name('bill.create');
    Route::post('/bill',[BillController::class,'store'])->name('bill.store');
    Route::get('/bill/{bill}/show',[BillController::class,'show'])->name('bill.show');
    Route::get('/bill/{bill}/invoice',[BillController::class,'invoice'])->name('bill.invoice');
    Route::get('/bill/{bill}/edit',[BillController::class,'edit'])->name('bill.edit');
    Route::post('/bill/{bill}/update',[BillController::class,'update'])->name('bill.update');
    Route::post('/bill/{bill}/destroy',[BillController::class,'destroy'])->name('bill.destroy');
    Route::post('bill/{bill}/addCrimpingCharges',[BillController::class,'addCrimpingCharges'])->name('bill.addCrimpingCharges');
    Route::post('bill/{bill}/addTransportCharges',[BillController::class,'addTransportCharges'])->name('bill.addTransportCharges');
    Route::post('bill/{bill}/addLoadingCharges',[BillController::class,'addLoadingCharges'])->name('bill.addLoadingCharges');
    Route::post('bill/{bill}/addDiscount',[BillController::class,'addDiscount'])->name('bill.addDiscount');
    Route::get('bill/{bill}/editWeight',[BillController::class,'editWeight'])->name('bill.editWeight');
    Route::post('bill/{bill}/updateWeight',[BillController::class,'updateWeight'])->name('bill.updateWeight');
    Route::post('bill/{product}/delete',[BillController::class,'deleteProduct'])->name('bill.delete.product');
    
    
    Route::get('/products',[ProductController::class,'index'])->name('product.index');
    Route::get('/product/create',[ProductController::class,'create'])->name('product.create');
    Route::post('/product',[ProductController::class,'store'])->name('product.store');
    Route::get('/product/{id}/show',[ProductController::class,'show'])->name('product.show');
    Route::get('/product/{product}/edit',[ProductController::class,'edit'])->name('product.edit');
    Route::post('/product/{product}/update',[ProductController::class,'update'])->name('product.update');
    Route::post('/product/{product}/destroy',[ProductController::class,'destroy'])->name('product.destroy');
    Route::get('/product/{product}/getproduct',[ProductController::class,'getProduct'])->name('product.get');
    
    Route::get('/customers',[CustomerController::class,'index'])->name('customer.index');
    Route::get('/customer/create',[CustomerController::class,'create'])->name('customer.create');
    Route::post('/customer',[CustomerController::class,'store'])->name('customer.store');
    Route::get('/customer/{id}/show',[CustomerController::class,'show'])->name('customer.show');
    Route::get('/get-customer/{customer}',[CustomerController::class,'getCusomter'])->name('customer.get');
    Route::get('/customer/{customer}/edit',[CustomerController::class,'edit'])->name('customer.edit');
    Route::post('/customer/{customer}/update',[CustomerController::class,'update'])->name('customer.update');
    Route::post('/customer/{customer}/destroy',[CustomerController::class,'destroy'])->name('customer.destroy');
    
    
    Route::get('/conversion/create',[ConversionController::class,'create'])->name('conversion.create');
    Route::post('/conversion',[ConversionController::class,'store'])->name('conversion.store');
    
    Route::get('/inventory',[InventoryController::class,'index'])->name('inventory.index');
    Route::get('/inventory/create',[InventoryController::class,'create'])->name('inventory.create');
    Route::post('/inventory',[InventoryController::class,'store'])->name('inventory.store');
    Route::get('/inventory/getLogs',[InventoryController::class,'getLogs'])->name('inventory.getLogs');
    Route::post('/inventory/{inventory}/add',[InventoryController::class,'add'])->name('inventory.add');
    Route::get('/inventory/{inventory}/show',[InventoryController::class,'show'])->name('inventory.show');
    Route::get('/inventory/{inventory}/edit',[InventoryController::class,'edit'])->name('inventory.edit');
    Route::post('/inventory/{inventory}/update',[InventoryController::class,'update'])->name('inventory.update');
    Route::post('/inventory/{inventory}/destroy',[InventoryController::class,'destroy'])->name('inventory.destroy');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
