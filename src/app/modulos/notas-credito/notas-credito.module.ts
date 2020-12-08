import { SharedModuleModule } from 'src/app/compartidos/shared-module/shared-module.module';
import { MyDatePickerModule } from 'mydatepicker';
import { Select2Module } from 'ng2-select2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotasCreditoRoutingModule } from './notas-credito.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotasCreditoComponent } from './notas-credito/notas-credito.component';
import { NotasCreditoMainComponent } from './notas-credito-main/notas-credito-main.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    Select2Module,
    SharedModuleModule,
    NotasCreditoRoutingModule,
  ],
  declarations: [
    NotasCreditoMainComponent,
    NotasCreditoComponent,
  ]
})
export class NotasCreditoModule { }
