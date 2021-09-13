import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FiltroProveedor } from 'src/app/entidades/filtro';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';

@Component({
  selector: 'app-filtro-proveedores',
  templateUrl: './filtro-proveedores.component.html',
  styleUrls: ['./filtro-proveedores.component.css']
})
export class FiltroProveedoresComponent implements OnInit {

  @Input() filtroConsulta;
  @Output() tabla = new EventEmitter<any>();
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
      (data) => {
        this.lista_estatus = data;
      }
      , (error) => {

      }
      , () => {

      }
    );
  }


}
