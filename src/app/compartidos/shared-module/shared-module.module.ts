import { LoadingModalComponent } from './../loading-modal/loading-modal.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExitoComponent } from '../alertas/exito/exito.component';
import { AlertaComponent } from '../alertas/alerta/alerta.component';
import { ErrorComponent } from '../alertas/error/error.component';
import { FiltroSolicitudesComponent } from '../filtro-solicitudes/filtro-solicitudes.component';
import { FiltroFacturasComponent } from '../filtro-facturas/filtro-facturas.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';
import { MyDatePickerModule } from 'mydatepicker';
import { CapitalizePipe } from '../capitalize.pipe';
import { RowConceptosCargaDocsRdComponent } from '../row-conceptos-carga-docs-rd/row-conceptos-carga-docs-rd.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { TablaConceptosAgregadosRdComponent } from '../tabla-conceptos-agregados-rd/tabla-conceptos-agregados-rd.component';
import { TotalesConceptosCargaDocsRdComponent } from '../totales-conceptos-carga-docs-rd/totales-conceptos-carga-docs-rd.component';
import { DirectivasModule } from '../directivas/directivas.module';
import { RowConceptosFacturaProveedorRdComponent } from '../row-conceptos-factura-proveedor-rd/row-conceptos-factura-proveedor-rd.component';
import { ModalDetallesAprobacionComponent } from '../modal-detalles-aprobacion/modal-detalles-aprobacion.component';
import { FiltroGenericoComponent } from '../filtro-generico/filtro-generico.component';
import { InputFiltroGenericoComponent } from '../input-filtro-generico/input-filtro-generico.component';
import { ConceptoRowFormComponent } from '../concepto-row-form/concepto-row-form.component';
import { ConceptosComprobacionComponent } from '../conceptos-comprobacion/conceptos-comprobacion.component';
import { HeaderComprobacionComponent } from '../header-comprobacion/header-comprobacion.component';
import { LoadingComponent } from '../loading/loading.component';
import { ModalAcutalizarDocumentoComponent } from '../modal-acutalizar-documento/modal-acutalizar-documento.component';
import { ModalAgregarAnexoComponent } from '../modal-agregar-anexo/modal-agregar-anexo.component';
import { VisorFacturaComponent } from '../visor-factura/visor-factura.component';

@NgModule({
  imports: [
    CommonModule,
    Select2Module,
    FormsModule,
    MyDatePickerModule,
    NgxCurrencyModule,
    DirectivasModule,
    MyDatePickerModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
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

  ],
  exports: [
    ExitoComponent,
    AlertaComponent,
    Select2Module,
    ErrorComponent,
    CapitalizePipe,
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
  ]
})
export class SharedModuleModule { }
