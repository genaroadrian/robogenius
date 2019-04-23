@extends('layouts.login')

@section('content')

<div class="account-pages"></div>
        <!-- Begin page -->
                    
        <div class="wrapper-page">

            <div class="card">
                <div class="card-body">

                    <h3 class="text-center m-0">
                             <div >
                                 <img src="http://pngimg.com/uploads/robot/robot_PNG79.png" width="200"  class="float-right" alt="...">
                        </div>
                        
                    </h3>
                   
                    
                    
					<img src="assets/images/logola.png" width="180"  class="float-right" alt="...">
                    <div class="p-3">
                            <br>
                            <br>
                            <br>
                        <h4 class="text-muted font-18 m-b-5 text-center">Bienvenido!</h4>
                        <p class="text-muted text-center">Inicia Sesión para continuar a RoboGenius.</p>

                        <form class="form-horizontal m-t-30" method="POST" action="{{ route('login') }}">

							{{ csrf_field() }}
			<!-- e-mail input -->
                            <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
							<br>
							<br>
							<br>
							<br>
                                <label  for="email">Correo electrónico</label>
                                <input id="email" type="email" class="form-control" name="email" placeholder="Ingrese correo electrónico"  style="filter: drop-shadow(5px 5px 10px #444);" value=" {{ old('email')}}" required >
                                <!-- Error: email incorrecto -->
                                
                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
			<!-- password input -->
                            <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                                <label for="userpassword">Contraseña</label>
                                <input type="password" class="form-control" id="userpassword" placeholder="Ingrese contraseña"  style="filter: drop-shadow(5px 5px 10px #444);"name="password" required>
                                <!-- Error: contraseña incorrecta -->
                                @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
			<!-- Remember-me button -->
                            <div class="form-group row m-t-20">
                                <div class="col-6">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="customControlInline" name="remember" {{ old('remember') ? 'checked' : '' }}>
                                        <label class="custom-control-label"  for="customControlInline">Recuérdame</label>
                                    </div>
                                </div>
            <!-- Login button -->
                                <div class="col-6 text-right">
                                    <button class="btn btn-primary w-md waves-effect waves-light waves-effect waves-light "  id="sa-params" style="filter: drop-shadow(5px 5px 10px #444);"type="submit">Iniciar Sesión</button>
                                </div>
                            </div>
			<!-- Forgot your password -->
                            <div class="form-group m-t-10 mb-0 row">
                                <div class="col-12 m-t-20">
                                    <a class="btn btn-warning" href="{{ url('/password/reset') }}">Olvidaste tu contraseña</a>
                                </div>
                            </div>
										  <div class="m-t-40 text-center ">
												<p class="text-black-50 " >¿No tienes una cuenta? <a href="register" class="text-blue " style="font-size:20px"> Regístrate ahora </a> </p>
											</div>
                        </form>
                    </div>

                </div>
            </div>

        </div>

@endsection