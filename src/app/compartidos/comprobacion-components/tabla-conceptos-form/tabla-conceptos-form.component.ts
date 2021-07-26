import { AbstractControl, FormArray, FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-tabla-conceptos-form',
  templateUrl: './tabla-conceptos-form.component.html',
  styleUrls: ['./tabla-conceptos-form.component.css']
})
export class TablaConceptosFormComponent implements OnInit {
  @Input() conceptos = new Array<any>();
  @Input() lista_cuentas: any = [];
  @Input() forma_pago: string = '';
  @Input() tipo_gasto: number;
  @Input() tipo_cambio: number = 1;
  @Input() concepto_seleccionado = '';
  @Input() monto_disponible: number;
  @Input() porcentaje_reembolso = 100;
  @Output() onCancelar = new EventEmitter();
  @Output() onAgregar = new EventEmitter();
  @Input() impuestos;
  requiere_numero_dias = false;

  main_formulario: FormGroup;
  constructor() {
    this.iniciarFormulario();
  }

  ngOnInit() {
    this.addConceptosToForm();
  }

  ngOnChanges(): void {
    this.main_formulario.controls['forma_pago'].setValue(this.forma_pago);
    if (this.tipo_gasto == 11 && this.concepto_seleccionado && this.main_formulario) {
      this.controlsMain.conceptos.controls.map(control => {
        control.controls.concepto.setValue(this.concepto_seleccionado);
      });
    }
    if (this.tipo_gasto == 11) {
      this.calcularMontosReembolsables();
    }
  }

  calcularMontosReembolsables() {
    if (this.tipo_gasto == 11) {
      this.controlsConceptos.forEach((form, i) => {
        form.controls.monto_rembolsar.setValue(this.calcularMontoReembolsarConcepto(this.conceptos[i], this.monto_disponible, (this.porcentaje_reembolso / 100), this.calcularTotalComprobanteAplica()));
      });
    }
  }

  iniciarFormulario() {
    this.main_formulario = new FormGroup({
      forma_pago: new FormControl('', Validators.required),
      // Observacion_nota: new FormControl('', Validators.required),
      conceptos: new FormArray([])
    });
  }

  addConceptosToForm() {
    this.conceptos.forEach(concepto => {
      this.addFormRow(concepto);
    });
  }

  submitFormulario() {
    const form_conceptos = this.main_formulario.controls['conceptos'].value;
    this.conceptos = this.conceptos.map((concepto, i) => {
      concepto.monto_rembolsar = form_conceptos[i].monto_rembolsar;
      concepto.aplica = form_conceptos[i].aplica ? 1 : 0;
      concepto.comprobante_fiscal = form_conceptos[i].comprobante_fiscal ? 1 : 0;
      concepto.concepto = form_conceptos[i].concepto;
      concepto.numero_dias = Number(form_conceptos[i].numero_dias);
      return concepto;
    });
    this.onAgregar.emit(this.conceptos);
  }

  addFormRow(concepto: conceptoAux) {
    this.controlsMain.conceptos.push(
      new FormGroup({
        descripcion: new FormControl(concepto.descripcion),
        unidad: new FormControl(concepto.unidad),
        descuento: new FormControl(concepto.descuento),
        valorUnitario: new FormControl(concepto.valorUnitario),
        cantidad: new FormControl(concepto.cantidad),
        importe: new FormControl(this.tipo_gasto == 11 ? this.calcularTotalConcepto(concepto) : concepto.importe),
        concepto: new FormControl(concepto.concepto, Validators.required),
        tipo_cambio: new FormControl(this.tipo_cambio),
        monto_rembolsar: new FormControl(this.tipo_gasto == 11 ? this.calcularMontoReembolsarConcepto(concepto, this.monto_disponible, (this.porcentaje_reembolso / 100), this.calcularTotalComprobanteAplica()) : ((concepto.importe * this.tipo_cambio) - concepto.descuento), Validators.required),
        aplica: new FormControl(concepto.aplica, Validators.required),
        comprobante_fiscal: new FormControl(concepto.comprobante_fiscal),
        observacion: new FormControl(concepto.observacion),
        req_numero_dias: new FormControl(false),
        numero_dias: new FormControl(0),
      })
    );
  }
  removeFormRow(index: number) {
    this.controlsMain.coneptos.removeAt(index);
  }

