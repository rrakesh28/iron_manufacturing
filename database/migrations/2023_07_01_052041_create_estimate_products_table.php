<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('estimate_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('estimate_id');
            $table->foreignId('product_id');
            $table->string('product_name');
            $table->string('unit_type');
            $table->float('in_kgs')->nullable();
            $table->float('price_per_kg')->nullable();
            $table->float('price_per_unit')->nullable();
            $table->string('unit_selected');
            $table->string('quantity')->nullable();
            $table->float('feets')->nullable();
            $table->float('inches')->nullable();
            $table->float('kgs')->nullable();
            $table->float('total_kgs')->nullable();
            $table->string('color')->nullable();
            $table->double('amount');
            $table->double('final_amount');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estimate_products');
    }
};
