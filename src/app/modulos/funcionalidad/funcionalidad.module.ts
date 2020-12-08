import { FuncionalidadService } from './funcionalidad.service';
import { SharedModuleModule } from './../../compartidos/shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ListFuncionalidadComponent } from './list-funcionalidad/list-funcionalidad.component';
import { MainFuncionalidadComponent } from './main-funcionalidad/main-funcionalidad.component';
import { RouterModule } from '../../../../node_modules/@angular/router';
import { FormularioFuncionalidadComponent } from './formulario-funcionalidad/formulario-funcionalidad.component';
import { FormularioFuncionalidadMxComponent } from './formulario-funcionalidad-mx/formulario-funcionalidad-mx.component';
import { ListFuncionalidadMxComponent } from './list-funcionalidad-mx/list-funcionalidad-mx.component';
import { Select2Module } from 'ng2-select2';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    Select2Module
  ],
  declarations: [
    ListFuncionalidadComponent,
    MainFuncionalidadComponent,
    FormularioFuncionalidadComponent,
    FormularioFuncionalidadMxComponent,
    ListFuncionalidadMxComponent
  ],
  exports: [
    MainFuncionalidadComponent,
  ],
  providers: [
    FuncionalidadService
  ]
})
export class FuncionalidadModule { }
