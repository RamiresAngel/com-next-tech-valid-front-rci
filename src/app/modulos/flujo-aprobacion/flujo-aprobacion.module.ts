import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainFlujoAprobacionComponent } from './main-flujo-aprobacion/main-flujo-aprobacion.component';
import { ListFlujoAprobacionPaisComponent } from './list-flujo-aprobacion-pais/list-flujo-aprobacion-pais.component';
import { ListFlujoAprobacionMxComponent } from './list-flujo-aprobacion-mx/list-flujo-aprobacion-mx.component';
import { FormularioFlujoAprobacionPaisComponent } from './formulario-flujo-aprobacion-pais/formulario-flujo-aprobacion-pais.component';
import { FormularioFlujoAprobacionPaisMxComponent } from './formulario-flujo-aprobacion-pais-mx/formulario-flujo-aprobacion-pais-mx.component';
import { FormularioFlujoAprobacionPaisRdComponent } from './formulario-flujo-aprobacion-pais-rd/formulario-flujo-aprobacion-pais-rd.component';
import { ListFlujoAprobacionCrComponent } from './list-flujo-aprobacion-cr/list-flujo-aprobacion-cr.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Select2Module } from 'ng2-select2';
import { DirectivasModule } from '../../compartidos/directivas/directivas.module';
import { FlujoAprobacionService } from './flujo-aprobacion.service';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { CargaMonedasComponent } from './carga-monedas/carga-monedas.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';


export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: '$ ',
  suffix: '',
  thousands: '.',
  nullable: true
};

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
    , NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  exports: [
    MainFlujoAprobacionComponent
  ],
  providers: [
    FlujoAprobacionService
    , HttpClient2
    , CompartidosService
  ]
  , declarations: [
    MainFlujoAprobacionComponent
    , ListFlujoAprobacionPaisComponent
    , ListFlujoAprobacionMxComponent
    , FormularioFlujoAprobacionPaisComponent
    , FormularioFlujoAprobacionPaisMxComponent
    , FormularioFlujoAprobacionPaisRdComponent
    , ListFlujoAprobacionCrComponent, CargaMonedasComponent
  ]
})
export class FlujoAprobacionModule { }
