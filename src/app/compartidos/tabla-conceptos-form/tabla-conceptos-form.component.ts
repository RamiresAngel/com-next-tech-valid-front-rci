import { AbstractControl, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-conceptos-form',
  templateUrl: './tabla-conceptos-form.component.html',
  styleUrls: ['./tabla-conceptos-form.component.css']
})
export class TablaConceptosFormComponent implements OnInit {
  @Input() conceptos = new Array<any>();
  @Input() lista_cuentas: any = [];

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
    console.log(this.main_formulario.value);
    console.log(this.main_formulario.valid);

  }

  addFormRow(concepto: conceptoAux) {
    this.controlsMain.conceptos.push(
      new FormGroup({
        descripcion: new FormControl(concepto.descripcion),
        unidad: new FormControl(concepto.unidad),
        valorUnitario: new FormControl(concepto.valorUnitario),
        cantidad: new FormControl(concepto.cantidad),
        importe: new FormControl(concepto.concepto),
        concepto: new FormControl(concepto.importe),
        montoRembolsar: new FormControl(concepto.importe, Validators.required),
      })
    )
  }
  removeFormRow(index: number) {
    this.controlsMain.coneptos.removeAt(index);
  }

  onChangeConcepto(concepto) {
    console.log(concepto);

    // if (concepto.value && concepto.value !== '') {
    //   this.detalle.id_cuenta_agrupacion = concepto.data[0].id_cuenta_agrupacion
    //   this.detalle.concepto = this.detalle.descripcion;
    //   this.detalle.monto = this.detalle.importe;
    //   this.detalle.cuenta = concepto.value;
    //   this.controls.cuenta.setValue(concepto.value);
    // } else {
    //   this.detalle.cuenta = null;
    //   this.controls.cuenta.setValue(null);
    // }
    // this.verificaEstatus();
  }


  public get controlsMain(): any {
    return this.main_formulario.controls;
  }


}


class conceptoAux {
  descripcion: string;
  unidad: string;
  valorUnitario: number;
  cantidad: number;
  concepto: string;
  importe: number;
  montoRembolsar: number;
}
