import { ConceptoComprobanteRCI } from './../../../entidades/ComprobanteNacional';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { ComprobacionGastosHeader } from 'src/app/entidades/ComprobacionGastosHeader';
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
  @Input() comprobacion_header: ComprobacionGastosHeader;
  @Input() tipo_gasto: number;
  @Input() porcentaje_reembolso: number = 100;
  @Input() monto_maximo_rembolso: number = 0;

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

  ngOnChanges(): void {
    console.log(this.porcentaje_reembolso);
    if (this.tipo_gasto == 11 && this.formulario_row) {
      this.controls.monto_rembolsar.setValue(typeof (this.controls.importe.value) == 'number' ? this.controls.importe.value * (this.porcentaje_reembolso / 100) : 0);
    }
    this.validarMontoRembolarVsSaldoDisponible();
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
      this.controls.numero_dias.setValidators([Validators.required, this.numberNotZeroValidator(/^[1-9]\d*$/)]);
      this.controls.numero_dias.updateValueAndValidity();
    }
    this.controls.id_moneda.setValue(1);
    this.controls.tipo_cambio.setValue(1);
    this.controls.moneda.setValue('MXN');
    this.controls.tipo_cambio.disable();
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
    let concepto: ConceptoComprobanteRCI = { ...this.formulario_row.value, tipo_cambio: this.controls.tipo_cambio.value };
    if (this.tipo_gasto == 11) {
      concepto.id_cuenta_agrupacion = this.cuenta_seleccionada;
    }

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
        this.controls.numero_dias.setValidators([Validators.required, this.numberNotZeroValidator(/^[1-9]\d*$/)]);
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
    if (this.controls.moneda.value == 'MXN') {
      this.controls.tipo_cambio.setValue(1);
      this.controls.tipo_cambio.disable();
    } else {
      this.controls.tipo_cambio.enable();
    }
  }

  calcularImporte() {
    try {
      this.controls.importe.setValue(Number(this.controls.cantidad.value) * Number(this.controls.valorUnitario.value));
      if (this.porcentaje_reembolso) {
        // console.log((Number(this.controls.importe.value) * Number(this.controls.tipo_cambio.value)) * (Number(this.porcentaje_reembolso) / 100));
        this.controls.monto_rembolsar.setValue((Number(this.controls.importe.value) * Number(this.controls.tipo_cambio.value)) * (Number(this.porcentaje_reembolso) / 100));
        this.validarMontoRembolarVsSaldoDisponible();
        // console.log(this.controls.monto_rembolsar.value);
      } else {
        this.controls.monto_rembolsar.setValue((Number(this.controls.importe.value) * Number(this.controls.tipo_cambio.value)));
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
    console.log(this.controls.monto_rembolsar.value);

    if (!this.controls.total_modificado.value) this.controls.total_modificado.setValue(true);
    if (this.controls.monto_rembolsar.value > (this.controls.importe.value * this.controls.tipo_cambio.value)) {
      if (this.tipo_gasto == 11) {
        this.controls.monto_rembolsar.setValue((this.controls.importe.value * this.controls.tipo_cambio.value) * (Number(this.porcentaje_reembolso) / 100));
        if (this.controls.monto_rembolsar.value > this.monto_maximo_rembolso) {
          this.controls.monto_rembolsar.setValue(this.monto_maximo_rembolso);
        }
      } else {
        this.controls.monto_rembolsar.setValue(this.controls.importe.value * this.controls.tipo_cambio.value);
      }
    }
    if (this.tipo_gasto == 11) {
      if (this.controls.monto_rembolsar.value > this.monto_maximo_rembolso) {
        this.controls.monto_rembolsar.setValue(this.monto_maximo_rembolso);
      }
    }
  }

  validarMontoRembolarVsSaldoDisponible() {
    if (this.formulario_row) {
      if (this.controls.monto_rembolsar.value > this.monto_maximo_rembolso) {
        this.controls.monto_rembolsar.setValue(this.monto_maximo_rembolso);
      }
    }
  }

  numberNotZeroValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = !nameRe.test(control.value);
      console.log(forbidden);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }
}
