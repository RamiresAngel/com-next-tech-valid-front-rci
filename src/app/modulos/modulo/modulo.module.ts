import { ModuloService } from './modulo.service';
import { SharedModuleModule } from '../../compartidos/shared-module/shared-module.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ListModuloComponent } from './list-modulo/list-modulo.component';
import { MainModuloComponent } from './main-modulo/main-modulo.component';
import { ListModuloMxComponent } from './list-modulo-mx/list-modulo-mx.component';
import { FormularioModuloMxComponent } from './formulario-modulo-mx/formulario-modulo-mx.component';
import { FormularioModuloComponent } from './formulario-modulo/formulario-modulo.component';
import { Select2Module } from 'ng2-select2';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    SharedModuleModule,
    Select2Module
  ],
  declarations: [
    ListModuloComponent,
    MainModuloComponent,
    ListModuloMxComponent,
    FormularioModuloMxComponent,
    FormularioModuloComponent
  ],
  exports: [MainModuloComponent],
  providers: [ModuloService]
})
export class ModuloModule {}
