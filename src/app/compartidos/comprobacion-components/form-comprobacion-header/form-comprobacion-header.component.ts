import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComprobacionGastosHeader } from 'src/app/entidades/ComprobacionGastosHeader';

@Component({
  selector: 'app-form-comprobacion-header',
  templateUrl: './form-comprobacion-header.component.html',
  styleUrls: ['./form-comprobacion-header.component.css']
})
export class FormComrpobacionHeaderComponent implements OnInit {
  @Output() onContinuar = new EventEmitter();
  @Output() onCancelar = new EventEmitter();
  @Input() lista_contribuyente: Array<any> = [];
  @Input() lista_centro_costos: Array<any> = [];
  @Input() lista_moneda: Array<any> = [];
  @Input() numero_comprobacion: string;
  @Input() comprobacion_header = new ComprobacionGastosHeader();

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
    this.formulario_header.disable();
    this.onContinuar.emit(this.formulario_header.value);
    // this.formulario_header.disable();
  }
  onContribuyenteSelected(data) {
    const value = data.value != '0' ? data.value : null;
    this.controls.contribuyente.setValue(value);
    this.comprobacion_header.identificador_compania = value;
  }
  onCECOSelected(data) {
    const value = data.value != '0' ? data.value : null;
    this.controls.centro_costos.setValue(value);
    this.comprobacion_header.identificador_cc = value;
  }
  onMonedaSelected(data) {
    const value = data.value != '0' ? data.value : null;
    this.controls.moneda.setValue(value);
    this.comprobacion_header.id_moneda = value;
  }
  cancelarComprobacion() {
    this.onCancelar.emit();
  }

  public get controls(): { [key: string]: AbstractControl } {
    return this.formulario_header.controls;
  }

}
