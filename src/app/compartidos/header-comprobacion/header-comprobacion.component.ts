import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-header-comprobacion',
  templateUrl: './header-comprobacion.component.html',
  styleUrls: ['./header-comprobacion.component.css']
})
export class HeaderComprobacionComponent implements OnInit {
  @Input() formulario_header: FormGroup;
  @Input() monedas = new Array<{ text: string, id: number }>();
  @Input() lista_documentos = new Array<{ text: string, id: number }>();
  @Output() onTipoDocumentoSelect = new EventEmitter();

  constructor(public globals: GlobalsComponent) {
    this.formulario_header = new FormGroup({
      rfc_emisor: new FormControl('', Validators.required),
      nombre_emisor: new FormControl('', Validators.required),
      numero_recibo: new FormControl('', Validators.required),
      importe: new FormControl('', [Validators.required]),
      fecha: new FormControl('', Validators.required),
      impuesto: new FormControl(0),
      moneda: new FormControl(null, Validators.required),
      id_moneda: new FormControl(null, Validators.required),
      tasa_cambio: new FormControl(1, Validators.required),
      tipo_documento: new FormControl(1, Validators.required),
      // rfc_extranjero: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  onFechaSelected(event: IMyDateModel) {
    this.controls.fecha.setValue(event.formatted);
  }

  onMonedaSelect(event) {
    if (Number(event.value) !== 0) {
      this.controls.id_moneda.setValue(event.value);
      this.controls.moneda.setValue(event.data[0].clave);
    } else {
      this.controls.id_moneda.setValue(null);
      this.controls.moneda.setValue(null);
    }
  }

  selectTipoDocumento(obj) {
    this.onTipoDocumentoSelect.emit(obj);
  }
  onImpuestoSelect(obj) {
    this.controls.impuesto.setValue(0);
  }

  public get controls(): { [key: string]: AbstractControl; } {
    return this.formulario_header.controls;
  }
}
