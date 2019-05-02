<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
        <title>RoboGenius </title>
        <meta content="Admin Dashboard" name="description" />
        <meta content="Themesbrand" name="author" />
        <link rel="shortcut icon" href="assets/images/favicon.ico">

        <!-- DataTables -->
        <link href="../plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
        <link href="../plugins/datatables/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css" />
        <!-- Responsive datatable examples -->
        <link href="../plugins/datatables/responsive.bootstrap4.min.css" rel="stylesheet" type="text/css" />

        <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
        <link href="assets/css/icons.css" rel="stylesheet" type="text/css">
        <link href="assets/css/style.css" rel="stylesheet" type="text/css">
        <link href="{{asset('assets/css/bootstrap.min.css')}}" rel="stylesheet" type="text/css">
        <link href="{{asset('assets/css/icons.css')}}" rel="stylesheet" type="text/css">
        <link href="{{asset('assets/css/style.css')}}" rel="stylesheet" type="text/css">
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script> 
    </head>

    <body>

        <!-- Navigation Bar-->
        <header id="topnav">
            <div class="topbar-main">
                <div class="container-fluid">

                    <!-- Logo container-->
                     <div class="logo">
                        
                        <a href="http://localhost:8080/robogenius/public/home" class="logo">
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
                                    <i class="mdi mdi-bell noti-icon"></i>
                                    <span class="badge badge-pill badge-info noti-icon-badge">3</span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg">
                                    <!-- item-->
                                    <h6 class="dropdown-item-text">
                                        Notifications (37)
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
                                        <img src="assets/images/users/user-4.jpg" alt="user" class="rounded-circle">
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right profile-dropdown ">
                                        <!-- item-->
                                        <a class="dropdown-item" href="#"><i class="mdi mdi-account-circle m-r-5"></i> Profile</a>
                                        <a class="dropdown-item" href="#"><i class="mdi mdi-wallet m-r-5"></i> My Wallet</a>
                                        <a class="dropdown-item d-block" href="#"><span class="badge badge-success float-right">11</span><i class="mdi mdi-settings m-r-5"></i> Settings</a>
                                        <a class="dropdown-item" href="#"><i class="mdi mdi-lock-open-outline m-r-5"></i> Lock screen</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item text-danger" href="#"><i class="mdi mdi-power text-danger"></i> Logout</a>
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
                                        <a href="#">Personal</a>
                                        <ul class="submenu">
                                            <li>
                                                <a href="#">Tipo de personal</a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li>
                                        <a href="#">Usuarios del sistema</a>
                                    </li>
                                    <li>
                                        <a href="/escuela">Escuelas</a>
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
                            
                            <h4 class="page-title">Escuelas</h4>
                        </div>
                    </div>
                </div>
                <!-- end container-fluid -->
            
            </div>
            <!-- page-title-box -->

            <div class="page-content-wrapper">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">

                            <div class="card m-b-20">

                                <div class="card-body">
                                    <form class="navbar-form" action="buscaresc" method="POST">
              {{csrf_field()}}
              <div class="input-group no-border">
                <input type="text" name="criterio" class="form-control" placeholder="Buscar...">
                <button type="submit" name="BUSCAR" class="btn btn-white btn-round btn-just-icon">
                  <i class="material-icons">search</i>
                  <div class="ripple-container"></div>
                </button>
              </div>
            </form>

                                    <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Representante</th>
                                            <th>Dirección</th>
                                            <th>Email</th>
                                            <th>Telefono</th>
                                            <th>Activo</th>
                                            <th>Editar</th>
                                            <th>Eliminar</th>
                                        </tr>
                                        </thead>
                                         <?php
                                        $escuelas=' ';
                                        $escuelas =DB::SELECT("SELECT * FROM escuelas");

                                    ?>
                                    @foreach($escuelas as $esc)
                                    <tr>
                                    <td>{{$esc->idesc}}</td>    
                                    <td>{{$esc->nombre}}</td>
                                    <td>{{$esc->representante}}</td>
                                    <td>{{$esc->direccion}}</td>
                                    <td>{{$esc->correo}}</td>
                                    <td>{{$esc->telefono}}</td>
                                    <td>{{$esc->activo}}</td>
                                    <td><button href="{{URL::action('EscuelaController@borraresc',['idesc'=>$esc->idesc])}}" type="btn btn-primary" for="editar" class="btn btn-info btn-fab btn-round">
                                    <i class="material-icons">Editar</button></td>
                                    <td><a href="{{URL::action('EscuelaController@borraresc',['idesc'=>$esc->idesc])}}" onclick="return confirm('estas seguro de eliminar este campo?');" class="btn btn-danger btn-fab btn-round">
                                    <i class="material-icons">Eliminar</button></td>
                                    </tr>
                                    @endforeach

                                    </table>

                                </div>
                            </div>
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
                        2018 © Robogenius <span class="d-none d-sm-inline-block"> - Crafted with <i class="mdi mdi-heart text-danger"></i> by Themesbrand</span>
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

        <!-- Required datatable js -->
        <script src="../plugins/datatables/jquery.dataTables.min.js"></script>
        <script src="../plugins/datatables/dataTables.bootstrap4.min.js"></script>
        <!-- Buttons examples -->
        <script src="../plugins/datatables/dataTables.buttons.min.js"></script>
        <script src="../plugins/datatables/buttons.bootstrap4.min.js"></script>
        <script src="../plugins/datatables/jszip.min.js"></script>
        <script src="../plugins/datatables/pdfmake.min.js"></script>
        <script src="../plugins/datatables/vfs_fonts.js"></script>
        <script src="../plugins/datatables/buttons.html5.min.js"></script>
        <script src="../plugins/datatables/buttons.print.min.js"></script>
        <script src="../plugins/datatables/buttons.colVis.min.js"></script>
        <!-- Responsive examples -->
        <script src="../plugins/datatables/dataTables.responsive.min.js"></script>
        <script src="../plugins/datatables/responsive.bootstrap4.min.js"></script>

        <!-- Datatable init js -->
        <script src="assets/pages/datatables.init.js"></script>

        <!-- App js -->
        <script src="assets/js/app.js"></script>

         <script>
            $('#datatable').editableTableWidget().numericInputExample().find('td:first').focus();
        </script>

    </body>

</html>