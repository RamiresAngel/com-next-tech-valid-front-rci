import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComprobacionGastosHeader } from 'src/app/entidades/ComprobacionGastosHeader';

@Component({
  selector: 'app-form-comrpobacion-header',
  templateUrl: './form-comrpobacion-header.component.html',
  styleUrls: ['./form-comrpobacion-header.component.css']
})
export class FormComrpobacionHeaderComponent implements OnInit {
  @Output() onContinuar = new EventEmitter();
  @Input() lista_contribuyente: Array<any> = [];
  @Input() lista_centro_costos: Array<any> = [];
  @Input() lista_moneda: Array<any> = [];
  @Input() comprobacion_header: ComprobacionGastosHeader;

  formulario_header: FormGroup;

  constructor() { }

  ngOnInit() {
    this.iniciarFormularioHeader();
  }

  iniciarFormularioHeader() {
    this.formulario_header = new FormGroup({
      nombre_usuario: new FormControl('', Validators.required),
      contribuyente: new FormControl('', Validators.required),
      centro_costos: new FormControl('', Validators.required),
      aprobador: new FormControl('', Validators.required),
      moneda: new FormControl('', Validators.required),
      destino: new FormControl('', Validators.required),
      motivo: new FormControl('', Validators.required),
      recuperable: new FormControl(false)
    });
  }
  submitForm() {
    this.onContinuar.emit(this.formulario_header.value);
  }
  onContribuyenteSelected(data) {
    this.controls.contribuyente.setValue(data.value != '0' ? data.value : null);
  }
  onCECOSelected(data) {
    this.controls.centro_costos.setValue(data.value != '0' ? data.value : null)
  }
  onMonedaSelected(data) {
    this.controls.moneda.setValue(data.value != '0' ? data.value : null)
  }

  public get controls(): { [key: string]: AbstractControl } {
    return this.formulario_header.controls;
  }

}
