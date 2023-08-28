<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Specialty;

class SpecialtyController extends Controller
{
    //
    public function index()
    {
        $specialty = Specialty::all()->slice(1);

        return response()->json($specialty);

    }
}