/* Funcionalidades */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';
import { MyDatePickerModule } from 'mydatepicker';
import { DataTablesModule } from 'angular-datatables';

import { CompartidosModule } from './../../compartidos/compartidos.module';
/* Componentes */
import { MainComplementoPagoComponent } from './main-complemento-pago/main-complemento-pago.component';
import { ComplementoPaisComponent } from './complemento-pais/complemento-pais.component';
import { ComplementoCrComponent } from './complemento-cr/complemento-cr.component';
import { ComplementoMxComponent } from './complemento-mx/complemento-mx.component';
import { ComplementoPagoService } from './complemento-pago.service';
import { ListComplementoPagoPaisComponent } from './list-complemento-pago-pais/list-complemento-pago-pais.component';
import { ListComplementoPagoRciComponent } from './list-complemento-pago-rci/list-complemento-pago-rci.component';
import { FiltroComplementoPagoComponent } from './filtro-complemento-pago/filtro-complemento-pago.component';
import { ModalDetalleComplementoPagoComponent } from './modal-detalle-complemento-pago/modal-detalle-complemento-pago.component';

@NgModule({
  imports: [
    CommonModule
    , RouterModule
    , ReactiveFormsModule
    , Select2Module
    , FormsModule
    , MyDatePickerModule
    , CompartidosModule
    , DataTablesModule
  ],
  providers: [
    ComplementoPagoService
  ],
  exports: [
    ListComplementoPagoPaisComponent
    , ListComplementoPagoRciComponent
    , FiltroComplementoPagoComponent
  ],
  declarations: [
    MainComplementoPagoComponent
    , ComplementoPaisComponent
    , ComplementoCrComponent
    , ComplementoMxComponent
    , ListComplementoPagoPaisComponent
    , ListComplementoPagoRciComponent
    , FiltroComplementoPagoComponent, ModalDetalleComplementoPagoComponent
  ]
})
export class ComplementoPagoModule { }
