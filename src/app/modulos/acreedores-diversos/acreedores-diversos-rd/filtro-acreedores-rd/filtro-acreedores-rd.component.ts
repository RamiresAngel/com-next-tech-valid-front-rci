import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FiltroSolicitudes, Sucursal, Usuario, Contribuyente } from 'src/app/entidades';
import { EstatusSAP } from 'src/app/entidades/estatusSAP';
import { Estatus } from 'src/app/modulos/estatus/clases/estatus';
import { IMyDpOptions } from 'mydatepicker';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';

@Component({
  selector: 'app-filtro-acreedores-rd',
  templateUrl: './filtro-acreedores-rd.component.html',
  styleUrls: ['./filtro-acreedores-rd.component.css']
})
export class FiltroAcreedoresRdComponent implements OnInit {
  @Input() esViaje: boolean;
  @Output() datos_para_filtrar = new EventEmitter();
  // Configuracion para input datepicker
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };

  filtro = new FiltroSolicitudes();
  usuario: Usuario;

  // Lista para los selects
  lista_contribuyentes = new Array<Contribuyente>();
  lista_sucursales = new Array<Sucursal>();
  lista_estatus_sap = new Array<EstatusSAP>();
  lista_estatus = new Array<Estatus>();

  // Variable para Fechas
  fecha_inicio: any;
  fecha_fin: any;


  primer_carga = true;

  constructor(
    private storageService: StorageService,
    private _compartidoService: CompartidosService,
    private _globals: GlobalsComponent
  ) {
    this.usuario = this.storageService.getDatosIniciales().usuario;
    this.obtenerDatosIniciales();
  }

  ngOnInit() {

  }

  filtrar() {
    this.datos_para_filtrar.emit(this.filtro);
  }

  limpiar() {
    this.filtro = new FiltroSolicitudes();
    this.fecha_fin = null;
    this.fecha_inicio = null;
    const contribuyentes = [...this.lista_contribuyentes];
    const sucursal = [...this.lista_sucursales];
    const estatus = [...this.lista_estatus];
    const estatus_sap = [...this.lista_estatus_sap];

    // this.lista_contribuyentes.length = 0;
    this.lista_contribuyentes = null;
    // this.lista_sucursales.length = 0;
    this.lista_sucursales = null;
    // this.lista_estatus.length = 0;
    this.lista_estatus = null;
    // this.lista_estatus_sap.length = 0;
    this.lista_estatus_sap = null;

    setTimeout(() => {
      this.lista_contribuyentes = contribuyentes;
      this.lista_sucursales = sucursal;
      this.lista_estatus = estatus;
      this.lista_estatus_sap = estatus_sap;
    }, 250);
  }

  onContribuyenteSelected(data) {
    this.filtro.contributente_identificador = data.value;
    this.obtenerSucursales(data.value);
  }
  onSucursalSelected(data) {
    this.filtro.sucursal_identificador = data.value;
    if (this.primer_carga) {
      this.primer_carga = false;
      this.filtrar();
    }

  }
  onEstatusSelected(data) {
    this.filtro.estatus = data.value;
  }
  onEstatusSapSelected(data) {
    this.filtro.estatus_sap = data.value;
  }
  onFechaInicioViajeSelected(data) {
    this.filtro.fecha_inicio_viaje = data.formatted;
  }
  onFechaFinViajeSelected(data) {
    this.filtro.fecha_fin_viaje = data.formatted;
  }


  //#region Cargar Catalogos

  obtenerDatosIniciales() {
    this.obtenerContribuyentes();
    this.obtenerEstatus();
    this.obtenerEstatusSAP();
  }

  obtenerContribuyentes() {
    if (this.usuario.proveedor == 1 || this.usuario.acreedor == 1) {
      this.obtenerContribuyentesSAP();
    } else {
      this.obtenerContribuyentesPortal();
    }
  }

  obtenerContribuyentesSAP() {
    this._compartidoService.obtenerContribuyentesProveedorId(this.usuario.identificador_usuario)
      .subscribe((data: Array<Contribuyente>) => {
        this.lista_contribuyentes = this._globals.prepararSelect2(data, 'identificador_contribuyente', 'contribuyente');
      }, err => {
        this.lista_contribuyentes.length = 0;
        console.log(err);
      });
  }
  obtenerContribuyentesPortal() {
    this._compartidoService.obtenerEmpresasIdCorporativoIdUsuario(this.usuario.identificador_corporativo, this.usuario.identificador_usuario)
      .subscribe((data: Array<Contribuyente>) => {
        this.lista_contribuyentes = this._globals.prepararSelect2(data, 'identificador', 'nombre');
      }, err => {
        this.lista_contribuyentes.length = 0;
        console.log(err);
      });
  }

  obtenerSucursales(identificador_contribuyente) {
    this._compartidoService.obtenerSucursalesXCorporativoXContribuyente(this.usuario.identificador_corporativo, identificador_contribuyente)
      .subscribe((data: Array<Sucursal>) => {
        this.lista_sucursales = this._globals.prepararSelect2(data, 'identificador', 'nombre');
      }, err => {
        console.log(err);
      });
  }

  obtenerEstatus() {
    this._compartidoService.obtenerEstatus().subscribe((data: Array<Estatus>) => {
      this.lista_estatus = this._globals.prepararSelect2(data, 'id', 'descripcion');
      this.lista_estatus = this._globals.agregarSeleccione(this.lista_estatus);
    }, error => {
      console.log(error);
    })
  }
  obtenerEstatusSAP() {
    this._compartidoService.obtenerEstatusSAP().subscribe((data: Array<EstatusSAP>) => {
      this.lista_estatus_sap = this._globals.prepararSelect2(data, 'id', 'descripcion');
      this.lista_estatus_sap = this._globals.agregarSeleccione(this.lista_estatus_sap);
    });
  }

  //#endregion
}
