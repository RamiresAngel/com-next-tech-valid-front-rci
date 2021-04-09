import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario, CorporativoActivo, Movimientos, Contribuyente, Sucursal, Departamento, TipoGasto, FiltroCfdiRD } from 'src/app/entidades';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { IMyDpOptions } from 'mydatepicker';
import { EstatusSAP } from 'src/app/entidades/estatusSAP';

@Component({
  selector: 'app-filtro-cfdi-rd',
  templateUrl: './filtro-cfdi-rd.component.html',
  styleUrls: ['./filtro-cfdi-rd.component.css']
})
export class FiltroCfdiRdComponent implements OnInit {
  @Output() filtrar = new EventEmitter();

  public filtroConsulta = new FiltroCfdiRD();
  tipo_doc_mov_default = 0;
  primer_filtrado = true;

  // Globales
  usuario: Usuario;
  identificador_usuario: string;
  corporativo: CorporativoActivo;

  // Catalogos
  public lista_estatus: any;
  public lista_movimientos: Movimientos[];
  public lista_estatus_sap: EstatusSAP[];
  lista_contribuyentes = new Array<Contribuyente>();
  lista_sucursales = new Array<Sucursal>();
  lista_departamentos = new Array<Departamento>();
  lista_tipos_gasto = new Array<TipoGasto>();
  lista_tipos_comprobante = [{ id: '0', text: 'Seleccione Tipo Comprobante..' },
  { id: 'Pago', text: 'Pago' },
  { id: 'Ingreso', text: 'Ingreso' },
  { id: 'Egreso', text: 'Egreso' }
  ];
  es_carga_simple: boolean = false;
  // Formulario
  formulario_filtro: FormGroup;

  fecha_ini_doc: any;
  fecha_fin_doc: any;
  fecha_ini_rec: any;
  fecha_fin_rec: any;


