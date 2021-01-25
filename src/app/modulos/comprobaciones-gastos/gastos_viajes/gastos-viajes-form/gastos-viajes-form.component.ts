import { CatalogoImpuestosService } from './../../../administracion/catalogo-impuestos/catalogo-impuestos.service';
import { FileUpload } from './../../../documentos_add/clases/file-upload';
import { ComprobacionesGastosService } from './../../comprobaciones-gastos.service';
import { GlobalsComponent } from './../../../../compartidos/globals/globals.component';
import { LoadingService } from './../../../../compartidos/servicios_compartidos/loading.service';
import { CentroCostosService } from './../../../centro-costos/centro-costos.service';
import { CompartidosService } from './../../../../compartidos/servicios_compartidos/compartidos.service';
import { StorageService } from './../../../../compartidos/login/storage.service';
import { ComprobacionGastosHeader } from './../../../../entidades/ComprobacionGastosHeader';
import { Component } from '@angular/core';
import { Usuario, Contribuyente, ComprobacionGastosDetalle, Moneda, Impuesto } from 'src/app/entidades';
import { DefaultCFDI } from 'src/app/entidades/cfdi';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { IMyDateModel } from 'mydatepicker';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-gastos-viajes-form',
  templateUrl: './gastos-viajes-form.component.html',
  styleUrls: ['./gastos-viajes-form.component.css']
})
export class GastosViajesFormComponent {

  public usuario: Usuario;
  public lista_comprobantes = new Array<DefaultCFDI>();
  public comprobante_papel: boolean = false;
  public documento_cfdi: DefaultCFDI;

  comprobacion = new ComprobacionGastosHeader();
  lista_constribuyentes: Contribuyente[];
  lista_centros_costo: Contribuyente[];
  lista_moneda = new Array<Moneda>();
  startValue_contribuyente = '';
  startValue_centros_costo = '';

  formulario_header: FormGroup;

  /* elemento de formulario */
  public comprobante_gasto = new ComprobacionGastosDetalle; /* falta definir la entidad de este comprobante */
  formulario: FormGroup;
  txtBtnAgregar = 'Guardar';
  lista_moneda_header = new Array<Moneda>();
  lista_impuesto = new Array<Impuesto>();
  lista_forma_pago = [];

  /* tabla Lista de gastos */
  public opcionesDt = {
    ordering: false,
    dom: 'lrtip',
    scrollX: true,

    oLanguage: {
      'sProcessing': '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>',
      'sLengthMenu': 'Mostrar _MENU_',
      'sZeroRecords': 'No se encontraron resultados',
      'sEmptyTable': 'Ningún dato disponible en esta tabla',
      'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
      'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
      'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
      'sInfoPostFix': '',
      'sSearch': 'Buscar:',
      'sUrl': '',
      'sInfoThousands': '',
      'sLoadingRecords': '<img src="assets/img/iconoCargando.gif" alt="">',
      'copy': 'Copiar',
      'oPaginate': {
        'sFirst': 'Primero',
        'sLast': 'Último',
        'sNext': 'Siguiente',
        'sPrevious': 'Anterior'
      },
      'oAria': {
        'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
        'sSortDescending': ': Activar para ordenar la columna de manera descendente'
      }
    }
  };

  constructor(private storeageService: StorageService,
    private compartidosService: CompartidosService,
    private centroCostosService: CentroCostosService,
    private loadingService: LoadingService,
    public globals: GlobalsComponent,
    public comprobacionesService: ComprobacionesGastosService,
    private impuestosService: CatalogoImpuestosService,

  ) {
    this.usuario = this.storeageService.getDatosIniciales().usuario;
    this.comprobacion.nombre_usuario = `${this.usuario.nombre} ${this.usuario.apellido_paterno} `;
    this.comprobacion.folio_comrpobacion = new Date().getTime();
    this.comprobacion.tipo_gastos = 'Prestación';
    this.formulario = new FormGroup({
      comprobante_papel: new FormControl(false),
      fecha: new FormControl('', Validators.required),
      concepto: new FormControl('', Validators.required),
      comprobante_fiscal: new FormControl(''),
      rfc_emisor: new FormControl('', [Validators.required, this.validadrfcReceptor]),
      razon_emisor: new FormControl(''),
      numero_comprobante: new FormControl('', Validators.required),
      forma_pago: new FormControl('', Validators.required),
      moneda: new FormControl('', Validators.required),
      subtotal_origen: new FormControl('', Validators.required),
      impuestos: new FormControl('', Validators.required),
      tua: new FormControl(''),
      iva: new FormControl(''),
      total: new FormControl(''),
      monto_rembolsar: new FormControl(''),
      motivo: new FormControl('', Validators.required),
    });
    this.iniciarFormularioHeader();
    this.obtenerCatalogos();
    this.tablaListGastos();
  }


