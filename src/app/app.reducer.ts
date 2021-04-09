import { ActionReducerMap } from '@ngrx/store';
import { CargaDocumentosReducer, CDState } from './modulos/carga-documentos/carga-documentos.reducer';


export interface AppState {
  CargaDocumentos: CDState
}

export const appReducer: ActionReducerMap<AppState> = {
  CargaDocumentos: CargaDocumentosReducer,
}
