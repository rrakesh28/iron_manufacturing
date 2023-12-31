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
        Schema::create('bills_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bill_id');
            $table->foreignId('product_id');
            $table->string('product_name');
            $table->string('unit_type');
            $table->float('in_kgs')->nullable();
            $table->float('price_per_kg')->nullable();
            $table->float('price_per_unit')->nullable();
            $table->string('unit_selected');
            $table->integer('estimated_quantity')->nullable();
            $table->float('estimated_feets')->nullable();
            $table->float('estimated_inches')->nullable();
            $table->float('estimated_kgs')->nullable();
            $table->float('estimated_total_kgs')->nullable();
            $table->double('estimated_amount')->nullable();
            $table->double('estimated_final_amount')->nullable();
            $table->integer('final_quantity')->nullable();
            $table->float('final_feets')->nullable();
            $table->float('final_inches')->nullable();
            $table->float('final_kgs')->nullable();
            $table->float('final_total_kgs')->nullable();
            $table->string('color')->nullable();
            $table->double('final_amount');
            $table->double('final_total_amount');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bills_products');
    }
};
