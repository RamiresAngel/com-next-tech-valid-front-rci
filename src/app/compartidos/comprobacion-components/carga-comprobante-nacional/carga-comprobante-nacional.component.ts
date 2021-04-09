import { StorageService } from './../../login/storage.service';
import { GlobalsComponent } from './../../globals/globals.component';
import { CompartidosService } from './../../servicios_compartidos/compartidos.service';
import Swal from 'sweetalert2';
import { LoadingService } from 'src/app/compartidos/servicios_compartidos/loading.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUpload } from 'src/app/modulos/documentos_add/clases/file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConceptoCFDI, DefaultCFDI } from 'src/app/entidades/cfdi';
import { GastosViajeService } from 'src/app/modulos/gastos-viaje/gastos-viaje.service';
declare var $: any;
@Component({
  selector: 'app-carga-comprobante-nacional',
  templateUrl: './carga-comprobante-nacional.component.html',
  styleUrls: ['./carga-comprobante-nacional.component.css']
})
export class CargaComprobanteNacionalComponent implements OnInit {
  @Output() onAgregarConceptos = new EventEmitter();
  @Output() onAgregarComprobante = new EventEmitter();
  @Output() cancelarCarga = new EventEmitter();
  @Input() lista_cuentas: any = [];
  formulario: FormGroup;
  form_forma_pago: FormGroup;
  comprobante: DefaultCFDI = new DefaultCFDI();
  xml_valido: boolean;
  lista_forma_pago = [];

  constructor(
    private formBuilder: FormBuilder,
    private _loadingService: LoadingService,
    private _gastosViajeService: GastosViajeService,
    private _servicioCompartido: CompartidosService,
    private _globals: GlobalsComponent,
    public _storageService: StorageService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      archivo_xml: ['', Validators.required],
      archivo_pdf: ['']
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
      if (tipo === 'xml') {
        this.controles.archivo_xml.setValue(archivo.file_data);
      } else if (tipo === 'pdf') {
        this.controles.archivo_pdf.setValue(archivo.file_data);
      }
    };
  }

  obtenerComprobante() {
    this._loadingService.showLoading();
    this._gastosViajeService.getConceptosFactura(this.controles.archivo_xml.value).subscribe((data: any) => {
      this.comprobante = data;
      this.comprobante.forma_pago = "6";
      this.comprobante.uuid = data.complemento.timbreFiscalDigital.uuid;
      if (this.comprobante.conceptos.length > 0) {
        this.comprobante.conceptos = this.comprobante.conceptos.map(concepto => {
          concepto.aplica = true;
          return concepto;
        });
      }
      this.comprobante.file = this.controles.archivo_xml.value;
      this.xml_valido = true;
      this._loadingService.hideLoading();
      this.obtenerCatalogos();
      this.formFormaPago();
    }, error => {
      Swal.fire('Error', error.error.mensaje, 'error');
      this._loadingService.hideLoading();
    }
    );
  }

  agregarConceptos(conceptos: ConceptoCFDI[]) {
    // this.comprobante.observaciones = this.form_forma_pago.observaciones;
    this.comprobante.conceptos = conceptos;
    this.comprobante.xml = this.controles.archivo_xml.value;
    this.comprobante.pdf = this.controles.archivo_pdf.value;
    this.comprobante.nacional = 1;
    this.comprobante.tipo_comprobante = this.comprobante.tipoDeComprobante;
    this.comprobante.tipo_cambio = this.comprobante.tipoCambio;
    this.comprobante.tipo_documento_id = 6;
    this.comprobante.fecha_comprobante = this.comprobante.fecha;
    this.onAgregarComprobante.emit({ ...this.comprobante });
    // this.comprobante = null;
  }

  cancelar() {
    this.cancelarCarga.emit();
  }

  public get controles() { return this.formulario.controls; }
  public get control() { return this.form_forma_pago.controls; }

  formFormaPago() {
    this.form_forma_pago = this.formBuilder.group({
      forma_pago: ['', Validators.required],
      observaciones: ['', Validators.required],
    });
  }

  obtenerCatalogos() {
    this._servicioCompartido.obtenerFormaPago(this._storageService.getCorporativoActivo().corporativo_identificador).subscribe((data: any) => {
      this.lista_forma_pago = this._globals.prepararSelect2(data, 'id', 'descripcion');
      this.lista_forma_pago = this._globals.agregarSeleccione(this.lista_forma_pago, 'Seleccione forma de pago..');
    });
  }

  onFormaPagoSelect(forma_pago) {
    if (forma_pago.value !== '0') {
      this.control.forma_pago.setValue(forma_pago.value);
      this.comprobante.forma_pago = forma_pago.value;
    } else {
      this.control.forma_pago.setValue(null);
      this.comprobante.forma_pago = null;
    }
  }
  public abrirModalAgregarAnexos() {
    $('#modalAnexos').modal('show');
  }
}
