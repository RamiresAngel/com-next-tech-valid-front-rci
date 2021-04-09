import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Impuesto, ItemDocumentoRD, ItemCodigoRecepcion } from 'src/app/entidades';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ImpuestoItemDocumentoRD } from 'src/app/entidades/ItemDocumentoRD';
import { ConceptoCargaDocumentos, Totales } from 'src/app/modulos/carga-documentos/models';
import { ImpuestoConcepto } from 'src/app/modulos/carga-documentos/models/concepto.models';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as CargaDocumentosActions from 'src/app/modulos/carga-documentos/carga-dcoumentos.actions';
import { CDState } from 'src/app/modulos/carga-documentos/carga-documentos.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-row-conceptos-factura-proveedor-rd',
  templateUrl: './row-conceptos-factura-proveedor-rd.component.html',
  styleUrls: ['./row-conceptos-factura-proveedor-rd.component.css']
})
export class RowConceptosFacturaProveedorRdComponent implements OnInit {
  @Input() disableInputs: boolean;
  @Input() lista_impuestos = new Array<Impuesto>();
  @Input() concepto = new ConceptoCargaDocumentos();
  @Output() addItem = new EventEmitter();

  @Input() item_documento = new ItemDocumentoRD();

  subscripcion: Subscription;
  store_conceptos = new Array<ConceptoCargaDocumentos>();

  // Nuevos elementos
  public item_documento_gasto = new ConceptoCargaDocumentos();
  public impuesto_seleccionado = new ImpuestoItemDocumentoRD();


  formulario: FormGroup;

  constructor(private store: Store<AppState>) {
    this.formulario = new FormGroup({
      cantidad: new FormControl({ value: this.concepto.cantidad, disabled: true }, Validators.required),
      concepto: new FormControl({ value: this.concepto.concepto, disabled: true }, Validators.required),
      precio_unitario: new FormControl({ value: this.concepto.valor_unitario, disabled: true }, Validators.required),
      impuesto: new FormControl(this.concepto.impuestos, Validators.required),
      monto_impuesto: new FormControl({ value: this.concepto.monto_impuesto, disabled: true }, Validators.required),
      importe: new FormControl({ value: this.concepto.importe, disabled: true }, Validators.required),
    });
  }

  ngOnInit() {
    this.subscripcion = this.store.select('CargaDocumentos').subscribe((store: CDState) => {
      this.store_conceptos = store.conceptos;
    })
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  onImpuestoSelected(data) {
    const impuesto = data && data.data && data.data[0].id != "0" ? data.data[0] : null;
    this.concepto.impuestos.length = 0;
    if (impuesto) {
      const obj = new ImpuestoConcepto();
      obj.clave = impuesto.clave;
      obj.tasa = Number(impuesto.tasa);
      obj.local = 0;
      obj.importe = 0;
      obj.impuesto_id = impuesto.id_id;
      this.impuesto_seleccionado = impuesto;
      this.concepto.impuestos.push(obj);
      this.controles.impuesto.setValue(impuesto.id);
      this.calcularTotal();
    } else {
      this.controles.impuesto.setValue(null);
      this.calcularTotal();
    }

    // if (impuesto.value !== '0' && impuesto.data.length > 0) {
    // }
    // this.item_documento_gasto.impuestos.push() = this.impuesto_seleccionado.id;
  }

  calcularTotal() {
    if (this.impuesto_seleccionado && this.impuesto_seleccionado.tasa && this.concepto) {
      this.concepto.monto_impuesto = this.impuesto_seleccionado.tasa * this.concepto.valor_unitario * this.concepto.cantidad;
      this.concepto.importe = this.concepto.cantidad && this.concepto.valor_unitario ? this.concepto.cantidad * this.concepto.valor_unitario : 0;
      this.agregarItem();
      this.store.dispatch(new CargaDocumentosActions.UpdateConcepto(this.concepto));
      this.calcularTotales();
    }
  }

  calcularTotales() {
    let subtotal = 0;
    let total = 0;
    let total_impuestos = 0;
    this.store_conceptos.forEach(concepto => {
      subtotal = subtotal + Number(concepto.valor_unitario) * Number(concepto.cantidad);
      total_impuestos = total_impuestos + Number(concepto.monto_impuesto);
    });
    const totals = new Totales();
    totals.total = subtotal + total_impuestos;
    totals.total_impuestos = total_impuestos;
    totals.subtotal = subtotal;
    this.store.dispatch(new CargaDocumentosActions.AddTotales(totals));
  }

  agregarItem() {
    this.addItem.emit(this.item_documento_gasto);
  }

  get controles(): { [key: string]: AbstractControl } {
    return this.formulario.controls;
  }

  limpiarImpuestos() {
    const lista_impuestos = [...this.lista_impuestos];
    this.lista_impuestos.length = 0;
    setTimeout(() => {
      this.lista_impuestos = lista_impuestos;
    }, 200);
  }
  limpiarItem() {
    this.item_documento_gasto = new ConceptoCargaDocumentos();
    this.limpiarImpuestos();
  }

}
