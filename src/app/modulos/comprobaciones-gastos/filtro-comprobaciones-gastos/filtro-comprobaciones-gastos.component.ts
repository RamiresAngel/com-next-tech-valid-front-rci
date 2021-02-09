import { CentroCostosService } from './../../centro-costos/centro-costos.service';
import { Usuario } from './../../../entidades/usuario';
import { GlobalsComponent } from './../../../compartidos/globals/globals.component';
import { StorageService } from './../../../compartidos/login/storage.service';
import { CompartidosService } from './../../../compartidos/servicios_compartidos/compartidos.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FiltroSolicitudes } from 'src/app/entidades';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

/*
este componente se tienen que modificar para poder
filtrar por comprobaciones de gastos falta definir el filtro
por el momento se puso comprobación gastos
 */

@Component({
  selector: 'app-filtro-comprobaciones-gastos',
  templateUrl: './filtro-comprobaciones-gastos.component.html',
  styleUrls: ['./filtro-comprobaciones-gastos.component.css']
})
export class FiltroComprobacionesGastosComponent implements OnInit {
  @Output() enviarData = new EventEmitter();
  @Input('filtro_anticipo') filtro_anticipo = new FiltroSolicitudes();
  @Output() filtrar = new EventEmitter();

  filtro_comprobacion: FormGroup;
  usuario: Usuario;

  fech_ini: any;
  fech_fin: any;
  primerCarga = true;

  lista_estatus = new Array<any>();
  lista_contribuyentes = new Array<any>();
  lista_centros_costo = new Array<any>();

  constructor(
    private _compartidosService: CompartidosService,
    public _globals: GlobalsComponent,
    private _storageService: StorageService,
    private _centroCostosService: CentroCostosService,
    private formBuilder: FormBuilder
  ) {
    this.usuario = this._storageService.getDatosIniciales().usuario;
  }

  ngOnInit() {
    this.filtro_comprobacion = this.formBuilder.group(new auxFiltroGVComprobacion(this.usuario.identificador_usuario));
    this.getCatalogos();
  }

  getCatalogos() {
    this.obtenerEstatus();
    this.obtenerContribuyente();
    this.obtenerCentrosCosto();
  }

  obtenerEstatus() {
    this._compartidosService.obtenerEstatus().subscribe((data: any) => {
      this.lista_estatus = $.map(data, (obj) => {
        obj.text = obj.descripcion;
        return obj;
      });
      this.lista_estatus = this._globals.agregarSeleccione(this.lista_estatus, 'Seleccione estatus...');
    });
  }

