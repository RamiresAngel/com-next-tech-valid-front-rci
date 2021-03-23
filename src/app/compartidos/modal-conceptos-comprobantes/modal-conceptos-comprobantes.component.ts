import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { TipoGastoComprobacion } from './../../entidades/comprobacion';
import { ComprobacionesGastosService } from './../../modulos/comprobaciones-gastos/comprobaciones-gastos.service';
import { ComprobanteRCI, ConceptoComprobanteRCI } from 'src/app/entidades/ComprobanteNacional';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-modal-conceptos-comprobantes',
  templateUrl: './modal-conceptos-comprobantes.component.html',
  styleUrls: ['./modal-conceptos-comprobantes.component.css']
})
export class ModalConceptosComprobantesComponent implements OnInit, OnChanges {
  @Input() comprobante = new ComprobanteRCI();
  lista_cuentas = new Array<TipoGastoComprobacion>();
  main_formulario: FormGroup;
  // lista_cuentas = [];
  constructor(private _comprobacionService: ComprobacionesGastosService) {
    this._comprobacionService.getListaCuentas().subscribe((cuentas) => {
      this.lista_cuentas = cuentas;
    })
  }

  ngOnInit() { }

  ngOnChanges() {
    if (this.comprobante) {
      this.iniciarFormulario();
      this.addConceptosToForm();
    }
  }

  iniciarFormulario() {
    this.main_formulario = new FormGroup({
      conceptos: new FormArray([])
    });
  }

  addConceptosToForm() {
    if (this.comprobante.conceptos) {
      this.comprobante.conceptos.forEach(concepto => {
        this.addFormRow(concepto);
      });
    }
  }

  submitFormulario() {
    const form_conceptos = this.main_formulario.controls['conceptos'].value;
    this.comprobante.conceptos = this.comprobante.conceptos.map((concepto, i) => {
      concepto.monto_rembolsar = form_conceptos[i].monto_rembolsar;
      concepto.aplica = form_conceptos[i].aplica;
      concepto.comprobante_fiscal = form_conceptos[i].comprobante_fiscal;
      concepto.observacion = form_conceptos[i].observacion;
      concepto.concepto = form_conceptos[i].concepto;
      return concepto;
    });
    console.log(this.comprobante);
    /* this.onAgregar.emit(this.comprobante); */
  }

  addFormRow(concepto: ConceptoComprobanteRCI) {
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

  cerrarModalConceptos() {
    $('#modal_conceptos').modal('hide');
    this.comprobante = new ComprobanteRCI();
  }

  abrirDocumentoNuevaPestana(url: string) {
    window.open(url, '_blank');
  }

}
