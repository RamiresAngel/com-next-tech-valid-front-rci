import { ImpuestoComprobanteRCI } from './../../entidades/ComprobanteNacional';
import { forEach } from '@angular/router/src/utils/collection';
import { BandejaAprobacionService } from './../../modulos/bandeja-aprobacion/bandeja-aprobacion.service';
import { AprobacionParcial } from './../../entidades/AprobacionParcial';
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
  @Output() onGuardarConceptos = new EventEmitter();
  @Output() onGuardarPDF = new EventEmitter();
  @Input() lista_cuentas = new Array<TipoGastoComprobacion>();
  @Input() comprobante = new ComprobanteRCI();
  @Input() aprobacion_parcial = new AprobacionParcial();
  @Input() lista_forma_pago = [];
  @Input() tipo_gasto: number;
  @Input() identificador_corporativo: string;
  main_formulario: FormGroup;


  datos_aprobacion: { nivel_aproacion: number, is_aprobacion: boolean }
  lista_impuestos: ImpuestoComprobanteRCI;
  constructor(private _bandejaAprobacionService: BandejaAprobacionService) {
    this.datos_aprobacion = this._bandejaAprobacionService.datos_aprobacion;
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    localStorage.removeItem('doc_aprobacion_parcial');
  }

  iniciarFormulario() {
    this.main_formulario = new FormGroup({
      forma_pago_id: new FormControl('', Validators.required),
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
    this.comprobante.forma_pago_id = Number(this.comprobante.forma_pago_id);
    this.onGuardarConceptos.emit(this.comprobante)
  }

  addFormRow(concepto: ConceptoComprobanteRCI) {
    this.controlsMain.conceptos.push(
      new FormGroup({
        checked: new FormControl(concepto.checked),
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
    this.controlsConceptos[i].controls.id_cuenta_agrupacion.setValue(concepto.value !== '0' ? Number(concepto.value) : null);
  }
  onChangeConceptoComprobante(concepto) {
    this.controlsConceptos.forEach(control => {
      control.controls.id_cuenta_agrupacion.setValue(concepto.value !== '0' ? Number(concepto.value) : null);
    });
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
    if (this.controlsConceptos[i].controls.monto_rembolsar.value > (this.comprobante.conceptos[i].importe * this.comprobante.conceptos[i].tipo_cambio)) {
      this.controlsConceptos[i].controls.monto_rembolsar.setValue(this.comprobante.conceptos[i].importe * this.comprobante.conceptos[i].tipo_cambio);
    }
  }

  onChangeChecked(input: HTMLInputElement, index: number) {
    this.comprobante.conceptos[index].checked = input.checked;
    const index_in_aprobacion_parcial = this.aprobacion_parcial.documentos.findIndex(doc => doc.preliminar_id == this.comprobante.conceptos[index].id);
    this.aprobacion_parcial.documentos[index_in_aprobacion_parcial].seleccionado = input.checked;
  }

  mostrarImpuestosModal(concepto: ConceptoComprobanteRCI) {
    this.lista_impuestos = concepto.impuestos;
    $('#modal_impuestos').modal('show');
  }
  onActualizarPDFClicked() {
    $('#id_modal').modal('show');
  }

  onActualizarDocumento() {
    this.onGuardarPDF.emit();
    this.cerrarModalConceptos();
  }

  getCanEdit(): boolean {
    return this.comprobante.estatus.toLowerCase() !== 'borrador' && this.comprobante.estatus.toLowerCase() !== 'solicitud de cambios' && this.datos_aprobacion.nivel_aproacion !== 2;
  }

}
