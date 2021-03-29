import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompartidosModule } from './../../compartidos/compartidos.module';

import { MainConfiguracionBuzonComponent } from './main-configuracion-buzon/main-configuracion-buzon.component';
import { FormualrioConfiguracionBuzonPaisComponent } from './formualrio-configuracion-buzon-pais/formualrio-configuracion-buzon-pais.component';
import { FormualrioConfiguracionBuzonMxComponent } from './formualrio-configuracion-buzon-mx/formualrio-configuracion-buzon-mx.component';
import { FormualrioConfiguracionBuzonCrComponent } from './formualrio-configuracion-buzon-cr/formualrio-configuracion-buzon-cr.component';
import { ConfiguracionBuzonService } from './configuracion-buzon.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { Select2Module } from 'ng2-select2';
import { DirectivasModule } from '../../compartidos/directivas/directivas.module';


@NgModule({
  imports: [
    CommonModule
    , Select2Module
    , DirectivasModule
    , CompartidosModule
    , RouterModule
    , BrowserModule
    , FormsModule
    , ReactiveFormsModule
    , HttpClientModule
  ],
  declarations: [MainConfiguracionBuzonComponent
    , FormualrioConfiguracionBuzonPaisComponent
    , FormualrioConfiguracionBuzonMxComponent
    , FormualrioConfiguracionBuzonCrComponent
  ],
  providers: [
    ConfiguracionBuzonService
  ]
})
export class ConfiguracionBuzonModule { }
