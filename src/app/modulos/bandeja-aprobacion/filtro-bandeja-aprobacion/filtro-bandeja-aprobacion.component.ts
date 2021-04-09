import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FiltroAmortizadores, Contribuyente, DatosIniciales, CorporativoActivo } from 'src/app/entidades';
import { FormGroup } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';

@Component({
  selector: 'app-filtro-bandeja-aprobacion',
  templateUrl: './filtro-bandeja-aprobacion.component.html',
  styleUrls: ['./filtro-bandeja-aprobacion.component.css']
})
export class FiltroBandejaAprobacionComponent implements OnInit {


  @Output() seleccionaTabla = new EventEmitter<any>();
  @Output() aplicarFiltros = new EventEmitter<any>();
  public formulario_filtroSolicitud: FormGroup;
  public txtBtnBuscar = 'Buscar';
  public titulo = 'Filtrar';
  public filtro: FiltroAmortizadores;
  public fech_ini: any;
  public fech_fin: any;
  public volver_preliminares = false;

  fecha_inicio_palceholder = 'Desde';
  fecha_fin_palceholder = 'Registro  Hasta';
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
  public lista_hoteles: Contribuyente[];
  public lista_acreedor: Contribuyente[];
  public lista_cuenta: Contribuyente[];
  public lista_estatus_amoritzacion: Contribuyente[];

  public startValue_empresa = '';
  public startValue_hotel = '';
  public startValue_acreedor = '';
  public startValue_cuenta = '';
  public startValue_estatus_amortizacion = '';

  private datos_inciales: DatosIniciales;
  private corporativo_activo: CorporativoActivo;
  identidicador_corporativo: string;
  identidicador_usuario: string;

  constructor(
    private _compartidosService: CompartidosService,
    private _storageService: StorageService,
    private _globals: GlobalsComponent,
  ) {
  }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.identidicador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.identidicador_usuario = this.datos_inciales.usuario.identificador_usuario;
    this.filtro = new FiltroAmortizadores();
    this.filtro.corporativo_identificador = this.identidicador_corporativo;
    this.cargarCatalogos();
  }

  buscar() {
    this.aplicarFiltros.emit(this.filtro);
    // console.log(this.filtro);
  }

  onEmpresaSelected(dato) {
    // console.log(dato);
    if (dato.value !== '' && dato.value !== '0') {
      this.filtro.contributente_identificador = dato.value;
      this.cargarHotel(dato.value);
    } else {
      this.filtro.contributente_identificador = '';
      this.filtro.sucursal_identificador = '';
      this.lista_hoteles = [];
    }
  }
  onHotelSeleccionado(dato) {
    // console.log(dato);
    if (dato.value !== '' && dato.value !== '0') {
      this.filtro.sucursal_identificador = dato.value;
    } else {
      this.filtro.sucursal_identificador = '';
    }
  }
  onAcreedorSeleccionado(dato) {
    // console.log(dato);
    if (dato.value !== '' && dato.value !== '0') {
      this.filtro.acreedor_identificador = dato.value;
    } else {
      this.filtro.acreedor_identificador = '';
    }
  }
  onCuentaSeleccionado(dato) {
    // console.log(dato);
    if (dato.value !== '' && dato.value !== '0') {
      this.filtro.cuenta_identificador = dato.value;
    } else {
      this.filtro.cuenta_identificador = '';
    }
  }
  onFechaDesdeAmortizacion(dato) {
    // console.log(dato);
    if (dato.value !== '') {
      this.filtro.fecha_creacion_desde = dato.jsdate;
    } else {
      this.filtro.fecha_creacion_desde = '';
    }
  }
  onEstatusSeleccionadoAmortizacion(dato) {
    // console.log(dato);
    if (dato.value !== '') {
      this.filtro.estatus_amortizacion_identificador = dato.value;
    } else {
      this.filtro.estatus_amortizacion_identificador = null;
    }
  }

  onFechahastaAmortizacion(dato) {
    // console.log(dato);
    if (dato.value !== '') {
      this.filtro.fecha_creacion_hasta = dato.jsdate;
    } else {
      this.filtro.fecha_creacion_hasta = '';
    }
  }


  limpiar() {
    this.filtro = new FiltroAmortizadores();
    this.limpiarEmpresa();
    this.limpiarHotel();
    this.limpiarAcreedor();
    this.limpiarCuenta();
    this.limpiarEstatusAmortizacion();
    this.fech_fin = null;
    this.fech_ini = null;
  }
  cargarCatalogos() {
    this.cargarEmpresas();
  }

  cargarEmpresas() {
    this._compartidosService.obtenerEmpresasIdCorporativoIdUsuario(this.identidicador_corporativo, this.identidicador_usuario)
      .subscribe((data: any) => {
        this.lista_empresas = this._globals.prepararSelect2(data, 'identificador', 'nombre');
        this.lista_empresas = this._globals.agregarSeleccione(this.lista_empresas, 'Seleccionar empresa...');
      },
        error => {

        },
      );
  }

  cargarHotel(identificador_contribuyente) {
    this._compartidosService.obtenerHotelIdContribuyenteIdUsuario(identificador_contribuyente, this.identidicador_usuario)
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

  cambio(obj: String) {
    this.seleccionaTabla.emit(obj);
  }

  filtrar() {
    this.aplicarFiltros.emit(this.filtro);
  }
}
