import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainParametrosSistemaComponent } from './main-parametros-sistema/main-parametros-sistema.component';
import { ListaParametrosSistemaPaisComponent } from './lista-parametros-sistema-pais/lista-parametros-sistema-pais.component';
import { ListaParametrosSistemaMxComponent } from './lista-parametros-sistema-mx/lista-parametros-sistema-mx.component';
import { ListaParametrosSistemaCrComponent } from './lista-parametros-sistema-cr/lista-parametros-sistema-cr.component';
import { ListaParametrosSistemaRciComponent } from './lista-parametros-sistema-rci/lista-parametros-sistema-rci.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { SharedModuleModule } from '../../compartidos/shared-module/shared-module.module';
import { Select2Module } from 'ng2-select2';
import { DirectivasModule } from '../../compartidos/directivas/directivas.module';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { FormularioParametrosSistemaPaisComponent } from './formulario-parametros-sistema-pais/formulario-parametros-sistema-pais.component';
import { FormularioParametrosSistemaCrComponent } from './formulario-parametros-sistema-cr/formulario-parametros-sistema-cr.component';
import { FormularioParametrosSistemaMxComponent } from './formulario-parametros-sistema-mx/formulario-parametros-sistema-mx.component';
import { ParametrosSistemaService } from './parametros-sistema.service';

@NgModule({
  imports: [
    CommonModule
    , DirectivasModule
    , Select2Module
    , SharedModuleModule
    , RouterModule
    , BrowserModule
    , FormsModule
    , ReactiveFormsModule
    , HttpClientModule
    , ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ],
  declarations: [
    MainParametrosSistemaComponent
    , ListaParametrosSistemaPaisComponent
    , ListaParametrosSistemaMxComponent
    , ListaParametrosSistemaCrComponent
    , ListaParametrosSistemaRciComponent
    , FormularioParametrosSistemaPaisComponent
    , FormularioParametrosSistemaCrComponent
    , FormularioParametrosSistemaMxComponent
  ],
  providers: [
    HttpClient2
    , ParametrosSistemaService
  ]

})
export class ParametrosSistemaModule { }
