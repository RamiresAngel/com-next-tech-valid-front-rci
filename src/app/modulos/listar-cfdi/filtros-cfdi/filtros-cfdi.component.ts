import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FiltroCFDI, CorporativoActivo, Contribuyente, Usuario, Sucursal, DatosIniciales, Movimientos } from 'src/app/entidades';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { IMyDpOptions } from 'mydatepicker';
import { EstatusSAP } from 'src/app/entidades/estatusSAP';

@Component({
  selector: 'app-filtros-cfdi',
  templateUrl: './filtros-cfdi.component.html',
  styleUrls: ['./filtros-cfdi.component.css']
})
export class FiltrosCfdiComponent implements OnInit {

  public filtroConsulta = new FiltroCFDI();
  tipo_doc_mov_default = 0;
  lista_tipo_pago = [
    {
      id: '',
      text: 'Seleccione tipo de pago...'
    },
    {
      id: 'PUE',
      text: 'PUE'
    },
    {
      id: 'PPD',
      text: 'PPD'
    }
  ]
  // @Input() filtroConsulta;
  primer_filtrado = true;
  @Output() tabla = new EventEmitter();
  public lista_estatus: any;
  public lista_movimientos: Movimientos[];
  public lista_estatus_sap: EstatusSAP[];
  es_acreedor_proveedor = false;

  formulario_filtro: FormGroup;
  corporativo_activo: CorporativoActivo;
  lista_contribuyentes = new Array<Contribuyente>();
  lista_sucursales = new Array<Sucursal>();
  lista_documentos = new Array<any>();
  datos_iniciales: DatosIniciales;
  identificador_usuario: string;
  identificador_corporativo: string;
  nivel_aprobacion: number;

  fecha_ini_doc: any;
  fecha_fin_doc: any;
  fecha_ini_rec: any;
  fecha_fin_rec: any;

