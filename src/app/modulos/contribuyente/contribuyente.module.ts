import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompartidosModule } from './../../compartidos/compartidos.module';

import { ListContribuyentePaisComponent } from './list-contribuyente-pais/list-contribuyente-pais.component';
import { FormularioContribuyentePaisComponent } from './formulario-contribuyente-pais/formulario-contribuyente-pais.component';
import { ListContribuyenteMxComponent } from './list-contribuyente-mx/list-contribuyente-mx.component';
import { FormularioContribuyenteMxComponent } from './formulario-contribuyente-mx/formulario-contribuyente-mx.component';
import { MainContribuyenteComponent } from './main-contribuyente/main-contribuyente.component';
import { ContribuyenteService } from './contribuyente.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Select2Module } from 'ng2-select2';
import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';
import { ContribuyenteRoutingModule } from './contribuyente.routing.module';
import { ListContribuyenteRciComponent } from './list-contribuyente-rci/list-contribuyente-rci.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    Select2Module,
    FormsModule,
    RouterModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    ContribuyenteRoutingModule,
    CompartidosModule,
    DirectivasModule
  ],
  declarations: [
    ListContribuyentePaisComponent
    , FormularioContribuyentePaisComponent
    , ListContribuyenteMxComponent
    , FormularioContribuyenteMxComponent
    , MainContribuyenteComponent, ListContribuyenteRciComponent
  ]
  , providers: [
    ContribuyenteService,
  ]
})
export class ContribuyenteModule { }
