import { OrdenCompraService } from './../orden-compra.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { IMyDpOptions } from 'mydatepicker';
import { CorporativoActivo, Contribuyente, DatosIniciales, Sucursal, FiltroOrdenesCompra, Usuario } from 'src/app/entidades';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { IfStmt } from '@angular/compiler';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-filtro-orden-compra',
  templateUrl: './filtro-orden-compra.component.html',
  styleUrls: ['./filtro-orden-compra.component.css']
})
export class FiltroOrdenCompraComponent implements OnInit {

  @Input() filtroConsulta;
  @Output() tabla = new EventEmitter();
  public formulario: FormGroup;
  public lista_estatus: any;
  primer_filtrado = true;
  corporativo_activo: CorporativoActivo;
  identificador_corporativo: string;
  datos_iniciales: DatosIniciales;
  identificador_usuario: string;
  public lista_empresas: Contribuyente[];
  public lista_hoteles = new Array<Sucursal>();
  public lista_documento: any[];
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };
  constructor(
    private _servicioCompartido: CompartidosService,
    private _storageService: StorageService,
    private globas: GlobalsComponent,
    private _ordenCompraService: OrdenCompraService
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.identificador_usuario = this.datos_iniciales.usuario.identificador_usuario;
    this.inicializarFormulario();
    this.cargarDatos();
  }

  ngOnInit() {
    if (this.datos_iniciales.usuario.proveedor) {
      this.filtroConsulta.numero_proveedor = this.datos_iniciales.usuario.numero_proveedor;
    }

    setTimeout(() => {
      this.actualizarTabla();
    }, 2000);

  }


  actualizarTabla() {
    this.filtroConsulta.anticipo = Number(this.filtroConsulta.anticipo);
    this.filtroConsulta.estatus_sap = Number(this.filtroConsulta.estatus_sap);
    this.filtroConsulta.fecha_inicio = this.filtroConsulta.fecha_inicio ? this.filtroConsulta.fecha_inicio.formatted : '';
    this.filtroConsulta.fecha_fin = this.filtroConsulta.fecha_fin ? this.filtroConsulta.fecha_fin.formatted : '';
    console.log(this.filtroConsulta);
    this.tabla.emit();
  }

  inicializarFormulario() {
    this.formulario = new FormGroup({
      fecha_inicio: new FormControl(''),
      fecha_fin: new FormControl(''),
      nombre_proveedor: new FormControl(''),
      codigo_compania: new FormControl(''),
      identificador_contribuyente: new FormControl('', Validators.required),
      empresa: new FormControl(''),
      hotel: new FormControl(''),
      anticipos: new FormControl(''),
      orden_compra: new FormControl('')
    }
    );
  }

  lipiarCampos() {
    // this.filtroConsulta.fecha_inicio = '';
    // this.filtroConsulta.fecha_fin = '';
    // this.filtroConsulta.numero_proveedor = '';
    // this.filtroConsulta.codigo_compania = '';
    // this.filtroConsulta.empresa = '';
    // this.filtroConsulta.hotel = '';
    // this.filtroConsulta.anticipos = '';
    // this.filtroConsulta.orden_compra = '';
    const aux_contr = this.lista_empresas;
    const aux_hoteles = this.lista_hoteles;

    this.lista_empresas = [];
    this.lista_hoteles = [];
    setTimeout(() => {
      this.lista_empresas = aux_contr;
      this.lista_hoteles = aux_hoteles;
    }, 200);

    this.filtroConsulta.nombre_proveedor = '';
    this.filtroConsulta.codigo_contribuyente = '';
    this.filtroConsulta.identificador_contribuyente = '';
    this.filtroConsulta.fecha_inicio = '';
    this.filtroConsulta.fecha_fin = '';
    this.filtroConsulta.sucursal_identificador = '';
    this.filtroConsulta.estatus_sap = 0;
    this.filtroConsulta.anticipo = 2;
    this.filtroConsulta.numero_orden_compra = '';
  }

  cargarDatos() {
    const usr = this.datos_iniciales.usuario;
    if (usr.acreedor === 1 || usr.proveedor === 1) {
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
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }, () => {

      });
  }
  cargarEmpresasPortal() {
    this._servicioCompartido.obtenerEmpresasIdCorporativoIdUsuario(this.identificador_corporativo, this.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_empresas = this.globas.prepararSelect2(data, 'identificador', 'nombre');
        // this.lista_empresas = this.globas.agregarSeleccione(this.lista_empresas);
      }, error => {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }, () => {

      });
  }

  cargaTipoDocumento() {
    this._ordenCompraService.listTipoDocumento()
      .subscribe((data) => {
        console.log(data);
      },
        (error) => {
          console.log(error);
        });
  }

  onSeleccionarContribuyente(obj: any) {
    console.log(obj);
    if (obj !== '0') {
      this.filtroConsulta.identificador_contribuyente = obj;
      this.formulario.get('identificador_contribuyente').setValue(obj);
      this._servicioCompartido.obtenerSucursalesXCorporativoXContribuyente(this.identificador_corporativo, obj)
        .subscribe(
          (data: any) => {
            this.lista_hoteles = this.globas.prepararSelect2(data, 'identificador', 'nombre');
            // this.lista_hoteles = this.globas.agregarSeleccione(this.lista_hoteles);
          }, error => {
            console.log(error);
          }
        );
      if (this.primer_filtrado) {
        this.actualizarTabla();
        this.primer_filtrado = false;
      }
    }
  }
  onSeleccionarHotel(obj: any) {
    if (obj !== '0') {
      this.filtroConsulta.sucursal_identificador = obj;
    }
  }

  onSeleccioneTipoDocumento(obj: any) {
    console.log(obj);
  }
}
