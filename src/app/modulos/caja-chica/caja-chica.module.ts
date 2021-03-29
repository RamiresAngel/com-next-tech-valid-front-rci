import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MyDatePickerModule } from 'mydatepicker';
import { NgxCurrencyModule } from 'ngx-currency';
import { Select2Module } from 'ng2-select2';

import { FormularioSolicitudAnticipoCcPaisComponent } from './formulario-solicitud-anticipo-cc-pais/formulario-solicitud-anticipo-cc-pais.component';
import { FormularioSolicitudAnticipoCcMxComponent } from './formulario-solicitud-anticipo-cc-mx/formulario-solicitud-anticipo-cc-mx.component';
import { FormularioSolicitudAnticipoCcCrComponent } from './formulario-solicitud-anticipo-cc-cr/formulario-solicitud-anticipo-cc-cr.component';
import { ListSolicitudAnticipoCcPaisComponent } from './list-solicitud-anticipo-cc-pais/list-solicitud-anticipo-cc-pais.component';
import { ListSolicitudAnticipoCcMxComponent } from './list-solicitud-anticipo-cc-mx/list-solicitud-anticipo-cc-mx.component';
import { ListSolicitudAnticipoCcCrComponent } from './list-solicitud-anticipo-cc-cr/list-solicitud-anticipo-cc-cr.component';
import { MainCajaChicaComponent } from './main-caja-chica/main-caja-chica.component';
import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';
import { DataTablesModule } from 'angular-datatables';
import { CompartidosModule } from './../../compartidos/compartidos.module';

export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: '$ ',
  suffix: '',
  thousands: '.',
  nullable: true
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CompartidosModule,
    FormsModule,
    Select2Module,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    DirectivasModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    MyDatePickerModule
    , DataTablesModule
  ],
  declarations: [
    MainCajaChicaComponent,
    FormularioSolicitudAnticipoCcPaisComponent,
    FormularioSolicitudAnticipoCcMxComponent,
    FormularioSolicitudAnticipoCcCrComponent,
    ListSolicitudAnticipoCcPaisComponent,
    ListSolicitudAnticipoCcMxComponent,
    ListSolicitudAnticipoCcCrComponent
  ]
})
export class CajaChicaModule { }
