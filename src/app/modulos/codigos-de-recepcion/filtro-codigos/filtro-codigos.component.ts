import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { CorporativoActivo, DatosIniciales, Contribuyente, Sucursal } from 'src/app/entidades';
import { IMyDpOptions } from 'mydatepicker';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-filtro-codigos',
  templateUrl: './filtro-codigos.component.html',
  styleUrls: ['./filtro-codigos.component.css']
})
export class FiltroCodigosComponent implements OnInit {


  @Input() filtroConsulta;
  @Output() tabla = new EventEmitter();
  public formulario: FormGroup;
  public lista_estatus: any;
  corporativo_activo: CorporativoActivo;
  identificador_corporativo: string;
  datos_iniciales: DatosIniciales;
  identificador_usuario: string;
  public lista_empresas: Contribuyente[];
  public lista_hoteles = new Array<Sucursal>();

  primer_filtrado = true;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };
  public boton_impiar: boolean;

  constructor(
    private _servicioCompartido: CompartidosService,
    private globas: GlobalsComponent,
    private _storageService: StorageService,
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.identificador_usuario = this.datos_iniciales.usuario.identificador_usuario;
    this.cargarDatos();
  }

  ngOnInit() {
    // setTimeout(() => {
    this.actualizarTabla();
    // }, 2500);
  }

  actualizarTabla() {
    this.filtroConsulta.fecha_inicio = this.filtroConsulta.fecha_inicio.formatted ? this.filtroConsulta.fecha_inicio.formatted : '';
    this.filtroConsulta.fecha_fin = this.filtroConsulta.fecha_fin.formatted ? this.filtroConsulta.fecha_fin.formatted : '';
    this.tabla.emit();
  }

  lipiarCampos() {
    this.boton_impiar = true;
    const aux_contr = this.lista_empresas;
    const aux_hoteles = this.lista_hoteles;
    this.lista_empresas = [];
    this.lista_hoteles = [];
    setTimeout(() => {
      this.lista_empresas = aux_contr;
      this.lista_hoteles = aux_hoteles;
      this.boton_impiar = false;
    }, 300);

    this.filtroConsulta.codigo_recepcion = '';
    this.filtroConsulta.identificador_contribuyente = '';
    this.filtroConsulta.fecha_inicio = '';
    this.filtroConsulta.fecha_fin = '';
    this.filtroConsulta.sucursal_identificador = '';
    this.filtroConsulta.numero_orden_compra = '';
    this.filtroConsulta.identificador_corporativo = this.identificador_corporativo;
    this.filtroConsulta.listtype = 'list';
  }

  cargarDatos() {
    const usr = this.datos_iniciales.usuario;
    if (usr.proveedor === 1 || usr.acreedor === 1) {
      this.cargarEmpresasSAP();
    } else {
      this.cargarEmpresasPortal();
    }
  }

  cargarEmpresasSAP() {
    this._servicioCompartido.obtenerContribuyentesProveedorId(this.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_empresas = this.globas.prepararSelect2(data, 'identificador_contribuyente', 'contribuyente');
        // this.lista_empresas = this.globas.agregarSeleccione(this.lista_empresas);
      }, error => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }, () => {

      });
  }
  cargarEmpresasPortal() {
    this._servicioCompartido.obtenerEmpresasIdCorporativoIdUsuario(this.identificador_corporativo, this.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_empresas = this.globas.prepararSelect2(data, 'identificador', 'nombre');
        // this.lista_empresas = this.globas.agregarSeleccione(this.lista_empresas);
      }, error => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }, () => {

      });
  }

  onSeleccionarContribuyente(obj: any) {
    console.log(obj);
    if (obj && obj !== '0') {
      this.filtroConsulta.identificador_contribuyente = obj;
      this._servicioCompartido.obtenerSucursalesXCorporativoXContribuyente(this.identificador_corporativo, obj)
        .subscribe(
          (data: any) => {
            this.lista_hoteles = this.globas.prepararSelect2(data, 'identificador', 'nombre');
            // this.lista_hoteles = this.globas.agregarSeleccione(this.lista_hoteles);
          }, error => {
            // swal.fire('Exito', 'Guardado Correctamente', 'success');
            swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
          }
        );
      if (this.primer_filtrado) {
        this.primer_filtrado = false;
        this.actualizarTabla();
      }
    } else {
      this.lista_hoteles = [];
    }
  }
  onSeleccionarHotel(obj: any) {
    if (obj !== '0') {
      this.filtroConsulta.sucursal_identificador = obj;
    }
  }

}
