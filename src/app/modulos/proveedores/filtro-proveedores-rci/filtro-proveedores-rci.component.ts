import { FiltroProveedor } from './../../../entidades/filtro';
import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-filtro-proveedores-rci',
  templateUrl: './filtro-proveedores-rci.component.html',
  styleUrls: ['./filtro-proveedores-rci.component.css']
})
export class FiltroProveedoresRciComponent implements OnInit {

  @Input() filtroConsulta = new FiltroProveedor();
  @Output() tabla = new EventEmitter<any>();
  public formulario_fil_rci: FormGroup;

  constructor() {
    this.inicializarFormulario();
  }

  ngOnInit() {
  }

  actualizarTabla() {
    this.tabla.emit();
  }

  inicializarFormulario() {
    this.formulario_fil_rci = new FormGroup({
      nombre: new FormControl(this.filtroConsulta.nombre),
      numero: new FormControl(this.filtroConsulta.numero_proveedor),
      rfc: new FormControl(this.filtroConsulta.rfc),
      correo: new FormControl(this.filtroConsulta.correo, Validators.email),
      sitio: new FormControl(this.filtroConsulta.sitio),
      moneda: new FormControl(this.filtroConsulta.moneda)
    });
  }

  lipiarCampos() {
    this.filtroConsulta.nombre = '';
    this.filtroConsulta.numero_proveedor = '';
    this.filtroConsulta.rfc = '';
    this.filtroConsulta.correo = '';
    this.filtroConsulta.sitio = '';
    this.filtroConsulta.moneda = '';
  }

}
