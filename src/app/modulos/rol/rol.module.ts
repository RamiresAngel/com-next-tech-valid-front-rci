import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {  HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ListRolComponent } from './list-rol/list-rol.component';
import { MainRolComponent } from './main-rol/main-rol.component';
import { FormsModule, ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { SharedModuleModule } from '../../compartidos/shared-module/shared-module.module';
import { RolService } from './rol.service';
import { Select2Module } from 'ng2-select2';
import { FormularioRolComponent } from './formulario-rol/formulario-rol.component';
import { RolesFuncionalidadModule } from '../roles-funcionalidad/roles-funcionalidad.module';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    SharedModuleModule,
    Select2Module,
    RolesFuncionalidadModule
  ],
  declarations: [
    ListRolComponent
    , MainRolComponent
    , FormularioRolComponent
  ],
  exports : [
    MainRolComponent
  ],
  providers : [
    RolService
  ]
})
export class RolModule { }
