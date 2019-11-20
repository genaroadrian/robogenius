@extends('layout.layout')

@section('content')
{!! Form::open(['action'=>'productosController@store']) !!}
{!! Form::token() !!}
<h1 style="text-aling:center;">Productos</h1>
<br>
{!! Form::label('nombre', 'Nombre:', array('class' => 'subrayado')) !!} 
{!! Form::text('nombre',null,['class'=>'form-control', 'placeholder'=>'nombre', 'required' => 'required']) !!}
<br>
{!! Form::label('numerodeserie', 'Numero de serie:', array('class' => 'subrayado')) !!} 
{!! Form::number('numerodeserie',null,['class'=>'form-control', 'placeholder'=>'no.', 'required' => 'required']) !!}
<br>
{!! Form::label('desc', 'Descuento:', array('class' => 'subrayado')) !!} 
{!! Form::number('desc',null,['class'=>'form-control', 'placeholder'=>'$', 'required' => 'required']) !!}
<br>
{!! Form::label('modelo', 'Modelo:', array('class' => 'subrayado')) !!} 
{!! Form::text('modelo',null,['class'=>'form-control', 'placeholder'=>'modelo', 'required' => 'required']) !!}
<br>
{!! Form::label('descripcion', 'Descripcion:', array('class' => 'subrayado')) !!} 
{!! Form::text('descripcion',null,['class'=>'form-control', 'placeholder'=>'descripcion', 'required' => 'required']) !!}
<br>
{!! Form::label('precioin', 'Precio de entrada:', array('class' => 'subrayado')) !!} 
{!! Form::number('precioin',null,['class'=>'form-control', 'placeholder'=>'$.00', 'required' => 'required']) !!}
<br>
{!! Form::label('precioout', 'Precio de salida:', array('class' => 'subrayado')) !!} 
{!! Form::number('precioout',null,['class'=>'form-control', 'placeholder'=>'$.00', 'required' => 'required']) !!}
<br>
{!! Form::label('estado', 'Estado:', array('class' => 'subrayado')) !!}
{!!Form::select('estado', ['1' => 'Nueva', '2' => 'Seminueva', '3' => 'Reacondicionada'],null,['class'=>'form-control', 'placeholder'=>'', 'required' => 'required'])!!}
<br>
{!! Form::label('estado', 'Categoria:', array('class' => 'subrayado')) !!}
{!!Form::select('estado', ['1' => 'Computadora', '2' => 'Tablet', '3' => 'Celular'],null,['class'=>'form-control', 'placeholder'=>'', 'required' => 'required'])!!}
<br>
{!! Form::label('tprocesador', 'Tipo de procesador:', array('class' => 'subrayado')) !!} 
{!! Form::text('tprocesador',null,['class'=>'form-control', 'placeholder'=>'procesador', 'required' => 'required']) !!}
<br>
{!! Form::label('mdprocesador', 'Modelo de procesador:', array('class' => 'subrayado')) !!} 
{!! Form::text('mdprocesador',null,['class'=>'form-control', 'placeholder'=>'', 'required' => 'required']) !!}
<br>
{!! Form::label('nucleos', 'Nucleos:', array('class' => 'subrayado')) !!} 
{!! Form::number('nucleos',null,['class'=>'form-control', 'placeholder'=>'', 'required' => 'required']) !!}
<br>
{!! Form::label('tram', 'Tipo de ram:', array('class' => 'subrayado')) !!} 
{!! Form::text('tram',null,['class'=>'form-control', 'placeholder'=>'', 'required' => 'required']) !!}
<br>
{!! Form::label('ram', 'Capacidad de ram:', array('class' => 'subrayado')) !!} 
{!! Form::number('ram',null,['class'=>'form-control', 'placeholder'=>'Gb', 'required' => 'required']) !!}
<br>
{!! Form::label('cdd', 'Capacidad disco duro:', array('class' => 'subrayado')) !!} 
{!! Form::number('cdd',null,['class'=>'form-control', 'placeholder'=>'GB', 'required' => 'required']) !!}
<br>
{!! Form::label('marcagpu', 'Marca GPU:', array('class' => 'subrayado')) !!} 
{!! Form::text('marcagpu',null,['class'=>'form-control', 'placeholder'=>'', 'required' => 'required']) !!}
<br>
{!! Form::label('igpu', 'Interfaz GPU:', array('class' => 'subrayado')) !!} 
{!! Form::text('igpu',null,['class'=>'form-control', 'placeholder'=>'', 'required' => 'required']) !!}
<br>
{!! Form::label('mgpu', 'Modelo GPU:', array('class' => 'subrayado')) !!} 
{!! Form::text('mgpu',null,['class'=>'form-control', 'placeholder'=>'', 'required' => 'required']) !!}
<br>
{!! Form::label('resolucionp', 'Resolucion de pantalla:', array('class' => 'subrayado')) !!} 
{!! Form::text('resolucionp',null,['class'=>'form-control', 'placeholder'=>'px', 'required' => 'required']) !!}
<br>
{!! Form::label('color', 'Color:', array('class' => 'subrayado')) !!} 
{!! Form::text('color',null,['class'=>'form-control', 'placeholder'=>'color', 'required' => 'required']) !!}
<br>
{!! Form::label('ancho', 'Ancho:', array('class' => 'subrayado')) !!} 
{!! Form::number('ancho',null,['class'=>'form-control', 'placeholder'=>'', 'required' => 'required']) !!}
<br>
{!! Form::label('alto', 'Alto:', array('class' => 'subrayado')) !!} 
{!! Form::number('alto',null,['class'=>'form-control', 'placeholder'=>'', 'required' => 'required']) !!}
<br>
{!! Form::label('grueso', 'Grueso:', array('class' => 'subrayado')) !!} 
{!! Form::number('grueso',null,['class'=>'form-control', 'placeholder'=>'', 'required' => 'required']) !!}
<br>
{!! Form::label('peso', 'Peso:', array('class' => 'subrayado')) !!} 
{!! Form::text('peso',null,['class'=>'form-control', 'placeholder'=>'', 'required' => 'required']) !!}
<br>
{!! Form::label('uoptica', 'Unidad Optica:', array('class' => 'subrayado')) !!} 
{!!Form::select('uoptica', ['1' => 'Si', '0' => 'No'],null,['class'=>'form-control', 'placeholder'=>'', 'required' => 'required'])!!}
<br>
{!! Form::label('bateria', 'Capacidad de bateria:', array('class' => 'subrayado')) !!} 
{!! Form::number('bateria',null,['class'=>'form-control', 'placeholder'=>'mlh', 'required' => 'required']) !!}
<br>
{!! Form::label('cfrontal', 'Camara frontal:', array('class' => 'subrayado')) !!} 
{!! Form::number('cfrontal',null,['class'=>'form-control', 'placeholder'=>'px', 'required' => 'required']) !!}
<br>
{!! Form::label('ctrasera', 'Camara trasera:', array('class' => 'subrayado')) !!} 
{!! Form::number('ctrasera',null,['class'=>'form-control', 'placeholder'=>'px', 'required' => 'required']) !!}
<br>
{!! Form::label('flash', 'Flash:', array('class' => 'subrayado')) !!}
{!!Form::select('flash', ['1' => 'Si', '0' => 'No'],null,['class'=>'form-control', 'placeholder'=>'', 'required' => 'required'])!!}
<br>
{!! Form::label('audio', 'Tipo de audio:', array('class' => 'subrayado')) !!} 
{!! Form::text('audio',null,['class'=>'form-control', 'placeholder'=>'', 'required' => 'required']) !!}
<br>
{!! Form::label('huella', 'Lector:', array('class' => 'subrayado')) !!} 
{!!Form::select('huella', ['1' => 'Si', '0' => 'No'],null,['class'=>'form-control', 'placeholder'=>'', 'required' => 'required'])!!}
<br>
{!! Form::label('soper', 'Sistema operativo:', array('class' => 'subrayado')) !!} 
{!!Form::select('soper', ['windows' => 'Windows', 'Linux' => 'Linux', 'debian' => 'Debian', 'otro' => 'Otro'],null,['class'=>'form-control', 'placeholder'=>'', 'required' => 'required'])!!}
<br>
{!! Form::submit('Guardar', ['class'=>'btn btn-primary waves-effect waves-light']) !!}
<a type="button" class="btn btn-secondary waves-effect" href="/productos">Cancelar</a>
{!! Form::close() !!}

@endsection