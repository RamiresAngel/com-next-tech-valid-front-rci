import { TipoGastoComprobacion } from './../../entidades/comprobacion';
import { ComprobacionesGastosService } from './../../modulos/comprobaciones-gastos/comprobaciones-gastos.service';
import { ComprobanteRCI, ConceptoComprobanteRCI } from 'src/app/entidades/ComprobanteNacional';
import { Component, Input, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Output } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-modal-conceptos-comprobantes',
  templateUrl: './modal-conceptos-comprobantes.component.html',
  styleUrls: ['./modal-conceptos-comprobantes.component.css']
})
export class ModalConceptosComprobantesComponent implements OnInit, OnChanges {
  @Input() comprobante = new ComprobanteRCI();
  @Output() onGuardarConceptos = new EventEmitter();
  @Input() lista_cuentas = new Array<TipoGastoComprobacion>();
  main_formulario: FormGroup;
  // lista_cuentas = [];
  constructor(private _comprobacionService: ComprobacionesGastosService) {
  }

  ngOnInit() {
    /*    this._comprobacionService.getListaCuentas().subscribe((cuentas) => {
         this.lista_cuentas = cuentas;
       }); */
  }

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
      concepto.aplica = form_conceptos[i].aplica ? 1 : 0;
      concepto.comprobante_fiscal = form_conceptos[i].comprobante_fiscal ? 1 : 0;
      // concepto.observacion = form_conceptos[i].observacion;
      concepto.concepto = form_conceptos[i].concepto;
      concepto.id_cuenta_agrupacion = form_conceptos[i].id_cuenta_agrupacion;
      return concepto;
    });
    this.onGuardarConceptos.emit(this.comprobante.conceptos)
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
        id_cuenta_agrupacion: new FormControl(concepto.id_cuenta_agrupacion, Validators.required),
        monto_rembolsar: new FormControl(concepto.monto_rembolsar, Validators.required),
        aplica: new FormControl(concepto.aplica),
        comprobante_fiscal: new FormControl(concepto.comprobante_fiscal),
        // observacion: new FormControl(concepto.observacion),
      })
    )
  }

  removeFormRow(index: number) {
    this.controlsMain.coneptos.removeAt(index);
  }

  onChangeConcepto(concepto, i) {
    console.log(this.controlsConceptos[i].controls);
    this.controlsConceptos[i].controls.id_cuenta_agrupacion.setValue(concepto.value !== '0' ? Number(concepto.value) : null);
  }

  public get controlsMain(): any {
    return this.main_formulario.controls;
  }

  public get controlsConceptos(): any {
    return (this.main_formulario.controls.conceptos as FormArray).controls;
  }

  cerrarModalConceptos() {
    this.comprobante = new ComprobanteRCI();
    $('#modal_conceptos').modal('hide');
  }

  abrirDocumentoNuevaPestana(url: string) {
    window.open(url, '_blank');
  }
  cambiarEstatusTotalModificado(i) {
    /* if (!this.controlsMain.total_modificado.value) this.controlsMain.total_modificado.setValue(true); */
    if (this.controlsConceptos[i].controls.monto_rembolsar.value > this.comprobante.conceptos[i].importe) {
      this.controlsConceptos[i].controls.monto_rembolsar.setValue(this.comprobante.conceptos[i].importe);
    }
  }

}
