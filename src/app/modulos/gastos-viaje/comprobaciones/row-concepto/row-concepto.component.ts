import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConceptoFactura } from 'src/app/entidades/ConceptoFactura';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-row-concepto',
  templateUrl: './row-concepto.component.html',
  styleUrls: ['./row-concepto.component.css']
})
export class RowConceptoComponent implements OnInit {
  // Inputs
  @Input() detalle: any;
  @Input() catalogo_concepto: any[];
  @Input() cuenta: any = '0000000';
  @Input() contador: number;
  @Output() validarEstatus = new EventEmitter();

  pago_compania = false;

  formulario_row: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  public get controls() { return this.formulario_row.controls; }

  ngOnInit() {
    console.log(this.detalle);

    this.formulario_row = this.formBuilder.group({
      detalle: [this.detalle ? this.detalle.detalle : null, Validators.required],
      concepto: [this.detalle ? this.detalle.descripcion : null, Validators.required],
      cuenta: [this.detalle ? this.detalle.cuenta : null, Validators.required],
      monto: [this.detalle ? this.detalle.monto : '', Validators.required],
      pago_compania: [this.detalle.pago_compania],
      anticipo: [this.detalle ? this.detalle.anticipo : false]
    });
  }

  cambiarCheck(data) {
    this.controls.pago_compania.setValue(data.checked);
    this.controls.anticipo.setValue(data.checked);
  }

  onChangeConcepto(concepto) {

    if (concepto.value && concepto.value !== '') {
      this.detalle.id_cuenta_agrupacion = concepto.data[0].id_cuenta_agrupacion
      this.detalle.concepto = this.detalle.descripcion;
      this.detalle.monto = this.detalle.importe;
      this.detalle.cuenta = concepto.value;
      this.controls.cuenta.setValue(concepto.value);
    } else {
      this.detalle.cuenta = null;
      this.controls.cuenta.setValue(null);
    }
    this.verificaEstatus();
  }

  verificaEstatus() {
    this.detalle.valido = this.formulario_row.valid;
    this.validarEstatus.emit();
  }

}
