import { Usuario } from './../../../entidades/usuario';
import { LoadingService } from './../../../compartidos/servicios_compartidos/loading.service';
import { CompartidosService } from './../../../compartidos/servicios_compartidos/compartidos.service';
import { FacturaExtranjeraRCI } from './../../../entidades/FacturaExtranjeraRCI';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { CodigoRecepcion, OrdenCompra, DatosIniciales, CargaDocumentoOC, Saldos } from './../../../entidades/index';
import { TarjetaCodigoRecepcion } from 'src/app/entidades/tarjeta-codigo-recepcion';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { FileUpload } from '../../documentos_add/clases/file-upload';
import { CargaDocumentosService } from '../carga-documentos.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-carga-documentos-noxml',
  templateUrl: './carga-documentos-noxml.component.html',
  styleUrls: ['./carga-documentos-noxml.component.css']
})
export class CargaDocumentosNoxmlComponent implements OnInit {
  @Input() numero_orden;
  @Input() uuid;


  public documento_extranjero = new FacturaExtranjeraRCI();

  public xml_base64: string;
  public pdf_base64: string;
  lista_documentos = new Array<any>();
  tipo_documento = 1;

  public reasignacion = false;
  public carga_multiple = false;
  public txtBtnAgregar = '<i class="fas fa-check"></i>';
  public oc_valida = false;
  public startValue_oc: any;
  public itemsCR: any;
  public selec2Disabled = false;
  public orden_oc = '';
  public titulocarga = 'Selecciona archivo...';
  public titulocargaNC = '';
  @ViewChild('otrosInput') inputArchivo: ElementRef;
  @ViewChild('NC_input') XML_nc: ElementRef;
  public fileData = new FileUpload();
  public file: any;
  public Lista_tarjetaCodigoRecepcion: Array<TarjetaCodigoRecepcion>;
  public corporativo_activo: CorporativoActivo;
  public datos_iniciales: DatosIniciales;
  public formulario: FormGroup;
  public mostrarMensaje = false;
  public incluir_nc = false;
  public titulo_label = 'Factura';
  public txtFinalizar = 'Finalizar Transacción';
  saldos = new Saldos();
  public documento = new CargaDocumentoOC();
  public lista_monedas = new Array();

  // tipo_carga: string;
  usuario: Usuario;


  public lista_conceptos = new Array();
  public formulario_carga_xml: FormGroup;
  public formulario_header: FormGroup;
  // public tipo_carga: 'xml' | 'papel' = 'xml';
  public tipo_carga = 'xml';

  public carga_documento = new CargaDocumentoOC();
  constructor(
    private _cargaDocumentosService: CargaDocumentosService,
    private compartidosService: CompartidosService,
    private loadingService: LoadingService,
    private _storageService: StorageService,
    private router: Router,
    public globals: GlobalsComponent
  ) {
    this.usuario = this._storageService.getDatosIniciales().usuario;
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.documento.orden_compra = new OrdenCompra();
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.Lista_tarjetaCodigoRecepcion = new Array<TarjetaCodigoRecepcion>();
    this.carga_documento = new CargaDocumentoOC();
    this.carga_documento.orden_compra = new OrdenCompra();
    this.carga_documento.codigos_recepcion = new Array<CodigoRecepcion>();
    this.carga_documento.saldos = new Saldos();
    this.obtenerCatalogos();
    this.iniciarFormularioHeader();
    this.iniciarFormularioCargaXML();
    // this.tipo_carga = this._storageService.getDatosIniciales().funcionalidades.find(o => o.clave === 'VISTA_CARGADOC').valor;
  }

  ngOnInit() {
    /* console.log(this.datos_iniciales.usuario.fecha_cierre); */
    this.iniciarForm();
    /* console.log("num orden= " + this.numero_orden); */
    if (this.numero_orden !== null && this.numero_orden !== undefined && this.numero_orden !== '') {
      this.orden_oc = this.numero_orden;
      this.validarOC();
    }
  }

