import { ConceptoCFDI } from './../../../../entidades/cfdi';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUpload } from 'src/app/modulos/documentos_add/clases/file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GastosViajeService } from '../../gastos-viaje.service';

@Component({
  selector: 'app-carga-doc-nacional',
  templateUrl: './carga-doc-nacional.component.html',
  styleUrls: ['./carga-doc-nacional.component.css']
})
export class CargaDocNacionalComponent implements OnInit {
  @Output() enviarConceptos = new EventEmitter();
  @Output() cancelarCarga = new EventEmitter();
  @Output() enviarArchivo = new EventEmitter();
  @Output() setTimpoCambio = new EventEmitter();
  @Output() enviarDetalleFactura = new EventEmitter();
  @Input() lista_cuentas: any = [];
  formulario: FormGroup;
  xml_valido = false;

  detalle_factura: any;
  conceptos: Array<ConceptoCFDI>;
  catalogo_concepto: any;
  detalle2: any;
  public valido = false;

  constructor(
    private formBuilder: FormBuilder,
    private _gastosViajeService: GastosViajeService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      archivo_xml: ['', Validators.required],
      archivo_pdf: ['']
    });
  }

  public get controles() { return this.formulario.controls; }

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
        this.enviarArchivo.emit(archivo.file_data);
      } else if (tipo === 'pdf') {
        this.controles.archivo_pdf.setValue(archivo.file_data);
      }
    };
  }

  validarDocumento(boton?) {
    if (boton) {
      boton.innerHTML = 'Validando...';
      boton.disabled = true;
    }
    this._gastosViajeService.getConceptosFactura(this.controles.archivo_xml.value).subscribe((data: any) => {
      this.detalle_factura = data;
      this.detalle_factura = { ...this.detalle_factura, file: this.controles.archivo_xml.value };
      boton.innerHTML = 'Validar';
      boton.disabled = false;
      this.xml_valido = true;
      this.enviarDetalleFactura.emit(this.detalle_factura);
      this.conceptos = this.detalle_factura.conceptos;
      let suma_impuesto = 0;
      if (this.conceptos.length > 0) {

        this.conceptos = this.conceptos.map(conceptos => {
          conceptos.aplica = true;
          if (conceptos.impuestos && conceptos.impuestos.traslados && conceptos.impuestos.traslados.length > 0) {
            conceptos.impuestos.traslados.forEach(impuesto => {
              suma_impuesto = + impuesto.importe;
            });
          }
          return { ...conceptos, total: conceptos.importe + suma_impuesto }
        })
      }
      console.log(this.conceptos);
    }, error => console.log(error)
    );
  }

  cancelar() {
    this.cancelarCarga.emit();
    this.xml_valido = false;
  }

  agregarComprobacion() {
    this.conceptos = this.conceptos.map(x => {
      return {
        ...x,
        uuid: this.detalle_factura.complemento.timbreFiscalDigital.uuid,
        fecha_comprobante: this.detalle_factura.fecha,
        pagado_compania: x.aplica ? 1 : 0,
        tipo_cambio: this.detalle_factura.tipoCambio && this.detalle_factura.tipoCambio !== 0 ? this.detalle_factura.tipoCambio : 1
      }
    })
    this.enviarConceptos.emit(this.conceptos);
  }

  validarEstatus() {
    this.valido = true;
    for (let index = 0; index < this.conceptos.length; index++) {
      if (!this.conceptos[index].valido) {
        this.valido = false;
        break;
      }
    }
  }



}
