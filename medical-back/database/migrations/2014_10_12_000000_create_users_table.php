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
        Schema::create('users', function (Blueprint $table) {
            $table->engine = "InnoDB";

            $table->id();
            
            $table->string('fullname');
            $table->string('username')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');

            $table->bigInteger("role_id")->unsigned();
            $table->bigInteger("specialty_id")->unsigned();

            $table->rememberToken();
            $table->timestamps();

            $table->foreign("role_id")->references("id")->on("role")->onDelete("cascade");
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
        Schema::dropIfExists('users');
    }
};
