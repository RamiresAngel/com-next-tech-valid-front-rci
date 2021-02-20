import { AbstractControl, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tabla-conceptos-form',
  templateUrl: './tabla-conceptos-form.component.html',
  styleUrls: ['./tabla-conceptos-form.component.css']
})
export class TablaConceptosFormComponent implements OnInit {
  @Input() conceptos = new Array<any>();
  @Input() lista_cuentas: any = [];
  @Output() onCancelar = new EventEmitter();
  @Output() onAgregar = new EventEmitter();

  main_formulario: FormGroup;
  constructor() {
    this.iniciarFormulario();
  }

  ngOnInit() {
    this.addConceptosToForm();
  }

  iniciarFormulario() {
    this.main_formulario = new FormGroup({
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
      concepto.aplica = form_conceptos[i].aplica;
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
}
