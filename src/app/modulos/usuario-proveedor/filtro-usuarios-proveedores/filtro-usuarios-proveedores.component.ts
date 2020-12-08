import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';

@Component({
  selector: 'app-filtro-usuarios-proveedores',
  templateUrl: './filtro-usuarios-proveedores.component.html',
  styleUrls: ['./filtro-usuarios-proveedores.component.css']
})
export class FiltroUsuariosProveedoresComponent implements OnInit {


  @Input() filtroConsulta;
  @Output() tabla = new EventEmitter();
  public formulario: FormGroup;
  public lista_estatus: any;

  constructor(
    private _servicio_compartido: CompartidosService
  ) {
    this.inicializarFormulario();
    this.cargarDatos();
  }

  ngOnInit() {
  }


  actualizarTabla() {
    this.tabla.emit();
  }

  inicializarFormulario() {
    this.formulario = new FormGroup({
        correo: new FormControl('', Validators.email)
        , nombre_proveedor: new FormControl('')
        , rfc: new FormControl('')
        , numero: new FormControl('')
        , estatus: new FormControl('')
      }
    );
  }

  lipiarCampos() {
    this.filtroConsulta.nombre = '';
    this.filtroConsulta.numero_proveedor = '';
    this.filtroConsulta.rfc = '';
    this.filtroConsulta.correo = '';
    this.filtroConsulta.estatus = 0;
  }

  cargarDatos() {
    this._servicio_compartido.obtenerEstatusProveedor().subscribe(
      ( data ) => {
        console.log(data);
        this.lista_estatus = data;
      }
      , ( error ) => {

      }
      , () => {

      }
    );
  }


}
