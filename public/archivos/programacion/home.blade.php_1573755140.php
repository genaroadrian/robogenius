@extends('layout.layout')

@section('content')
<div class="col-lg-12">
        <div class="card m-b-20">
            <div class="card-body">
                <h1 class="text-center">Productos</h1>
                @if(session('status'))
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <strong>Bien hecho! </strong><span> {{ session('status') }}</span>
                </div>
                @endif
                <div class="row">
                <a class="btn btn-outline-secondary"  href="{{URL::action('productosController@create')}}">Agregar nuevo</a>
                </div>
                <br>
                <div class="row"></div>
                <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th>Modelo</th>
                        <th>Precio</th>
                        <th>Marca</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach ($productos as $pro)
                    <tr>
                        <th>{{$pro->idprod}}</th>
                        <td>{{$pro->nom_prod}}</td>
                        <td>{{$pro->modelo_prod}}</td>
                        <td>{{$pro->precio_out_prod}}</td>
                        <td>{{$pro->sistema_operativo}}</td>
                        <td>
                            <a class="material-icons text-success" href="{{URL::action('productosController@edit',['idprod'=>$pro->idprod])}}">edit</a>
                            <a href="{{URL::action('productosController@destroy',['idcat'=>$pro->idprod])}}" class="material-icons text-danger">delete</a>
                        </td>
                    </tr>
                    @endforeach
                    </tbody>
                </table>

            </div>
        </div>
    </div>

{{-- Modal de nuevo registro --}}
        <div id="addModal" class="modal fade" tabindex="" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title mt-0" id="addModalLabel">Agregar nueva categoria</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                        {{-- Formulario del modal --}}
                        {!! Form::open(['action'=>'categoriasController@store']) !!}
                        {!! Form::token() !!}
                        {!! Form::label('cat_padre', 'Categoria padre:', array('class'=>'class="col-sm-2 col-form-label"')) !!}
                        {!! Form::text('cat_padre', null, ['class'=>'form-control', 'required'=>'required']) !!}
                        {!! Form::label('categoria', 'Nombre:', array('class'=>'class="col-sm-2 col-form-label"')) !!}
                        {!! Form::text('categoria', null, ['class'=>'form-control', 'required'=>'required']) !!}
                    </div>
                    <div class="modal-footer">
                            {!! Form::submit('Guardar', ['class'=>'btn btn-primary waves-effect waves-light']) !!}
                        <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Cancelar</button>
                    </div>
                    {!! Form::close() !!}
                </div>
            </div>
        </div>
@endsection