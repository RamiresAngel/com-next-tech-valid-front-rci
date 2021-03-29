import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RolService } from '../rol/rol.service';
import { RolesFuncionalidadService } from './roles-funcionalidad.service';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';


@NgModule({
  imports: [
    CommonModule
    , RouterModule
    , BrowserModule
    , HttpClientModule
    , CompartidosModule
  ],
  declarations: []
  , providers: [
    RolService
    , RolesFuncionalidadService
  ]
})
export class RolesFuncionalidadModule { }
