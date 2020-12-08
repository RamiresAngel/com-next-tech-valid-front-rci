import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainListarCfdiComponent } from './main-listar-cfdi/main-listar-cfdi.component';
import { ListarCfdiPaisComponent } from './listar-cfdi-pais/listar-cfdi-pais.component';
import { ListarCfdiMxComponent } from './listar-cfdi-mx/listar-cfdi-mx.component';
import { FiltrosCfdiComponent } from './filtros-cfdi/filtros-cfdi.component';
import { ListarCfdiCrComponent } from './listar-cfdi-cr/listar-cfdi-cr.component';

import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Select2Module } from 'ng2-select2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModuleModule } from 'src/app/compartidos/shared-module/shared-module.module';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { DataTablesModule } from 'angular-datatables';
import { MyDatePickerModule } from 'mydatepicker';
import { DetalleComplementosComponent } from './detalle-complementos/detalle-complementos.component';
import { ListarEstatusCfdiComponent } from './listar-estatus-cfdi/listar-estatus-cfdi.component';
import { MainEstatusCfdiComponent } from './main-estatus-cfdi/main-estatus-cfdi.component';
import { FiltroCfdiCargaSimpleComponent } from './filtro-cfdi-carga-simple/filtro-cfdi-carga-simple.component';
import { ListarCfdiCsMxComponent } from './listar-cfdi-cs-mx/listar-cfdi-cs-mx.component';
import { ListarCfdiRdComponent } from './listar-cfdi-rd/listar-cfdi-rd.component';
import { FiltroCfdiRdComponent } from './listar-cfdi-rd/filtro-cfdi-rd/filtro-cfdi-rd.component';
import { TablaCfdiRdComponent } from './listar-cfdi-rd/tabla-cfdi-rd/tabla-cfdi-rd.component';



@NgModule({
  imports: [
    CommonModule
    , DirectivasModule
    , HttpClientModule
    , BrowserModule
    , Select2Module
    , FormsModule
    , ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
    , RouterModule
    , SharedModuleModule
    , DataTablesModule
    , MyDatePickerModule
  ],
  declarations: [
    MainListarCfdiComponent
    , ListarCfdiPaisComponent
    , ListarCfdiMxComponent
    , FiltrosCfdiComponent
    , ListarCfdiCrComponent, DetalleComplementosComponent, ListarEstatusCfdiComponent, MainEstatusCfdiComponent, FiltroCfdiCargaSimpleComponent, ListarCfdiCsMxComponent, ListarCfdiRdComponent, FiltroCfdiRdComponent, TablaCfdiRdComponent
  ]
  , providers: [
    HttpClient2
  ]
})
export class ListarCfdiModule { }
