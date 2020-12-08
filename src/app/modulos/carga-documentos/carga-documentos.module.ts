import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { StoreModule } from '@ngrx/store';
import { CargaDocumentosReducer } from './carga-documentos.reducer';

import { MainCargaDocumentosComponent } from './main-carga-documentos/main-carga-documentos.component';
import { CargaDocumentosPaisComponent } from './carga-documentos-pais/carga-documentos-pais.component';
import { CargaDocumentosMxComponent } from './carga-documentos-mx/carga-documentos-mx.component';
import { CargaDocumentosRdComponent } from './carga-documentos-cr/carga-documentos-rd.component';
import { ModalDetalleOcMxComponent } from './modal-detalle-oc-mx/modal-detalle-oc-mx.component';
import { DetalleOcMxComponent } from './detalle-oc-mx/detalle-oc-mx.component';
import { TarjetaCodigoRecepcionMxComponent } from './tarjeta-codigo-recepcion-mx/tarjeta-codigo-recepcion-mx.component';
import { SaldosComponent } from './saldos/saldos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModuleModule } from '../../compartidos/shared-module/shared-module.module';
import { Select2Module } from 'ng2-select2';
import { DirectivasModule } from '../../compartidos/directivas/directivas.module';
import { DetallesValidacionComponent } from './detalles-validacion/detalles-validacion.component';
import { DetallesValidacionMxComponent } from './detalles-validacion-mx/detalles-validacion-mx.component';
import { ModalDocsRelacionadosComponent } from './modal-docs-relacionados/modal-docs-relacionados.component';
import { CargaMultipleComponent } from './carga-multiple/carga-multiple.component';
import { ModalDetalleCrComponent } from './modal-detalle-cr/modal-detalle-cr.component';
import { CargaDocumentosNoerpMxComponent } from './carga-documentos-noerp-mx/carga-documentos-noerp-mx.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { customCurrencyMaskConfig } from '../caja-chica/caja-chica.module';
import { InputOcComponent } from './carga-documentos-cr/input-oc/input-oc.component';
import { HeaderOcSimpleComponent } from './carga-documentos-cr/header-oc-simple/header-oc-simple.component';
import { SaldosOcComponent } from './carga-documentos-cr/saldos-oc/saldos-oc.component';
import { ListarConceptosComponent } from './carga-documentos-cr/listar-conceptos/listar-conceptos.component';
import { MyDatePickerModule } from 'mydatepicker';
// import { RowConceptoComponent } from './carga-documentos-cr/row-concepto/row-concepto.component';
import { HeaderOcMultipleComponent } from './carga-documentos-cr/header-oc-multiple/header-oc-multiple.component';
import { TarjetaCodigoRecepcionRdComponent } from './carga-documentos-cr/tarjeta-codigo-recepcion-rd/tarjeta-codigo-recepcion-rd.component';
import { CargaDocumentosNoxmlComponent } from './carga-documentos-noxml/carga-documentos-noxml.component';
@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('CargaDocumentos', CargaDocumentosReducer)
    , HttpClientModule
    , FormsModule
    , BrowserModule
    , RouterModule
    , SharedModuleModule
    , Select2Module
    , DirectivasModule
    , MyDatePickerModule
    , ReactiveFormsModule
    , NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  declarations: [
    MainCargaDocumentosComponent,
    CargaDocumentosPaisComponent,
    CargaDocumentosMxComponent,
    CargaDocumentosRdComponent,
    ModalDetalleOcMxComponent,
    DetalleOcMxComponent,
    TarjetaCodigoRecepcionMxComponent,
    SaldosComponent,
    DetallesValidacionComponent,
    DetallesValidacionMxComponent,
    ModalDocsRelacionadosComponent,
    CargaMultipleComponent,
    ModalDetalleCrComponent,
    CargaDocumentosNoerpMxComponent,
    InputOcComponent,
    HeaderOcSimpleComponent,
    SaldosOcComponent,
    ListarConceptosComponent,
    // RowConceptoComponent,
    HeaderOcMultipleComponent,
    TarjetaCodigoRecepcionRdComponent,
    CargaDocumentosNoxmlComponent,
  ],
  exports: [
    ModalDetalleOcMxComponent,
    ModalDetalleCrComponent,
    ModalDocsRelacionadosComponent
  ]
})
export class CargaDocumentosModule { }
