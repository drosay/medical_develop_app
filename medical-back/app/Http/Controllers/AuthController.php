<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Validator;
use App\Models\User;

class AuthController extends Controller
{
    //
    public function _construct(){
        $this->middleware('auth:api',['except'=>['login','register']]);
    }
    public function register(Request $req){
        $validator = Validator::make($req->all(),[
            'fullname'=>'required',
            'username'=>'required|string|email|unique:users',
            'password'=>'required|string|confirmed|min:5',
            'role_id'=>'required',
            'specialty_id'=>'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(),400);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            ['password'=>bcrypt($req->password)]
        ));

        return response()->json([
            'message'=> 'User successfully registered',
            'user'=>$user,
        ],201);
    }

    public function login(Request $req){
        $validator = Validator::make($req->all(),[
            'username'=>'required|string|email',
            'password'=>'required|string|min:5',
        ]);
        
        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }

        if(!$token=auth()->attempt($validator->validated())){
            return response()->json(['error'=>'Unauthorized'],401);
        }

        return $this->createNewToken($token);

    }

    public function createNewToken($token){
        return response()->json([
            'access_token'=>$token,
            'token_type'=>'bearer',
            'expires_in'=>auth()->factory()->getTTL()*0.01,
            'user'=>auth()->user()
        ]);
    }

    public function profile(){
        return response()->json(auth()->user());
    }

    public function logout(){
        auth()->logout();
        return response()->json([
            'message'=> 'User logged out',
        ]);
    }
}
