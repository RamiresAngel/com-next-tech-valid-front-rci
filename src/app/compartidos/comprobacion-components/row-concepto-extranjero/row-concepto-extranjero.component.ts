import { ConceptoComprobanteRCI } from './../../../entidades/ComprobanteNacional';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $: any;
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
      concepto: new FormControl(this.concepto ? this.concepto.concepto : '', [Validators.required]),
      unidad: new FormControl(this.concepto ? this.concepto.unidad : '', [Validators.required]),
      valorUnitario: new FormControl(this.concepto ? this.concepto.valorUnitario : null, [Validators.required]),
      cantidad: new FormControl(this.concepto ? this.concepto.cantidad : null, [Validators.required]),
      importe: new FormControl(this.concepto ? this.concepto.importe : null, [Validators.required]),
      cuenta: new FormControl(this.concepto ? this.concepto.cuenta : null, [Validators.required]),
      monto_rembolsar: new FormControl(this.concepto ? this.concepto.monto_rembolsar : null, [Validators.required]),
      aplica: new FormControl(this.concepto ? this.concepto.aplica : true),
      comprobante_fiscal: new FormControl(this.concepto ? this.concepto.comprobante_fiscal : false),
      observacion: new FormControl(this.concepto ? this.concepto.observacion : '', [Validators.required]),
      total_modificado: new FormControl(false),
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
    this.controls.aplica.setValue(this.controls.aplica ? 1 : 0);
    this.controls.comprobante_fiscal.setValue(this.controls.comprobante_fiscal ? 1 : 0);
    const concepto: ConceptoComprobanteRCI = { ...this.formulario_row.value };
    this.onAgregarConcepto.emit(concepto);
    this.onCancelarConceptos();
  }

  onCancelarConceptos() {
    this.limpiarSelect();
    this.formulario_row.reset();
    this.controls.aplica.setValue(true);
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
      if (!this.controls.total_modificado.value) {
        this.controls.monto_rembolsar.setValue(this.controls.importe.value);
      }
    } catch {
      this.controls.importe.setValue(0);
    }
  }

  modal(modal: string) {
    if (modal === 'impuestos') {
      $('#modal_impuestos').modal('toggle');
    } else if (modal === 'detalle') {
      $('#modal_detalle').modal('toggle');
    } else {
      $('#modal_adicionales').modal('toggle');
    }
  } la

  cambiarEstatusTotalModificado() {
    if (!this.controls.total_modificado.value) this.controls.total_modificado.setValue(true);
  }
}