  onChangeConcepto(concepto, i) {
    this.controlsConceptos[i].controls.concepto.setValue(concepto.value !== '0' ? concepto.value : null);
    this.controlsConceptos[i].controls.req_numero_dias.setValue(concepto.data[0].numero_dias ? true : false);

    const requiere_num_dias = this.controlsConceptos.find(c => c.controls.req_numero_dias.value == true)
    this.requiere_numero_dias = requiere_num_dias ? true : false;
    if (concepto.data[0] && concepto.data[0].numero_dias) {
      this.controlsConceptos[i].controls.numero_dias.setValidators([Validators.required, this.numberNotZeroValidator(/^[1-9]\d*$/)]);
      this.controlsConceptos[i].controls.numero_dias.updateValueAndValidity();
    } else {
      this.controlsConceptos[i].controls.numero_dias.setValue(0);
      this.controlsConceptos[i].controls.numero_dias.setValidators([]);
      this.controlsConceptos[i].controls.numero_dias.updateValueAndValidity();
    }
  }
  public get controlsMain(): any {
    return this.main_formulario.controls;
  }
  public get controlsConceptos(): any {
    return (this.main_formulario.controls.conceptos as FormArray).controls;
  }

  cambiarEstatusTotalModificado(i) {
    /* if (!this.controlsMain.total_modificado.value) this.controlsMain.total_modificado.setValue(true); */
    // if (this.controlsConceptos[i].controls.monto_rembolsar.value > this.conceptos[i].importe) {
    //   this.controlsConceptos[i].controls.monto_rembolsar.setValue(this.conceptos[i].importe * (this.porcentaje_reembolso / 100));
    // }
    if (this.controlsConceptos[i].controls.monto_rembolsar.value > (this.controlsConceptos[i].controls.importe.value * this.controlsConceptos[i].controls.tipo_cambio.value)) {
      if (this.tipo_gasto == 11) {
        this.controlsConceptos[i].controls.monto_rembolsar.setValue((this.controlsConceptos[i].controls.importe.value * this.controlsConceptos[i].controls.tipo_cambio.value) * this.porcentaje_reembolso);
      } else {
        if (this.controlsConceptos[i].controls.descuento.value > 0) {
          this.controlsConceptos[i].controls.monto_rembolsar.setValue((this.controlsConceptos[i].controls.importe.value * this.controlsConceptos[i].controls.tipo_cambio.value) - this.controlsConceptos[i].controls.descuento.value);
        } else {
          this.controlsConceptos[i].controls.monto_rembolsar.setValue(this.controlsConceptos[i].controls.importe.value * this.controlsConceptos[i].controls.tipo_cambio.value);
        }
      }
    } else if (this.controlsConceptos[i].controls.descuento.value > 0) {
      if (this.controlsConceptos[i].controls.monto_rembolsar.value > ((this.controlsConceptos[i].controls.importe.value * this.controlsConceptos[i].controls.tipo_cambio.value) - this.controlsConceptos[i].controls.descuento.value)) {
        this.controlsConceptos[i].controls.monto_rembolsar.setValue((this.controlsConceptos[i].controls.importe.value * this.controlsConceptos[i].controls.tipo_cambio.value) - this.controlsConceptos[i].controls.descuento.value);
      }
    }
  }

  calcularTotalConcepto(concepto: conceptoAux) {
    let total_retenciones = 0;
    let total_traslados = 0;
    if (concepto.impuestos && concepto.impuestos.retenciones) {
      concepto.impuestos.retenciones.forEach((obj) => {
        total_retenciones = + (obj.importe)
      });
    }
    if (concepto.impuestos && concepto.impuestos.traslados) {
      concepto.impuestos.traslados.forEach((obj) => {
        total_traslados = + (obj.importe)
      });
    }
    return (concepto.importe + total_retenciones + total_traslados - concepto.descuento);
  }
  // calcularMontoReembolsarConcepto(concepto: conceptoAux) {
  //   return (this.calcularTotalConcepto(concepto) * (this.porcentaje_reembolso / 100));
  // }

