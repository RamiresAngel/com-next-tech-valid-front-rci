import { ElementRef, EventEmitter, Input, Output, OnChanges } from '@angular/core';
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
export class ModalAgregarAnexoComponent implements OnChanges {

  @ViewChild('btn_cerrar') btn_cerrar: HTMLButtonElement;
  @ViewChild('btn_close') btn_close: HTMLButtonElement;
  @ViewChild('input_pdf_txt') input_pdf_txt: ElementRef;

  @Output() onAnexoAgregado = new EventEmitter();

  @Input() tipoAccion: 'actualizar' | 'agregar' = 'actualizar';;
  @Input() titulo: string = 'Anexar Archivo';
  @Input() identificador_corporativo: string = '';
  @Input() documento_cfdi: Cfdi;
  @Input() id_Doc: string;
  @Input() uuid: string = '';
  documentos_anexos = new Array<any>();

  public archivo = '';
  public nombre_archivo = '';

  constructor(
    private compartidosService: CompartidosService,
    private loadingService: LoadingService
  ) { }

  ngOnChanges(): void {
    if (this.uuid) {
      this.cargarAnexos();
    }
  }

  cargarAnexos() {
    this.compartidosService.listarAnexosByuuid(this.uuid).subscribe(
      (data: any) => {
        this.documentos_anexos = data;
      },
      (error: any) => {
        console.log(error);
      }
    )
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
      id_documento: aux_id_documento ? aux_id_documento : '0',
      uuid: this.uuid,
      base_64: this.archivo,
      nombre_archivo: this.nombre_archivo,
      extension: `.${extension[extension.length - 1]}`,
      identificador_corporativo: this.identificador_corporativo,
    };

    this.compartidosService.agregarAnexos(datos).subscribe((data: any) => {
      this.loadingService.hideLoading();
      this.cerrarModal();
      this.onAnexoAgregado.emit();
      this.archivo = '';
      this.input_pdf_txt.nativeElement.value = '';
      this.cargarAnexos();
      Swal.fire('Exito', data.mensaje ? data.mensaje : 'Anexo agregado correctamente.', 'success');
    }, error => {
      this.loadingService.hideLoading();
      const mensaje = error.error.mensaje;
      Swal.fire('Error', mensaje, 'error');
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

  obtenerURl(documento) {
    this.loadingService.showLoading();
    this.compartidosService.descargarAnexo({ extension: documento.extension, identificador: documento.identificador }).subscribe((data: any) => {
      const enlace = document.createElement('a');
      enlace.setAttribute('href', data)
      enlace.setAttribute('target', '_blank')
      enlace.style.display = 'none';
      enlace.click();
      this.loadingService.hideLoading();
    }, err => {
      console.log(err);


      this.loadingService.hideLoading();
    })
  }

  eliminarAnexo(id_anexo) {
    Swal.fire({
      title: '<strong>Eliminar Documento</strong>',
      type: 'warning',
      html:
        'Esta acción es irreversible.' +
        '</br> Esta seguro que desea continuar con la operación? ',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fas fa-check"></i>',
      confirmButtonAriaLabel: 'Ok',
      cancelButtonText:
        '<i class="far fa-times-circle"></i>',
      cancelButtonAriaLabel: 'Cancelar'
    }).then(resp => {
      if (resp.value === true) {
        this.loadingService.showLoading();
        this.compartidosService.eliminarAnexos(id_anexo).subscribe((result: any) => {
          Swal.fire('Resultado', result.mensaje as string, 'success');
          this.cargarAnexos();
          this.loadingService.hideLoading();
        }, error => {
          this.loadingService.hideLoading();
          Swal.fire('Error en la operación', 'La transacción no se pudo realizar correctamente debido al siguiente error: ' + error, 'error');
        });
      } else {
        Swal.fire('Operación Cancelada', 'El archivo no fue eliminado', 'info');
      }
    }).catch(error => {
      Swal.fire('Error en la operación', 'La transacción no se pudo realizar correctamente debido al siguiente error: ' + error, 'error');
    });
  }


}
