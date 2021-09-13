import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcreedoresDiversosMainComponent } from './acreedores-diversos-main/acreedores-diversos-main.component';
import { FormularioAcreedoresDiversosPaisComponent } from './formulario-acreedores-diversos-pais/formulario-acreedores-diversos-pais.component';
import { FormularioAcreedoresDiversosMxComponent } from './formulario-acreedores-diversos-mx/formulario-acreedores-diversos-mx.component';
import { ListAcreedoresDiversosMxComponent } from './list-acreedores-diversos-mx/list-acreedores-diversos-mx.component';
import { ListAcreedoresDiversosPaisComponent } from './list-acreedores-diversos-pais/list-acreedores-diversos-pais.component';


import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';
import { MyDatePickerModule } from 'mydatepicker';
import { DataTablesModule } from 'angular-datatables';
import { customCurrencyMaskConfig } from '../caja-chica/caja-chica.module';
import { NgxCurrencyModule } from 'ngx-currency';


import { ModuloDetallesAcreedoresComponent } from './modulo-detalles-acreedores/modulo-detalles-acreedores.component';
import { CargaNcAcreedoresComponent } from './carga-nc-acreedores/carga-nc-acreedores.component';
import { AcreedoresDiversosRdComponent } from './acreedores-diversos-rd/acreedores-diversos-rd.component';
import { FiltroAcreedoresRdComponent } from './acreedores-diversos-rd/filtro-acreedores-rd/filtro-acreedores-rd.component';
import { FormularioAcreedoresDiversosRdComponent } from './acreedores-diversos-rd/formulario-acreedores-diversos-rd/formulario-acreedores-diversos-rd.component';
import { ListAcreedoresDiversosRdComponent } from './acreedores-diversos-rd/list-acreedores-diversos-rd/list-acreedores-diversos-rd.component';
import { ModalProrrateoComponent } from './modal-prorrateo/modal-prorrateo.component';
import { CompartidosModule } from './../../compartidos/compartidos.module';


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
    // BrowserModule,
    DirectivasModule,
    MyDatePickerModule
    , DataTablesModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  exports: [
    ListAcreedoresDiversosMxComponent,
    ModuloDetallesAcreedoresComponent,
    ListAcreedoresDiversosPaisComponent,
    ModalProrrateoComponent
  ]
  , declarations: [
    AcreedoresDiversosMainComponent,
    FormularioAcreedoresDiversosPaisComponent,
    FormularioAcreedoresDiversosMxComponent,
    ListAcreedoresDiversosMxComponent,
    ListAcreedoresDiversosPaisComponent,
    ModuloDetallesAcreedoresComponent,
    CargaNcAcreedoresComponent,
    AcreedoresDiversosRdComponent,
    FiltroAcreedoresRdComponent,
    FormularioAcreedoresDiversosRdComponent,
    ListAcreedoresDiversosRdComponent,
    ModalProrrateoComponent
  ]
})
export class AcreedoresDiversosModule { }
