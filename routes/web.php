<?php

use App\Http\Controllers\BillController;
use App\Http\Controllers\ConversionController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EstimateController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Models\Bill;
use App\Models\Customer;
use App\Models\Estimate;
use App\Models\Product;
use Illuminate\Foundation\Application;
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

Route::get('/', function () {
    $productsCount = Product::count();
    $customersCount = Customer::count();
    $estimatesCount = Estimate::count();
    $billsCount = Bill::count();
    return Inertia::render('Index',compact('productsCount','customersCount','estimatesCount','billsCount'));
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/estimate',[EstimateController::class,'index'])->name('estimate.index');
Route::get('estimate/create',[EstimateController::class,'create'])->name('estimate.create');
Route::post('estimate',[EstimateController::class,'store'])->name('estimate.store');
Route::get('/estimate/{estimate}/convert',[EstimateController::class,'convertCreate'])->name('estimate.convert.create');
Route::post('/estimate-convert',[EstimateController::class,'convertStore'])->name('estimate.convert.store');
Route::get('estimate/{estimate}/show',[EstimateController::class,'show'])->name('estimate.show');
Route::get('estimate/{estimate}/edit',[EstimateController::class,'edit'])->name('estimate.edit');
Route::post('estimate/{estimate}/update',[EstimateController::class,'update'])->name('estimate.update');
Route::post('estimate/{estimate}/destroy',[EstimateController::class,'destroy'])->name('estimate.destroy');

Route::get('/bill',[BillController::class,'index'])->name('bill.index');
Route::get('/bill/create',[BillController::class,'create'])->name('bill.create');
Route::post('/bill',[BillController::class,'store'])->name('bill.store');
Route::get('/bill/{bill}/show',[BillController::class,'show'])->name('bill.show');
Route::get('/bill/{bill}/edit',[BillController::class,'edit'])->name('bill.edit');
Route::post('/bill/{bill}/update',[BillController::class,'update'])->name('bill.update');
Route::post('/bill/{bill}/destroy',[BillController::class,'destroy'])->name('bill.destroy');


Route::get('/products',[ProductController::class,'index'])->name('product.index');
Route::get('/product/create',[ProductController::class,'create'])->name('product.create');
Route::post('/product',[ProductController::class,'store'])->name('product.store');
Route::get('/product/{id}/show',[ProductController::class,'show'])->name('product.show');
Route::get('/product/{product}/edit',[ProductController::class,'edit'])->name('product.edit');
Route::post('/product/{product}/update',[ProductController::class,'update'])->name('product.update');
Route::post('/product/{product}/destroy',[ProductController::class,'destroy'])->name('product.destroy');

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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
