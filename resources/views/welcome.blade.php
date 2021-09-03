<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Elintx</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
        <!-- Styles -->
        <style>
            body {
                font-family: 'Nunito', sans-serif;
                background-color: whitesmoke;
            }
        </style>
    </head>
    <body class="antialiased">
        <div id="app"></div>
       <script src="{{asset('js/app.js')}}"></script>
       <script src="https://kit.fontawesome.com/f1f8bd22d7.js" crossorigin="anonymous"></script>
    </body>
</html>
