import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainBandejaAprobacionComponent } from './main-bandeja-aprobacion/main-bandeja-aprobacion.component';
import { BandejaAprobacionPaisComponent } from './bandeja-aprobacion-pais/bandeja-aprobacion-pais.component';
import { BandejaAprobacionCrComponent } from './bandeja-aprobacion-cr/bandeja-aprobacion-cr.component';
import { BandejaAprobacionMxComponent } from './bandeja-aprobacion-mx/bandeja-aprobacion-mx.component';
import { RouterModule } from '@angular/router';
import { SharedModuleModule } from 'src/app/compartidos/shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { MyDatePickerModule } from 'mydatepicker';
import { DataTablesModule } from 'angular-datatables';
import { FiltroBandejaAprobacionComponent } from './filtro-bandeja-aprobacion/filtro-bandeja-aprobacion.component';
import { AmortizacionModule } from '../amortizacion/amortizacion.module';
import { AcreedoresDiversosModule } from '../acreedores-diversos/acreedores-diversos.module';
import { ListaSolicitudesComponent } from './lista-solicitudes/lista-solicitudes.component';
import { SolicitudGeneralModule } from '../solicitud-general/solicitud-general.module';
import { GastosViajeModule } from '../gastos-viaje/gastos-viaje.module';
import { ProveedoresInformalesModule } from '../proveedores-informales/proveedores-informales.module';
import { FacturasProveedorModule } from '../facturas-proveedor/facturas-proveedor.module';
import { NotasCreditoModule } from '../notas-credito/notas-credito.module';

@NgModule({
  imports: [
    CommonModule
    , RouterModule
    , SharedModuleModule
    , FormsModule
    , Select2Module
    , HttpClientModule
    , BrowserModule
    , DirectivasModule
    , NgxCurrencyModule
    , MyDatePickerModule
    , DataTablesModule
    , ReactiveFormsModule
    , AmortizacionModule
    , AcreedoresDiversosModule
    , GastosViajeModule
    , ProveedoresInformalesModule
    , FacturasProveedorModule
    , NotasCreditoModule
  ],
  declarations: [
    MainBandejaAprobacionComponent
    , BandejaAprobacionPaisComponent
    , BandejaAprobacionCrComponent
    , BandejaAprobacionMxComponent
    , FiltroBandejaAprobacionComponent, ListaSolicitudesComponent
  ]
})
export class BandejaAprobacionModule { }
