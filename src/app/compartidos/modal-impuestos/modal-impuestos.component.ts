import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-modal-impuestos',
  templateUrl: './modal-impuestos.component.html',
  styleUrls: ['./modal-impuestos.component.css']
})
export class ModalImpuestosComponent implements OnInit {

  /* elementos compartidos */
  main_formulario: FormGroup
  public conceptos = new Array<any>();

  constructor() {
    this.iniciarFormulario();
  }

  ngOnInit() { }

  ngOnChanges(): void {
  }

  cerrarModalDetalle() {
    $('#modal_impuestos').modal('hide');
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

  addFormRow(concepto: conceptoAux) {
    this.controlsMain.conceptos.push(
      new FormGroup({
        id: new FormControl(concepto.id),
        linea: new FormControl(concepto.linea),
        id_impuesto: new FormControl(concepto.id_impuesto),
        tipo: new FormControl(concepto.tipo),
        tasa: new FormControl(concepto.tasa),
        importe_original: new FormControl(concepto.importe_original),
        retencion: new FormControl(concepto.retencion),
        local: new FormControl(concepto.local),
        importe_asignado: new FormControl(concepto.importe_asignado),
        total_restante: new FormControl(concepto.total_restante),
        asignar: new FormControl(concepto.asignar),
        asignar_tipo: new FormControl(concepto.asignar_tipo),
      })
    )
  }

  public get controlsMain(): any {
    return this.main_formulario.controls;
  }

}
class conceptoAux {
  id: number;
  linea: number;
  id_impuesto: number;
  tipo: string;
  tasa: string;
  importe_original: number;
  retencion: string;
  local: string;
  importe_asignado: number
  total_restante: number;
  asignar: number
  asignar_tipo: string;
}
