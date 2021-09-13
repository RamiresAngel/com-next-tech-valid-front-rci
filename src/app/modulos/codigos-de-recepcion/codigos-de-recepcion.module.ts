import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCodigosRecepcionComponent } from './main-codigos-recepcion/main-codigos-recepcion.component';
import { ListCodigoPaisComponent } from './list-codigo-pais/list-codigo-pais.component';
import { ListCodigoMxComponent } from './list-codigo-mx/list-codigo-mx.component';
import { ListCodigoCrComponent } from './list-codigo-cr/list-codigo-cr.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Select2Module } from 'ng2-select2';
import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';
import { CodigosDeRecepcionService } from './codigos-de-recepcion.service';
import { FiltroCodigosComponent } from './filtro-codigos/filtro-codigos.component';
import { DataTablesModule } from 'angular-datatables';
import { MyDatePickerModule } from 'mydatepicker';
import { CargaDocumentosModule } from '../carga-documentos/carga-documentos.module';
import { CompartidosModule } from './../../compartidos/compartidos.module';


@NgModule({
  imports: [
    CommonModule
    , HttpClientModule
    , FormsModule
    , ReactiveFormsModule
    , BrowserModule
    , RouterModule
    , CompartidosModule
    , Select2Module
    , DirectivasModule
    , DataTablesModule
    , CargaDocumentosModule
    , MyDatePickerModule
  ],
  providers: [
    CodigosDeRecepcionService
  ],
  declarations: [MainCodigosRecepcionComponent
    , ListCodigoPaisComponent
    , ListCodigoMxComponent
    , ListCodigoCrComponent
    , FiltroCodigosComponent
  ]
})
export class CodigosDeRecepcionModule { }