  calcularTotalComprobanteAplica() {
    let total = 0;
    this.conceptos.map(concepto => {
      if (concepto.aplica) total += this.calcularTotalConcepto(concepto);
    });
    return total;
  }

  validarMontoDisponible() {
    this.conceptos.forEach(concepto => {
      if (concepto.aplica) {
        concepto.aux_porcentaje = this.calcularTotalConcepto(concepto) / this.calcularTotalComprobanteAplica();
        concepto.aux_porcentaje = concepto.aux_porcentaje > 1 ? 1 : concepto.aux_porcentaje;
        return concepto;
      }
    });

    if (this.calcularTotalComprobanteAplica() > this.monto_disponible) {
      this.conceptos.map((concepto, i) => {
        if (concepto.aplica) {
          const monto_rembolar = this.monto_disponible * concepto.aux_porcentaje;
          this.controlsConceptos[i].controls.monto_rembolsar.setValue(monto_rembolar);
          concepto.monto_rembolsar = monto_rembolar;
          if (concepto.monto_rembolsar > (this.calcularTotalConcepto(concepto) * (this.porcentaje_reembolso / 100))) {
            concepto.monto_rermbolsar = this.calcularTotalConcepto(concepto) * (this.porcentaje_reembolso / 100);
          }
        } else {
          concepto.monto_rembolsar = 0;
        }
      });
    };
  }

  onAplicaChange(item, index) {
    this.conceptos[index].aplica = !item.controls.aplica.value;
    this.calcularMontosReembolsables();
  }

  calcularMontoReembolsarConcepto(concepto: conceptoAux, bote_disponible: number, porcentaje_prestacion: number, total_factura: number): number {
    if (concepto.aplica) {
      const total_concepto = this.calcularTotalConcepto(concepto);
      const max_rembolso_concepto = total_concepto * porcentaje_prestacion;
      let porcentaje_rembolsar_concepto = total_factura ? total_concepto / total_factura : 0;
      let monto_rembolsar = porcentaje_rembolsar_concepto * total_factura;
      if (total_factura > bote_disponible) {
        monto_rembolsar = porcentaje_rembolsar_concepto * bote_disponible;
      }
      // if(monto_rembolsar < max_rembolso_concepto) {
      //   monto_rembolsar = porcentaje_rembolsar_concepto * total_factura;
      // }
      if (monto_rembolsar > max_rembolso_concepto) {
        return max_rembolso_concepto;
      }
      return monto_rembolsar;
    }
    return 0;
  }

  modal(modal: string, i: number, item?: any) {
    console.log(item);
    if (modal === 'impuestos') {
      item ? this.impuestos = JSON.parse(JSON.stringify(item)) : this.impuestos = null;
      $('#modal_impuestos').modal('toggle');
    } else if (modal === 'detalle') {
      $('#modal_detalle').modal('toggle');
    } else {
      $('#modal_adicionales').modal('toggle');
    }
  }

  numberNotZeroValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = !nameRe.test(control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }

}
class conceptoAux {
  descripcion: string;
  unidad: string;
  valorUnitario: number;
  cantidad: number;
  concepto: string;
  importe: number;
  monto_rembolsar: number;
  aplica: number;
  comprobante_fiscal: number;
  numero_dias: number;
  descuento: number;
  observacion: string;
  impuestos: {
    retenciones: {
      base: number;
      importe: number;
      importeSpecified: boolean;
      impuesto: string;
      tasaOCuota: string;
      tasaOCuotaSpecified: boolean;
      tipoFactor: string;
    }[];
    traslados: {
      base: number;
      importe: number;
      importeSpecified: boolean;
      impuesto: string;
      tasaOCuota: string;
      tasaOCuotaSpecified: boolean;
      tipoFactor: string;
    }[];
  }
}
