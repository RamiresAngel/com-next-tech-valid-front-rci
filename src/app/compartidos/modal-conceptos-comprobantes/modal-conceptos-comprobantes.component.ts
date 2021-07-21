import { ImpuestoComprobanteRCI } from './../../entidades/ComprobanteNacional';
import { forEach } from '@angular/router/src/utils/collection';
import { BandejaAprobacionService } from './../../modulos/bandeja-aprobacion/bandeja-aprobacion.service';
import { AprobacionParcial } from './../../entidades/AprobacionParcial';
import { TipoGastoComprobacion } from './../../entidades/comprobacion';
import { ComprobanteRCI, ConceptoComprobanteRCI } from 'src/app/entidades/ComprobanteNacional';
import { Component, Input, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Output } from '@angular/core';
import { ComprobacionesGastosService } from 'src/app/modulos/comprobaciones-gastos/comprobaciones-gastos.service';
import { StorageService } from '../login/storage.service';
import { Usuario } from 'src/app/entidades';
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
  @Input() lista_monedas = [];
  @Input() tipo_gasto: number;
  @Input() is_reporte;
  @Input() identificador_corporativo: string;
  main_formulario: FormGroup;
  @Input() porcentaje_reembolso = 100;
  public monto_disponible;
  usuario: Usuario;


  datos_aprobacion: { nivel_aproacion: number, is_aprobacion: boolean }
  lista_impuestos: ImpuestoComprobanteRCI;
  constructor(private _bandejaAprobacionService: BandejaAprobacionService
    , private _comprobacionService: ComprobacionesGastosService
    , private _storageService: StorageService
  ) {
    this.usuario = this._storageService.getDatosIniciales().usuario;
    this.datos_aprobacion = this._bandejaAprobacionService.datos_aprobacion;
  }

  ngOnInit() {
    /*    this._comprobacionService.getListaCuentas().subscribe((cuentas) => {
         this.lista_cuentas = cuentas;
       }); */
    $('#modal_conceptos').on('hidden.bs.modal', (e) => {
      this.comprobante = new ComprobanteRCI();
    })
  }

  async ngOnChanges() {
    console.log(this.comprobante);
    if (this.comprobante) {
      if (this.comprobante.conceptos.length > 0) {
        await this.obtenerSaldoDisponible(this.comprobante.conceptos[0].id_cuenta_agrupacion);
      }
      this.iniciarFormulario();
      this.addConceptosToForm();
    }
  }

  async obtenerSaldoDisponible(prestacion_id) {

    // Validar
    if (this.comprobante && this.comprobante.identificador_usuario) {
      this._comprobacionService.getMontosDisponibles(prestacion_id, this.comprobante.identificador_usuario).subscribe((data: any) => {
        this.monto_disponible = data.data;
        // this.totales.concepto_seleccionado = true;
        if (this.tipo_gasto === 11) {
          this.calcularMontosReembolsables();
        }
      })
    } else {
      this._comprobacionService.getMontosDisponibles(prestacion_id, this.usuario.identificador_usuario).subscribe((data: any) => {
        this.monto_disponible = data.data;
        // this.totales.concepto_seleccionado = true;
        if (this.tipo_gasto === 11) {
          this.calcularMontosReembolsables();
        }
      })
    }

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    localStorage.removeItem('doc_aprobacion_parcial');
  }

  iniciarFormulario() {
    this.main_formulario = new FormGroup({
      forma_pago_id: new FormControl({ value: '', disabled: this.tipo_gasto == 11 || this.tipo_gasto == 2 }, Validators.required),
      conceptos: new FormArray([]),
      moneda: new FormControl()
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
      concepto.tipo_cambio = form_conceptos[i].tipo_cambio;
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
        descuento: new FormControl(concepto.descuento),
        unidad: new FormControl(concepto.unidad),
        valorUnitario: new FormControl(concepto.valorUnitario),
        cantidad: new FormControl(concepto.cantidad),
        // importe: new FormControl(concepto.importe),
        importe: new FormControl(this.tipo_gasto == 11 ? this.calcularTotalConcepto(concepto) : concepto.importe),
        concepto: new FormControl(concepto.concepto, Validators.required),
        id_cuenta_agrupacion: new FormControl(concepto.id_cuenta_agrupacion, Validators.required),
        monto_rembolsar: new FormControl(concepto.monto_rembolsar, Validators.required),
        tipo_cambio: new FormControl(concepto.tipo_cambio, Validators.required),
        aplica: new FormControl(concepto.aplica),
        comprobante_fiscal: new FormControl(concepto.comprobante_fiscal),
        // observacion: new FormControl(concepto.observacion),
      })
    )
  }

  calcularTotalConcepto(concepto: ConceptoComprobanteRCI) {
    let total_retenciones = 0;
    let total_traslados = 0;

    if (concepto.impuestos && concepto.impuestos.retenciones) {
      concepto.impuestos.retenciones.forEach((obj) => {
        total_retenciones = + (obj.importe)
      });
    }

    if (concepto.impuestos && concepto.impuestos.traslados) {
      concepto.impuestos.traslados.forEach((obj) => {
        total_traslados = + (obj.importe)
      });
    }
    return (concepto.importe + total_retenciones + total_traslados - concepto.descuento);
  }

  removeFormRow(index: number) {
    this.controlsMain.coneptos.removeAt(index);
  }

  onChangeConcepto(concepto, i) {
    this.comprobante.conceptos[i].id_cuenta_agrupacion = concepto.value !== '0' ? Number(concepto.value) : null;
    this.controlsConceptos[i].controls.id_cuenta_agrupacion.setValue(concepto.value !== '0' ? Number(concepto.value) : null);
  }
  async onChangeConceptoComprobante(concepto) {
    if (concepto.value && concepto.data.length > 0) {
      this.porcentaje_reembolso = Number(concepto.data[0].porcentaje_reembolsable);
      this.controlsConceptos.forEach(control => {
        control.controls.id_cuenta_agrupacion.setValue(concepto.value !== '0' ? Number(concepto.value) : null);
      });
      if (concepto.value !== '0') {
        this.obtenerSaldoDisponible(concepto.value);
      }
    }
  }

  calcularMontosReembolsables() {
    console.log('Entro');
    this.controlsConceptos.forEach((form, i) => {
      form.controls.monto_rembolsar.setValue(this.calcularMontoReembolsarConcepto(this.comprobante.conceptos[i], this.monto_disponible, (this.porcentaje_reembolso / 100), this.calcularTotalComprobanteAplica()));
    });
  }

  calcularTotalComprobanteAplica() {
    let total = 0;
    this.comprobante.conceptos.map(concepto => {
      if (concepto.aplica) total += this.calcularTotalConcepto(concepto);
    });
    return total;
  }

  calcularMontoReembolsarConcepto(concepto, bote_disponible: number, porcentaje_prestacion: number, total_factura: number): number {
    if (concepto.aplica) {
      const total_concepto = this.calcularTotalConcepto(concepto);
      const max_rembolso_concepto = total_concepto * porcentaje_prestacion;
      let porcentaje_rembolsar_concepto = total_factura ? total_concepto / total_factura : 0;
      let monto_rembolsar = porcentaje_rembolsar_concepto * total_factura;
      if (total_factura > bote_disponible) {
        monto_rembolsar = porcentaje_rembolsar_concepto * bote_disponible;
      }
      // if(monto_rembolsar < max_rembolso_concepto) {
      //   monto_rembolsar = porcentaje_rembolsar_concepto * total_factura;
      // }
      if (monto_rembolsar > max_rembolso_concepto) {
        return max_rembolso_concepto;
      }
      return monto_rembolsar;
    }
    return 0;
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
    // if (this.controlsConceptos[i].controls.monto_rembolsar.value > (this.comprobante.conceptos[i].importe * this.comprobante.conceptos[i].tipo_cambio)) {
    //   this.controlsConceptos[i].controls.monto_rembolsar.setValue(this.comprobante.conceptos[i].importe * this.comprobante.conceptos[i].tipo_cambio);
    // }
    if (this.controlsConceptos[i].controls.monto_rembolsar.value > (this.controlsConceptos[i].controls.importe.value * this.controlsConceptos[i].controls.tipo_cambio.value)) {
      if (this.tipo_gasto == 11) {
        if (this.monto_disponible === 0) {
          this.controlsConceptos[i].controls.monto_rembolsar.setValue(0);
        } else {
          this.controlsConceptos[i].controls.monto_rembolsar.setValue((this.controlsConceptos[i].controls.importe.value * this.controlsConceptos[i].controls.tipo_cambio.value) * (this.porcentaje_reembolso / 100));
        }
      } else {
        if (this.controlsConceptos[i].controls.descuento.value > 0) {
          this.controlsConceptos[i].controls.monto_rembolsar.setValue((this.controlsConceptos[i].controls.importe.value * this.controlsConceptos[i].controls.tipo_cambio.value) - this.controlsConceptos[i].controls.descuento.value);
        } else {
          this.controlsConceptos[i].controls.monto_rembolsar.setValue(this.controlsConceptos[i].controls.importe.value * this.controlsConceptos[i].controls.tipo_cambio.value);
        }
      }
    } else if (this.controlsConceptos[i].controls.descuento.value > 0) {
      if (this.controlsConceptos[i].controls.monto_rembolsar.value > ((this.controlsConceptos[i].controls.importe.value * this.controlsConceptos[i].controls.tipo_cambio.value) - this.controlsConceptos[i].controls.descuento.value)) {
        this.controlsConceptos[i].controls.monto_rembolsar.setValue((this.controlsConceptos[i].controls.importe.value * this.controlsConceptos[i].controls.tipo_cambio.value) - this.controlsConceptos[i].controls.descuento.value);
      }
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
    return this.comprobante.estatus.toLowerCase() !== 'borrador'
      &&
      this.comprobante.estatus.toLowerCase() !== 'solicitud de cambios'
      &&
      (

        (this.tipo_gasto !== 11)
        ||
        (this.datos_aprobacion.nivel_aproacion === 3 && this.tipo_gasto !== 11)
        ||
        (this.datos_aprobacion.nivel_aproacion === 1 && this.tipo_gasto !== 11)
        ||
        (this.datos_aprobacion.nivel_aproacion === null)
      )
      &&
      (
        this.datos_aprobacion.nivel_aproacion !== 2
      )

      ;
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
  comprobante_fiscal: number;
  numero_dias: number;
  descuento: number;
  observacion: string;
  impuestos: {
    retenciones: {
      base: number;
      importe: number;
      importeSpecified: boolean;
      impuesto: string;
      tasaOCuota: string;
      tasaOCuotaSpecified: boolean;
      tipoFactor: string;
    }[];
    traslados: {
      base: number;
      importe: number;
      importeSpecified: boolean;
      impuesto: string;
      tasaOCuota: string;
      tasaOCuotaSpecified: boolean;
      tipoFactor: string;
    }[];
  }
}
