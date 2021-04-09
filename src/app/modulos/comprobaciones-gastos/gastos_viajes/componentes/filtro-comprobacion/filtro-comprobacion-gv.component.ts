import { UsuarioService } from './../../../../usuarios/usuario.service';
import { CorporativoActivo } from './../../../../../entidades/Corporativo-activo';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Usuario } from 'src/app/entidades';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import Swal from 'sweetalert2';
import { CentroCostosService } from 'src/app/modulos/centro-costos/centro-costos.service';
declare var $: any;

@Component({
  selector: 'app-filtro-comprobacion-gv',
  templateUrl: './filtro-comprobacion-gv.component.html',
  styleUrls: ['./filtro-comprobacion-gv.component.css']
})
export class FiltroComprobacionGVComponent implements OnInit {
  @Output() filtrar = new EventEmitter();
  @Input() is_flujo_aprobacion = false;
  corporativo_activo: CorporativoActivo;
  identificador_corporativo: string;
  identificador_centro_costo: string;
  lista_usuario = new Array<Usuario>();
  identificador_usuario: string;
  filtro_comprobacion: FormGroup;
  usuario: Usuario;
  estatus_vista: boolean;
  usuario_disable: boolean;
  fech_ini: any;
  fech_fin: any;
  primerCarga = true;
  limpiar_disable: boolean;

  lista_estatus = new Array<any>();
  lista_contribuyentes = new Array<any>();
  lista_centros_costo = new Array<any>();

  constructor(
    private _compartidosService: CompartidosService,
    public _globals: GlobalsComponent,
    private _storageService: StorageService,
    private _centroCostosService: CentroCostosService,
    private formBuilder: FormBuilder,
    private _usuarioservice: UsuarioService,
  ) {
    this.usuario = this._storageService.getDatosIniciales().usuario;
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    const aux_url = window.location.href;
    if (aux_url.indexOf("home/bandeja_aprobacion") !== -1) {
      this.estatus_vista = false;
    } else {
      if (this.corporativo_activo.rol_nombre === 'Administrador' || this.corporativo_activo.rol_nombre === 'Empleado Aprobador') {
        this.usuario_disable = false;
      } else {
        this.usuario_disable = true;
      }
      this.estatus_vista = true;
    }
  }

  ngOnInit() {
    this.filtro_comprobacion = this.formBuilder.group(new auxFiltroGVComprobacion(this.usuario.identificador_usuario));
    this.getCatalogos();
  }

  getCatalogos() {
    this.obtenerEstatus();
    this.obtenerContribuyente();
    this.obtenerCentrosCosto();
    this.getUsuario(this.identificador_corporativo);
  }

  getUsuario(id_corporativo): Promise<void> {
    return new Promise((resolve) => {
      this._usuarioservice.obtenerUsuariosCorporativo(id_corporativo)
        .subscribe((data: Array<Usuario>) => {
          this.lista_usuario = data.map((x: any) => {
            x.text = x.nombre + x.apellido_paterno;
            x.id = x.identificador_usuario;
            return x;
          });
          this.lista_usuario = this._globals.agregarSeleccione(this.lista_usuario, 'Seleccione uno...');
          resolve();
        });
    });
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
      setTimeout(() => {
        this.identificador_centro_costo = this.usuario.identificador_centro_costo;
      }, 200);
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
    this.filtrar.emit(this.filtro_comprobacion.value);
  }

  limpiar() {
    this.limpiar_disable = true;
    this.filtro_comprobacion.reset();
    this.controles.identificador_corporativo.setValue(this.usuario.identificador_corporativo);
    this.controles.identificador_usuario.setValue('');
    this.controles.folio_comprobacion.setValue('');
    this.controles.fecha_inicio.setValue('');
    this.controles.fecha_fin.setValue('');
    this.controles.estatus.setValue(0);
    this.controles.tipo_gasto.setValue(1);
    this.controles.identificador_cc.setValue(this.identificador_centro_costo);
    if (this.is_flujo_aprobacion) {
      this.controles.identificador_cc.setValue('');
    }
    this.limpiarSelects();
    this.fech_ini = null;
    this.fech_fin = null;
    setTimeout(() => {
      this.limpiar_disable = false;
    }, 300);
  }

  // Seleccionados
  onContribuyenteSelected(data) {
    this.controles.identificador_contribuyente.setValue(data.value && data.value != '0' ? data.value : '');
    if (this.primerCarga) {
      setTimeout(() => {
        this.buscar();
      }, 1000);
    }
  }
  onCentroCostoSelected(data) {
    this.controles.identificador_cc.setValue(data.value && data.value != '0' ? data.value : '');
  }
  onEstatusSeleccionado(data) {
    this.controles.estatus.setValue(data.value && data.value != '0' ? data.value : 0);
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
    this.lista_estatus = null;
    this.lista_contribuyentes = [];
    this.lista_estatus = [];

    if (this.is_flujo_aprobacion) {
      this.lista_centros_costo = null;
      this.lista_centros_costo = [];
    }
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

  validaFolioComprobacio(event) {
    $("#folio_comprobacion_filtro").keydown(function (event) {
      //alert(event.keyCode);
      if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode !== 190 && event.keyCode !== 110 && event.keyCode !== 8 && event.keyCode !== 9) {
        return false;
      }
    });
  }

  identificadorNombre(identificador) {
    if (identificador.value !== '0') {
      this.identificador_usuario = identificador.value;
      this.controles.identificador_usuario.setValue(identificador.value);
    } else {
      this.controles.identificador_usuario.setValue('');
    }
  }
  //#endregion

}


class auxFiltroGVComprobacion {
  identificador_contribuyente: FormControl;
  identificador_cc: FormControl;
  identificador_usuario: FormControl;
  folio_comprobacion: FormControl;
  fecha_inicio: FormControl;
  fecha_fin: FormControl;
  estatus: FormControl;
  identificador_corporativo: FormControl;
  tipo_gasto: FormControl;

  constructor(identificador_usuario: string, tipo_gasto: number = 1,) {
    this.identificador_corporativo = new FormControl('', Validators.required);
    this.identificador_usuario = new FormControl(identificador_usuario, Validators.required);
    this.identificador_contribuyente = new FormControl('', Validators.required);
    this.identificador_cc = new FormControl('', Validators.required);
    this.estatus = new FormControl(0);
    this.folio_comprobacion = new FormControl(null, this.folioComprobacio);
    this.fecha_inicio = new FormControl('');
    this.fecha_fin = new FormControl('');
    this.tipo_gasto = new FormControl(tipo_gasto);
  }

  private folioComprobacio(control: AbstractControl) {
    const folio = control.value;
    let error = null;
    const regex = new RegExp(/^[0-9]{1,20}?$/);
    if (!regex.test(folio)) {
      error = 'La estructura del Folio Comprobación es invalida.';
    }
    return error;
  }
}
