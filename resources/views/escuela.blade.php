
<table  class="table">
      <tr><td class="text-info"><h4>Clave</h4></td><td class="text-info"><h4>Nombre</h4></td>
        <td class="text-info"><h4>Activo</h4></td><td class="text-info"><h4>Operaciones</h4></td></tr>

      @foreach($escuela as $esc)
      <tr>
      <td>{{$esc->nombre}}</td>
      <td>{{$esc->activo}}</td>
      </tr>
      @endforeach
    </table>
  </body>

@extends('layout.escuelap')

