import { TipoGastoService } from './../../../tipo-gasto/tipo-gasto.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';

import { Usuario } from 'src/app/entidades';

import { CentroCostosService } from 'src/app/modulos/centro-costos/centro-costos.service';
import { UsuarioService } from 'src/app/modulos/usuarios/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-filtro',
  templateUrl: './reporte-filtro.component.html',
  styleUrls: ['./reporte-filtro.component.css']
})
export class ReporteFiltroComponent implements OnInit {
  @Output() filtrar = new EventEmitter();
  @Input() titulo_filtro: string = '';

  filtro_comprobacion: FormGroup;
  usuario: Usuario;

  fech_ini: any;
  fech_fin: any;
  origen: any;

  lista_empleados = new Array<Usuario>();
  lista_contribuyentes = new Array<any>();
  lista_centros_costo = new Array<any>();
  lista_jefes_inmediato = new Array<Usuario>();
  lista_tipo_gasto = new Array<any>();
  lista_prestaciones = new Array<any>();
  lista_estatus = new Array<any>();
  lista_monedas = new Array<any>();

  constructor(
    private _compartidosService: CompartidosService,
    public _globals: GlobalsComponent,
    private _storageService: StorageService,
    private _centroCostosService: CentroCostosService,
    private _tipoGastoService: TipoGastoService,
    private _usuarioservice: UsuarioService,
  ) {
    this.usuario = this._storageService.getDatosIniciales().usuario;
    this.filtro_comprobacion = new FormGroup({
      identificador_jefe_inmediato: new FormControl(),
      identificador_contribuyente: new FormControl(),
      identificador_corporativo: new FormControl(this.usuario.identificador_corporativo),
      identificador_usuario: new FormControl(this.usuario.identificador_usuario),
      folio_comprobacion: new FormControl(),
      identificador_cc: new FormControl(),
      id_prestacion: new FormControl(),
      fecha_inicio: new FormControl(),
      estatus_id: new FormControl(),
      tipo_gasto: new FormControl(),
      fecha_fin: new FormControl(),
      id_moneda: new FormControl(),
      importe: new FormControl(),
      origen: new FormControl(),
      folio_comprobacion_desde: new FormControl(),
      folio_comprobacion_hasta: new FormControl(),
    });
  }

  ngOnInit() {
    this.getCatalogos();
  }

  getCatalogos() {
    this.obtenerEmpleados();
    this.obtenerContribuyente();
    this.obtenerCentrosCosto();
    this.obtenerTipoGasto();
    this.obtenerEstatus();
    this.obtenerMonedas();
  }


