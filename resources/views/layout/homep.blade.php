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
    </head>

    <body>

                            <!-- Start content -->
                            @yield('content')
      <!-- Footer -->
        <footer class="footer">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        2019 © RoboGenius <span class="d-none d-sm-inline-block"></i> by Slide</span>
                    </div>
                </div>
            </div>
        </footer>
        <!-- End Footer -->
<script src="{{asset('assets/js/jquery.min.js')}}"></script>
        <script src="{{asset('assets/js/bootstrap.bundle.min.js')}}"></script>
        <script src="{{asset('assets/js/jquery.slimscroll.js')}}"></script>
        <script src="{{asset('assets/js/waves.min.js')}}"></script>

        <script src="{{asset('assets/plugins/jquery-sparkline/jquery.sparkline.min.js')}}"></script>
        <!-- END jQuery GENERALES -->
        <!-- App js GENERALES-->
        <script src="{{asset('assets/js/app.js')}}"></script>
        <!-- END App js GENERALES-->

    </body>

</html>