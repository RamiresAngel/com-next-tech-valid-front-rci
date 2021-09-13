import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DatosIniciales, Contribuyente, CorporativoActivo } from 'src/app/entidades';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import Swal from 'sweetalert2';
import { FiltroDpp } from 'src/app/entidades/filtro-dpp';
import { IMyDpOptions } from 'mydatepicker';
import { FacturaDPP } from 'src/app/entidades/factura-dpp';
import { Moneda } from 'src/app/entidades/flujo-aprobacion';

@Component({
  selector: 'app-filt-codigos',
  templateUrl: './filt-codigos.component.html',
  styleUrls: ['./filt-codigos.component.css']
})
export class FiltCodigosComponent implements OnInit {

  @Input() filtro: FiltroDpp;
  private datos_inciales: DatosIniciales;
  public lista_contribuyentes: Contribuyente[];
  public lista_sucursales: Contribuyente[];
  public fech_ini: any;
  public fech_fin: any;
  public txtguardar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
  @Output() enviarData = new EventEmitter();
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };
  public listaFacturasPpd = new FacturaDPP();
  public lista_monedas = new Array<Moneda>();

  corporativo_activo: CorporativoActivo;
  constructor(
    private _storageService: StorageService,
    private _globals: GlobalsComponent,
    private _compartidosService: CompartidosService
  ) {
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.corporativo_activo = this._storageService.getCorporativoActivo();
  }

  ngOnInit() {
    this.inicializarFiltro();
    this.cargarEmpresasPortal();
  }

  cargarEmpresasPortal() {
    this._compartidosService.obtenerContribuyentesProveedorId(this.datos_inciales.usuario.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_contribuyentes = this._globals.prepararSelect2(data, 'identificador_contribuyente', 'contribuyente');
        // this.lista_contribuyentes = this._globals.agregarSeleccione(this.lista_contribuyentes);
      }, error => {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }, () => {

      });

    this._compartidosService.obtenerMonedasCorporativo(this.corporativo_activo.corporativo_identificador).subscribe((data: any) => {
      // this.lista_monedas = data;
      this.lista_monedas = this._globals.prepararSelect2(data, 'clave', 'nombre');
      // this.lista_monedas = this._globals.agregarSeleccione(data, 'Seleccione moneda...');
    });
  }

  onContribuyenteSelected(dato: any) {
    if (dato.value !== '' && dato.value !== '0') {
      this.filtro.identificador_contribuyente = dato.value;
      this.cargarHotel(dato.value);
    } else {
      this.lista_sucursales = [];
      this.filtro.identificador_contribuyente = '';
    }
  }

  cargarHotel(identificador_contribuyente) {
    this._compartidosService.obtenerSucursalesXCorporativoXContribuyente(this.datos_inciales.usuario.identificador_corporativo, identificador_contribuyente)
      .subscribe((data: any) => {
        this.lista_sucursales = this._globals.prepararSelect2(data, 'identificador', 'nombre');
        // this.lista_sucursales = this._globals.agregarSeleccione(this.lista_sucursales, 'Seleccionar hotel...');
      },
        error => {

        },
      );
  }

  onSucursalSeleccionado(dato: any) {
    if (dato.value !== '' && dato.value !== '0') {
      this.filtro.identificador_sucursal = dato.value;
    } else {
      this.filtro.identificador_sucursal = '';
    }
  }

  onFechaInicioViaje(dato) {
    if (dato.value !== '') {
      this.filtro.Fecha_Inicio = dato.formatted;
    } else {
      this.filtro.Fecha_Inicio = '';
    }
  }

  onFechaFinViaje(dato) {
    if (dato.value !== '') {
      this.filtro.Fecha_Fin = dato.formatted;
    } else {
      this.filtro.Fecha_Fin = '';
    }
  }

  limpiar() {
    this.lista_contribuyentes = [];
    this.filtro = new FiltroDpp();
    this.fech_fin = null;
    this.fech_ini = null;
    this.cargarEmpresasPortal();
    this.inicializarFiltro();
    this.lista_sucursales = [];
  }

  inicializarFiltro() {
    this.filtro.identificador_corporativo = this.datos_inciales.usuario.identificador_corporativo;
    this.filtro.identificador_proveedor = this.datos_inciales.usuario.identificador_proveedor;
    this.filtro.No_Proveedor = this.datos_inciales.usuario.numero_proveedor;
  }

  onMonedaSelected(evento) {
    if (evento.value !== '' && evento.value !== '0') {
      this.filtro.moneda = evento.value;
    } else {
      this.filtro.moneda = '';
    }
  }

  filtrar() {
    this.filtro.buscando = true;
    this.enviarData.emit();
  }

}
