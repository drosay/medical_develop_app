<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    //
    public function index()
    {
        $specialty = User::all()->slice(1);

        return response()->json($specialty);

    }

    public function getUsersBySpecialty(Request $req)
    {
        $specialtyId = $req->specialty_id;

        $users = User::where('specialty_id', $specialtyId)->get();

        return response()->json($users);
    }
}