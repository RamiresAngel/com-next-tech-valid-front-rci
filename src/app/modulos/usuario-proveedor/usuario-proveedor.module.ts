import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioProveedorComponent } from './usuario-proveedor/usuario-proveedor.component';
import { FormularioUsuarioProveedorMxComponent } from './formulario-usuario-proveedor-mx/formulario-usuario-proveedor-mx.component';
import { ListUsuarioProveedorMxComponent } from './list-usuario-proveedor-mx/list-usuario-proveedor-mx.component';
import { ListUsuarioProveedorComponent } from './list-usuario-proveedor/list-usuario-proveedor.component';
import { MainUsuarioProveedorComponent } from './main-usuario-proveedor/main-usuario-proveedor.component';
import { FormularioUsuarioProveedorComponent } from './formulario-usuario-proveedor/formulario-usuario-proveedor.component';
import { RouterModule } from '@angular/router';
import { Select2Module } from 'ng2-select2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltroUsuariosProveedoresComponent } from './filtro-usuarios-proveedores/filtro-usuarios-proveedores.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';
import { UsuarioEmpresasComponent } from './usuario-empresas/usuario-empresas.component';
import { ContribuyenteService } from '../contribuyente/contribuyente.service';
import { FormUsuarioProveedorMxComponent } from './form-usuario-proveedor-mx/form-usuario-proveedor-mx.component';
import { UsuarioProveedorProveedorMainComponent } from './usuario-proveedor-proveedor-main/usuario-proveedor-proveedor-main.component';
import { UsuarioProveedorService } from './usuario-proveedor.service';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';
@NgModule({
  imports: [
    HttpClientModule
    , BrowserModule
    , RouterModule
    , CompartidosModule
    , DirectivasModule
    , CommonModule,
    RouterModule,
    Select2Module,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [
    UsuarioProveedorService,
    ContribuyenteService
  ],
  declarations: [
    UsuarioProveedorComponent,
    FormularioUsuarioProveedorMxComponent,
    ListUsuarioProveedorMxComponent,
    ListUsuarioProveedorComponent,
    MainUsuarioProveedorComponent,
    FormularioUsuarioProveedorComponent,
    FiltroUsuariosProveedoresComponent,
    UsuarioEmpresasComponent,
    FormUsuarioProveedorMxComponent,
    UsuarioProveedorProveedorMainComponent
  ]
})
export class UsuarioProveedorModule { }
