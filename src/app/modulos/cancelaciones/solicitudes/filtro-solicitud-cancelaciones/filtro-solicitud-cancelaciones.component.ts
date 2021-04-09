import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FiltroCancelaciones } from 'src/app/entidades';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-filtro-solicitud-cancelaciones',
  templateUrl: './filtro-solicitud-cancelaciones.component.html',
  styleUrls: ['./filtro-solicitud-cancelaciones.component.css']
})
export class FiltroSolicitudCancelacionesComponent implements OnInit {
  @Output() filtrar = new EventEmitter();
  filtro = new FiltroCancelaciones();
  form_filtro: FormGroup;
  lista_hoteles: any;


  //#region Listas Selects
  lista_proveedores = new Array<any>();
  lista_contribuyentes = new Array<any>();
  lista_estatus_cancelacion = new Array<any>();
  lista_estatus_solicitud = new Array<any>();
  //#endregion

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form_filtro = this.formBuilder.group({
      folio_fiscal: [this.filtro.folio_fiscal],
      rfc_proveedor: [this.filtro.rfc_proveedor],
      rfc_contribuyente: [this.filtro.rfc_contribuyente],
      estatus_cancelacion: [this.filtro.estatus_cancelacion],
      estatus_solicitud: [this.filtro.estatus_solicitud],
    });
  }

  ngOnInit() {
  }

  //#region Selects
  onProveedorSelect(data) {
    if (data.value && data.value !== '') {
      this.filtro.rfc_proveedor = data.value;
      this.controles.rfc_proveedor.setValue(data.value);
    } else {
      this.filtro.rfc_proveedor = null;
      this.controles.rfc_proveedor.setValue(null);
    }
  }
  onContribuyenteSelect(data) {
    if (data.value && data.value !== '') {
      this.filtro.rfc_contribuyente = data.value;
      this.controles.rfc_contribuyente.setValue(data.value);
    } else {
      this.controles.rfc_contribuyente.setValue(null);
      this.filtro.rfc_contribuyente = null;
    }
  }
  onEstatusCancelacionSelect(data) {
    if (data.value && data.value !== '') {
      this.filtro.estatus_cancelacion = data.value;
      this.controles.estatus_cancelacion.setValue(data.value);
    } else {
      this.controles.estatus_cancelacion.setValue(null);
      this.filtro.estatus_cancelacion = null;
    }
  }
  onEstatusSolicitudSelect(data) {
    if (data.value && data.value !== '') {
      this.filtro.estatus_solicitud = data.value;
      this.controles.estatus_solicitud.setValue(data.value);
    } else {
      this.controles.estatus_solicitud.setValue(null);
      this.filtro.estatus_solicitud = null;
    }
  }
  //#endregion

  enviarFiltro() {
    this.filtrar.emit(this.filtro);
  }

  public get controles(): { [key: string]: AbstractControl } {
    return this.form_filtro.controls;
  }

  limpiar() {
    const aux_lista_proveedores = this.lista_proveedores;
    const aux_lista_contribuyentes = this.lista_contribuyentes;
    const aux_lista_estatus_cancelacion = this.lista_estatus_cancelacion;
    const aux_lista_estatus_solicitud = this.lista_estatus_solicitud;

    this.lista_proveedores.length = 0;
    this.lista_contribuyentes.length = 0;
    this.lista_estatus_cancelacion.length = 0;
    this.lista_estatus_solicitud.length = 0;
    setTimeout(() => {
      this.lista_proveedores = aux_lista_proveedores;
      this.lista_contribuyentes = aux_lista_contribuyentes;
      this.lista_estatus_cancelacion = aux_lista_estatus_cancelacion;
      this.lista_estatus_solicitud = aux_lista_estatus_solicitud;
      this.filtro = new FiltroCancelaciones();
    }, 200);
  }

}
