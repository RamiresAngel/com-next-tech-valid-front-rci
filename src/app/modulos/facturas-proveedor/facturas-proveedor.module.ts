//Funcionalidades
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';
import { BrowserModule } from '@angular/platform-browser';
import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';
import { MyDatePickerModule } from 'mydatepicker';
import { DataTablesModule } from 'angular-datatables';
import { customCurrencyMaskConfig } from '../caja-chica/caja-chica.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { FacturasProveedorMainComponent } from './facturas-proveedor-main/facturas-proveedor-main.component';
import { ListFacturasProveedorPaisComponent } from './list-facturas-proveedor-pais/list-facturas-proveedor-pais.component';
import { ListFacturasProveedorMxComponent } from './list-facturas-proveedor-mx/list-facturas-proveedor-mx.component';
import { ListFacturasProveedorRdComponent } from './list-facturas-proveedor-rd/list-facturas-proveedor-rd.component';
import { FormularioFacturasProveedorPaisComponent } from './formulario-facturas-proveedor-pais/formulario-facturas-proveedor-pais.component';
import { FormularioFacturasProveedorMxComponent } from './formulario-facturas-proveedor-mx/formulario-facturas-proveedor-mx.component';
import { FormularioFacturasProveedorRdComponent } from './formulario-facturas-proveedor-rd/formulario-facturas-proveedor-rd.component';
import { FiltroFacturasProveedorComponent } from './filtro-facturas-proveedor/filtro-facturas-proveedor.component';
import { ModalDetalleFacturaProveedorComponent } from './modal-detalle-factura-proveedor/modal-detalle-factura-proveedor.component';
import { ListFacturasProveedorRciComponent } from './list-facturas-proveedor-rci/list-facturas-proveedor-rci.component';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    Select2Module,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    CompartidosModule,
    BrowserModule,
    DirectivasModule,
    MyDatePickerModule,
    DataTablesModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  exports: [
    ListFacturasProveedorMxComponent,
    ListFacturasProveedorRdComponent,
    ListFacturasProveedorPaisComponent,
    ModalDetalleFacturaProveedorComponent
  ]
  , declarations: [
    FacturasProveedorMainComponent,
    FormularioFacturasProveedorPaisComponent,
    FormularioFacturasProveedorMxComponent,
    FormularioFacturasProveedorRdComponent,
    ListFacturasProveedorPaisComponent,
    ListFacturasProveedorMxComponent,
    ListFacturasProveedorRdComponent,
    FiltroFacturasProveedorComponent,
    ModalDetalleFacturaProveedorComponent,
    ListFacturasProveedorRciComponent,

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' }
  ]
})
export class FacturasProveedorModule { }
