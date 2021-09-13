import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUpload } from 'src/app/modulos/documentos_add/clases/file-upload';

@Component({
  selector: 'app-totales-conceptos-carga-docs-rd',
  templateUrl: './totales-conceptos-carga-docs-rd.component.html',
  styleUrls: ['./totales-conceptos-carga-docs-rd.component.css']
})
export class TotalesConceptosCargaDocsRdComponent implements OnInit {
  @Output() onSeleccionarArchivo = new EventEmitter();
  @Input() total = 0;
  @Input() subtotal = 0;
  constructor() { }

  ngOnInit() {
  }

  cargarArchivo(input_archivo: HTMLInputElement, input_txt: HTMLInputElement, tipo: string) {
    const reader = new FileReader();
    const fileData = new FileUpload();
    const file = input_archivo.files[0];

    reader.readAsDataURL(file);
    reader.onload = () => {
      fileData.file_name = file.name;
      fileData.file_data = reader.result.toString().split(',')[1];
      input_txt.value = file.name;
      this.onSeleccionarArchivo.emit({
        nombre: file.name,
        data: fileData.file_data
      });
    };
  }
}
