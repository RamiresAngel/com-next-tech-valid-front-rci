import { ConceptoComprobanteRCI } from './../../../entidades/ComprobanteNacional';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoGastoCorporativo } from 'src/app/entidades/TipoGastoCorporativo';
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
  @Input() lista_monedas = [];
  @Input() cuenta_seleccionada: number;
  @Input() sucursal: string;
  @Input() concepto: ConceptoComprobanteRCI;

  pago_compania = false;
  concepto_add = false;
  random_hash = '';
  tipo_cambio = 1;
  requerir_numero_dias = false;

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
      concepto: new FormControl('', [Validators.required]),
      unidad: new FormControl('', [Validators.required]),
      valorUnitario: new FormControl(null, [Validators.required]),
      cantidad: new FormControl(null, [Validators.required]),
      importe: new FormControl(null, [Validators.required]),
      id_cuenta_agrupacion: new FormControl(null, [Validators.required]),
      monto_rembolsar: new FormControl(null, [Validators.required]),
      aplica: new FormControl(true),
      moneda: new FormControl(null, Validators.required),
      id_moneda: new FormControl(null, Validators.required),
      tipo_cambio: new FormControl(1, Validators.required),
      numero_dias: new FormControl(null),
      // comprobante_fiscal: new FormControl(false),
      // observacion: new FormControl('', [Validators.required]),
      total_modificado: new FormControl(false),
    });
    this.controls.id_cuenta_agrupacion.setValue(this.cuenta_seleccionada);
    if (this.lista_cuentas.find(x => x.id == this.cuenta_seleccionada).numero_dias) {
      this.requerir_numero_dias = true;
      this.controls.numero_dias.setValidators([Validators.required]);
      this.controls.numero_dias.updateValueAndValidity();
    }
    this.controls.id_moneda.setValue(1);
    this.controls.tipo_cambio.setValue(1);
    this.controls.moneda.setValue('MXN');
  }
  public get controls() { return this.formulario_row.controls; }

  cambiarCheck(data) {
    this.controls.anticipo.setValue(data.checked);
  }
  onConceptoSelected(data) {
    if (data.data !== '0' && data.value !== '' && data.data.length > 0) {
      this.controls.id_cuenta_agrupacion.setValue(data.data[0].cuenta_codigo ? data.data[0].cuenta_codigo : null);
    } else {
      this.controls.id_cuenta_agrupacion.setValue(null);
    }
  }

  submitFormulario() {
    // this.controls.comprobante_fiscal.setValue(this.controls.comprobante_fiscal.value ? 1 : 0);
    this.controls.cantidad.setValue(Number(this.controls.cantidad.value));
    this.controls.aplica.setValue(this.controls.aplica.value ? 1 : 0);
    this.controls.numero_dias.setValue(Number(this.controls.numero_dias.value));
    const concepto: ConceptoComprobanteRCI = { ...this.formulario_row.value };

    this.onAgregarConcepto.emit(concepto);
    this.onCancelarConceptos();
  }

  onCancelarConceptos() {
    // this.limpiarSelect();
    this.formulario_row.reset();
    this.controls.aplica.setValue(true);
    this.controls.id_cuenta_agrupacion.setValue(this.cuenta_seleccionada);
    this.controls.id_moneda.setValue(1);
    this.controls.tipo_cambio.setValue(1);
    this.controls.moneda.setValue('MXN');
    this.tipo_cambio = 1;
  }

  limpiarSelect() {
    const aux = this.lista_cuentas;
    this.lista_cuentas = new Array<any>();
    setTimeout(() => {
      this.lista_cuentas = aux;
    }, 200);
  }

  onChangeConcepto(concepto) {
    // console.log(concepto);
    this.controls.id_cuenta_agrupacion.setValue(concepto.value !== '0' ? Number(concepto.value) : null);
    if (concepto.data[0]) {
      this.requerir_numero_dias = concepto.data[0].numero_dias;
      if (this.requerir_numero_dias) {
        this.controls.numero_dias.setValidators([Validators.required]);
        this.controls.numero_dias.updateValueAndValidity();
        return;
      }
    }
    this.controls.numero_dias.setValue(null);
    this.controls.numero_dias.setValidators([]);
    this.controls.numero_dias.updateValueAndValidity();
  }
  onMonedaChange(moneda) {
    // console.log(moneda);
    const value = moneda.value != '0' ? moneda.value : null;
    this.controls.moneda.setValue(moneda.value !== '0' ? moneda.data[0].clave : null);
    this.controls.id_moneda.setValue(moneda.value !== '0' ? Number(moneda.value) : null);
  }

  calcularImporte() {
    try {
      this.controls.importe.setValue(Number(this.controls.cantidad.value) * Number(this.controls.valorUnitario.value));
      if (!this.controls.total_modificado.value) {
        this.controls.monto_rembolsar.setValue(this.controls.importe.value * this.controls.tipo_cambio.value);
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
  }

  onChangeAplica(target) {
    this.controls.aplica.setValue(target.checked);
  }

  cambiarEstatusTotalModificado() {
    if (!this.controls.total_modificado.value) this.controls.total_modificado.setValue(true);
    if (this.controls.monto_rembolsar.value > this.controls.importe.value) {
      this.controls.monto_rembolsar.setValue(this.controls.importe.value * this.controls.tipo_cambio.value);
    }
  }
}
