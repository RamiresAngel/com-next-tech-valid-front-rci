import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ListSucursalComponent } from './list-sucursal/list-sucursal.component';
import { MainSucursalComponent } from './main-sucursal/main-sucursal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SucursalService } from './sucursal.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { SharedModuleModule } from '../../compartidos/shared-module/shared-module.module';
import { Select2Module } from 'ng2-select2';
import { FormularioSucursalComponent } from './formulario-sucursal/formulario-sucursal.component';
import { FiltroSucursalComponent } from './filtro-sucursal/filtro-sucursal.component';
import { ListSucursalPaisComponent } from './list-sucursal-pais/list-sucursal-pais.component';
import { ListSucursalCrComponent } from './list-sucursal-cr/list-sucursal-cr.component';
import { FormularioSucursalPaisComponent } from './formulario-sucursal-pais/formulario-sucursal-pais.component';
import { FormularioSucursalCrComponent } from './formulario-sucursal-cr/formulario-sucursal-cr.component';
import { DirectivasModule } from '../../compartidos/directivas/directivas.module';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { ConfiguracionBuzonComponent } from './configuracion-buzon/configuracion-buzon.component';
import { SucursalRoutingModule } from './sucursal-routing.module';
import { CommonModule } from '@angular/common';
import { ListSucursaRciComponent } from './list-sucursa-rci/list-sucursa-rci.component';

@NgModule({

  declarations: [
    MainSucursalComponent,
    ListSucursalComponent,
    FormularioSucursalComponent,
    FiltroSucursalComponent,
    ListSucursalPaisComponent,
    ListSucursalCrComponent,
    FormularioSucursalPaisComponent,
    FormularioSucursalCrComponent,
    ConfiguracionBuzonComponent,
    ListSucursaRciComponent
  ],
  exports: [
    MainSucursalComponent
  ],
  providers: [
    SucursalService,
    HttpClient2
  ]
  , imports: [
    CommonModule,
    DirectivasModule,
    HttpClientModule,
    // BrowserModule,
    Select2Module,
    FormsModule,
    RouterModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    SharedModuleModule,
    SucursalRoutingModule

  ]
})


export class SucursalModule { }
