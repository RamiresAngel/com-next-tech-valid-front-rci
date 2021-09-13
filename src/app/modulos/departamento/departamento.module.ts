import { DepartamentoRoutingModule } from './departamento.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDepartamentoComponent } from './main-departamento/main-departamento.component';
import { FormularioDepartamentoComponent } from './formulario-departamento/formulario-departamento.component';
import { ListDepartamentoComponent } from './list-departamento/list-departamento.component';
import { RouterModule } from '@angular/router';
import { FormularioDepartamentoMxComponent } from './formulario-departamento/formulario-departamento-mx/formulario-departamento-mx.component';
import { ListDepartamentoMxComponent } from './list-departamento/list-departamento-mx/list-departamento-mx.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';
import { ListDepartamentoRciComponent } from './list-departamento/list-departamento-rci/list-departamento-rci.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    Select2Module,
    DepartamentoRoutingModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ],
  declarations: [
    MainDepartamentoComponent,
    FormularioDepartamentoComponent,
    ListDepartamentoComponent,
    FormularioDepartamentoMxComponent,
    ListDepartamentoMxComponent,
    ListDepartamentoRciComponent
  ],
  exports: [
    FormularioDepartamentoMxComponent,
    ListDepartamentoMxComponent,
    MainDepartamentoComponent
  ]
})
export class DepartamentoModule { }
