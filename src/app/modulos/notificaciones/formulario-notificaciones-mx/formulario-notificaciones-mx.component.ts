import { Comunicado, Tags } from './../../../entidades/comunicado';
import { Component, OnInit, ɵConsole } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-formulario-notificaciones-mx',
  templateUrl: './formulario-notificaciones-mx.component.html',
  styleUrls: ['./formulario-notificaciones-mx.component.css']
})
export class FormularioNotificacionesMxComponent implements OnInit {
  public Editor = ClassicEditor;
  public nametag = '';
  public config = {
    placeholder: 'Escribe la plantilla personalizada',
    title: 'Paragraph'
  };
  public comunicado = new Comunicado();

  constructor() { }

  ngOnInit() {
  }

  guardar() {
    console.log(this.comunicado);
  }

  agregarTag() {
    if (this.nametag.length > 0 ) {
      const tag = new Tags(this.nametag);
      tag.tag = this.nametag;
      console.log(tag);
      this.comunicado.tags.push(tag);
      this.nametag = '';
    }
    console.log(this.comunicado);
  }

}
