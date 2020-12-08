import { CentroCostosRoutingModule } from './centro-costos.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCentroCostosPaisComponent } from './list-centro-costos-pais/list-centro-costos-pais.component';
import { ListCentroCostosMxComponent } from './list-centro-costos-mx/list-centro-costos-mx.component';
import { ListCentroCostosCrComponent } from './list-centro-costos-cr/list-centro-costos-cr.component';
import { FormularioCentroCostosPaisComponent } from './formulario-centro-costos-pais/formulario-centro-costos-pais.component';
import { FormularioCentroCostosMxComponent } from './formulario-centro-costos-mx/formulario-centro-costos-mx.component';
import { FormularioCentroCostosCrComponent } from './formulario-centro-costos-cr/formulario-centro-costos-cr.component';
import { MainCentroCostosComponent } from './main-centro-costos/main-centro-costos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { Select2Module } from 'ng2-select2';
import { DirectivasModule } from '../../compartidos/directivas/directivas.module';
import { ListCentroCostosRciComponent } from './list-centro-costos-rci/list-centro-costos-rci.component';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    Select2Module,
    FormsModule,
    RouterModule,
    DirectivasModule,
    CentroCostosRoutingModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ],
  declarations: [
    ListCentroCostosPaisComponent
    , ListCentroCostosMxComponent
    , ListCentroCostosCrComponent
    , FormularioCentroCostosPaisComponent
    , FormularioCentroCostosMxComponent
    , FormularioCentroCostosCrComponent
    , MainCentroCostosComponent, ListCentroCostosRciComponent]
})
export class CentroCostosModule { }
