@extends('layout.homep')

@section('content')
        <!-- Backgroud -->
<div class="account-pages"></div>
        <!-- Begin page -->
        <div class="wrapper-page">

            <div class="card">
                <div class="card-body">

                    <h3 class="text-center m-0">
                        <a href="index.html" class="logo logo-admin"><img src="assets/images/logo.png" height="30" alt="logo"></a>
                    </h3>

                    <div class="p-3">
                        <h4 class="text-muted font-18 m-b-5 text-center">Bienvenido!</h4>
                        <p class="text-muted text-center">Inicia Sesión para continuar a RoboGenius.</p>

                        <form class="form-horizontal m-t-30" method="POST" action="{{ route('login') }}">

                            {{ csrf_field() }}
            <!-- e-mail input -->
                            <div class="form-group {{ $errors->has('email') ? ' has-error' : '' }}">
                                <label  for="email">Correo electrónico</label>
                                <input id="email" type="email" class="form-control" name="email" placeholder="Ingrese correo electrónico" value=" {{ old('email')}}" required autofocus>
                                <!-- Error: email incorrecto -->
                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
            <!-- password input -->
                            <div class="form-group {{ $errors->has('password') ? ' has-error' : '' }}">
                                <label for="password">Contraseña</label>
                                <input type="password" class="form-control" id="password" placeholder="Ingrese contraseña" name="password" required autofocus>
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
                                        <label class="custom-control-label" for="customControlInline">Recuérdame</label>
                                    </div>
                                </div>
                                <!-- Login button -->
                                <div class="col-6 text-right">
                                    <button class="btn btn-primary w-md waves-effect waves-light" type="submit">Iniciar Sesión</button>
                                </div>
                            </div>
                             <!-- Forgot your password -->
                            <div class="form-group m-t-10 mb-0 row">
                                <div class="col-12 m-t-20">
                                    <a href="{{ route('password.request') }}" class="text-muted"><i class="mdi mdi-lock"></i>¿Olvidaste tu contraseña?</a>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>

@endsection