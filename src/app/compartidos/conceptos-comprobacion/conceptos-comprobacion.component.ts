import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-conceptos-comprobacion',
  templateUrl: './conceptos-comprobacion.component.html',
  styleUrls: ['./conceptos-comprobacion.component.css']
})
export class ConceptosComprobacionComponent implements OnInit {
  @Input() lista_conceptos = new Array();
  formularioConceptos: FormGroup;

  constructor() {
    this.formularioConceptos = new FormGroup({
      cantidad: new FormControl(null, Validators.required),
      concepto: new FormControl('', Validators.required),
      unidad: new FormControl('', Validators.required),
      monto: new FormControl(0, Validators.required)
    });
  }

  ngOnInit() {
  }



  addConcepto(concepto) {
    this.lista_conceptos.push(concepto);
    this.formularioConceptos.reset();
  }
  eliminarItem(index: number) {
    this.lista_conceptos.splice(index, 1)
  }
}