  actualizarOcSelected(obj: any) {
    console.log(obj);
  }
  iniciarForm() {
    this.formulario = new FormGroup({
      documento: new FormControl('', Validators.required),
      xml_nc: new FormControl(''),
      titulocargaNC: new FormControl({ value: '', disabled: true }),
    });
  }

  obtenerCatalogos() {
    this.compartidosService.obtenerMonedasCorporativo(this.datos_iniciales.usuario.identificador_corporativo).subscribe((data) => {
      this.lista_monedas = this.globals.agregarSeleccione(this.globals.prepararSelect2(data, 'id', 'nombre'), 'Seleccione moneda...');
    });
    this.obtenerTipoDocs();
  }

  selectTipoDocumento(obj: any) {
    console.log(this.formulario_header);
    console.log(this.documento_extranjero.file);

    if (obj.value !== '' && obj.value !== '0') {
      this.tipo_documento = obj.value as number;
      this.controlsHeader.tipo_documento.setValue(this.tipo_documento);
      this.controlsXML.tipo_documento.setValue(this.tipo_documento);
    } else {
      this.tipo_documento = 0;
      this.controlsHeader.tipo_documento.setValue(this.tipo_documento);
      this.controlsXML.tipo_documento.setValue(this.tipo_documento);
    }
  }

  iniciarFormularioHeader() {
    this.formulario_header = new FormGroup({
      rfc_emisor: new FormControl('', Validators.required),
      nombre_emisor: new FormControl('', Validators.required),
      numero_recibo: new FormControl('', Validators.required),
      importe: new FormControl('', [Validators.required]),
      fecha: new FormControl('', Validators.required),
      impuesto: new FormControl(0),
      moneda: new FormControl('', Validators.required),
      id_moneda: new FormControl(0, Validators.required),
      // tipo_cambio: new FormControl('', Validators.required),
      tipo_documento: new FormControl(1, Validators.required),
      tasa_cambio: new FormControl(1, Validators.required),
      // rfc_extranjero: new FormControl('', Validators.required)
    });
  }
  iniciarFormularioCargaXML() {
    this.formulario_carga_xml = new FormGroup({
      xml_archivo: new FormControl({ value: null, disabled: true }, Validators.required),
      pdf_archivo: new FormControl({ value: null, disabled: true }),
      xml_b64: new FormControl({ value: null, disabled: true }, Validators.required),
      tipo_documento: new FormControl(1, Validators.required),
      pdf_b64: new FormControl({ value: null, disabled: true })
    });
  }

  obtenerTipoDocs() {
    this.compartidosService.obtenerTipoDocumentoCargaFactura(this.corporativo_activo.corporativo_identificador)
      .subscribe((data: any) => {
        this.lista_documentos = this.globals.prepararSelect2(data, 'id', 'descripcion');
      },
        error => {
          console.log(error);
        },
      );
  }

  validarOC() {
    this.carga_documento = new CargaDocumentoOC();
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this._cargaDocumentosService.validarOrdenCompraMX(this.orden_oc, this.corporativo_activo.corporativo_identificador, this.usuario.numero_proveedor).subscribe(
      (data: any) => {
        this.documento = data;
        this.documento.codigos_recepcion.sort();
        // this.ordenarCodigosRecepcion();
        // this.documento.orden_compra.saldos = this.saldos;
        if (data.orden_compra.id) {
          this.oc_valida = true;
          /* console.log(this.documento); */
          // this._cargaDocumentosService.obtenerSaldos(data.orden_compra.id, this.corporativo_activo.corporativo_identificador).subscribe(((saldos: any) => {
          // this.saldos = saldos;
          // }));
        }

      }, error => {
        console.log(error);
        this.txtBtnAgregar = '<i class="fas fa-check"></i>';

        if (error.error.mensaje) {
          Swal.fire({
            type: 'error',
            title: 'Atención...',
            text: error.error.mensaje
          });
        } else {
          Swal.fire({
            type: 'error',
            title: 'Atención...',
            text: 'Ocurrio un error inesperado, por favor intentalo nuevamente más tarde.'
          });
        }

      },
      () => {
        this.txtBtnAgregar = '<i class="far fa-thumbs-up"></i>';
      }
    );
  }

