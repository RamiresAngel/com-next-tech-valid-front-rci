import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GastosViajeService } from '../../gastos-viaje.service';

@Component({
  selector: 'app-row-concepto-extranjero',
  templateUrl: './row-concepto-extranjero.component.html',
  styleUrls: ['./row-concepto-extranjero.component.css']
})
export class RowConceptoExtranjeroComponent implements OnInit {
  @Output() addConcepto = new EventEmitter();
  @Output() removeConcepto = new EventEmitter();
  @Input() contribuyente: string;
  @Input() sucursal: string;
  @Input() concepto: any;
  @Input() lista_cuentas = [];
  pago_compania = false;
  concepto_add = false;
  random_hash = '';

  formulario_row: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.random_hash = String(Math.random() * 10);
  }

  ngOnInit() {
    this.iniciarFormulario();
    if (this.concepto) {
      this.formulario_row.disable();
    }
  }

  iniciarFormulario() {
    this.formulario_row = this.formBuilder.group({
      concepto: [this.concepto ? this.concepto.concepto : '', Validators.required],
      cuenta: [this.concepto ? this.concepto.cuenta : '', Validators.required],
      importe: [this.concepto ? this.concepto.importe : '', Validators.required],
      id_cuenta_agrupacion: [this.concepto ? this.concepto.id_cuenta_agrupacion : '', Validators.required],
      anticipo: [this.concepto ? this.concepto.anticipo : false],
      pagado_compania: [this.concepto ? this.concepto.anticipo : false]
    });
  }
  public get controls() { return this.formulario_row.controls; }

  cambiarCheck(data) {
    this.controls.anticipo.setValue(data.checked);
  }
  onConceptoSelected(data) {
    if (data.data && data.value !== '' && data.data.length > 0) {
      this.controls.id_cuenta_agrupacion.setValue(data.value);
      this.controls.concepto.setValue(data.data[0].cuenta ? data.data[0].cuenta : null);
      this.controls.cuenta.setValue(data.data[0].cuenta_codigo ? data.data[0].cuenta_codigo : null);
    } else {
      this.controls.concepto.setValue(null);
      this.controls.cuenta.setValue(null);
    }
  }

  enviarConcepto() {
    this.limpiarSelect();
    this.controls.importe.setValue(this.controls.importe.value as Number);
    this.controls.id_cuenta_agrupacion.setValue(Number(this.controls.id_cuenta_agrupacion.value));
    this.controls.anticipo.setValue(this.controls.anticipo.value ? 1 : 0);
    this.controls.pagado_compania.setValue(this.controls.anticipo.value ? 1 : 0);
    this.addConcepto.emit(this.formulario_row.value);
    this.iniciarFormulario();
    this.concepto_add = true;
  }

  eliminarConcepto() {
    this.removeConcepto.emit();
  }

  limpiarSelect() {
    const aux = this.lista_cuentas;
    this.lista_cuentas = new Array<any>();
    setTimeout(() => {
      this, this.lista_cuentas = aux;
    }, 200);
  }
}
