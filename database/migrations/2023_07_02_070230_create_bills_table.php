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
        Schema::create('bills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id');
            $table->unsignedBigInteger('bill_id')->default(1000)->unique();
            $table->float('estimated_total_kgs')->nullable();
            $table->float('estimated_loading_charges')->nullable();
            $table->float('estimated_crimping_charges')->nullable();
            $table->double('estimated_total_amount')->nullable();
            $table->float('final_total_kgs');
            $table->float('final_crimping_charges');
            $table->float('final_loading_charges');
            $table->double('final_amount');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bills');
    }
};
