import { LoadingService } from './../../../compartidos/servicios_compartidos/loading.service';
import { ActivatedRoute } from '@angular/router';
import { CargaDocumentosService } from './../../carga-documentos/carga-documentos.service';
import { CargaDocumento } from './../../carga-documentos/models/carga-documentos.state';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from './../../../compartidos/login/storage.service';
import { CompartidosService } from './../../../compartidos/servicios_compartidos/compartidos.service';
import { FileUpload } from './../../documentos_add/clases/file-upload';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IMyDateModel, IMyDpOptions, MyDatePicker } from 'mydatepicker';
import { CargaDocumentoOC, Usuario } from 'src/app/entidades';
import { Select2Component } from 'ng2-select2';
import Swal from 'sweetalert2';
import { FacturaExtranjeraRCI } from 'src/app/entidades/FacturaExtranjeraRCI';
declare var $: any;
@Component({
  selector: 'app-notas-credito',
  templateUrl: './notas-credito.component.html',
  styleUrls: ['./notas-credito.component.css']
})
export class NotasCreditoComponent implements OnInit, AfterViewInit {
  @ViewChild('fecha_recepcion') fecha_recepcion: MyDatePicker;
  @ViewChild('selectSucursal') select_sucursal: Select2Component;

  disabledDataPcickerOptions: IMyDpOptions = {}

  public formulario_header: FormGroup;
  public formulario_papel: FormGroup;
  public lista_conceptos = new Array();

  public documento_extranjero = new FacturaExtranjeraRCI();


  public lista_sucursales = new Array();
  public lista_contribuyentes = new Array();
  public identificador_corporativo: string;
  public identificador_contribuyente: string;
  public identificador_nota_credito: string;

  public documento_papel: boolean;
  public lista_monedas = new Array();


  public usuario: Usuario;
  public nivel_aprobacion: number = 0;

  fecha_pago: any;
  public carga_documento = new CargaDocumentoOC();

