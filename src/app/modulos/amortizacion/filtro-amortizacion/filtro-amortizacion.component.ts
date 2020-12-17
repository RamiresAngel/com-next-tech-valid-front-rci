import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FiltroSolicitudes } from 'src/app/entidades/Filtro-Solicitudes.';
import { IMyDpOptions } from 'mydatepicker';
import { Contribuyente } from 'src/app/entidades/contribuyente';
import { ContribuyenteService } from 'src/app/modulos/contribuyente/contribuyente.service';
import { SucursalService } from 'src/app/modulos/sucursal/sucursal.service';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { FiltroAmortizadores } from 'src/app/entidades/Filtro-Amortizadores';
import Swal from 'sweetalert2';
import { Sucursal, AcreedorDiverso, Cuenta, Amortizacion } from 'src/app/entidades';

@Component({
  selector: 'app-filtro-amortizacion',
  templateUrl: './filtro-amortizacion.component.html',
  styleUrls: ['./filtro-amortizacion.component.css']
})
export class FiltroAmortizacionComponent implements OnInit {

  @Input() filtroConsulta: FiltroAmortizadores;
  @Output() cambiarTabla = new EventEmitter<any>();
  public formulario_filtroSolicitud: FormGroup;
  public txtBtnBuscar = 'Buscar';
  public titulo = 'Filtrar';
  public fech_ini: any;
  public fech_fin: any;
  public volver_preliminares = false;
  fecha_inicio_palceholder = 'Desde';
  fecha_fin_palceholder = 'Registro Hasta';
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };

  public lista_empresas: Contribuyente[];
  public lista_hoteles: Sucursal[];
  public lista_acreedor: AcreedorDiverso[];
  public lista_cuenta: Cuenta[];
  public lista_estatus_amoritzacion: Amortizacion[];
  public primer_filtrado = true;

  public startValue_empresa = '';
  public startValue_hotel = '';
  public startValue_acreedor = '';
  public startValue_cuenta = '';
  public startValue_estatus_amortizacion = '';

  private datos_inciales: DatosIniciales;
  private corporativo_activo: CorporativoActivo;
  identificador_corporativo: string;
  identificador_usuario: string;

  constructor(
    private _compartidosService: CompartidosService,
    private _storageService: StorageService,
    private _globals: GlobalsComponent,
  ) {
    this.iniciarFormulario();
  }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.identificador_usuario = this.datos_inciales.usuario.identificador_usuario;
    // this.filtroConsulta = new FiltroAmortizadores();
    this.filtroConsulta.corporativo_identificador = this.identificador_corporativo;
    this.cargarCatalogos();
  }

  buscar() {
    console.log(this.formulario_filtroSolicitud);
    // this.enviarData.emit(this.filtroConsulta);
    console.log(this.filtroConsulta);
  }

  iniciarFormulario() {
    this.formulario_filtroSolicitud = new FormGroup({
      contribuyente: new FormControl('', Validators.required),
      fech_fin: new FormControl(''),
      fech_ini: new FormControl(''),
      folio_fiscal: new FormControl('')
    });
  }
  onEmpresaSelected(dato) {
    console.log(dato);
    if (dato.value !== '' && dato.value !== '0') {
      this.filtroConsulta.contributente_identificador = dato.value;
      this.filtroConsulta.identificador_contribuyente = dato.value;
      this.formulario_filtroSolicitud.get('contribuyente').setValue(dato.value);
      // this.formulario_filtroSolicitud.();
      this.cargarHotel(dato.value);
      if (this.primer_filtrado) {
        this.buscar();
        this.primer_filtrado = false;
      }
    } else {
      this.filtroConsulta.contributente_identificador = '';
      this.filtroConsulta.identificador_contribuyente = '';
      this.filtroConsulta.sucursal_identificador = '';
      this.formulario_filtroSolicitud.get('contribuyente').setValue(null);
      this.lista_hoteles = [];
    }
  }
  onHotelSeleccionado(dato) {
    // console.log(dato);
    if (dato.value !== '' && dato.value !== '0') {
      this.filtroConsulta.sucursal_identificador = dato.value;
    } else {
      this.filtroConsulta.sucursal_identificador = '';
    }
  }
  onAcreedorSeleccionado(dato) {
    // console.log(dato);
    if (dato.value !== '' && dato.value !== '0') {
      this.filtroConsulta.acreedor_identificador = dato.value;
    } else {
      this.filtroConsulta.acreedor_identificador = '';
    }
  }
  onCuentaSeleccionado(dato) {
    console.log(dato);
    if (dato.value !== '' && dato.value !== '0') {
      this.filtroConsulta.cuenta_identificador = dato.value;
    } else {
      this.filtroConsulta.cuenta_identificador = '';
    }
  }
  onFechaDesdeAmortizacion(dato) {
    console.log(dato);
    if (dato.value !== '') {
      this.filtroConsulta.fecha_creacion_desde = dato.jsdate;
    } else {
      this.filtroConsulta.fecha_creacion_desde = '';
    }
  }
  onEstatusSeleccionadoAmortizacion(dato) {
    console.log(dato);
    if (dato.value !== '') {
      this.filtroConsulta.estatus_amortizacion_identificador = dato.value;
    } else {
      this.filtroConsulta.estatus_amortizacion_identificador = '';
    }
  }

  onFechahastaAmortizacion(dato) {
    console.log(dato);
    if (dato.value !== '') {
      this.filtroConsulta.fecha_creacion_hasta = dato.jsdate;
    } else {
      this.filtroConsulta.fecha_creacion_hasta = '';
    }
  }


  limpiar() {
    this.limpiarEmpresa();
    this.limpiarHotel();
    this.limpiarAcreedor();
    this.limpiarCuenta();
    this.limpiarEstatusAmortizacion();
    this.fech_fin = '';
    this.fech_ini = '';
    this.filtroConsulta = new FiltroAmortizadores();
  }
  cargarCatalogos() {
    this.cargarEmpresas();
  }

  cargarEmpresas() {
    const usr = this.datos_inciales.usuario;
    if (usr.acreedor === 1 || usr.proveedor === 1) {
      this.cargarEmpresasSAP();
    } else {
      this.cargarEmpresasPortal();
    }
  }


  cargarEmpresasSAP() {
    this._compartidosService.obtenerContribuyentesProveedorId(this.identificador_usuario)
      .subscribe((data: any) => {
        // this.lista_empresas = this._globals.prepararSelect2(data, 'identificador', 'nombre');
        this.lista_empresas = this._globals.prepararSelect2(data, 'identificador_contribuyente', 'contribuyente');
      }, error => {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }, () => {

      });
  }
  cargarEmpresasPortal() {
    this._compartidosService.obtenerEmpresasIdCorporativoIdUsuario(this.identificador_corporativo, this.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_empresas = this._globals.prepararSelect2(data, 'identificador', 'nombre');
        // this.lista_empresas = this._globals.agregarSeleccione(this.lista_empresas);
      }, error => {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }, () => {

      });
  }

  cargarHotel(identificador_contribuyente) {
    this._compartidosService.obtenerSucursalesXCorporativoXContribuyente(this.identificador_corporativo, identificador_contribuyente)
      .subscribe((data: any) => {
        this.lista_hoteles = this._globals.prepararSelect2(data, 'identificador', 'nombre');
        this.lista_hoteles = this._globals.agregarSeleccione(this.lista_hoteles, 'Seleccionar hotel...');
      },
        error => {

        },
      );
  }

  limpiarEmpresa() {
    const contri = this.lista_empresas;
    this.lista_empresas = null;
    this.lista_empresas = [];
    setTimeout(() => {
      this.lista_empresas = contri;
    }, 200);
    this.startValue_empresa = '0';
  }

  limpiarHotel() {
    const auxiliar = this.lista_hoteles;
    this.lista_hoteles = null;
    this.lista_hoteles = [];
    setTimeout(() => {
      this.lista_hoteles = auxiliar;
    }, 200);
    this.startValue_hotel = '0';
  }

  limpiarAcreedor() {
    const auxiliar = this.lista_hoteles;
    this.lista_hoteles = null;
    this.lista_hoteles = [];
    setTimeout(() => {
      this.lista_hoteles = auxiliar;
    }, 200);
    this.startValue_acreedor = '0';
  }

  limpiarCuenta() {
    const auxiliar = this.lista_cuenta;
    this.lista_cuenta = null;
    this.lista_cuenta = [];
    setTimeout(() => {
      this.lista_cuenta = auxiliar;
    }, 200);
    this.startValue_cuenta = '0';
  }

  limpiarEstatusAmortizacion() {
    const auxiliar = this.lista_estatus_amoritzacion;
    this.lista_estatus_amoritzacion = null;
    this.lista_estatus_amoritzacion = [];
    setTimeout(() => {
      this.lista_estatus_amoritzacion = auxiliar;
    }, 200);
    this.startValue_estatus_amortizacion = '0';
  }

  filtrar() {
    console.log(this.filtroConsulta);
    console.log(this.formulario_filtroSolicitud);
    this.cambiarTabla.emit(this.filtroConsulta);
  }
}
