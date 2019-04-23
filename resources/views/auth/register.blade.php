@extends('layouts.login')

@section('content')

<div class="account-pages"></div>


<div class="wrapper-page">

            <div class="card">
                <div class="card-body">

                    <h3 class="text-center m-0">
                           
                        
                    </h3>
                   
                    
                    
					<img src="assets/images/logola.png" width="180"  class="float-right" alt="...">
                    <div class="p-3">

                        <h4 class="text-muted font-18 m-b-5 text-center">Bienvenido!</h4>
                        <p class="text-muted text-center">Registrate en RoboGenius.</p>

                 
						 <form class="form-horizontal" method="POST" action="{{ route('register') }}">

							{{ csrf_field() }}
			<!-- e-mail input -->
                            
                                
                                <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                            <label for="name" class="col-md-4 control-label">Nombre</label>

                            
                                <input id="name" type="text" placeholder="Ingrese nombre de usuario" class="form-control" name="name" value="{{ old('name') }}" style="filter: drop-shadow(5px 5px 10px #444);" required autofocus>

                                @if ($errors->has('name'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                          
                        </div>
                            <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email" class="col-md-4 control-label">E-Mail </label>

                            
                                <input id="email" type="email"  placeholder="Ingrese correo electrónico"class="form-control" name="email" value="{{ old('email') }}" style="filter: drop-shadow(5px 5px 10px #444);" required>

                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                           
                        </div>
                          <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label for="password" class="col-md-4 control-label">Contraseña</label>

                            
                                <input id="password" type="password" placeholder="Ingrese contraseña" class="form-control" name="password" style="filter: drop-shadow(5px 5px 10px #444);" required>

                                @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            
                        </div>

                        <div class="form-group">
                            <label for="password-confirm" class="col-md-8 control-label">Confirmar contraseña</label>

                           
                                <input id="password-confirm" type="password"  placeholder="Ingrese nuevamente la contraseña"class="form-control" name="password_confirmation"  style="filter: drop-shadow(5px 5px 10px #444);" required>
                            
                        </div>   
                             <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary waves-effect waves-light">
                                    Registrar
                                </button>
                            </div>
                            
                              <div class="m-t-40 text-center ">
												<p class="text-black-50 " >¿Ya tienes una cuenta ? <a href="login" class="text-blue " style="font-size:20px"> Inicia sesión </a> </p>
											</div>
                            
			
			<!-- Forgot your password -->
                           
                        </form>
                    </div>

                </div>
            </div>
        </div>
       
@endsection