  constructor(
    private sharedService: CompartidosService,
    private cargaDocumentosService: CargaDocumentosService,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    public globals: GlobalsComponent,
    private loadingService: LoadingService
  ) {
    this.usuario = this.storageService.getDatosIniciales().usuario;
    this.identificador_corporativo = this.usuario.identificador_corporativo;
    this.carga_documento.identificador_corporativo = this.usuario.identificador_corporativo;
    this.carga_documento.identificador_proveedor = this.usuario.identificador_usuario;
    this.carga_documento.tipo_movimiento = 3;
    this.iniciarFormularios();
    this.obtenerCatalogos();
    this.activatedRoute.params.subscribe(params => {
      const datos_url = params['identificador'];
      if (datos_url) {
        const datos = this.storageService.desencriptar_ids(datos_url).split(',');
        this.identificador_nota_credito = datos[0];
        this.nivel_aprobacion = Number(datos[1]);
        console.log(this.nivel_aprobacion);
        console.log(this.identificador_nota_credito);

      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.disabledDataPcickerOptions = { ...this.globals.myDatePickerOptions, componentDisabled: true }
    this.fecha_recepcion.updateDateValue(this.fecha_recepcion.getToday());
    this.controlsHeader.correo.setValue(this.usuario.email);
    this.documento_papel = false;
  }

  iniciarFormularios() {
    this.formulario_header = new FormGroup({
      tipo_documento: new FormControl(''),
      sucursal: new FormControl('', Validators.required),
      unidad_responsable: new FormControl('', Validators.required),
      correo: new FormControl({ value: '', disabled: true }, [Validators.required]),
      fecha_recepcion: new FormControl('', Validators.required),
      fecha_pago: new FormControl('', Validators.required),
      xml: new FormControl(null, Validators.required),
      pdf: new FormControl(''),
      cuenta_contable: new FormControl('', this.identificador_nota_credito ? Validators.required : null),
      site: new FormControl('', this.identificador_nota_credito ? Validators.required : null),
    });

    this.formulario_papel = new FormGroup({
      rfc_emisor: new FormControl('', Validators.required),
      nombre_emisor: new FormControl('', Validators.required),
      numero_recibo: new FormControl('', Validators.required),
      importe: new FormControl('', [Validators.required]),
      fecha: new FormControl('', Validators.required),
      impuesto: new FormControl('', Validators.required),
      moneda: new FormControl('', Validators.required),
      id_moneda: new FormControl(0, Validators.required),
      tipo_cambio: new FormControl(''),
      tasa_cambio: new FormControl(1, Validators.required),
      // rfc_extranjero: new FormControl('', Validators.required)
    });
  }

  obtenerCatalogos(): void {
    this.sharedService.getAllContribuyentesCorporativo(this.identificador_corporativo).subscribe((data: any) => {
      this.lista_contribuyentes = this.lista_contribuyentes.map(contribuyente => { contribuyente.nombre = `${contribuyente.codigo} - ${contribuyente.nombre}`; return contribuyente });
      this.lista_contribuyentes = this.globals.agregarSeleccione(this.globals.prepararSelect2(data, 'identificador', 'nombre'), 'Seleccione Contribuyente...');
    }, err => {
      console.log(err);
      this.lista_contribuyentes.length = 0;
    });
    this.sharedService.obtenerMonedasCorporativo(this.identificador_corporativo).subscribe((data) => {
      this.lista_monedas = this.globals.agregarSeleccione(this.globals.prepararSelect2(data, 'id', 'nombre'), 'Seleccione moneda...');
    });
  }

  obtenerSucursales(identificador_contribuyente: string) {
    if (identificador_contribuyente) {
      this.sharedService.obtenerSucursalesXCorporativoXContribuyente(this.identificador_corporativo, identificador_contribuyente).subscribe((data: any) => {
        this.lista_sucursales = this.lista_sucursales.map(sucursal => { sucursal.nombre = `${sucursal.codigo} - ${sucursal.nombre}`; return sucursal });
        this.lista_sucursales = this.globals.prepararSelect2(data, 'identificador', 'nombre');
      }, err => {
        console.log('Error obteniendo las sucursales: ', err);
        this.lista_sucursales.length = 0;
      });
    } else {
      this.lista_sucursales = null;
      setTimeout(() => {
        this.lista_sucursales = [];
      }, 100);
    }
  }

  cargarArchivo(input_archivo: HTMLInputElement, input_txt: HTMLInputElement, tipo: 'xml' | 'pdf') {
    const reader = new FileReader();
    const fileData = new FileUpload();
    const file = input_archivo.files[0];

    reader.readAsDataURL(file);
    reader.onload = () => {
      fileData.file_name = file.name;
      fileData.file_data = reader.result.toString().split(',')[1];
      input_txt.value = file.name;
      console.log(file.name);
      if (tipo == 'xml') {
        console.log('Es Factura XML,', file.name);
        this.carga_documento.xml = fileData.file_data;
        this.controlsHeader.xml.setValue(file.name);
      } else {
        console.log('Es Factura PDF,', file.name);
        this.carga_documento.pdf = fileData.file_data;
        this.controlsHeader.pdf.setValue(file.name);
      }

      // this.amortizacion.pdf = fileData.file_data;
      // this.controls.archivo.setValue(file.name);
      // this.seleccionarArchivo({ nombre: file.name, data: fileData.file_data });
    };
  }

  //#region  Handlers Select2
  onSucursalSeleccionado(data: Select2Component): void {
    if (data.value !== '0') {
      this.controlsHeader.sucursal.setValue(data.value)
    }
    else {
      this.controlsHeader.sucursal.setValue(null)
    }
  }
  onContrbiuyenteSeleccionado(data: Select2Component): void {
    if (data.value !== '0') {
      this.identificador_contribuyente = data.value.toString();
      this.controlsHeader.unidad_responsable.setValue(data.value);
    } else {
      this.identificador_contribuyente = null;
      this.controlsHeader.unidad_responsable.setValue(null);
    }
    this.obtenerSucursales(this.identificador_contribuyente);
  }
  onFechaRecepcionSelected(data: IMyDateModel, origin: 'fecha_pago' | 'fecha_recepcion'): void {
    if (origin === 'fecha_pago') {
      this.controlsHeader.fecha_pago.setValue(data ? data.formatted : null);
    }
    else if (origin) {
      this.controlsHeader.fecha_recepcion.setValue(data ? data.formatted : null);
    }
  }
  //#endregion

  public get controlsHeader(): { [key: string]: AbstractControl } {
    return this.formulario_header.controls;
  }

  public get formPapelControl(): { [key: string]: AbstractControl } {
    return this.formulario_papel.controls;
  }


  cargarDocumento() {
    this.loadingService.showLoading();
    this.carga_documento.identificador_proveedor = this.controlsHeader.unidad_responsable.value;
    this.carga_documento.identificador_sucursal = this.controlsHeader.sucursal.value;
    console.log(this.carga_documento);
    this.cargaDocumentosService.cargarDocumento(this.carga_documento).subscribe((data: any) => {
      Swal.fire('Exito', 'Nota de crédito cargada correctamente.', 'success');
      this.loadingService.hideLoading();
    }, error => {
      console.log(error);
      if (error.error) {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error, 'error');
      } else {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: Algo salio mal, por favor inténtalo de nuevo más tarde.', 'error');
      }
      if (error.error.mensaje) {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
      this.loadingService.hideLoading();
    });
  }

  resetData() {
    this.carga_documento = new CargaDocumentoOC();
    this.lista_conceptos.length = 0;
    this.formulario_header.reset();
    this.formulario_header.reset();
  }


  onTipoDocumentoChange(checked: boolean) {
    this.documento_papel = checked;

    if (this.documento_papel) {
      this.controlsHeader.xml.clearValidators();
      this.controlsHeader.xml.updateValueAndValidity()
    } else {
      this.controlsHeader.xml.setValidators(Validators.required);
      this.controlsHeader.xml.updateValueAndValidity()
    }
  }

  cargarDocumentoExtranjero() {
    this.loadingService.showLoading();
    try {
      this.carga_documento.identificador_proveedor = this.controlsHeader.unidad_responsable.value;
      this.carga_documento.identificador_sucursal = this.controlsHeader.sucursal.value;
      this.documento_extranjero.numero_orden = '';
      this.documento_extranjero.codigos_recepcion = this.carga_documento.codigos_recepcion;
      this.documento_extranjero.fecha_comprobante = this.formPapelControl.fecha.value;
      this.documento_extranjero.moneda = this.formPapelControl.moneda.value;
      this.documento_extranjero.id_moneda = Number(this.formPapelControl.id_moneda.value);
      this.documento_extranjero.tipo_cambio = this.formPapelControl.tasa_cambio.value;
      this.documento_extranjero.numero_comprobante = this.formPapelControl.numero_recibo.value;
      this.documento_extranjero.total = this.formPapelControl.importe.value;
      this.documento_extranjero.rfc_proveedor = this.formPapelControl.rfc_emisor.value;
      this.documento_extranjero.nombre_proveedor = this.formPapelControl.nombre_emisor.value;
      this.documento_extranjero.tipo_movimiento = 3;
      this.documento_extranjero.tipo_comprobante = 'E';
      // this.documento_extranjero.forma_pago = this.documento.orden_compra.forma_pago;
      this.documento_extranjero.identificador_contribuyente = this.identificador_contribuyente;
      this.documento_extranjero.sucursal_identificador = this.carga_documento.identificador_sucursal;
      this.documento_extranjero.identificador_usuario = this.usuario.identificador_usuario;
      this.documento_extranjero.identificador_corporativo = this.carga_documento.identificador_corporativo;
      this.documento_extranjero.identificador_proveedor = this.carga_documento.identificador_proveedor
      this.documento_extranjero.file = this.carga_documento.pdf;
      this.documento_extranjero.conceptos = this.lista_conceptos;

      console.log(this.documento_extranjero);
      this.cargaDocumentosService.cargaFacturaProveedorExtRCI(this.documento_extranjero).subscribe((data: any) => {
        this.loadingService.hideLoading();
        Swal.fire('Exito', 'Factura cargada correnctamente. Se ha enviado a flujo de aprobación.', 'success');
        this.loadingService.hideLoading();
      }, err => {
        console.log(err);
        const mensaje = err.error ? err.error.mensaje ? err.error.mensaje : 'Error interno.' : 'Error interno.'
        Swal.fire('Error', err.error.mensaje ? mensaje : 'Error interno.', 'error')
        this.loadingService.hideLoading();
      })
    } catch (error) {
      console.log(error);
      this.loadingService.hideLoading();
    }
  }

}