  actualizarArchivoBtn() {
    const reader = new FileReader();
    const file = this.inputArchivo.nativeElement.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileData.file_name = file.name;
      this.fileData.file_data = reader.result.toString().split(',')[1];
      this.titulocarga = file.name;
      this.file = this.fileData.file_data;
      this.carga_documento.xml = this.file;
    };
  }

  ordenarCodigosRecepcion() {
    this.documento.codigos_recepcion.sort();
  }


  actualizarArchivoBtnNC() {
    const reader = new FileReader();
    const file = this.XML_nc.nativeElement.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileData.file_name = file.name;
      this.fileData.file_data = reader.result.toString().split(',')[1];
      this.formulario.controls.titulocargaNC.setValue(file.name);
      this.file = this.fileData.file_data;
      this.carga_documento.pdf = this.file;
      this.documento_extranjero.file = this.file;
    };
  }

  finalizarTransaccion() {
    console.log(this.tipo_carga);
    this.txtFinalizar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.loadingService.showLoading();

    if (this.tipo_carga == 'xml') {
      this.carga_documento.identificador_proveedor = this.datos_iniciales.usuario.identificador_usuario;
      this.carga_documento.identificador_corporativo = this.datos_iniciales.usuario.identificador_corporativo;
      this.carga_documento.identificador_sucursal = this.documento.orden_compra.identificador_sucursal;
      this.carga_documento.lista_negra = this.datos_iniciales.usuario.lista_negra;
      this.carga_documento.xml = this.xml_base64;

      this.carga_documento.pdf = this.pdf_base64;
      this.carga_documento.numero_orden = this.orden_oc;
      this.carga_documento.saldos = null;
      this.carga_documento.orden_compra = null;
      this.carga_documento.documentos_relacionados = null;
      if (this.incluir_nc || this.documento.orden_compra.devolucion) {
        this.carga_documento.tipo_movimiento = 3;
        console.log('Es nota crédito');
        this.cargarDocumento();
        console.log(this.carga_documento);
      } else {
        if (this.documento.codigos_recepcion.length === 0 && this.documento.orden_compra.indicador_anticipo !== '') {
          this.carga_documento.tipo_movimiento = 2;
          this.cargarDocumento();
          console.log('Es anticipo');
          console.log(this.carga_documento);
        } else {
          if (this.carga_documento.codigos_recepcion.length > 0 && this.documento.codigos_recepcion.length !== 0) {
            this.carga_documento.tipo_movimiento = 1;
            console.log('Es factura');
            this.cargarDocumento();
            console.log(this.carga_documento);
          } else {
            console.log('Mostrar Mensaje Seleccionar Códigos de Recepción');
            Swal.fire('¡Atención!', 'Ha ocurrido un error. <br> Detalle error: Es necesario seleccionar al menos un código de recepción. ', 'error');
            this.txtFinalizar = 'Finalizar Transacción';
            this.loadingService.hideLoading();
          }
        }
      }
    } else if (this.tipo_carga == 'papel') {
      this.documento_extranjero.tipo_documento = this.tipo_documento;
      this.documento_extranjero.numero_orden = this.orden_oc;
      this.documento_extranjero.codigos_recepcion = this.carga_documento.codigos_recepcion;
      this.documento_extranjero.fecha_comprobante = this.controlsHeader.fecha.value;
      this.documento_extranjero.moneda = this.controlsHeader.moneda.value;
      this.documento_extranjero.id_moneda = Number(this.controlsHeader.id_moneda.value);
      this.documento_extranjero.tipo_cambio = this.controlsHeader.tasa_cambio.value;
      this.documento_extranjero.numero_comprobante = this.controlsHeader.numero_recibo.value;
      this.documento_extranjero.total = this.controlsHeader.importe.value;
      this.documento_extranjero.rfc_proveedor = this.controlsHeader.rfc_emisor.value;
      this.documento_extranjero.nombre_proveedor = this.controlsHeader.nombre_emisor.value;
      this.documento_extranjero.forma_pago = this.documento.orden_compra.forma_pago;
      this.documento_extranjero.identificador_contribuyente = this.documento.orden_compra.identificador_contribuyente;
      this.documento_extranjero.sucursal_identificador = this.documento.orden_compra.identificador_sucursal;
      this.documento_extranjero.identificador_usuario = this.datos_iniciales.usuario.identificador_usuario;
      this.documento_extranjero.identificador_corporativo = this.datos_iniciales.usuario.identificador_corporativo;
      this.documento_extranjero.identificador_proveedor = this.documento.orden_compra.identificador_proveedor
      this.documento_extranjero.conceptos = this.lista_conceptos;

      this.documento_extranjero.tipo_movimiento = 1;
      this.documento_extranjero.tipo_comprobante = 'I';

      console.log(this.documento_extranjero);
      this._cargaDocumentosService.cargaFacturaProveedorExtRCI(this.documento_extranjero).subscribe((data: any) => {
        this.loadingService.hideLoading();
        Swal.fire('¡Éxito!', 'Factura cargada correnctamente. Se ha enviado a flujo de aprobación.', 'success');
        this.router.navigate(['home', 'consulta_cfdi']);
        this.txtFinalizar = 'Finalizar Transacción';
        this.loadingService.hideLoading();
      }, err => {
        console.log(err);
        const mensaje = err.error ? err.error.mensaje ? err.error.mensaje : 'Error interno.' : 'Error interno.'
        Swal.fire('¡Error!', err.error.mensaje ? mensaje : 'Error interno.', 'error')
        this.loadingService.hideLoading();
        this.txtFinalizar = 'Finalizar Transacción';
        this.loadingService.hideLoading();
      })
    }

  }

  cargarDocumento() {
    this.carga_documento.tipo_documento = this.tipo_documento;
    this._cargaDocumentosService.cargarDocumento(this.carga_documento).subscribe((data: any) => {
      // Llamar a validacion y observar si la validacion sap viene en 1
      this._cargaDocumentosService.validarDocumentoCFDI(data.documento_cfdi_id).subscribe((obj: any) => {
        const documento_valido = obj.detalle_validaciones.filter(x => x.valido === 0);
        if (documento_valido.length > 0) {

          Swal.fire({
            title: '¡Alerta!',
            text: 'El documento ha sido cargado correctamente. Pero no se mando a flujo de aprobación. Consulte las validaciones.',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ver Validación',
            cancelButtonText: 'Aceptar'
          }).then((result) => {
            console.log(result);
            if (result.value) {
              this.router.navigate(['home', 'validacion', this._storageService.encriptar_ids(String(data.documento_cfdi_id))]);
            } else {
              this.router.navigate(['home', 'consulta_cfdi']);
            }
          });
          this.txtFinalizar = 'Finalizar Transacción';
          this.loadingService.hideLoading();
        } else {
          // si validacion sap = 0 -> el documento se cargo pero no pudo contabilizarse
          // Swal.fire('Alerta', 'El documento ha sido cargado pero no se pudo contabilizar en SAP.', 'info');
          Swal.fire({
            title: '¡Alerta!',
            text: 'El documento ha sido cargado correctamente. Se envió a flujo de aprobación.',
            type: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ver Validación',
            cancelButtonText: 'Aceptar'
          }).then((result) => {
            console.log(result);
            if (result.value) {
              this.router.navigate(['home', 'validacion', this._storageService.encriptar_ids(String(data.documento_cfdi_id))]);
            } else {
              this.router.navigate(['home', 'consulta_cfdi']);
            }
          });
          this.txtFinalizar = 'Finalizar Transacción';
          this.loadingService.hideLoading();
        }
      }, error => {
        console.log(error);
        if (error.error.mensaje) {
          // this.validado = false;
          Swal.fire('¡Atención!', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        } else {
          Swal.fire('¡Atención!', 'Ha ocurrido un error. <br> Detalle error: Algo ha salido mal, por favor inténtalo de nuevo más tarde.', 'error');
        }
        this.txtFinalizar = 'Finalizar Transacción';
        this.loadingService.hideLoading();
      }, () => {
      }
      );
      this.txtFinalizar = 'Finalizar Transacción';
      this.loadingService.hideLoading();
      // this.router.navigate(['home', 'validacion', this._storageService.encriptar(String(data.documento_cfdi_id))]);
      // Swal.fire('Éxito', 'Guardado Correctamente', 'success');
    }, error => {
      console.log(error);
      if (error.error.mensaje) {
        Swal.fire('¡Atención!', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      } else {
        Swal.fire('¡Atención!', 'Ha ocurrido un error. <br> Detalle error: Algo salio mal, por favor inténtalo de nuevo más tarde.', 'error');
      }
      this.txtFinalizar = 'Finalizar Transacción';
      this.loadingService.hideLoading();
    });
  }
  addCodigoRecepcion(data) {
    this.mostrarMensaje = false;
    this.carga_documento.codigos_recepcion.push(data);
  }
  removeCodigoRecepcion(data: CodigoRecepcion) {
    this.carga_documento.codigos_recepcion = this.carga_documento.codigos_recepcion.filter((obj) => obj.codigo_recepcion !== data.codigo_recepcion);
    if (this.carga_documento.codigos_recepcion.length === 0) {
      this.resetData();
    }
  }
  requerirXMLNC(obj) {
    console.log((obj));
    if (obj) {
      this.titulo_label = 'Nota de Crédito';
      this.incluir_nc = true;
      this.carga_documento.tipo_movimiento = 3;
      this.tipo_carga = "xml";
    } else {
      this.titulo_label = 'Factura';
      this.incluir_nc = false;
      this.carga_documento.pdf = '';
      this.titulocargaNC = '';
      console.log(this.formulario);
    }
  }
  cambiarMultiple() {
    this.carga_multiple = false;
  }
  mostrarDetallesCR(items) {
    this.itemsCR = items;
    $('#modal-detalle-cr').modal('toggle');
  }

  resetData() {
    this.carga_documento = new CargaDocumentoOC();
    this.formulario_carga_xml.reset();
    this.lista_conceptos.length = 0;
    this.formulario_header.reset();
    this.formulario.reset();
  }

  cambiarTipoCarga(event: HTMLInputElement) {
    this.tipo_carga = event.checked ? 'papel' : 'xml';
  }


  public get controlsHeader(): { [key: string]: AbstractControl } {
    return this.formulario_header.controls;
  }
  public get controlsXML(): { [key: string]: AbstractControl } {
    return this.formulario_carga_xml.controls;
  }




  cargarArchivo(input: any, input_texto: any, tipo: string) {
    const reader = new FileReader();
    const file = input.currentTarget.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      const archivo = new FileUpload();
      archivo.file_name = file.name;
      archivo.file_data = reader.result.toString().split(',')[1];
      // input_texto.value = archivo.file_name;
      // input_texto.placeholder = archivo.file_name;
      if (tipo && tipo == 'xml') {
        this.formulario_carga_xml.controls['xml_archivo'].setValue(archivo.file_name);
        this.formulario_carga_xml.controls['xml_b64'].setValue(archivo.file_data);
        this.xml_base64 = archivo.file_data;
      } else {
        this.formulario_carga_xml.controls['pdf_archivo'].setValue(archivo.file_name);
        this.formulario_carga_xml.controls['pdf_b64'].setValue(archivo.file_data);
        this.pdf_base64 = archivo.file_data;
      }
    };
  }
}
