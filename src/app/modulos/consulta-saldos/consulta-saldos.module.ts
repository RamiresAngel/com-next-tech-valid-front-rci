import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainConsultaSaldosComponent } from './main-consulta-saldos/main-consulta-saldos.component';
import { ListConsultaSaldosComponent } from './list-consulta-saldos/list-consulta-saldos.component';
import { ListConsultaSaldosMxComponent } from './list-consulta-saldos-mx/list-consulta-saldos-mx.component';
import { RouterModule } from '@angular/router';
import { FiltroSaldosComponent } from './filtro-saldos/filtro-saldos.component';
import { MyDatePickerModule } from 'mydatepicker';
import { Select2Module } from 'ng2-select2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MyDatePickerModule,
    Select2Module,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ],
  declarations: [
    MainConsultaSaldosComponent,
    ListConsultaSaldosComponent,
    ListConsultaSaldosMxComponent,
    FiltroSaldosComponent,
  ]
})
export class ConsultaSaldosModule { }
