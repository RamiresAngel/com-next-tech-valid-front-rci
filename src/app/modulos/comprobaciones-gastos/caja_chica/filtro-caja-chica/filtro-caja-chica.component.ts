import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario, filtroComprobacion } from 'src/app/entidades';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import Swal from 'sweetalert2';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-filtro-caja-chica',
  templateUrl: './filtro-caja-chica.component.html',
  styleUrls: ['./filtro-caja-chica.component.css']
})
export class FiltroCajaChicaComponent implements OnInit {

  @Output() filtrar = new EventEmitter();

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };

  filtro_comprobacion: FormGroup;
  filtro = new filtroComprobacion();
  usuario: Usuario;

  lista_estatus: any;
  lista_contribuyentes: any;
  lista_sucursales: any;

  constructor(
    private _compartidosService: CompartidosService,
    private _globals: GlobalsComponent,
    private _storageService: StorageService,
    private formBuilder: FormBuilder
  ) {
    this.usuario = this._storageService.getDatosIniciales().usuario;
  }

  ngOnInit() {
    this.filtro_comprobacion = this.formBuilder.group({
      contributente_identificador: ['', Validators.required],
      sucursal_identificador: ['', Validators.required],
      fecha_inicio_viaje: ['', Validators.required],
      fecha_fin_viaje: ['', Validators.required],
      estatus: [1],
      usuario_identificador: [this.usuario.identificador_usuario, Validators.required],
      identificador_corporativo: [this.usuario.identificador_corporativo, Validators.required]
    });
    this.getCatalogoEstatus();
    this.getContribuyente();
  }

  getCatalogoEstatus() {
    this._compartidosService.obtenerEstatus().subscribe((data: any) => {
      this.lista_estatus = $.map(data, (obj) => {
        obj.text = obj.descripcion;
        return obj;
      });
      this.lista_estatus = this._globals.agregarSeleccione(this.lista_estatus, 'Seleccione estatus...');
    });
  }



  getContribuyente() {

    const usr = this.usuario;
    if (usr.proveedor === 1 || usr.acreedor === 1) {
      this.cargarContribuyentesSAP();
    } else {
      this.cargarEmpresasPortal();
    }


  }

  cargarContribuyentesSAP() {
    this._compartidosService.obtenerContribuyentesProveedorId(this.usuario.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_contribuyentes = this._globals.prepararSelect2(data, 'identificador_contribuyente', 'contribuyente');
      }, error => {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }, () => {

      });
  }

  cargarEmpresasPortal() {
    this._compartidosService.obtenerEmpresasIdCorporativoIdUsuario(this.usuario.identificador_corporativo, this.usuario.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_contribuyentes = this._globals.prepararSelect2(data, 'identificador', 'nombre');
      }, error => {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }, () => {

      });
  }

  getSucursal(identificador_contribuyente) {
    if (identificador_contribuyente) {
      this._compartidosService.obtenerSucursalesXCorporativoXContribuyente(this.usuario.identificador_corporativo, identificador_contribuyente)
        .subscribe((data: any) => {
          this.lista_sucursales = this._globals.prepararSelect2(data, 'identificador', 'nombre');
        }, error => { },
        );
    }
  }

  buscar() {
    if (this.controles.fecha_inicio_viaje.value !== undefined && this.controles.fecha_inicio_viaje.value !== null && this.controles.fecha_inicio_viaje.value !== '' &&
      (this.controles.fecha_fin_viaje.value === undefined || this.controles.fecha_fin_viaje.value === null || this.controles.fecha_fin_viaje.value === '')
    ) {
      Swal.fire('Atención', 'Es necesario que seleccione una fecha de fin', 'warning');
      return 0;
    }
    if (this.controles.fecha_fin_viaje.value !== undefined && this.controles.fecha_fin_viaje.value !== null && this.controles.fecha_fin_viaje.value !== '' &&
      (this.controles.fecha_inicio_viaje.value === undefined || this.controles.fecha_inicio_viaje.value === null || this.controles.fecha_inicio_viaje.value === '')
    ) {
      Swal.fire('Atención', 'Es necesario que seleccione una fecha de Inicio', 'warning');
      return 0;
    }

    this.filtrar.emit(this.filtro_comprobacion.value);
  }

  limpiar() {
    this.filtro = new filtroComprobacion();
    this.filtro_comprobacion.reset();
    this.controles.identificador_corporativo.setValue(this.usuario.identificador_corporativo)
    this.limpiarSelects();
  }

  get controles() { return this.filtro_comprobacion.controls; }


  // Seleccionados
  onContribuyenteSelected(data) {
    this.controles.contributente_identificador.setValue(data.value ? data.value : null)
    this.filtro.contributente_identificador = data.value ? data.value : null;
    this.getSucursal(data.value ? data.value : null);
  }
  onSucursalSeleccionado(data) {
    this.controles.sucursal_identificador.setValue(data.value ? data.value : null);
    this.filtro.sucursal_identificador = data.value ? data.value : null;
  }
  onEstatusSeleccionado(data) {
    this.controles.estatus.setValue(data.value ? data.value : null);
    this.filtro.estatus = data.value ? data.value : null;
  }

  onFechaInicioViaje(data) {
    this.controles.fecha_inicio_viaje.setValue(data.formatted);
    this.filtro.fecha_inicio = data.formatted;
  }
  onFechaFinViaje(data) {
    this.controles.fecha_fin_viaje.setValue(data.formatted);
    this.filtro.fecha_fin = data.formatted;
  }

  limpiarSelects() {
    const contribuyentes = this.lista_contribuyentes;
    const sucursales = this.lista_sucursales;
    const estatus = this.lista_estatus;

    this.lista_contribuyentes = null;
    this.lista_sucursales = null;
    this.lista_estatus = null;
    this.lista_contribuyentes = [];
    this.lista_sucursales = [];
    this.lista_estatus = [];

    setTimeout(() => {
      this.lista_contribuyentes = contribuyentes;
      this.lista_sucursales = sucursales;
      this.lista_estatus = estatus;
    }, 200);

  }

}