  obtenerContribuyente() {
    if (this.usuario.proveedor === 1 || this.usuario.acreedor === 1) {
      this.cargarContribuyentesSAP();
    } else {
      this.cargarContribuyentes();
    }
  }
  cargarContribuyentesSAP() {
    this._compartidosService.obtenerContribuyentesProveedorId(this.usuario.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_contribuyentes = this._globals.prepararSelect2(data, 'identificador_contribuyente', 'contribuyente');
      }, error => {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      });
  }
  cargarContribuyentes() {
    this._compartidosService.obtenerEmpresasIdCorporativoIdUsuario(this.usuario.identificador_corporativo, this.usuario.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_contribuyentes = this._globals.prepararSelect2(data, 'identificador', 'nombre');
      }, error => {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      });
  }

  obtenerCentrosCosto() {
    this._centroCostosService.ObtenerListaCentroCostosMXPorCorporativo(this.usuario.identificador_corporativo, this.usuario.identificador_usuario, Number(this.usuario.rol)).subscribe((data) => {
      this.lista_centros_costo = $.map(data, function (obj: any) {
        obj.id = obj.identificador;
        obj.text = `${obj.codigo} - ${obj.nombre}`;
        return obj;
      });
      this.lista_centros_costo = this._globals.prepararSelect2(data, 'identificador', 'text');
      this.lista_centros_costo = this._globals.agregarSeleccione(this.lista_centros_costo, 'Seleccione Centro Costo...');
    }, error => {
      console.log(error);
    })
  }

  buscar() {
    if (this.validarValor(this.controles.fecha_inicio.value) && !this.validarValor(this.controles.fecha_fin.value)) {
      return Swal.fire('Atención', 'Es necesario que seleccione una fecha de fin', 'warning');
    }
    if (this.validarValor(this.controles.fecha_fin.value) && !this.validarValor(this.controles.fecha_inicio.value)) {
      return Swal.fire('Atención', 'Es necesario que seleccione una fecha de Inicio', 'warning');
    }

    this.controles.identificador_corporativo.setValue(this.usuario.identificador_corporativo);
    this.controles.identificador_usuario.setValue(this.usuario.identificador_usuario);
    this.filtrar.emit(this.filtro_comprobacion.value);
  }

  limpiar() {
    this.filtro_comprobacion.reset();
    this.controles.identificador_corporativo.setValue(this.usuario.identificador_corporativo);
    this.controles.identificador_usuario.setValue(this.usuario.identificador_usuario);
    this.controles.folio_comprobacion.setValue(0);
    this.controles.identificador_cc.setValue('');
    this.controles.fecha_inicio.setValue('');
    this.controles.fecha_fin.setValue('');
    this.controles.tipo_gasto.setValue(1);
    this.controles.activo.setValue(0);
    this.limpiarSelects();
    this.fech_ini = null;
    this.fech_fin = null;
  }

  // Seleccionados
  onContribuyenteSelected(data) {
    this.controles.identificador_contribuyente.setValue(data.value && data.value != '0' ? data.value : '');
    if (this.primerCarga) {
      this.buscar();
    }
  }
  onCentroCostoSelected(data) {
    this.controles.identificador_cc.setValue(data.value && data.value != '0' ? data.value : '');
  }
  onEstatusSeleccionado(data) {
    this.controles.activo.setValue(data.value && data.value != '0' ? data.value : 0);
  }
  onFechaInicioViaje(data) {
    this.controles.fecha_inicio.setValue(data.formatted);
  }
  onFechaFinViaje(data) {
    this.controles.fecha_fin.setValue(data.formatted);
  }

  //#region Auxiliares
  limpiarSelects() {
    const contribuyentes = this.lista_contribuyentes;
    const centros_costo = this.lista_centros_costo;
    const estatus = this.lista_estatus;

    this.lista_contribuyentes = null;
    this.lista_centros_costo = null;
    this.lista_estatus = null;
    this.lista_contribuyentes = [];
    this.lista_centros_costo = [];
    this.lista_estatus = [];

    setTimeout(() => {
      this.lista_contribuyentes = contribuyentes;
      this.lista_centros_costo = centros_costo;
      this.lista_estatus = estatus;
    }, 200);
  }
  validarValor(value: any): boolean {
    return value !== undefined && value !== null && value !== '';
  }
  get controles() { return this.filtro_comprobacion.controls; }
  //#endregion
}


class auxFiltroGVComprobacion {
  identificador_contribuyente: FormControl;
  identificador_cc: FormControl;
  identificador_usuario: FormControl;
  folio_comprobacion: FormControl;
  fecha_inicio: FormControl;
  fecha_fin: FormControl;
  activo: FormControl;
  identificador_corporativo: FormControl;
  tipo_gasto: FormControl;

  constructor(identificador_usuario: string, tipo_gasto: number = 1,) {
    this.identificador_corporativo = new FormControl('', Validators.required);
    this.identificador_usuario = new FormControl(identificador_usuario, Validators.required);
    this.identificador_contribuyente = new FormControl('', Validators.required);
    this.identificador_cc = new FormControl('', Validators.required);
    this.activo = new FormControl(0);
    this.folio_comprobacion = new FormControl(0);
    this.fecha_inicio = new FormControl('');
    this.fecha_fin = new FormControl('');
    this.tipo_gasto = new FormControl(tipo_gasto);
  }
}
