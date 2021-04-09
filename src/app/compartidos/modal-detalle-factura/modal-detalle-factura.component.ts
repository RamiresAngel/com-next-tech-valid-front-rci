import { FileUpload } from './../../modulos/documentos_add/clases/file-upload';
import { ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Cfdi } from 'src/app/entidades/cfdi';
import Swal from 'sweetalert2';
import { CompartidosService } from '../servicios_compartidos/compartidos.service';
import { LoadingService } from '../servicios_compartidos/loading.service';
declare var $: any;


@Component({
  selector: 'app-modal-detalle-factura',
  templateUrl: './modal-detalle-factura.component.html',
  styleUrls: ['./modal-detalle-factura.component.css']
})
export class ModalDetalleFacturaComponent implements OnInit {
  @ViewChild('btn_cerrar') btn_cerrar: HTMLButtonElement;
  @ViewChild('btn_close') btn_close: HTMLButtonElement;
  @ViewChild('input_pdf_txt') input_pdf_txt: ElementRef;

  @Output() onAnexoAgregado = new EventEmitter();

  @Input() tipoAccion: 'actualizar' | 'agregar' = 'actualizar';;
  @Input() titulo: string = 'Anexar Archivo';
  @Input() identificador_corporativo: string = '';
  @Input() documento_cfdi: Cfdi;
  @Input() id_Doc: string;

  public archivo = '';
  public nombre_archivo = '';

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
      this.nombre_archivo = fileData.file_name;
      // if (tipo == 'xml') {
      //   console.log('Es Factura XML,', file.name);
      // } else {
      //   console.log('Es Factura PDF,', file.name);
      // }
    };
  }

  actualizarDoc() {
    let aux_id_documento = '';
    if (this.documento_cfdi) {
      aux_id_documento = this.documento_cfdi.id.toString();
    } else {
      aux_id_documento = this.id_Doc;
    }
    this.loadingService.showLoading();
    const extension = this.nombre_archivo.split('.');
    const datos = {
      id_documento: aux_id_documento,
      base_64: this.archivo,
      nombre_archivo: this.nombre_archivo,
      extension: `.${extension[extension.length - 1]}`,
      identificador_corporativo: this.identificador_corporativo,
    };

    /* this.compartidosService.agregarAnexos(datos).subscribe((data) => {
      this.loadingService.hideLoading();
      this.cerrarModal();
      this.onAnexoAgregado.emit();
      this.archivo = '';
      console.log(this.input_pdf_txt.nativeElement)
      this.input_pdf_txt.nativeElement.value = '';
      Swal.fire('Exito', 'Datos actualizados correctamente.', 'success');
    }, err => {
      const mensaje = err.err.mensaje;
      Swal.fire('Error', mensaje, 'error');
      this.loadingService.hideLoading();
    }); */
    this.loadingService.hideLoading();
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
    $('#modal_detalle').modal('hide');
  }

}
