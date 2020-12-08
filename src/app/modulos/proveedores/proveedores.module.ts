import { ProveedoresRoutingModule } from './proveedores.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainProveedoresComponent } from './main-proveedores/main-proveedores.component';
import { ListProveedoresPaisComponent } from './list-proveedores-pais/list-proveedores-pais.component';
import { ListProveedoresMxComponent } from './list-proveedores-mx/list-proveedores-mx.component';
import { ListProveedoresCrComponent } from './list-proveedores-cr/list-proveedores-cr.component';
import { FiltroProveedoresComponent } from './filtro-proveedores/filtro-proveedores.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModuleModule } from '../../compartidos/shared-module/shared-module.module';
import { Select2Module } from 'ng2-select2';
import { DirectivasModule } from '../../compartidos/directivas/directivas.module';
import { ProveedoresService } from './proveedores.service';

import { DataTablesModule } from 'angular-datatables';
import { FormularioProveedoresPaisComponent } from './formulario-proveedores-pais/formulario-proveedores-pais.component';
import { FormularioProveedoresMxComponent } from './formulario-proveedores-mx/formulario-proveedores-mx.component';
import { FormularioProveedoresCrComponent } from './formulario-proveedores-cr/formulario-proveedores-cr.component';
import { DepartamentosProveedoresComponent } from './departamentos-proveedores/departamentos-proveedores.component';
import { EstadoCuentaComponent } from './estado-cuenta/estado-cuenta.component';
import { MyDatePickerModule } from 'mydatepicker';
import { TipoGastoProveedoresComponent } from './tipo-gasto-proveedores/tipo-gasto-proveedores.component';
import { CuentasProveedoresComponent } from './cuentas-proveedores/cuentas-proveedores.component';
import { RelacionContribuyenteProveedorComponent } from './relacion-contribuyente-proveedor/relacion-contribuyente-proveedor.component';
import { ListProveedoresRciComponent } from './list-proveedores-rci/list-proveedores-rci.component';
import { FiltroProveedoresRciComponent } from './filtro-proveedores-rci/filtro-proveedores-rci.component';
import { FormularioProveedoresRciComponent } from './formulario-proveedores-rci/formulario-proveedores-rci.component';

@NgModule({
  imports: [
    CommonModule
    , HttpClientModule
    , FormsModule
    , ReactiveFormsModule
    , RouterModule
    , Select2Module
    , SharedModuleModule
    , DirectivasModule
    , DataTablesModule
    , MyDatePickerModule
    , ProveedoresRoutingModule

  ],
  providers: [
    ProveedoresService
  ]
  , declarations: [
    MainProveedoresComponent
    , ListProveedoresPaisComponent
    , ListProveedoresMxComponent
    , ListProveedoresCrComponent
    , FiltroProveedoresComponent
    , FormularioProveedoresPaisComponent
    , FormularioProveedoresMxComponent
    , FormularioProveedoresCrComponent, DepartamentosProveedoresComponent, EstadoCuentaComponent
    , FormularioProveedoresCrComponent, DepartamentosProveedoresComponent, TipoGastoProveedoresComponent
    , FormularioProveedoresCrComponent, DepartamentosProveedoresComponent, CuentasProveedoresComponent, RelacionContribuyenteProveedorComponent, ListProveedoresRciComponent, FiltroProveedoresRciComponent, FormularioProveedoresRciComponent
  ]
})
export class ProveedoresModule { }
