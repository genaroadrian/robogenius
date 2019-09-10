<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Recuperación de contraseña</title>
    <style>
@import url('https://fonts.googleapis.com/css?family=Hind+Vadodara|Livvic&display=swap');
        * {
            font-family: 'Hind Vadodara', sans-serif;
            font-size: 105%;
        }

        .btn-material {
            /* Para <button> */
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
            -webkit-appearance: none;
            -moz-appearance: none;
            border: none;
            background: none;
            cursor: pointer;
            padding: 0;

            /* Para <a> */
            display: inline-block;
            text-decoration: none;

            /* Otros */
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            white-space: nowrap;
            vertical-align: middle;
            margin-left: 40%;
        }

        .btn-material {
            padding: 0 16px;
            border-radius: 2px;
            background-color: #E5E7E9;
            box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 1px 5px 0 rgba(0, 0, 0, 0.12);
            color: #17202A;
            transition: background-color 15ms linear,
                box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);

            height: 36px;
            line-height: 2.25rem;
            font-family: Roboto, sans-serif;
            font-size: 0.875rem;
            font-weight: 500;
            letter-spacing: 0.06em;
            text-transform: uppercase;
        }

        .btn-material:hover,
        .btn-material:focus {
            box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
                0 4px 5px 0 rgba(0, 0, 0, 0.14),
                0 1px 10px 0 rgba(0, 0, 0, 0.12);
            background-color: #CACFD2;
        }

        .btn-material:active {
            box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
                0 8px 10px 1px rgba(0, 0, 0, 0.14),
                0 3px 14px 2px rgba(0, 0, 0, 0.12);
            /* background-color: #61b4b3; */
        }

        .tittle
        {
            font-family: 'Livvic', sans-serif;
            color: #34495E;
            text-align: center;
        }

        .cont{
            width: 100%;
            text-align: center;
        }
        .banner{
            width: 65%;
            
        }

        .centro
        {
            text-align: center;
        }

    </style>

</head>

<body>

    <div class="col-md-10">
        <div class="cont">
                <img src="https://robogenius.mx/wp-content/uploads/2019/07/cropped-RoboLogo1.png" alt="" class="banner">

        </div>
        <div class="row">
            <h2 class="tittle">Hola {{$datos['name']}}</h2>

        </div>
        <div class="row">
            <p>Parece que estas teniendo problemas para acceder a tu cuenta <b>¡Lo sentimos!</b> sigue estos pasos para restablecer tu contraseña.</p>
        </div>
        <div class="row">
            <div class="col-md-4">
            <a href="http://localhost:4200/reset-password/{{$datos['token']}}" class="btn-material">Recuperar contraseña</a>
            
                <br>
            </div>
        </div>
        <div class="row">
            <br>
            <span>Si no realizaste esta solicitud, ignora este mensaje.</span>
        </div>
        <div class="row">
            <p>Saludos de parte de <b>RoboGenius</b>.</p>
            <p class="centro">&copy;<strong>RoboGenius 2019</strong>. Todos los Derechos Reservados</p>
        </div>
    </div>

</body>

</html>