  tablaListGastos() {
    setTimeout(() => {
      $('#tabla_gastos_viaje_rci').DataTable(this.opcionesDt);
    }, 1000);
  }

  modalDetalle() {
    $('#modal_detalle').modal('toggle');
  }

  iniciarFormularioHeader() {
    this.formulario_header = new FormGroup({
      usuario: new FormControl('', Validators.required),
      compania: new FormControl('', Validators.required),
      centro_costos: new FormControl('', Validators.required),
      tipo_gasto: new FormControl('', Validators.required),
      aprobador: new FormControl('', Validators.required),
      moneda: new FormControl('', Validators.required),
      monto_reembolsar: new FormControl('', Validators.required),
      destino: new FormControl('', Validators.required),
      motivo: new FormControl('', Validators.required),
      recuperable: new FormControl(false, Validators.required),
    });
  }

  obtenerCatalogos() {
    this.obtenerContribuyente();
    this.obtenerCentrosCosto();
    this.obtenerMonedasHeader();
  }


  obtenerContribuyente() {
    this.compartidosService.getAllContribuyentesCorporativo(this.usuario.identificador_corporativo).subscribe((data) => {
      this.lista_constribuyentes = $.map(data, function (obj: any) {
        obj.id = obj.identificador;
        obj.text = `${obj.codigo} - ${obj.nombre}`;
        return obj;
      });
      this.lista_constribuyentes = this.globals.prepararSelect2(data, 'identificador', 'text');
      this.lista_constribuyentes = this.globals.agregarSeleccione(this.lista_constribuyentes, 'Seleccione contribuyente...');

    }, error => {
      console.log(error);
    }, () => {
      if (this.comprobacion.contribuyente) {
        this.startValue_contribuyente = this.comprobacion.contribuyente;
      } else {
        this.startValue_contribuyente = '';
      }
    })
  }
  obtenerCentrosCosto() {
    this.centroCostosService.ObtenerListaCentroCostosMXPorCorporativo(this.usuario.identificador_corporativo, this.usuario.identificador_usuario, Number(this.usuario.rol)).subscribe((data) => {
      this.lista_centros_costo = $.map(data, function (obj: any) {
        obj.id = obj.identificador;
        obj.text = `${obj.codigo} - ${obj.nombre}`;
        return obj;
      });
      this.lista_centros_costo = this.globals.prepararSelect2(data, 'identificador', 'text');
      this.lista_centros_costo = this.globals.agregarSeleccione(this.lista_centros_costo, 'Seleccione contribuyente...');
    }, error => {
      console.log(error);
    }, () => {
      if (this.comprobacion.centro_costos) {
        this.startValue_centros_costo = this.comprobacion.centro_costos;
      } else {
        this.startValue_centros_costo = '';
      }
    })
  }
  obtenerMonedasHeader() {
    this.compartidosService.obtenerMonedasCorporativo(this.usuario.identificador_corporativo).subscribe(
      (data) => {
        this.lista_moneda_header = this.globals.prepararSelect2(data, 'clave', 'nombre');
        this.lista_moneda_header = this.globals.agregarSeleccione(data, 'Selecciona una moneda');
      }
      , (error) => {
        console.log(error);
      });
  }

