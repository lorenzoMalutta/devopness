<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            $token = auth()->user()->createToken('auth_token');
            $response = ['token' => $token->plainTextToken];
            return response($response, 200);
        } else {
            $response = "Email or password is wrong!";
            return response($response, 422);
        }
    }

    //make a logout function
    public function logout()
    {
        $token = auth()->user()->tokens();
        $token->delete();
        $response = 'You have been succesfully logged out!';
        return response($response, 200);
    }

    public function register(Request $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();

        $response = 'You have been succesfully registered!';
        return response($response, 200);
    }
}
