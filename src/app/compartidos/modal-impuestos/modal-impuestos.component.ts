import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ImpuestoComprobanteRCI } from 'src/app/entidades/ComprobanteNacional';
declare var $: any;

@Component({
  selector: 'app-modal-impuestos',
  templateUrl: './modal-impuestos.component.html',
  styleUrls: ['./modal-impuestos.component.css']
})
export class ModalImpuestosComponent implements OnChanges {

  /* elementos compartidos */
  main_formulario: FormGroup
  public conceptos = new Array<any>();
  public impuesto_linea
  public list_impuestos = {
    '001': 'ISR',
    '002': 'IVA',
    '003': 'IEPS',
  }

  @Input() impuestos: ImpuestoComprobanteRCI;
  lista_impuestos;
  constructor() {
    this.iniciarFormulario();
  }

  ngOnChanges(): void {
    console.log(this.impuestos);
    if (this.impuestos) {
      this.lista_impuestos = new Array<any>();
      this.impuestos.traslados = this.impuestos.traslados ? this.impuestos.traslados.map(x => { x.type = 'Traslados'; x.tasaOCuota = x.tasaOCuota; return x }) : [];
      this.impuestos.retenciones = this.impuestos.retenciones ? this.impuestos.retenciones.map(x => { x.type = 'Retenciones'; x.tasaOCuota = x.tasaOCuota; return x }) : [];
      if (this.impuestos.trasladosLocales) {
        this.impuestos.trasladosLocales = this.impuestos.trasladosLocales ? this.impuestos.trasladosLocales.map((x) => {
          x.type = 'Impuestos Locales';
          x.tasaOCuota = x.tasadeTraslado;
          x.tipoFactor = ' ';
          x.impuesto = x.impLocTrasladado;
          return x;
        }) : [];
        this.lista_impuestos.push(...this.impuestos.trasladosLocales);
      }
      this.lista_impuestos.push(...this.impuestos.traslados);
      this.lista_impuestos.push(...this.impuestos.retenciones);
    }
  }

  onChangeConcepto(concepto, i) {
    this.controlsConceptos[i].controls.concepto.setValue(concepto.value !== '0' ? concepto.value : null);
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

  enviarImpuesto() {
    const form_conceptos = this.main_formulario.controls['conceptos'].value;
    this.conceptos = this.conceptos.map((concepto, i) => {
      concepto.importe_asignado = form_conceptos[i].importe_asignado;
      concepto.asignar_tipo = form_conceptos[i].asignar_tipo;
      concepto.concepto = form_conceptos[i].concepto;
      return concepto;
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
  public get controlsConceptos(): any {
    return (this.main_formulario.controls.conceptos as FormArray).controls;
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
