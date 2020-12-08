import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancelacionesRoutingModule } from './cancelaciones-routing.module';
import { MainSolicitudCancelacionesComponent } from './solicitudes/main-solicitud-cancelaciones/main-solicitud-cancelaciones.component';
import { ListSolicitudCancelacionesComponent } from './solicitudes/list-solicitud-cancelaciones/list-solicitud-cancelaciones.component';
import { FiltroSolicitudCancelacionesComponent } from './solicitudes/filtro-solicitud-cancelaciones/filtro-solicitud-cancelaciones.component';
import { FormCredencialesComponent } from './credenciales/form-credenciales/form-credenciales.component';
import { ListCredencialesComponent } from './credenciales/list-credenciales/list-credenciales.component';
import { MainCredencialesComponent } from './credenciales/main-credenciales/main-credenciales.component';
import { SharedModuleModule } from 'src/app/compartidos/shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CancelacionesRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    MainSolicitudCancelacionesComponent,
    ListSolicitudCancelacionesComponent,
    FiltroSolicitudCancelacionesComponent,
    FormCredencialesComponent,
    ListCredencialesComponent,
    MainCredencialesComponent
  ]
})
export class CancelacionesModule { }
