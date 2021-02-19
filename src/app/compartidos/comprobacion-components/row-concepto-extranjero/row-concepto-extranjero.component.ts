import { ConceptoComprobanteRCI } from './../../../entidades/ComprobanteNacional';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-row-concepto-extranjero',
  templateUrl: './row-concepto-extranjero.component.html',
  styleUrls: ['./row-concepto-extranjero.component.css']
})
export class RowConceptoExtranjeroComponent implements OnInit {
  @Output() onEliminar = new EventEmitter();
  @Output() onAgregarConcepto = new EventEmitter();
  @Output() onCancelar = new EventEmitter();
  @Input() contribuyente: string;
  @Input() lista_cuentas = [];
  @Input() sucursal: string;
  @Input() concepto: ConceptoComprobanteRCI;

  pago_compania = false;
  concepto_add = false;
  random_hash = '';

  formulario_row: FormGroup;

  constructor() {
    this.random_hash = String(Math.random() * 10);
  }

  ngOnInit() {
    this.iniciarFormulario();
    if (this.concepto) {
      this.formulario_row.disable();
    }
  }

  iniciarFormulario() {
    this.formulario_row = new FormGroup({
      descripcion: new FormControl(this.concepto ? this.concepto.descripcion : '', [Validators.required]),
      unidad: new FormControl(this.concepto ? this.concepto.unidad : '', [Validators.required]),
      valorUnitario: new FormControl(this.concepto ? this.concepto.valorUnitario : null, [Validators.required]),
      cantidad: new FormControl(this.concepto ? this.concepto.cantidad : null, [Validators.required]),
      importe: new FormControl(this.concepto ? this.concepto.importe : null, [Validators.required]),
      cuenta: new FormControl(this.concepto ? this.concepto.cuenta : null, [Validators.required]),
      montoRembolsar: new FormControl(this.concepto ? this.concepto.montoRembolsar : null, [Validators.required]),
      aplica: new FormControl(this.concepto ? this.concepto.aplica : false),
    });
  }
  public get controls() { return this.formulario_row.controls; }

  cambiarCheck(data) {
    this.controls.anticipo.setValue(data.checked);
  }
  onConceptoSelected(data) {
    if (data.data !== '0' && data.value !== '' && data.data.length > 0) {
      this.controls.cuenta.setValue(data.data[0].cuenta_codigo ? data.data[0].cuenta_codigo : null);
    } else {
      this.controls.cuenta.setValue(null);
    }
  }

  submitFormulario() {
    this.controls.cantidad.setValue(Number(this.controls.cantidad.value));
    const concepto: ConceptoComprobanteRCI = { ...this.formulario_row.value };
    this.limpiarSelect();
    this.onAgregarConcepto.emit(concepto);
    this.formulario_row.reset();
  }

  limpiarSelect() {
    const aux = this.lista_cuentas;
    this.lista_cuentas = new Array<any>();
    setTimeout(() => {
      this, this.lista_cuentas = aux;
    }, 200);
  }

  onChangeConcepto(concepto) {
    this.controls.cuenta.setValue(concepto.value !== '0' ? concepto.value : '');
  }

  calcularImporte() {
    try {
      this.controls.importe.setValue(Number(this.controls.cantidad.value) * Number(this.controls.valorUnitario.value));
    } catch {
      this.controls.importe.setValue(0);
    }
  }
}
