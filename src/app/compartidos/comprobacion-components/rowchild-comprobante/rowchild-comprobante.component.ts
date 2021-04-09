import Swal from 'sweetalert2';
import { Component, Input, OnInit, Output, OnChanges, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { TipoGastoComprobacion } from 'src/app/entidades/comprobacion';
import { ComprobanteRCI, ConceptoComprobanteRCI } from 'src/app/entidades/ComprobanteNacional';
import { AprobacionParcialConcepto } from 'src/app/entidades';

@Component({
  selector: 'app-rowchild-comprobante',
  templateUrl: './rowchild-comprobante.component.html',
  styleUrls: ['./rowchild-comprobante.component.css']
})
export class RowchildComprobanteComponent {
  @Input() visible: boolean;
  @Input() comprobante: ComprobanteRCI;
  @Input() lista_cuentas = new Array<TipoGastoComprobacion>();
  @Output() OnChangeCheckConcepto = new EventEmitter<AprobacionParcialConcepto>();

  main_formulario: FormGroup;
  is_all_checked: boolean = true;

  constructor() { }

  ngOnChanges() {
    if (this.comprobante) {
      // this.comprobante.conceptos.map(concepto => { concepto.checked = true; return concepto })
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

  async aprobarSeleccionados() {

    const response = await Swal.fire({
      title: '',
      text: "¿Está seguro de querer terminar la aprobación?, los elementos no seleccionados serán rechazados.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Aprobar',
      cancelButtonText: 'No, Cancelar'
    });
    if (response.value) {
      console.log(this.comprobante.conceptos.filter(x => x.checked == true));
    }
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
        checked: new FormControl(concepto.checked),
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

  abrirDocumentoNuevaPestana(url: string) {
    window.open(url, '_blank');
  }
  cambiarEstatusTotalModificado(i) {
    /* if (!this.controlsMain.total_modificado.value) this.controlsMain.total_modificado.setValue(true); */
    if (this.controlsConceptos[i].controls.monto_rembolsar.value > this.comprobante.conceptos[i].importe) {
      this.controlsConceptos[i].controls.monto_rembolsar.setValue(this.comprobante.conceptos[i].importe);
    }
  }

  onCheckConcept(input: HTMLInputElement, conceptoChecked: ConceptoComprobanteRCI) {
    let concepto = new AprobacionParcialConcepto();
    concepto.aprobado = input.checked;
    concepto.preliminar_detalle_id = conceptoChecked.id;
    concepto.comentario = "";
    this.OnChangeCheckConcepto.emit(concepto);
  }

  onCheckAll() {
    const contieneCheckeado = this.comprobante.conceptos.find(x => x.checked == true) ? true : false;
    const contieneSinCheckear = this.comprobante.conceptos.find(x => x.checked == false) ? true : false;
    if (contieneCheckeado && contieneSinCheckear) this.toggleAllChecked(true);
    else if (contieneCheckeado && !contieneSinCheckear) this.toggleAllChecked(false);
    else if (!contieneCheckeado && contieneSinCheckear) this.toggleAllChecked(true);
    else if (!contieneCheckeado && !contieneSinCheckear) this.toggleAllChecked(true);
  }

  toggleAllChecked(checked: boolean) {
    this.is_all_checked = checked;
    this.comprobante.conceptos.map(concepto => {
      concepto.checked = checked;
      return concepto;
    })
  }
}
