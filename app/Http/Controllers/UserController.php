<?php

namespace slidecom_robogenius\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Auth;
use Image;

class UserController extends Controller
{
    //
    public function profile(){
        
        $id=Auth::user()->id ; 
       
            
          
    	return view('profile' ,['id'=>$id],array('user' => Auth::user()) );
    }

    public function update_avatar(Request $request){

    	// Handle the user upload of avatar
    	if($request->hasFile('avatar')){
    		$avatar = $request->file('avatar');
    		$filename = time() . '.' . $avatar->getClientOriginalExtension();
    		Image::make($avatar)->resize(300, 300)->save( public_path('/uploads/avatars/' . $filename ) );

    		$user = Auth::user();
    		$user->avatar = $filename;
    		$user->save();
    	}

    	return view('profile', array('user' => Auth::user()) );

    }
}
