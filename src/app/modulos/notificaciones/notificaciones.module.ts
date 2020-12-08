import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNotificacionesComponent } from './main-notificaciones/main-notificaciones.component';
import { NotificacionesPaisComponent } from './notificaciones-pais/notificaciones-pais.component';
import { NotificacionesMxComponent } from './notificaciones-mx/notificaciones-mx.component';
import { NotificacionesCrComponent } from './notificaciones-cr/notificaciones-cr.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModuleModule } from '../../compartidos/shared-module/shared-module.module';
import { Select2Module } from 'ng2-select2';
import { DirectivasModule } from '../../compartidos/directivas/directivas.module';
import { NotificacionesService } from './notificaciones.service';
import { FormularioNotificacionesPaisComponent } from './formulario-notificaciones-pais/formulario-notificaciones-pais.component';
import { FormularioNotificacionesMxComponent } from './formulario-notificaciones-mx/formulario-notificaciones-mx.component';
import { FormularioNotificacionesCrComponent } from './formulario-notificaciones-cr/formulario-notificaciones-cr.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EnviarCorreoComponent } from './enviar-correo/enviar-correo.component';
import { ProveedoresService } from '../proveedores/proveedores.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { UsuarioService } from '../usuarios/usuario.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
@NgModule({
  imports: [
    CommonModule
    , HttpClientModule
    , FormsModule
    , ReactiveFormsModule
    , BrowserModule
    , RouterModule
    , SharedModuleModule
    , Select2Module
    , DirectivasModule
    , CKEditorModule
  ],
  providers: [
    NotificacionesService
    , ProveedoresService
    , GlobalsComponent
    , UsuarioService
    , StorageService
    , ProveedoresService
    , NotificacionesService
  ]
  , declarations: [
    MainNotificacionesComponent,
    NotificacionesPaisComponent,
    NotificacionesMxComponent,
    NotificacionesCrComponent,
    FormularioNotificacionesPaisComponent,
    FormularioNotificacionesMxComponent,
    FormularioNotificacionesCrComponent,
    EnviarCorreoComponent]
})
export class NotificacionesModule { }
