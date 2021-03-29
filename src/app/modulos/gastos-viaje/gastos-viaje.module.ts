import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Select2Module } from 'ng2-select2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';
import { MyDatePickerModule } from 'mydatepicker';
import { DataTablesModule } from 'angular-datatables';
import { NgxCurrencyModule } from 'ngx-currency';
import { customCurrencyMaskConfig } from '../solicitud-general/solicitud-general.module';
import { FiltroViajeComponent } from './filtro-viaje/filtro-viaje.component';
import { ModalDocumentosComponent } from './modal-documentos/modal-documentos.component';
import { MainGastosComponent } from './solicitudes/main-gastos/main-gastos.component';
import { MainSolicitudesComponent } from './solicitudes/main-solicitudes/main-solicitudes.component';
import { ListSolicitudesPaisComponent } from './solicitudes/list-solicitudes-pais/list-solicitudes-pais.component';
import { ListSolicitudesMxComponent } from './solicitudes/list-solicitudes-mx/list-solicitudes-mx.component';
import { ListSolicitudesAdmMxComponent } from './solicitudes/list-solicitudes-adm-mx/list-solicitudes-adm-mx.component';
import { ListSolicitudesAdmPaisComponent } from './solicitudes/list-solicitudes-adm-pais/list-solicitudes-adm-pais.component';
import { FormSolicitudesPaisComponent } from './solicitudes/form-solicitudes-pais/form-solicitudes-pais.component';
import { FormSolicitudesMxComponent } from './solicitudes/form-solicitudes-mx/form-solicitudes-mx.component';
import { FormComprobacionesMxComponent } from './comprobaciones/form-comprobaciones-mx/form-comprobaciones-mx.component';
import { ListComprobacionesPaisComponent } from './comprobaciones/list-comprobaciones-pais/list-comprobaciones-pais.component';
import { ListComprobacionesMxComponent } from './comprobaciones/list-comprobaciones-mx/list-comprobaciones-mx.component';
import { MainComprobacionesComponent } from './comprobaciones/main-comprobaciones/main-comprobaciones.component';
import { ListComprobacionesAdmMxComponent } from './comprobaciones/list-comprobaciones-adm-mx/list-comprobaciones-adm-mx.component';
import { ListComprobacionesAdmPaisComponent } from './comprobaciones/list-comprobaciones-adm-pais/list-comprobaciones-adm-pais.component';
import { FormSolicitudAnticipoPaisComponent } from './solicitudes/form-solicitud-anticipo-pais/form-solicitud-anticipo-pais.component';
import { FormSolicitudAnticipoMxComponent } from './solicitudes/form-solicitud-anticipo-mx/form-solicitud-anticipo-mx.component';
import { FormComprobacionesPaisComponent } from './comprobaciones/form-comprobaciones-pais/form-comprobaciones-pais.component';
import { MainGastosViajeComponent } from './main-gastos-viaje/main-gastos-viaje.component';
import { FiltroComprobacionComponent } from './comprobaciones/filtro-comprobacion/filtro-comprobacion.component';
import { CargaDocNacionalComponent } from './comprobaciones/carga-doc-nacional/carga-doc-nacional.component';
import { CargaDocExtComponent } from './comprobaciones/carga-doc-ext/carga-doc-ext.component';
import { RowConceptoComponent } from './comprobaciones/row-concepto/row-concepto.component';
import { ListaComprobantesComponent } from './comprobaciones/lista-comprobantes/lista-comprobantes.component';
import { ModalDetallesComponent } from './modal-detalles/modal-detalles.component';
import { AcreedoresDiversosModule } from '../acreedores-diversos/acreedores-diversos.module';
import { GastosViajeRoutingModule } from './gastos-viaje.routing.module';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';

@NgModule({
  imports: [
    CommonModule,
    GastosViajeRoutingModule,
    CompartidosModule,
    RouterModule,
    Select2Module,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DirectivasModule,
    MyDatePickerModule
    , DataTablesModule,
    AcreedoresDiversosModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  declarations: [
    FiltroViajeComponent,
    ModalDocumentosComponent,
    MainGastosComponent,
    MainSolicitudesComponent,
    ListSolicitudesPaisComponent,
    ListSolicitudesMxComponent,
    ListSolicitudesAdmMxComponent,
    ListSolicitudesAdmPaisComponent,
    FormSolicitudesPaisComponent,
    FormSolicitudesMxComponent,
    FormComprobacionesMxComponent,
    ListComprobacionesPaisComponent,
    ListComprobacionesMxComponent,
    MainComprobacionesComponent,
    ListComprobacionesAdmMxComponent,
    ListComprobacionesAdmPaisComponent,
    FormSolicitudAnticipoPaisComponent,
    FormSolicitudAnticipoMxComponent,
    FormComprobacionesPaisComponent,
    MainGastosViajeComponent,
    FiltroComprobacionComponent,
    CargaDocNacionalComponent,
    CargaDocExtComponent,
    RowConceptoComponent,
    ListaComprobantesComponent,
    ModalDetallesComponent
  ],
  exports: [
    ListComprobacionesPaisComponent,
    ListComprobacionesMxComponent,
    ListSolicitudesPaisComponent,
    ListSolicitudesMxComponent,
    FormComprobacionesMxComponent,
    MainSolicitudesComponent,
    ListSolicitudesPaisComponent,
    ListSolicitudesMxComponent,
    ListSolicitudesAdmMxComponent,
    ListSolicitudesAdmPaisComponent,
    FormSolicitudesPaisComponent,
    FormSolicitudesMxComponent,
    FormComprobacionesMxComponent,
    ListComprobacionesPaisComponent,
    ListComprobacionesMxComponent,
    MainComprobacionesComponent,
    ListComprobacionesAdmMxComponent,
    ListComprobacionesAdmPaisComponent,
    FormSolicitudAnticipoPaisComponent,
    FormSolicitudAnticipoMxComponent,
    FormComprobacionesPaisComponent,
    MainGastosViajeComponent,
    FiltroComprobacionComponent,
    CargaDocNacionalComponent,
    CargaDocExtComponent,
    RowConceptoComponent,
    ListaComprobantesComponent,
    ModalDetallesComponent
  ]
})
export class GastosViajeModule { }
