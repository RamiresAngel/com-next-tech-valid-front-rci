import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'src/app/modulos/documentos_add/clases/file-upload';
@Component({
  selector: 'app-modal-acutalizar-documento',
  templateUrl: './modal-acutalizar-documento.component.html',
  styleUrls: ['./modal-acutalizar-documento.component.css']
})
export class ModalAcutalizarDocumentoComponent implements OnInit {
  @ViewChild('btn_cerrar') btn_cerrar: HTMLButtonElement;
  @ViewChild('btn_close') btn_close: HTMLButtonElement;

  @Input() id_modal: string = 'modal';
  @Input() titulo: string = 'modal';

  constructor() { }

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
      console.log(file.name);
      if (tipo == 'xml') {
        console.log('Es Factura XML,', file.name);
      } else {
        console.log('Es Factura PDF,', file.name);
      }
    };
  }

  actualizarDoc(btn_actualizar: HTMLButtonElement) {
    const txt = btn_actualizar.innerHTML;
    this.toggleButtons();
    btn_actualizar.disabled = true;
    btn_actualizar.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:14px"></i>';
    setTimeout(() => {
      this.toggleButtons();
      btn_actualizar.innerHTML = txt;
      btn_actualizar.disabled = false;
    }, 1000);
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
}
