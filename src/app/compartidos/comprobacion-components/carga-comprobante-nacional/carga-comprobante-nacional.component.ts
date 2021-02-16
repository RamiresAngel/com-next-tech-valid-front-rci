import Swal from 'sweetalert2';
import { LoadingService } from 'src/app/compartidos/servicios_compartidos/loading.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUpload } from 'src/app/modulos/documentos_add/clases/file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConceptoCFDI, DefaultCFDI } from 'src/app/entidades/cfdi';
import { GastosViajeService } from 'src/app/modulos/gastos-viaje/gastos-viaje.service';

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
  comprobante: DefaultCFDI;
  xml_valido: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private _loadingService: LoadingService,
    private _gastosViajeService: GastosViajeService
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
      if (this.comprobante.conceptos.length > 0) {
        this.comprobante.conceptos = this.comprobante.conceptos.map(concepto => {
          concepto.aplica = true;
          return concepto;
        });
      }
      this.comprobante.file = this.controles.archivo_xml.value;
      this.xml_valido = true;
      this._loadingService.hideLoading();
    }, error => {
      Swal.fire('Error', error.error.mensaje, 'error');
      this._loadingService.hideLoading();
    }
    );
  }

  agregarConceptos(conceptos: ConceptoCFDI[]) {
    this.comprobante.conceptos = conceptos;
    this.comprobante.xml = this.controles.archivo_xml.value;
    this.comprobante.file = this.controles.archivo_pdf.value;
    this.comprobante.nacional = 1;
    this.onAgregarComprobante.emit({ ...this.comprobante });
    this.comprobante = null;
  }

  cancelar() {
    this.cancelarCarga.emit();
  }

  public get controles() { return this.formulario.controls; }
}
