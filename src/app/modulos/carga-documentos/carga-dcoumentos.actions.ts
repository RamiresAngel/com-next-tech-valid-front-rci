// counter.actions.ts
import { Action } from '@ngrx/store';
import { ConceptoCargaDocumentos, Saldos, Totales, ImpuestoRD } from './models';
import { CodigoRecepcionRD, OrdenCompra } from 'src/app/entidades';

export enum CargaDocumentosAction {
  // Orden Compra
  ADD_ORDEN_COMPRA = '[Carga Documentos] Agrega Orden Compra',
  REMOVE_ORDEN_COMPRA = '[Carga Documentos] Remove Orden Compra',
  //
  ADD_CONCEPTO = '[Carga Documentos] Agrega Concepto',
  REMOVE_CONCEPTO = '[Carga Documentos] Elimina Concepto',
  UPDATE_CONCEPTO = '[Carga Documentos] Actualiza Concepto',
  RESET_CONCEPTO = '[Carga Documentos] Resetea Conceptos',
  ADD_CODIGO_RECEPCION = '[Carga Documentos] Agrega Codigos de Recepcion',
  REMOVE_CODIGO_RECEPCION = '[Carga Documentos] Elimnina Codigos de Recepcion',
  RESET_CODIGO_RECEPCION = '[Carga Documentos] Resetea Codigos de Recepcion',
  ADD_CODIGO_RECEPCION_SELECCIONADO = '[Carga Documentos] Agrega Codigos de Recepcion seleccionado',
  REMOVE_CODIGO_RECEPCION_SELECCIONADO = '[Carga Documentos] Elimnina Codigos de Recepcion seleccionado',
  RESET_CODIGO_RECEPCION_SELECCIONADO = '[Carga Documentos] Resetea Codigos de Recepcion seleccionado',
  // Saldos
  ADD_SALDOS = '[Carga Documentos] Agrega Saldos',
  REMOVE_SALDOS = '[Carga Documentos] Quitar Saldos',
  // Totales
  ADD_TOTALES = '[Carga Documentos] Agrega Total y Subtotal',
  REMOVE_TOTALES = '[Carga Documentos] Quitar Total y Subtotal',
  // Impuestos
  ADD_IMPUESTOS = '[Carga Documentos] Agrega Impuestos',
  REMOVE_IMPUESTOS = '[Carga Documentos] Quitar Impuestos',
}

// Acciones Para Orden Compra
export class AddOrdenCompra implements Action {
  readonly type = CargaDocumentosAction.ADD_ORDEN_COMPRA;
  constructor(public payload: OrdenCompra[]) { }
}
export class RemoveOrdenCompra implements Action {
  readonly type = CargaDocumentosAction.REMOVE_ORDEN_COMPRA;
}
// Acciones Para Conceptos
export class AddConcepto implements Action {
  readonly type = CargaDocumentosAction.ADD_CONCEPTO;
  constructor(public payload: ConceptoCargaDocumentos[]) { }
}
export class RemoveConcepto implements Action {
  readonly type = CargaDocumentosAction.REMOVE_CONCEPTO;
  constructor(public payload: ConceptoCargaDocumentos[]) { }
}
export class UpdateConcepto implements Action {
  readonly type = CargaDocumentosAction.UPDATE_CONCEPTO;
  constructor(public payload: ConceptoCargaDocumentos) { }
}
export class ResetConcepto implements Action {
  readonly type = CargaDocumentosAction.RESET_CONCEPTO;
}
// Acciones Para Codigos Recepcion Seleccioandos
export class AddCodigoRecepcionSeleccionado implements Action {
  readonly type = CargaDocumentosAction.ADD_CODIGO_RECEPCION_SELECCIONADO;
  constructor(public payload: CodigoRecepcionRD[]) { }
}
export class RemoveCodigoRecepcionSeleccionado implements Action {
  readonly type = CargaDocumentosAction.REMOVE_CODIGO_RECEPCION_SELECCIONADO;
  constructor(public payload: CodigoRecepcionRD[]) { }
}
export class ResetCodigoRecepcionSeleccionado implements Action {
  readonly type = CargaDocumentosAction.RESET_CODIGO_RECEPCION_SELECCIONADO;
}

// Acciones Para Codigos de Recepcion
export class AddCodigoRecepcion implements Action {
  readonly type = CargaDocumentosAction.ADD_CODIGO_RECEPCION;
  constructor(public payload: CodigoRecepcionRD[]) { }
}
export class RemoveCodigoRecepcion implements Action {
  readonly type = CargaDocumentosAction.REMOVE_CODIGO_RECEPCION;
  constructor(public payload: number) { }
}
export class ResetCodigoRecepcion implements Action {
  readonly type = CargaDocumentosAction.RESET_CODIGO_RECEPCION;
}

// Actions Saldos
export class AddSaldos implements Action {
  readonly type = CargaDocumentosAction.ADD_SALDOS;
  constructor(public payload: Saldos) { }
}
export class RemoveSaldos implements Action {
  readonly type = CargaDocumentosAction.REMOVE_SALDOS;
}

// Actions Totales
export class AddTotales implements Action {
  readonly type = CargaDocumentosAction.ADD_TOTALES;
  constructor(public payload: Totales) { }
}
export class RemoveTotales implements Action {
  readonly type = CargaDocumentosAction.REMOVE_TOTALES;
}
// Actions Impuestos
export class AddImpuestos implements Action {
  readonly type = CargaDocumentosAction.ADD_IMPUESTOS;
  constructor(public payload: ImpuestoRD[]) { }
}
export class RemoveImpuestos implements Action {
  readonly type = CargaDocumentosAction.REMOVE_IMPUESTOS;
}


export type CargaDocumentosActions = AddConcepto | RemoveConcepto | ResetConcepto | UpdateConcepto |
  AddCodigoRecepcion | RemoveCodigoRecepcion | ResetCodigoRecepcion |
  AddSaldos | RemoveSaldos | AddOrdenCompra | RemoveOrdenCompra |
  AddCodigoRecepcionSeleccionado | RemoveCodigoRecepcionSeleccionado | ResetCodigoRecepcionSeleccionado |
  AddTotales | RemoveTotales | AddImpuestos | RemoveImpuestos;
