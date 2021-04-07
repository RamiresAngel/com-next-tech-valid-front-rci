import { AbstractControl, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
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
  @Output() onCancelar = new EventEmitter();
  @Output() onAgregar = new EventEmitter();
  impuestos;

  main_formulario: FormGroup;
  constructor() {
    this.iniciarFormulario();
  }

  ngOnInit() {
    this.addConceptosToForm();
  }

  ngOnChanges(): void {
    this.main_formulario.controls['forma_pago'].setValue(this.forma_pago);
  }

  iniciarFormulario() {
    this.main_formulario = new FormGroup({
      forma_pago: new FormControl('', Validators.required),
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
      concepto.observacion = form_conceptos[i].observacion;
      concepto.concepto = form_conceptos[i].concepto;
      return concepto;
    });
    this.onAgregar.emit(this.conceptos);
  }

  addFormRow(concepto: conceptoAux) {
    this.controlsMain.conceptos.push(
      new FormGroup({
        descripcion: new FormControl(concepto.descripcion),
        unidad: new FormControl(concepto.unidad),
        valorUnitario: new FormControl(concepto.valorUnitario),
        cantidad: new FormControl(concepto.cantidad),
        importe: new FormControl(concepto.importe),
        concepto: new FormControl(concepto.concepto, Validators.required),
        monto_rembolsar: new FormControl(concepto.importe, Validators.required),
        aplica: new FormControl(concepto.aplica, Validators.required),
        comprobante_fiscal: new FormControl(concepto.comprobante_fiscal),
        observacion: new FormControl(concepto.observacion),
      })
    )
  }
  removeFormRow(index: number) {
    this.controlsMain.coneptos.removeAt(index);
  }

  onChangeConcepto(concepto, i) {
    console.log(this.controlsConceptos[i].controls);
    this.controlsConceptos[i].controls.concepto.setValue(concepto.value !== '0' ? concepto.value : null);
  }
  public get controlsMain(): any {
    return this.main_formulario.controls;
  }
  public get controlsConceptos(): any {
    return (this.main_formulario.controls.conceptos as FormArray).controls;
  }

  cambiarEstatusTotalModificado(i) {
    /* if (!this.controlsMain.total_modificado.value) this.controlsMain.total_modificado.setValue(true); */
    if (this.controlsConceptos[i].controls.monto_rembolsar.value > this.conceptos[i].importe) {
      this.controlsConceptos[i].controls.monto_rembolsar.setValue(this.conceptos[i].importe);
    }
  }

  modal(modal: string, i: number, item?: any) {
    console.log(i);
    console.log(item);
    if (modal === 'impuestos') {
      item ? this.impuestos = item : this.impuestos = null;
      $('#modal_impuestos').modal('toggle');
    } else if (modal === 'detalle') {
      $('#modal_detalle').modal('toggle');
    } else {
      $('#modal_adicionales').modal('toggle');
    }
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
  observacion: string;
}
