import { ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Cfdi } from 'src/app/entidades/cfdi';
import { FileUpload } from 'src/app/modulos/documentos_add/clases/file-upload';
import Swal from 'sweetalert2';
import { CompartidosService } from '../servicios_compartidos/compartidos.service';
import { LoadingService } from '../servicios_compartidos/loading.service';
declare var $: any;


@Component({
  selector: 'app-modal-agregar-anexo',
  templateUrl: './modal-agregar-anexo.component.html',
  styleUrls: ['./modal-agregar-anexo.component.css']
})
export class ModalAgregarAnexoComponent implements OnInit {

  @ViewChild('btn_cerrar') btn_cerrar: HTMLButtonElement;
  @ViewChild('btn_close') btn_close: HTMLButtonElement;
  @ViewChild('input_pdf_txt') input_pdf_txt: ElementRef;

  @Output() onAnexoAgregado = new EventEmitter();

  @Input() tipoAccion: 'actualizar' | 'agregar' = 'actualizar';;
  @Input() titulo: string = 'Anexar Archivo';
  @Input() identificador_corporativo: string = '';
  @Input() documento_cfdi: Cfdi;

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
      if (tipo == 'xml') {
        console.log('Es Factura XML,', file.name);
      } else {
        console.log('Es Factura PDF,', file.name);
      }
    };
  }

  actualizarDoc() {
    this.loadingService.showLoading();
    const extension = this.nombre_archivo.split('.');
    const datos = {
      id_documento: this.documento_cfdi.id.toString(),
      base_64: this.archivo,
      nombre_archivo: this.nombre_archivo,
      extension: extension[extension.length - 1],
      identificador_corporativo: this.identificador_corporativo,
    };

    this.compartidosService.agregarAnexos(datos).subscribe((data) => {
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
    $('#modalAnexos').modal('hide');
  }

}
