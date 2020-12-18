import { SharedModuleModule } from 'src/app/compartidos/shared-module/shared-module.module';
import { MyDatePickerModule } from 'mydatepicker';
import { Select2Module } from 'ng2-select2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotasCreditoRoutingModule } from './notas-credito.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotasCreditoComponent } from './notas-credito/notas-credito.component';
import { NotasCreditoMainComponent } from './notas-credito-main/notas-credito-main.component';
import { ListNotasCreditoPaisComponent } from './list-notas-credito-pais/list-notas-credito-pais.component';
import { ListNotasCreditoRciComponent } from './list-notas-credito-rci/list-notas-credito-rci.component';
import { FiltroNotasCreditoComponent } from './filtro-notas-credito/filtro-notas-credito.component';
import { DataTablesModule } from 'angular-datatables';
import { ModalCuentaComponent } from './components/modal-cuenta/modal-cuenta.component';
import { ModalDetalleNotasCreditoComponent } from './modal-detalle-notas-credito/modal-detalle-notas-credito.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    Select2Module,
    SharedModuleModule,
    DataTablesModule,
    NotasCreditoRoutingModule,
  ],
  exports: [
    ListNotasCreditoPaisComponent,
    ListNotasCreditoRciComponent,
    ModalDetalleNotasCreditoComponent,
  ],
  declarations: [
    NotasCreditoMainComponent,
    NotasCreditoComponent,
    ListNotasCreditoPaisComponent,
    ListNotasCreditoRciComponent,
    FiltroNotasCreditoComponent,
    ModalCuentaComponent,
    ModalDetalleNotasCreditoComponent,
  ]
})
export class NotasCreditoModule { }
