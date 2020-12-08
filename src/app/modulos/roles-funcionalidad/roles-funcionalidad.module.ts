import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SharedModuleModule } from '../../compartidos/shared-module/shared-module.module';
import { RolService } from '../rol/rol.service';
import { RolesFuncionalidadService } from './roles-funcionalidad.service';


@NgModule({
  imports: [
    CommonModule
    , RouterModule
    , BrowserModule
    , HttpClientModule
    , SharedModuleModule
  ],
  declarations: []
  , providers: [
    RolService
    , RolesFuncionalidadService
  ]
})
export class RolesFuncionalidadModule { }
