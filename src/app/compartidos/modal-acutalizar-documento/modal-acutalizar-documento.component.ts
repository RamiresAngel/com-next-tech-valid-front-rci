import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { Component, Input, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { FileUpload } from 'src/app/modulos/documentos_add/clases/file-upload';
import { Cfdi } from 'src/app/entidades/cfdi';
import { LoadingService } from '../servicios_compartidos/loading.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-modal-acutalizar-documento',
  templateUrl: './modal-acutalizar-documento.component.html',
  styleUrls: ['./modal-acutalizar-documento.component.css']
})
export class ModalAcutalizarDocumentoComponent implements OnInit {
  @ViewChild('btn_cerrar') btn_cerrar: HTMLButtonElement;
  @ViewChild('btn_close') btn_close: HTMLButtonElement;
  @ViewChild('input_pdf_txt') input_pdf_txt: ElementRef;

  @Output() onDatoActualizado = new EventEmitter();

  @Input() tipoAccion: 'actualizar' | 'agregar' = 'actualizar';
  @Input() id_modal: string = 'modal';
  @Input() titulo: string = 'modal';
  @Input() identificador_corporativo: string = '';
  @Input() documento_cfdi: Cfdi;
  @Input() id_Doc: string;
  @Input() folio_fiscal: string;
  public archivo = '';

  constructor(
    private compartidosService: CompartidosService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
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
      this.archivo = fileData.file_data;
      if (tipo == 'xml') {
        console.log('Es Factura XML,', file.name);
      } else {
        console.log('Es Factura PDF,', file.name);
      }
    };
  }

  actualizarDoc() {
    let aux_id_documento = '';
    let aux_folio = '';
    if (this.documento_cfdi) {
      aux_id_documento = this.documento_cfdi.id.toString();
      aux_folio = this.documento_cfdi.folio_fiscal;
    } else {
      aux_id_documento = this.id_Doc;
      aux_folio = this.folio_fiscal;
    }
    this.loadingService.showLoading();
    const datos = {
      id_documento: aux_id_documento,
      uuid: aux_folio,
      identificador_corporativo: this.identificador_corporativo,
      base_64: this.archivo
    };

    this.compartidosService.actualizarPdf(datos).subscribe((data) => {
      this.loadingService.hideLoading();
      this.cerrarModal();
      this.onDatoActualizado.emit();
      this.archivo = '';
      console.log(this.input_pdf_txt.nativeElement)
      this.input_pdf_txt.nativeElement.value = '';
      Swal.fire('Exito', 'Datos actualizados correctamente.', 'success');
    }, err => {
      const mensaje = err.err.mensaje;
      Swal.fire('Error', mensaje, 'error');
      this.loadingService.hideLoading();
    });
  }

  toggleButtons() {
    if (!this.btn_cerrar.disabled) {
      this.btn_cerrar.disabled = true;
      this.btn_close.disabled = true;
    } else {
      this.btn_cerrar.disabled = false;
      this.btn_close.disabled = false;
    }
  }

  cerrarModal() {
    $('#id_modal').modal('hide');
  }
}