  fech_ini_doc = '';
  fecha_documento_fin = '';

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };

  public txtBtnValidar = 'Validar';
  cuerpo_validar = {
    xml: 'AAAA-MM-DD',
    pdf: 'AAAA-MM-DD'
  };

  constructor(
    private _compartidosService: CompartidosService,
    private _storageService: StorageService,
    private globals: GlobalsComponent,
  ) { }

  ngOnInit() {
    this.corporativo = this._storageService.getCorporativoActivo();
    this.usuario = this._storageService.getDatosIniciales().usuario;
    this.filtroConsulta.rfc_proveedor = this.usuario.rfc;
    this.iniciciarFormulario();
    this.cargarEmpresas();
    this.obtenerDepartamentos(this.corporativo.corporativo_identificador);
    this.obtenerTiposGasto();

    setTimeout(() => {
      this.enviarFiltro();
    }, 250);
  }

  iniciciarFormulario() {
    this.formulario_filtro = new FormGroup({
      folio: new FormControl(''),
      // identificador_contribuyente: new FormControl('', Validators.required),
      nombre_proveedor: new FormControl(''),
      empresa: new FormControl('', Validators.required),
      hotel: new FormControl('', Validators.required),
      orden_compra: new FormControl(this.filtroConsulta.orden_compra),
      departamento: new FormControl(''),
      numero_SAP: new FormControl(''),
      codigo_recepcion: new FormControl(''),
      uuid: new FormControl(''),
      serie: new FormControl(''),
      tipo_modulo: new FormControl(''),
      rfc: new FormControl(''),
      fecha_recepcion_inicio: new FormControl(''),
      fecha_recepcion_fin: new FormControl(''),
      fecha_documento_inicio: new FormControl(''),
      fecha_documento_fin: new FormControl(''),
      numero_lote: new FormControl(''),
      tipo_comprobante: new FormControl(''),
      tipo_gasto: new FormControl('')
    });
  }

  limpiarCampos() {

    this.filtroConsulta = new FiltroCfdiRD();
    const contri = this.lista_contribuyentes;
    this.lista_contribuyentes = [];
    const sucu = this.lista_sucursales;
    this.lista_sucursales = [];
    const sap = this.lista_estatus_sap;
    this.lista_estatus_sap = [];
    const movi = this.lista_movimientos;
    this.lista_movimientos = [];
    this.formulario_filtro.patchValue({ fecha_documento_inicio: null });
    this.formulario_filtro.patchValue({ fecha_documento_fin: null });
    this.formulario_filtro.patchValue({ fecha_recepcion_inicio: null });
    this.formulario_filtro.patchValue({ fecha_recepcion_fin: null });

    setTimeout(() => {
      this.lista_contribuyentes = contri;
      this.lista_sucursales = sucu;
      this.lista_estatus_sap = sap;
      this.lista_movimientos = movi;
    }, 200);
  }

  enviarFiltro() {
    this.filtroConsulta.identificador_corporativo = this.usuario.identificador_corporativo;
    this.filtrar.emit(this.filtroConsulta);
  }
  selectFechaRecIni(obj) {
    this.filtroConsulta.fecha_inicio_recepcion = obj.formatted;
  }
  selectFechaRecFin(obj) {
    this.filtroConsulta.fecha_fin_recepcion = obj.formatted;
  }
  selectFechaDocuIni(obj) {
    this.filtroConsulta.fecha_inicio_doc = obj.formatted;
  }
  selectFechaDocuFin(obj) {
    this.filtroConsulta.fecha_fin_doc = obj.formatted;
  }

  cargarEmpresas() {
    const usr = this.usuario;
    if (usr.acreedor === 1 || usr.proveedor === 1) {
      this.cargarEmpresasSAP();
    } else {
      this.cargarEmpresasPortal();
    }
    // Cargar Catalogo tipo de movimiento
    this._compartidosService.obtenerTiposMovimiento(this.usuario.identificador_corporativo).subscribe((data: any) => {
      this.lista_movimientos = this.globals.prepararSelect2(data, 'id', 'descripcion');
      this.lista_movimientos = this.globals.agregarSeleccione(this.lista_movimientos, 'Seleecione movimiento...');
      if (this.globals.numero_lote) {
        setTimeout(() => {
          this.tipo_doc_mov_default = 13;
        }, 500);
      }
    }, error => {
      console.log(error);
    }, () => {
      if (this.globals.numero_lote) {
        setTimeout(() => {
          this.tipo_doc_mov_default = 13;
        }, 500);
      }
    });
    this._compartidosService.obtenerEstatusSAP().subscribe((data: any) => {
      this.lista_estatus_sap = this.globals.prepararSelect2(data, 'id', 'descripcion');
      this.lista_estatus_sap = this.globals.agregarSeleccione(this.lista_estatus_sap, 'Seleecione estatus...');
    }, error => {
      console.log(error);
    });
  }

  cargarEmpresasSAP() {
    this._compartidosService.obtenerContribuyentesProveedorId(this.usuario.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_contribuyentes = this.globals.prepararSelect2(data, 'identificador_contribuyente', 'contribuyente');
        // this.lista_contribuyentes = this.globals.agregarSeleccione(this.lista_contribuyentes, 'Seleccionar empresa...');
      },
        error => {

        },
      );
  }
  cargarEmpresasPortal() {
    this._compartidosService.obtenerEmpresasIdCorporativoIdUsuario(this.corporativo.corporativo_identificador, this.usuario.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_contribuyentes = this.globals.prepararSelect2(data, 'identificador', 'nombre');
        // this.lista_contribuyentes = this.globals.agregarSeleccione(this.lista_contribuyentes, 'Seleccionar empresa...');
      },
        error => {

        },
      );
  }

  obtenerDepartamentos(identificador_corporativo) {
    console.log(this.corporativo);
    this._compartidosService.obtenerDepartamentosXCorporativo(
      identificador_corporativo
      , this.usuario.identificador_usuario
      , Number(this.corporativo.rol_identificador)
    ).subscribe(
      (data) => {
        this.lista_departamentos = $.map(data, function (obj: any) {
          obj.id = obj.identificador;
          obj.text = `${obj.clave_departamento} - ${obj.descripcion}`;
          return obj;
        });
        console.log(this.lista_departamentos);
        this.lista_departamentos = this.globals.prepararSelect2(this.lista_departamentos, 'identificador', 'text');
        this.lista_departamentos = this.globals.agregarSeleccione(this.lista_departamentos, 'Seleccione departamento...');
      }
      , (error) => {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      });
  }

  obtenerTiposGasto() {
    this._compartidosService.obtenerTipoGasto(this.usuario.identificador_corporativo).subscribe(
      (data) => {
        this.lista_tipos_gasto = this.globals.prepararSelect2(data, 'id', 'descripcion');
        this.lista_tipos_gasto = this.globals.agregarSeleccione(this.lista_tipos_gasto, 'Seleccione tipo de gasto...');
      }
      , (error) => {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      });
  }

  onContribuyenteSelected(data: any) {
    if (data !== null && data.value !== '' && data.value !== '0') {
      this.formulario_filtro.get('empresa').setValue(data.value);
      this.filtroConsulta.identificador_contribuyente = data.value;
      this.cargarHotel(data.value);
    } else {
      this.formulario_filtro.get('empresa').setValue(null);
      this.filtroConsulta.identificador_contribuyente = '';
      this.filtroConsulta.sucursal_identificador = '';
      this.lista_sucursales = [];
    }
  }

  cargarHotel(identificador_contribuyente) {
    this._compartidosService.obtenerSucursalesXCorporativoXContribuyente(this.corporativo.corporativo_identificador, identificador_contribuyente)
      .subscribe((data: any) => {
        this.lista_sucursales = this.globals.prepararSelect2(data, 'identificador', 'nombre');
        // this.lista_sucursales = this.globals.agregarSeleccione(this.lista_sucursales, 'Seleccionar hotel...');
      },
        error => {
          this.lista_sucursales = [];
        },
      );
  }

  onSucursalSelected(obj: any) {
    if (obj.value !== null && obj.value !== '' && obj.value !== '0') {
      this.formulario_filtro.get('hotel').setValue(obj.value);
      this.filtroConsulta.sucursal_identificador = obj.value;
      if (this.primer_filtrado) {
        this.primer_filtrado = false;
        this.enviarFiltro();
      }
    } else {
      this.filtroConsulta.sucursal_identificador = '';
      this.formulario_filtro.get('hotel').setValue(null);
    }
  }

  onTipoComprobanteSelected(obj: any) {
    if (obj.value !== null && obj.value !== '' && obj.value !== '0') {
      this.formulario_filtro.get('tipo_comprobante').setValue(obj.value);
      this.filtroConsulta.tipo_documento = obj.value;
    } else {
      this.filtroConsulta.tipo_documento = '';
      this.formulario_filtro.get('tipo_comprobante').setValue(null);
    }
  }


  public get controles() {
    return this.formulario_filtro.controls;
  }

}