  startValue_contribuyente: string;
  startValue_sucursales: string;
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
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.identificador_usuario = this.datos_iniciales.usuario.identificador_usuario;
    this.filtroConsulta.rfc_proveedor = this.datos_iniciales.usuario.rfc;
    this.iniciciarFormulario();
    this.cargarEmpresas();
    if (this.globals.numero_lote) {
      this.tipo_doc_mov_default = 13;
      this.filtroConsulta.identificador_lote = this.globals.numero_lote; // Contiene el numero de lote guardado al momento de dar click en carga masiva
    } else {
      this.filtroConsulta.identificador_lote = ""; // Contiene el numero de lote guardado al momento de dar click en carga masiva
    }
  }

  iniciciarFormulario() {
    this.formulario_filtro = new FormGroup({
      folio: new FormControl(''),
      // identificador_contribuyente: new FormControl('', Validators.required),
      nombre_proveedor: new FormControl(''),
      empresa: new FormControl('', Validators.required),
      hotel: new FormControl('', Validators.required),
      orden_compra: new FormControl(''),
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
      nivel_aprobacion: new FormControl('')
    });
  }

  limpiarCampos() {
    this.filtroConsulta = new FiltroCFDI();
    const contri = this.lista_contribuyentes;
    this.lista_contribuyentes = [];
    const tipDocs = this.lista_documentos;
    this.lista_documentos = [];
    const sucu = this.lista_sucursales;
    this.lista_sucursales = [];
    const sap = this.lista_estatus_sap;
    this.lista_estatus_sap = [];
    const movi = this.lista_movimientos;
    this.lista_movimientos = [];
    const pags = this.lista_tipo_pago;
    this.lista_tipo_pago = [];
    this.formulario_filtro.patchValue({ fecha_documento_inicio: null });
    this.formulario_filtro.patchValue({ fecha_documento_fin: null });
    this.formulario_filtro.patchValue({ fecha_recepcion_inicio: null });
    this.formulario_filtro.patchValue({ fecha_recepcion_fin: null });

    setTimeout(() => {
      this.lista_contribuyentes = contri;
      this.lista_sucursales = sucu;
      this.lista_estatus_sap = sap;
      this.lista_movimientos = movi;
      this.lista_documentos = tipDocs;
      this.lista_tipo_pago = pags;
    }, 200);
  }

  actualizarTabla() {

    const usr = this.datos_iniciales.usuario;
    if (usr.acreedor === 1 || usr.proveedor === 1) {
    }
    if (this.globals.numero_lote) {
      this.filtroConsulta.estatus_sap = 13;
      this.globals.numero_lote = null;
    }
    this.tabla.emit(this.filtroConsulta);
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
    const usr = this.datos_iniciales.usuario;
    if (usr.acreedor === 1 || usr.proveedor === 1) {
      this.cargarEmpresasSAP();
    } else {
      this.cargarEmpresasPortal();
    }
    // Cargar Catalogo tipo de movimiento
    this._compartidosService.obtenerTiposMovimiento(this.identificador_corporativo).subscribe((data: any) => {
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

    this.obtenerTipoDocs();
  }

  cargarEmpresasSAP() {
    this._compartidosService.obtenerContribuyentesProveedorId(this.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_contribuyentes = this.globals.prepararSelect2(data, 'identificador_contribuyente', 'contribuyente');
        // this.lista_contribuyentes = this.globals.agregarSeleccione(this.lista_contribuyentes, 'Seleccionar empresa...');
      },
        error => {

        },
      );
  }
  cargarEmpresasPortal() {
    this._compartidosService.obtenerEmpresasIdCorporativoIdUsuario(this.corporativo_activo.corporativo_identificador, this.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_contribuyentes = this.globals.prepararSelect2(data, 'identificador', 'nombre');
        // this.lista_contribuyentes = this.globals.agregarSeleccione(this.lista_contribuyentes, 'Seleccionar empresa...');
      },
        error => {

        },
      );
  }
  obtenerTipoDocs() {
    this._compartidosService.obtenerTipoDocumento(this.corporativo_activo.corporativo_identificador)
      .subscribe((data: any) => {
        this.lista_documentos = this.globals.prepararSelect2(data, 'id', 'descripcion');
        this.lista_documentos = this.globals.agregarSeleccione(this.lista_documentos, 'Seleccione Tipo Documento...');
        // this.lista_contribuyentes = this.globals.agregarSeleccione(this.lista_contribuyentes, 'Seleccionar empresa...');
      },
        error => {
          console.log(error);

        },
      );
  }



  selectEmpresa(data: any) {
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
    this._compartidosService.obtenerSucursalesXCorporativoXContribuyente(this.identificador_corporativo, identificador_contribuyente)
      .subscribe((data: any) => {
        this.lista_sucursales = this.globals.prepararSelect2(data, 'identificador', 'nombre');
        // this.lista_sucursales = this.globals.agregarSeleccione(this.lista_sucursales, 'Seleccionar hotel...');
      },
        error => {
          this.lista_sucursales = [];
        },
      );
  }

  selecSucursal(obj: any) {
    if (obj.value !== null && obj.value !== '' && obj.value !== '0') {
      this.formulario_filtro.get('hotel').setValue(obj.value);
      this.filtroConsulta.sucursal_identificador = obj.value;
      if (this.primer_filtrado) {
        this.primer_filtrado = false;
        this.actualizarTabla();
      }
    } else {
      this.filtroConsulta.sucursal_identificador = '';
      this.formulario_filtro.get('hotel').setValue(null);
    }
  }
  selectTipoMovimiento(obj: any) {
    if (obj.value !== '' && obj.value !== '0') {
      this.filtroConsulta.estatus_sap = obj.value as number;
      if (this.filtroConsulta.estatus_sap !== 13) {
        this.filtroConsulta.identificador_lote = '';
      }
    } else {
      this.filtroConsulta.estatus_sap = 0;
    }
  }
  selectTipoDocumento(obj: any) {
    if (obj.value !== '' && obj.value !== '0') {
      this.filtroConsulta.tipo_documento = obj.value as number;
    } else {
      this.filtroConsulta.tipo_documento = 0;
    }
  }
  selectTipoPago(obj: any) {
    if (obj.value !== '' && obj.value !== '0') {
      this.filtroConsulta.metodo_pago = obj.value;
    } else {
      this.filtroConsulta.metodo_pago = '';
    }
  }
  selectEstatusSAP(obj: any) {
    if (obj.value !== '' && obj.value !== '0') {
      this.filtroConsulta.estatus_sap = obj.value as number;
    } else {
      this.filtroConsulta.estatus_sap = Number('');
    }
  }

  selectNivelAprobacion(data: number) {
    this.nivel_aprobacion = data;
    this.filtroConsulta.nivel_aprobacion = this.nivel_aprobacion;
  }

}
