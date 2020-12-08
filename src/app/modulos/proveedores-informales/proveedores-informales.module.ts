import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresInformalesRoutingModule } from './proveedores-informales-routing.module';
import { ListProveedoresInformalesPaisComponent } from './list-proveedores-informales-pais/list-proveedores-informales-pais.component';
import { ListProveedoresInformalesRdComponent } from './list-proveedores-informales-rd/list-proveedores-informales-rd.component';
import { FormularioProveedoresInformalesRdComponent } from './formulario-proveedores-informales-rd/formulario-proveedores-informales-rd.component';
import { FormularioProveedoresInformalesPaisComponent } from './formulario-proveedores-informales-pais/formulario-proveedores-informales-pais.component';
import { ProveedoresInformalesMainComponent } from './proveedores-informales-main/proveedores-informales-main.component';
import { SharedModuleModule } from 'src/app/compartidos/shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';
import { DataTablesModule } from 'angular-datatables';
import { NgxCurrencyModule } from 'ngx-currency';
import { customCurrencyMaskConfig } from '../solicitud-general/solicitud-general.module';
import { AcreedoresDiversosModule } from '../acreedores-diversos/acreedores-diversos.module';
import { FiltroProveedoresInformalesComponent } from './filtro-proveedores-informales/filtro-proveedores-informales.component';
import { RetencionesProveedoresInformalesComponent } from './retenciones-proveedores-informales/retenciones-proveedores-informales.component';
import { ModalDetalleProveedorInformalComponent } from './modal-detalle-proveedor-informal/modal-detalle-proveedor-informal.component';

@NgModule({
  imports: [
    CommonModule,
    ProveedoresInformalesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModuleModule,
    MyDatePickerModule,
    DirectivasModule,
    DataTablesModule,
    AcreedoresDiversosModule,
    // FacturasProveedorModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
  ],
  declarations: [
    ListProveedoresInformalesPaisComponent,
    ListProveedoresInformalesRdComponent,
    FormularioProveedoresInformalesRdComponent,
    FormularioProveedoresInformalesPaisComponent,
    ProveedoresInformalesMainComponent,
    ProveedoresInformalesMainComponent,
    FiltroProveedoresInformalesComponent,
    RetencionesProveedoresInformalesComponent,
    ModalDetalleProveedorInformalComponent
  ],
  exports: [
    ListProveedoresInformalesPaisComponent,
  ]
})
export class ProveedoresInformalesModule { }
