<!DOCTYPE html>
<html lang="es">

    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
        <title>RoboGenius </title>
        <meta content="Admin Dashboard" name="description" />
        <meta content="Themesbrand" name="author" />
        <link rel="shortcut icon" href="{{asset('assets/images/favicon.ico')}}">

        <link rel="stylesheet" href="{{asset('assets/plugins/morris/morris.css')}}">

        <link href="{{asset('assets/css/bootstrap.min.css')}}" rel="stylesheet" type="text/css">
        <link href="{{asset('assets/css/icons.css')}}" rel="stylesheet" type="text/css">
        <link href="{{asset('assets/css/style.css')}}" rel="stylesheet" type="text/css">
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script> 
    </head>

    <body ng-app="">
        <!-- Navigation Bar-->
        <header id="topnav">
            <div class="topbar-main">
                <div class="container-fluid">

                    <!-- Logo container-->
                    <div class="logo">
                        
                        <a href="index.html" class="logo">
                            <img src="{{asset('assets/images/logoch.png')}}" alt="" class="logo-small">
                            <img src="{{asset('assets/images/logoch.png')}}" alt="" class="logo-large">
                        </a>

                    </div>

                    <!-- End Logo container-->


                    <div class="menu-extras topbar-custom">

                        <ul class="navbar-right d-flex list-inline float-right mb-0">
                            <li class="dropdown notification-list d-none d-sm-block">
                                <form role="search" class="app-search">
                                    <div class="form-group mb-0"> 
                                        <input type="text" class="form-control" placeholder="Search..">
                                        <button type="submit"><i class="fa fa-search"></i></button>
                                    </div>
                                </form> 
                            </li>
    
                            <li class="dropdown notification-list">
                                <a class="nav-link dropdown-toggle arrow-none waves-effect waves-light" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                    <!-- <i class="mdi mdi-bell noti-icon"></i> -->
                                    <span class="badge badge-pill badge-info noti-icon-badge">3</span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg">
                                    <!-- item-->
                                    <h6 class="dropdown-item-text">
                                     
                                    </h6>
                                    <div class="slimscroll notification-item-list">
                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item notify-item active">
                                            <div class="notify-icon bg-success"><i class="mdi mdi-cart-outline"></i></div>
                                            <p class="notify-details">Your order is placed<span class="text-muted">Dummy text of the printing and typesetting industry.</span></p>
                                        </a>
                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                                            <div class="notify-icon bg-warning"><i class="mdi mdi-message"></i></div>
                                            <p class="notify-details">New Message received<span class="text-muted">You have 87 unread messages</span></p>
                                        </a>
                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                                            <div class="notify-icon bg-info"><i class="mdi mdi-flag"></i></div>
                                            <p class="notify-details">Your item is shipped<span class="text-muted">It is a long established fact that a reader will</span></p>
                                        </a>
                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                                            <div class="notify-icon bg-primary"><i class="mdi mdi-cart-outline"></i></div>
                                            <p class="notify-details">Your order is placed<span class="text-muted">Dummy text of the printing and typesetting industry.</span></p>
                                        </a>
                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                                            <div class="notify-icon bg-danger"><i class="mdi mdi-message"></i></div>
                                            <p class="notify-details">New Message received<span class="text-muted">You have 87 unread messages</span></p>
                                        </a>
                                    </div>
                                    <!-- All-->
                                    <a href="javascript:void(0);" class="dropdown-item text-center text-primary">
                                        View all <i class="fi-arrow-right"></i>
                                    </a>
                                </div>        
                            </li>
                            <li class="dropdown notification-list">
                                <div class="dropdown notification-list">
                                    <a class="dropdown-toggle nav-link arrow-none waves-effect nav-user waves-light" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                        <img src="uploads/avatars/{{ $user->avatar }}" alt="user" class="rounded-circle">
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right profile-dropdown ">
                                        <!-- item-->
                                        <?php
                                               $id=Auth::user()->id ;
                                                ?>
                                        <a class="dropdown-item" href="{{route('profile',$id)}}"><i class="mdi mdi-account-circle m-r-5"></i>{{Auth::user()->name}}</a>
                                        <a class="dropdown-item" href="#"><i class="mdi mdi-lock-open-outline m-r-5"></i>Bloquear</a>
                                        <div class="dropdown-divider"></div>
										<a  class="dropdown-item text-danger" href="{{ route('logout') }}"
											onclick="event.preventDefault();
											document.getElementById('logout-form').submit();">
												<i class="mdi mdi-power text-danger"></i>Salir</a>
										</a>

										<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
												{{ csrf_field() }}
										</form>
													
													
                                       
                                    </div>                                                                    
                                </div>
                            </li>
                            
                            <li class="menu-item list-inline-item">
                                <!-- Mobile menu toggle-->
                                <a class="navbar-toggle nav-link">
                                    <div class="lines">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </a>
                                <!-- End mobile menu toggle-->
                            </li>

                        </ul>
    
    
    
                    </div>
                    <!-- end menu-extras -->

                    <div class="clearfix"></div>

                </div> <!-- end container -->
            </div>
		
            <!-- end topbar-main -->

            <!-- MENU Start -->
            <div class="navbar-custom">
                <div class="container-fluid">
                    <div id="navigation">
                        <!-- Navigation Menu-->
                        <ul class="navigation-menu">

                            <li>
                                <a href="index.html"><i class="mdi mdi-home"></i>Inicio</a>
                            </li>

                            <li class="has-submenu">
                                <a href="#"><i class="ion-ios7-people"></i>Usuarios</a>
                                <ul class="submenu">

                                    <li>
                                        <a href="#">Tipos de usuarios</a>
                                    </li>

                                    <li>
                                        <a href="#">Alumnos</a>
                                    </li>
                                        
                                    <li class="has-submenu">
                                        <a href="#">Padres</a>
                                        <ul class="submenu">
                                            <li>
                                                <a href="#">Hijos por padre</a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li class="has-submenu">
                                        <a href="#">Instructores</a>
                                        <ul class="submenu">
                                            <li>
                                                <a href="#">Tipos de instructores</a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li>
                                        <a href="#">Usuarios del sistema</a>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <a href="#"><i class="mdi mdi-account-group"></i>Grupos</a>   
                            </li>

                            <li>
                                <a href="#"><i class="mdi mdi-basket"></i>Productos</a>
                            </li>

                            <li class="has-submenu">
                                <a href="#"><i class="mdi mdi-basket"></i>Pagos</a>
                                <ul class="submenu">
                                    <li><a href="#">Tipos de pago</a></li>
                                </ul>
                            </li>

                        </ul>
                        <!-- End navigation menu -->
                    </div> <!-- end #navigation -->
                </div> <!-- end container -->
            </div> <!-- end navbar-custom -->
        </header>
        <!-- End Navigation Bar-->

        <!-- page wrapper start -->
        <div class="wrapper">
            <div class="page-title-box">
                <div class="container-fluid">

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="state-information d-none d-sm-block">
                                <div class="state-graph">
                                    <div id="header-chart-1"></div>
                                    <div class="info">Balance $ 2,317</div>
                                </div>
                                <div class="state-graph">
                                    <div id="header-chart-2"></div>
                                    <div class="info">Item Sold 1230</div>
                                </div>
                            </div>
                            
                            <h4 class="page-title">Form Validation</h4>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:void(0);">Agroxa</a></li>
                                <li class="breadcrumb-item"><a href="javascript:void(0);">Forms</a></li>
                                <li class="breadcrumb-item active">Form Validation</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <!-- end container-fluid -->
            
            </div>
            <!-- page-title-box -->

            <div class="page-content-wrapper">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card m-b-20">
                                <div class="card-body">
    
                                    <h2 class="mt-0 ">Pefil</h2>
                                   
    
										 <div class="col-md-10 col-md-offset-1">
												<img src="uploads/avatars/{{ $user->avatar }}" style="width:150px; height:150px; float:left; border-radius:50%; margin-right:25px;">
												<h2>{{ $user->name }}</h2>
												<form enctype="multipart/form-data" action="profile" method="POST">
													<br>
													<input type="file" name="avatar">
													<br>
													<input type="hidden" name="_token" value="{{ csrf_token() }}">
													<input type="submit" value="Actualizar Avatar" class="pull-right btn btn-sm btn-primary">
												</form>
											</div>
                                                
                                    <form  action="{{route('editar',$id)}}" method="post">
                                        {{ csrf_field() }}
										
                                        <div class="form-group">
										<br><br><br>
                                            <label>Nombre de usuario</label>
                                            <input name="nombredusu" type="text"  class="form-control" required value=" {{ Auth::user()->name }}"/>
                                        </div>
                                        <div class="form-group">
                                            <label>E-Mail</label>
                                            <div>
                                                <input name="email" type="email" class="form-control" required
                                                        parsley-type="email" value="{{ Auth::user()->email }}"/>
                                            </div>
                                        </div>
										 <div class="form-group">
                                            <label>Nombre</label>
                                            <input name="nom" type="text" class="form-control" required value=" {{ Auth::user()->nombre }}" />
                                        </div>
										 <div class="form-group">
                                            <label>Apellidos</label>
                                            <input name="apellidos" type="text" class="form-control" required value="{{ Auth::user()->apellidos }}"/>
                                        </div>
										 <div class="form-group">
                                            <label>Teléfono</label>
                                            <div>
                                                <input name="tel" type="text" class="form-control" required
                                                        data-parsley-maxlength="10" value="{{ Auth::user()->telefono }}"/>
                                            </div>
                                        </div> 
									
                                       
                                       
                                        <div class="form-group">
                                            <div>
                                                <button type="submit" class="btn btn-primary waves-effect waves-light">
                                                    Actualizar
                                                </button>
                                                <button type="reset" class="btn btn-secondary waves-effect m-l-5">
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    </form>
    
                                </div>
                            </div>
                        </div> <!-- end col -->
    
                     
                        </div> <!-- end col -->
                    </div> <!-- end row -->  
                </div>
                <!-- end container-fluid -->
            </div>
            <!-- end page content-->

        </div>
        <!-- page wrapper end -->

        <!-- Footer -->
           <footer class="footer">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                       <i> 2019 © RoboGenius <span class="d-none d-sm-inline-block"></i> by Slide</span>
                    </div>
                </div>
            </div>
        </footer>
        <!-- End Footer -->


        <!-- jQuery  -->
        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/js/bootstrap.bundle.min.js"></script>
        <script src="assets/js/jquery.slimscroll.js"></script>
        <script src="assets/js/waves.min.js"></script>

        <script src="../plugins/jquery-sparkline/jquery.sparkline.min.js"></script>
        
        <!-- Parsley js -->
        <script src="../plugins/parsleyjs/parsley.min.js"></script>

        <!-- App js -->
        <script src="assets/js/app.js"></script>

        <script>
            $(document).ready(function() {
                $('form').parsley();
            });
        </script>    

    </body>

</html>