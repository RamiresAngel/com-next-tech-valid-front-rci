import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExitoComponent } from './alertas/exito/exito.component';
import { AlertaComponent } from './alertas/alerta/alerta.component';
import { ErrorComponent } from './alertas/error/error.component';
import { FiltroSolicitudesComponent } from './filtro-solicitudes/filtro-solicitudes.component';
import { FiltroFacturasComponent } from './filtro-facturas/filtro-facturas.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';
import { MyDatePickerModule } from 'mydatepicker';
import { CapitalizePipe } from './capitalize.pipe';
import { RowConceptosCargaDocsRdComponent } from './row-conceptos-carga-docs-rd/row-conceptos-carga-docs-rd.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { TablaConceptosAgregadosRdComponent } from './tabla-conceptos-agregados-rd/tabla-conceptos-agregados-rd.component';
import { TotalesConceptosCargaDocsRdComponent } from './totales-conceptos-carga-docs-rd/totales-conceptos-carga-docs-rd.component';
import { DirectivasModule } from './directivas/directivas.module';
import { RowConceptosFacturaProveedorRdComponent } from './row-conceptos-factura-proveedor-rd/row-conceptos-factura-proveedor-rd.component';
import { ModalDetallesAprobacionComponent } from './modal-detalles-aprobacion/modal-detalles-aprobacion.component';
import { FiltroGenericoComponent } from './filtro-generico/filtro-generico.component';
import { InputFiltroGenericoComponent } from './input-filtro-generico/input-filtro-generico.component';
import { ConceptoRowFormComponent } from './concepto-row-form/concepto-row-form.component';
import { ConceptosComprobacionComponent } from './conceptos-comprobacion/conceptos-comprobacion.component';
import { HeaderComprobacionComponent } from './header-comprobacion/header-comprobacion.component';
import { LoadingComponent } from './loading/loading.component';
import { ModalAcutalizarDocumentoComponent } from './modal-acutalizar-documento/modal-acutalizar-documento.component';
import { ModalAgregarAnexoComponent } from './modal-agregar-anexo/modal-agregar-anexo.component';
import { VisorFacturaComponent } from './visor-factura/visor-factura.component';
import { ModalDetalleFacturaComponent } from './modal-detalle-factura/modal-detalle-factura.component';
import { ModalImpuestosComponent } from './modal-impuestos/modal-impuestos.component';
import { ModalAdicionalComponent } from './modal-adicional/modal-adicional.component';
import { ModalConceptosComprobantesComponent } from './modal-conceptos-comprobantes/modal-conceptos-comprobantes.component';
import { FormComrpobacionHeaderComponent } from './comprobacion-components/form-comprobacion-header/form-comprobacion-header.component';
import { CargaComprobanteExtranjeroComponent } from './comprobacion-components/carga-comprobante-extranjero/carga-comprobante-extranjero.component';
import { CargaComprobanteNacionalComponent } from './comprobacion-components/carga-comprobante-nacional/carga-comprobante-nacional.component';
import { ListaComprobantesCargaComponent } from './comprobacion-components/lista-comprobantes-carga/lista-comprobantes-carga.component';
import { RowConceptoExtranjeroComponent } from './comprobacion-components/row-concepto-extranjero/row-concepto-extranjero.component';
import { TablaConceptosFormComponent } from './comprobacion-components/tabla-conceptos-form/tabla-conceptos-form.component';
import { LoadingModalComponent } from './loading-modal/loading-modal.component';
import { NumbersWidthDotsPipe } from './pipes/numbers-width-dots.pipe';
import { ModalComprobanteComponent } from './comprobacion-components/modal-comprobante/modal-comprobante.component';
import { RowchildComprobanteComponent } from './comprobacion-components/rowchild-comprobante/rowchild-comprobante.component';
import { FiltroComprobacionSharedComponent } from './comprobacion-components/filtro-comprobacion-shared/filtro-comprobacion-shared.component';

@NgModule({
  imports: [
    CommonModule,
    Select2Module,
    FormsModule,
    MyDatePickerModule,
    NgxCurrencyModule,
    DirectivasModule,
    MyDatePickerModule,
    DataTablesModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ],
  exports: [
    ExitoComponent,
    AlertaComponent,
    Select2Module,
    ErrorComponent,
    CapitalizePipe,
    FiltroSolicitudesComponent,
    RowConceptosCargaDocsRdComponent,
    RowConceptosFacturaProveedorRdComponent,
    TablaConceptosAgregadosRdComponent,
    TotalesConceptosCargaDocsRdComponent,
    ModalDetallesAprobacionComponent,
    FiltroFacturasComponent,
    FiltroGenericoComponent,
    InputFiltroGenericoComponent,
    LoadingModalComponent,
    ConceptoRowFormComponent,
    ConceptosComprobacionComponent,
    HeaderComprobacionComponent,
    LoadingComponent,
    ModalAcutalizarDocumentoComponent,
    ModalAgregarAnexoComponent,
    VisorFacturaComponent,
    ModalDetalleFacturaComponent,
    ModalImpuestosComponent,
    ModalConceptosComprobantesComponent,
    TablaConceptosFormComponent,
    FormComrpobacionHeaderComponent,
    CargaComprobanteExtranjeroComponent,
    CargaComprobanteNacionalComponent,
    ListaComprobantesCargaComponent,
    RowConceptoExtranjeroComponent,
    NumbersWidthDotsPipe,
    ModalComprobanteComponent,
    FiltroComprobacionSharedComponent
  ],
  declarations: [
    ExitoComponent,
    AlertaComponent,
    ErrorComponent,
    FiltroSolicitudesComponent,
    CapitalizePipe,
    RowConceptosCargaDocsRdComponent,
    RowConceptosFacturaProveedorRdComponent,
    TablaConceptosAgregadosRdComponent,
    TotalesConceptosCargaDocsRdComponent,
    FiltroFacturasComponent,
    ModalDetallesAprobacionComponent,
    LoadingModalComponent,
    FiltroGenericoComponent,
    InputFiltroGenericoComponent,
    ConceptoRowFormComponent,
    ConceptosComprobacionComponent,
    HeaderComprobacionComponent,
    LoadingComponent,
    ModalAcutalizarDocumentoComponent,
    ModalAgregarAnexoComponent,
    VisorFacturaComponent,
    ModalDetalleFacturaComponent,
    ModalImpuestosComponent,
    ModalAdicionalComponent,
    ModalConceptosComprobantesComponent,
    TablaConceptosFormComponent,
    FormComrpobacionHeaderComponent,
    CargaComprobanteExtranjeroComponent,
    CargaComprobanteNacionalComponent,
    ListaComprobantesCargaComponent,
    RowConceptoExtranjeroComponent,
    NumbersWidthDotsPipe,
    ModalComprobanteComponent,
    RowchildComprobanteComponent,
    FiltroComprobacionSharedComponent
  ]
})
export class CompartidosModule { }