  cargarArchivo(input: any, input_texto: any, tipo: string) {
    const reader = new FileReader();
    const file = input.currentTarget.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      const archivo = new FileUpload();
      archivo.file_name = file.name;
      archivo.file_data = reader.result.toString().split(',')[1];
      input_texto.value = archivo.file_name;
      input_texto.placeholder = archivo.file_name;
      this.obtenerDetallesXML(archivo);
      this.comprobante_gasto.xml = archivo.file_data;
      this.controls.xml.setValue(file.name);
    };
  }

  obtenerDetallesXML(archivo: FileUpload) {
    console.log(archivo);
    this.loadingService.showLoading();
    this.comprobacionesService.obtenerDetallesXML({ xml: archivo.file_data }).subscribe((response: DefaultCFDI) => {
      console.log(response);
      this.documento_cfdi = response;
      this.loadingService.hideLoading();
    }, error => {
      console.error(error);
      this.loadingService.hideLoading();
      this.documento_cfdi = null;
    })
  }

  onTipoDocumentoChange(event) {
    console.log(event);
    this.resetData();
  }

  cerrarModal() {
    this.documento_cfdi = null;
    this.comprobante_papel = null;
    $('#modal_comprobante').modal('hide');
    setTimeout(() => {
      this.comprobante_papel = false;
    }, 100);
  }

  addConcepto() {
    this.lista_comprobantes.push(this.documento_cfdi);
    this.obtenerCatalogosFormulario();
    /*  this.cerrarModal(); */
  }

  onFechaSelected(event: IMyDateModel) {
    this.controls.fecha.setValue(event.formatted);
  }

  resetData() {
    this.documento_cfdi = null;
  }

  onContribuyenteSelected(dato: any) {
    if (dato.value !== 0) {
      this.comprobacion.contribuyente = dato.value;
      this.headerControls.compania.setValue(this.comprobacion.contribuyente);
    } else {
      this.comprobacion.contribuyente = null;
      this.headerControls.compania.setValue(null);
    }
  }

  onCECOSelected(dato: any) {
    if (dato.value !== 0) {
      this.comprobacion.centro_costos = dato.value;
      this.headerControls.centro_costos.setValue(this.comprobacion.centro_costos);
    } else {
      this.comprobacion.centro_costos = null;
      this.headerControls.centro_costos.setValue(null);
    }
  }
  onMonedaSelectedHeder(dato: any) {
    if (dato.value !== 0) {
      this.comprobacion.moneda = dato.value;
      this.headerControls.moneda.setValue(this.comprobacion.moneda);
    } else {
      this.comprobacion.moneda = null;
      this.headerControls.moneda.setValue(null);
    }
  }

  eliminarConcepto(index: number) {
    this.lista_comprobantes.splice(index, 1);
  }

  public get headerControls(): { [key: string]: AbstractControl; } {
    return this.formulario_header.controls;
  }


  guardar() {
    swal.fire('Éxito', 'Guardado Correctamente', 'success');
  }

  enviar() {
    swal.fire('Éxito', 'Envido Correctamente', 'success');
  }

  /* funciones del formulario papel */
  formularioPapel() {
    console.log(this.formulario);
    console.log(this.comprobante_gasto);
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.comprobante_gasto.comprobante_fiscal = this.formulario.get('comprobante_fiscal').value ? 1 : 0;
    if (this.formulario.valid) {
      console.log(this.formulario.value);
      this.txtBtnAgregar = 'Guardar'
    }
    setTimeout(() => {
      this.cerrarModal();
    }, 1000);
  }

  obtenerCatalogosFormulario() {
    this.obtenerMonedas();
    this.obtenerImpuestos();
    this.obtenerFormaPago();
  }

  obtenerMonedas() {
    this.compartidosService.obtenerMonedasCorporativo(this.usuario.identificador_corporativo).subscribe(
      (data) => {
        this.lista_moneda = this.globals.prepararSelect2(data, 'clave', 'nombre');
        this.lista_moneda = this.globals.agregarSeleccione(data, 'Selecciona una moneda');
      }
      , (error) => {
        console.log(error);
      });
  }

  obtenerImpuestos() {
    this.impuestosService.obtenerImpuestos(this.usuario.identificador_corporativo)
      .subscribe((data: Array<Impuesto>) => {
        this.lista_impuesto = this.globals.prepararSelect2(data, 'id', 'descripcion');
        this.lista_impuesto = this.globals.agregarSeleccione(data, 'Seleccione Impuesto');
      }, err => {
        console.log(err);
        swal.fire('Error', 'No se pudieron obtener los impuestos. Por favor intente de nuevo.', 'error');
      });
  }

  obtenerFormaPago() {
    this.compartidosService.obtenerFormaPago(this.usuario.identificador_corporativo)
      .subscribe((data: any) => {
        this.lista_forma_pago = this.globals.prepararSelect2(data, 'id', 'descripcion');
        this.lista_forma_pago = this.globals.agregarSeleccione(this.lista_forma_pago, 'Seleccione forma de pago..');
      });
  }

  onMonedaSelected(data) {
    this.comprobante_gasto.moneda = data.value;
    this.controls.moneda.setValue(data.value);
  }

  onImpuestoSelected(data) {
    this.comprobante_gasto.total_impuesto = data.value;
    this.controls.impuestos.setValue(data.value);
  }

  onFormaPagoSelect(data) {
    if (data.value !== '') {
      this.comprobante_gasto.total_impuesto = data.value;
      this.controls.forma_pago.setValue(data.value);
    } else {
      this.controls.forma_pago.setValue(null);
    }
  }

  private validadrfcReceptor(controls: AbstractControl) {
    const rfc_emisor = controls.value;
    let errors = null;
    const regex_rfc = new RegExp(/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/);
    if (!regex_rfc.test(rfc_emisor)) {
      errors = 'RFC con estructura inválida.';
    }
    return errors;
  }

  public get controls(): { [key: string]: AbstractControl; } {
    return this.formulario.controls;
  }

}

