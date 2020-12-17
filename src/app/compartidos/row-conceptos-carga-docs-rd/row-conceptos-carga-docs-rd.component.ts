import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Impuesto, ItemDocumentoRD, ItemCodigoRecepcion } from 'src/app/entidades';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ImpuestoItemDocumentoRD } from 'src/app/entidades/ItemDocumentoRD';

@Component({
  selector: 'app-row-conceptos-carga-docs-rd',
  templateUrl: './row-conceptos-carga-docs-rd.component.html',
  styleUrls: ['./row-conceptos-carga-docs-rd.component.css']
})
export class RowConceptosCargaDocsRdComponent implements OnInit {
  @Input() disableInputs: boolean;
  @Input() lista_impuestos = new Array<Impuesto>();
  @Input() concepto = new ItemCodigoRecepcion();
  @Input() item_documento = new ItemDocumentoRD();
  @Output() addItem = new EventEmitter();

  btn_add_item: HTMLButtonElement;

  // Nuevos elementos
  public item_documento_gasto = new ItemDocumentoRD();
  public impuesto_seleccionado = new ImpuestoItemDocumentoRD();


  formulario: FormGroup;

  constructor() {
    this.formulario = new FormGroup({
      cantidad: new FormControl({ value: this.item_documento_gasto.cantidad }, Validators.required),
      concepto: new FormControl({ value: this.item_documento_gasto.concepto }, Validators.required),
      precio_unitario: new FormControl({ value: this.item_documento_gasto.valor_unitario }, Validators.required),
      impuesto: new FormControl(this.item_documento_gasto.impuestos, Validators.required),
      monto_impuesto: new FormControl({ value: this.item_documento_gasto.monto_impuesto, disabled: true }, Validators.required),
      importe: new FormControl({ value: this.item_documento_gasto.importe, disabled: true }, Validators.required),
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  onImpuestoSelected(data) {
    const impuesto = data && data.data && data.data[0].id != "0" ? data.data[0] : null;
    if (impuesto) {
      this.item_documento_gasto.impuestos.length = 0;
      const obj = new ImpuestoItemDocumentoRD();
      obj.clave = impuesto.clave;
      obj.tasa = impuesto.tasa;
      obj.impuesto_id = impuesto.id_id;
      this.impuesto_seleccionado = impuesto;
      // Aqui agregar el imuesto al array de impuestos del Concepto
      this.item_documento_gasto.impuestos.push(obj);
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
    if (this.impuesto_seleccionado && this.impuesto_seleccionado.tasa && this.item_documento_gasto) {
      this.item_documento_gasto.monto_impuesto = this.impuesto_seleccionado.tasa * this.item_documento_gasto.valor_unitario;
      this.item_documento_gasto.importe = this.item_documento_gasto.cantidad && this.item_documento_gasto.valor_unitario ? this.item_documento_gasto.cantidad * this.item_documento_gasto.valor_unitario : 0;
      if (this.item_documento_gasto.impuestos.length !== 0) {
        this.item_documento_gasto.impuestos[0].importe = this.calcularImporteImpuesto();
      }
    }
  }
  calcularImporteImpuesto(): number {
    if (this.impuesto_seleccionado && this.item_documento_gasto.cantidad && this.item_documento_gasto.valor_unitario) {
      return (this.impuesto_seleccionado.tasa * this.item_documento_gasto.valor_unitario) * this.item_documento_gasto.cantidad;
    }
    return 0;
  }
  agregarItem(btn?: HTMLButtonElement) {
    if (btn) {
      this.btn_add_item = btn;
      this.btn_add_item.disabled = true;
      this.btn_add_item.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:16px"></i>';
    }
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
    if (this.btn_add_item) {
      this.btn_add_item.innerHTML = '<em class="fas fa-plus"></em>'
      this.btn_add_item.disabled = false;
    }
    this.item_documento_gasto = new ItemDocumentoRD();
    this.limpiarImpuestos();
  }

}