  obtenerEmpleados() {
    this._usuarioservice.obtenerUsuariosCorporativo(this.usuario.identificador_corporativo).subscribe((data: Array<Usuario>) => {
      data = data.map(data => {
        data.text = `${data.nombre} ${data.apellido_paterno}`;
        return data;
      });
      this.lista_empleados = this._globals.prepararSelect2(data, 'identificador_usuario', 'text');
      this.lista_jefes_inmediato = this._globals.prepararSelect2(data, 'identificador_usuario', 'text');
    })
  }
  obtenerContribuyente() {
    this._compartidosService.obtenerEmpresasIdCorporativoIdUsuario(this.usuario.identificador_corporativo, this.usuario.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_contribuyentes = this._globals.prepararSelect2(data, 'identificador', 'nombre');
      }, error => {
        this.lista_contribuyentes = [];
        console.log(error);
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
  obtenerTipoGasto() {
    this._compartidosService.obtenerTipoGasto(this.usuario.identificador_corporativo).subscribe((data) => {
      this.lista_tipo_gasto = this._globals.prepararSelect2(data, 'id', 'descripcion');
      this.lista_tipo_gasto = this._globals.agregarSeleccione(this.lista_tipo_gasto, 'Seleccione Tipo Gasto...');
    }, error => {
      console.log(error);
    })
  }
  obtenerPrestaciones() {
    this._tipoGastoService.getlistCuentaAgrupacion(this.controles.tipo_gasto.value, this.usuario.identificador_corporativo).subscribe(data => {
      this.lista_prestaciones = this._globals.prepararSelect2(data, 'id', 'nombre');
      this.lista_prestaciones = this._globals.agregarSeleccione(this.lista_prestaciones, 'Seleccione Prestación...');
    })
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

  obtenerMonedas() {
    this._compartidosService.obtenerMonedasCorporativo(this.usuario.identificador_corporativo).subscribe(data => {
      this.lista_monedas = this._globals.prepararSelect2(data, 'id', 'nombre');
    })
  }

  buscar() {
    if (this.validarValor(this.controles.fecha_inicio.value) && !this.validarValor(this.controles.fecha_fin.value)) {
      return Swal.fire('¡Atención!', 'Es necesario que seleccione una fecha de fin.', 'warning');
    }
    if (this.validarValor(this.controles.fecha_fin.value) && !this.validarValor(this.controles.fecha_inicio.value)) {
      return Swal.fire('¡Atención!', 'Es necesario que seleccione una fecha de Inicio.', 'warning');
    }
    this.controles.folio_comprobacion.setValue(this.getFolioSeleceted());
    this.controles.origen.setValue(this.origen ? 2 : 1);
    this.controles.identificador_corporativo.setValue(this.usuario.identificador_corporativo);
    this.filtrar.emit(this.filtro_comprobacion.value);
  }

  getFolioSeleceted() {
    const folio_hasta = this.controles.folio_comprobacion_hasta.value;
    const folio_desde = this.controles.folio_comprobacion_desde.value;
    if (!folio_desde || !folio_hasta) {
      if (folio_desde) {
        return `${folio_desde}-${folio_desde}`;
      }
      if (folio_hasta) {
        return `${folio_hasta}-${folio_hasta}`;
      }
      return null;
    }
    return `${folio_desde}-${folio_hasta}`;
  }

  limpiar() {
    this.filtro_comprobacion.reset();
    this.controles.identificador_corporativo.setValue(this.usuario.identificador_corporativo);
    this.controles.identificador_usuario.setValue(this.usuario.identificador_usuario);
    this.controles.folio_comprobacion.setValue('');
    this.controles.fecha_inicio.setValue('');
    this.controles.fecha_fin.setValue('');
    this.controles.estatus.setValue(0);
    this.controles.tipo_gasto.setValue(1);
    this.limpiarSelects();
    this.fech_ini = null;
    this.fech_fin = null;
  }
  // Seleccionados
  onEmpleadoSelected(data) {
    this.controles.identificador_usuario.setValue(data.value && data.value != '0' ? data.value : '');
  }
  onContribuyenteSelected(data) {
    this.controles.identificador_contribuyente.setValue(data.value && data.value != '0' ? data.value : '');
  }
  onCentroCostoSelected(data) {
    this.controles.identificador_cc.setValue(data.value && data.value != '0' ? data.value : '');
  }
  onTipoGastoSelected(data) {
    this.controles.tipo_gasto.setValue(data.value && data.value != '0' ? data.value : '');
    if (this.controles.tipo_gasto.value == 11) {
      this.obtenerPrestaciones();
    } else {
      this.controles.id_prestacion.setValue(null);
      this.lista_prestaciones.length = 0;
    }
  }
  onPrestacionSelected(data) {
    this.controles.id_prestacion.setValue(data.value && data.value != '0' ? data.value : '');
  }
  onEstatusSeleccionado(data) {
    this.controles.estatus_id.setValue(data.value && data.value != '0' ? data.value : 0);
  }
  onMonedaSelected(data) {
    this.controles.id_moneda.setValue(data.value && data.value != '0' ? data.value : 0);
  }
  onJefeInmediatoSelected(data) {
    this.controles.identificador_jefe_inmediato.setValue(data.value && data.value != '0' ? data.value : 0);
  }
  onFechaInicioViaje(data) {
    this.controles.fecha_inicio.setValue(data.formatted);
  }
  onFechaFinViaje(data) {
    this.controles.fecha_fin.setValue(data.formatted);
  }
  onOrigenSelected(data) {
    this.controles.origen.setValue(data ? 2 : 1);
  }

  //#region Auxiliares
  limpiarSelects() {
    const contribuyentes = this.lista_contribuyentes;
    const centros_costo = this.lista_centros_costo;
    const estatus = this.lista_estatus;

    this.lista_contribuyentes = null;
    this.lista_estatus = null;
    this.lista_contribuyentes = [];
    this.lista_estatus = [];
    this.lista_centros_costo = null;
    this.lista_centros_costo = [];

    setTimeout(() => {
      this.lista_contribuyentes = contribuyentes;
      this.lista_centros_costo = centros_costo;
      this.lista_estatus = estatus;
    }, 200);
  }
  validarValor(value: any): boolean {
    return value !== undefined && value !== null && value !== '';
  }
  get controles(): { [key: string]: AbstractControl } {
    return this.filtro_comprobacion.controls;
  }
  //#endregion
}
