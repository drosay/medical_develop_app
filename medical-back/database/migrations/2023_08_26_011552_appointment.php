<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('appointment', function (Blueprint $table) {
            $table->engine = "InnoDB";
            
            $table->bigIncrements('id');
            
            $table->timestamp("date");
            
            $table->bigInteger("patient_id")->unsigned();
            $table->bigInteger("doctor_id")->unsigned();
            $table->bigInteger("specialty_id")->unsigned();
            
            $table->string("state");
            $table->string("observation");

            $table->timestamps();

            $table->foreign("patient_id")->references("id")->on("users")->onDelete("cascade");
            $table->foreign("doctor_id")->references("id")->on("users")->onDelete("cascade");
            $table->foreign("specialty_id")->references("id")->on("specialty")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
