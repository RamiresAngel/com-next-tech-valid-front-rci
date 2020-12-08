import { CargaDocumentosAction, CargaDocumentosActions } from './carga-dcoumentos.actions';
import { ConceptoCargaDocumentos, Saldos, Totales, ImpuestoRD } from './models';
import { CodigoRecepcionRD, OrdenCompra } from 'src/app/entidades';


export interface CDState {
  orden_compra: OrdenCompra[],
  conceptos: ConceptoCargaDocumentos[],
  codigos_recepcion: CodigoRecepcionRD[],
  codigos_recepcion_seleccionados: CodigoRecepcionRD[],
  saldos: Saldos,
  totales: Totales,
  impuestos: ImpuestoRD[]
}

export const initialState: CDState = {
  orden_compra: [],
  conceptos: [],
  codigos_recepcion: [],
  codigos_recepcion_seleccionados: [],
  saldos: new Saldos(),
  impuestos: [],
  totales: new Totales()
}

export function CargaDocumentosReducer(state = initialState, action: CargaDocumentosActions): CDState {
  switch (action.type) {
    //#region Orden Compra
    case CargaDocumentosAction.ADD_ORDEN_COMPRA: {
      return { ...state, orden_compra: action.payload };
    }
    case CargaDocumentosAction.REMOVE_ORDEN_COMPRA: {
      return { ...state, orden_compra: new Array<OrdenCompra>() };
    }
    //#region Conceptos
    case CargaDocumentosAction.ADD_CONCEPTO: {
      return { ...state, conceptos: state.conceptos.concat(action.payload) };
    }
    case CargaDocumentosAction.REMOVE_CONCEPTO: {

      let conceptos = [...state.conceptos];

      action.payload.forEach(con => {
        conceptos = conceptos.filter(x => x.id !== con.id);
      });
      return { ...state, conceptos: conceptos };
    }
    case CargaDocumentosAction.UPDATE_CONCEPTO: {
      const concepto = [...state.conceptos];
      for (let i in concepto) {
        if (concepto[i].id == action.payload.id) {
          concepto[i].cantidad = action.payload.cantidad;
          concepto[i].concepto = action.payload.concepto;
          concepto[i].identificador_header = action.payload.identificador_header;
          concepto[i].importe = action.payload.importe;
          concepto[i].impuestos = action.payload.impuestos;
          concepto[i].monto_impuesto = action.payload.monto_impuesto;
          concepto[i].valor_unitario = action.payload.valor_unitario;
        }
      }
      return { ...state, conceptos: state.conceptos = concepto };
    }
    case CargaDocumentosAction.RESET_CONCEPTO: {
      return { ...state, conceptos: new Array<ConceptoCargaDocumentos>() };
    }
    //#endregion
    //#region Codigos Recepcion
    case CargaDocumentosAction.ADD_CODIGO_RECEPCION: {
      return { ...state, codigos_recepcion: state.codigos_recepcion.concat(action.payload) };
    }
    case CargaDocumentosAction.REMOVE_CODIGO_RECEPCION: {
      return { ...state, codigos_recepcion: state.codigos_recepcion.filter(cr => cr.id !== action.payload) };
    }
    case CargaDocumentosAction.RESET_CODIGO_RECEPCION: {
      return { ...state, codigos_recepcion: new Array<CodigoRecepcionRD>() };
    }
    //#endregion
    //#region Codigos Recepcion
    case CargaDocumentosAction.ADD_CODIGO_RECEPCION_SELECCIONADO: {
      return { ...state, codigos_recepcion_seleccionados: state.codigos_recepcion_seleccionados.concat(action.payload) };
    }
    case CargaDocumentosAction.REMOVE_CODIGO_RECEPCION_SELECCIONADO: {
      const conc = state.codigos_recepcion_seleccionados.filter((concepto) => {
        return !action.payload.includes(concepto);
      })
      return { ...state, codigos_recepcion_seleccionados: conc };
    }
    case CargaDocumentosAction.RESET_CODIGO_RECEPCION_SELECCIONADO: {
      return { ...state, codigos_recepcion_seleccionados: new Array<CodigoRecepcionRD>() };
    }
    //#endregion
    //#region Saldos
    case CargaDocumentosAction.ADD_SALDOS: {
      return { ...state, saldos: action.payload };
    }
    case CargaDocumentosAction.REMOVE_SALDOS: {
      return { ...state, saldos: null };
    }
    //#endregion
    //#region Totales
    case CargaDocumentosAction.ADD_TOTALES: {
      return { ...state, totales: action.payload };
    }
    case CargaDocumentosAction.REMOVE_TOTALES: {
      return { ...state, totales: null };
    }
    //#endregion
    //#region Impuestos
    case CargaDocumentosAction.ADD_IMPUESTOS: {
      return { ...state, impuestos: action.payload };
    }
    case CargaDocumentosAction.REMOVE_IMPUESTOS: {
      return { ...state, impuestos: new Array<ImpuestoRD>() };
    }
    //#endregion
    default: {
      return state;
    }
  }
}
