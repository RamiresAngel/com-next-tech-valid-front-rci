import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FiltroSolicitudes } from 'src/app/entidades/Filtro-Solicitudes.';
import { IMyDpOptions } from 'mydatepicker';
import { Contribuyente } from 'src/app/entidades/contribuyente';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { Moment } from 'moment';
import Swal from 'sweetalert2';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';


@Component({
  selector: 'app-filtro-comrpobaciones',
  templateUrl: './filtro-comrpobaciones.component.html',
  styleUrls: ['./filtro-comrpobaciones.component.css']
})
export class FiltroComrpobacionesComponent implements OnInit {
  @Output() enviarData = new EventEmitter();
  @Input('filtro_anticipo') filtro_anticipo;
  public formulario_filtroSolicitud: FormGroup;
  public txtBtnBuscar = 'Buscar';
  public titulo = 'Filtrar';
  // public filtro: FiltroSolicitudes;
  public fech_ini: any;
  public fech_fin: any;

  fecha_inicio_palceholder = 'Fecha Inicio';
  fecha_fin_palceholder = 'Fecha Fin ';
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };

  public lista_contribuyentes: Contribuyente[];
  public lista_sucursales: Contribuyente[];
  public lista_estatus_sap: Contribuyente[];
  public lista_estatus: Contribuyente[];

  public startValue_sucursal = '';
  public startValue_estatus_sap = '';
  public startValue_estatus = '';
  public startValue_contribuyente = '';
  private datos_inciales: DatosIniciales;
  private corporativo_activo: CorporativoActivo;
  idenfidicador_corporativo: string;
  identificador_usuario: string;
  selected: { startDate: Moment, endDate: Moment };


  formulario_filtro: FormGroup;
  primer_filtrado = true;

  constructor(
    private _compartidosService: CompartidosService,
    private _storageService: StorageService,
    private _globals: GlobalsComponent,
  ) {
  }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.idenfidicador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.identificador_usuario = this.datos_inciales.usuario.identificador_usuario;
    // this.filtro = new FiltroSolicitudes();
    this.filtro_anticipo.identificador_corporativo = this.idenfidicador_corporativo;
    this.iniciarFormulario();
    this.cargarCatalogos();
  }

  buscar() {
    this.enviarData.emit();
    // console.log(this.filtro);
  }
  iniciarFormulario() {
    this.formulario_filtro = new FormGroup({
      empresa: new FormControl('', Validators.required)
    });
  }

  onContribuyenteSelected(dato) {
    // console.log(dato);
    if (dato.value !== '' && dato.value !== '0') {
      this.filtro_anticipo.contributente_identificador = dato.value;
      this.formulario_filtro.get('empresa').setValue(dato.value);
      this.cargarHotel(dato.value);
      if (this.primer_filtrado) {
        this.buscar();
        this.primer_filtrado = false;
      }
    } else {
      this.filtro_anticipo.contributente_identificador = '';
      this.formulario_filtro.get('empresa').setValue(null);
      this.filtro_anticipo.sucursal_identificador = '';
      this.lista_sucursales = [];
    }
  }
  onSucursalSeleccionado(dato) {
    // console.log(dato);
    if (dato.value !== '' && dato.value !== '0') {
      this.filtro_anticipo.sucursal_identificador = dato.value;
    } else {
      this.filtro_anticipo.sucursal_identificador = '';
    }
  }
  onFechaInicioViaje(dato) {
    console.log(dato);
    if (dato.value !== '') {
      this.filtro_anticipo.fecha_inicio = dato.formatted;
    } else {
      this.filtro_anticipo.fecha_inicio = '';
    }
  }
  onEstatusSAPSeleccionado(dato) {
    // console.log(dato);
    if (dato.value !== '') {
      this.filtro_anticipo.estatus_sap = Number(dato.value);
    } else {
      this.filtro_anticipo.estatus_sap = null;
    }
  }
  onEstatusSeleccionado(dato) {
    // console.log(dato);
    if (dato.value !== '') {
      this.filtro_anticipo.estatus = Number(dato.value);
    } else {
      this.filtro_anticipo.estatus = null;
    }
  }
  onFechaFinViaje(dato) {
    console.log(dato);
    if (dato.value !== '') {
      this.filtro_anticipo.fecha_fin = dato.formatted;
    } else {
      this.filtro_anticipo.fecha_fin = '';
    }
  }
  limpiar() {
    this.filtro_anticipo = new FiltroSolicitudes();
    this.limpiarContribuyente();
    this.limpiarEstatus();
    this.limpiarSucursal();
    this.limpiarEstatusSAP();
    this.fech_fin = null;
    this.fech_ini = null;
  }
  cargarCatalogos() {
    this._compartidosService.obtenerEstatus().subscribe((data: any) => {
      this.lista_estatus = $.map(data, (obj) => {
        obj.text = obj.descripcion;
        return obj;
      });
      this.lista_estatus = this._globals.agregarSeleccione(this.lista_estatus, 'Seleccione estatus...');
    });
    this._compartidosService.obtenerEstatusSAP().subscribe((data: any) => {
      this.lista_estatus_sap = $.map(data, (obj) => {
        obj.text = obj.descripcion;
        return obj;
      });
      this.lista_estatus_sap = this._globals.agregarSeleccione(this.lista_estatus_sap, 'Seleccione Estatus SAP...');
    });
    this.cargarEmpresas();
    // this._contribuyenteService.ObtenerListaContribuyentesMXPorCorporativo(this.idenfidicador_corporativo).subscribe((data: any) => {
    //   this.lista_contribuyentes = $.map(data, (obj) => {
    //     obj.id = obj.identificador;
    //     obj.text = obj.nombre;
    //     return obj;
    //   });
    //   this.lista_contribuyentes = this._globals.agregarSeleccione(this.lista_contribuyentes);
    // });
    // this._sucursalService.ObtenerListaSucursalesMXPorCorporativo(this.idenfidicador_corporativo).subscribe((data: any) => {
    //   this.lista_sucursales = $.map(data, (obj) => {
    //     obj.id = obj.identificador;
    //     obj.text = obj.nombre;
    //     return obj;
    //   });
    //   this.lista_sucursales = this._globals.agregarSeleccione(this.lista_sucursales);
    // });
  }

  cargarEmpresas() {
    const usr = this.datos_inciales.usuario;
    if (usr.proveedor === 1 || usr.acreedor === 1) {
      this.cargarEmpresasSAP();
    } else {
      this.cargarEmpresasPortal();
    }
  }

  cargarEmpresasSAP() {
    this._compartidosService.obtenerContribuyentesProveedorId(this.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_contribuyentes = this._globals.prepararSelect2(data, 'identificador_contribuyente', 'contribuyente');
        // this.lista_contribuyentes = this._globals.agregarSeleccione(this.lista_contribuyentes);
      }, error => {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }, () => {

      });
  }
  cargarEmpresasPortal() {
    this._compartidosService.obtenerEmpresasIdCorporativoIdUsuario(this.idenfidicador_corporativo, this.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_contribuyentes = this._globals.prepararSelect2(data, 'identificador', 'nombre');
        // this.lista_contribuyentes = this._globals.agregarSeleccione(this.lista_contribuyentes);
      }, error => {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }, () => {

      });
  }

  cargarHotel(identificador_contribuyente) {
    this._compartidosService.obtenerSucursalesXCorporativoXContribuyente(this.idenfidicador_corporativo, identificador_contribuyente)
      .subscribe((data: any) => {
        this.lista_sucursales = this._globals.prepararSelect2(data, 'identificador', 'nombre');
        this.lista_sucursales = this._globals.agregarSeleccione(this.lista_sucursales, 'Seleccionar hotel...');
      },
        error => {

        },
      );
  }

  limpiarContribuyente() {
    const contri = this.lista_contribuyentes;
    this.lista_contribuyentes = null;
    this.lista_contribuyentes = [];
    setTimeout(() => {
      this.lista_contribuyentes = contri;
    }, 200);
    this.startValue_contribuyente = '0';
  }
  limpiarSucursal() {
    const auxiliar = this.lista_sucursales;
    this.lista_sucursales = null;
    this.lista_sucursales = [];
    setTimeout(() => {
      this.lista_sucursales = auxiliar;
    }, 200);
    this.startValue_sucursal = '0';
  }
  limpiarEstatusSAP() {
    const auxiliar = this.lista_estatus_sap;
    this.lista_estatus_sap = null;
    this.lista_estatus_sap = [];
    setTimeout(() => {
      this.lista_estatus_sap = auxiliar;
    }, 200);
    this.startValue_estatus_sap = '0';
  }
  limpiarEstatus() {
    const auxiliar = this.lista_estatus;
    this.lista_estatus = null;
    this.lista_estatus = [];
    setTimeout(() => {
      this.lista_estatus = auxiliar;
    }, 200);
    this.startValue_estatus = '0';
  }
}
