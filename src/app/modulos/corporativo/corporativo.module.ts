import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ListCorporativoComponent } from './list-corporativo/list-corporativo.component';
import { MainCorporativoComponent } from './main-corporativo/main-corporativo.component';
import { CorporativoService } from './corporativo.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModuleModule } from '../../compartidos/shared-module/shared-module.module';
import { FormularioCorporativoComponent } from './formulario-corporativo/formulario-corporativo.component';
import { Select2Module } from 'ng2-select2';
import { ColorPickerModule } from 'ngx-color-picker';
import { CorporativoFuncionalidadesComponent } from './corporativo-funcionalidades/corporativo-funcionalidades.component';
import { CorporativoMonedasComponent } from './corporativo-monedas/corporativo-monedas.component';
import { CorporativoRoutingModule } from './corporativo.routing.module';
import { CommonModule } from '@angular/common';

@NgModule({

  declarations: [
    MainCorporativoComponent,
    ListCorporativoComponent,
    FormularioCorporativoComponent,
    CorporativoFuncionalidadesComponent,
    CorporativoMonedasComponent
  ],
  exports: [
    MainCorporativoComponent,
  ],
  providers: [
    CorporativoService,
  ]
  , imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    CorporativoRoutingModule,
    RouterModule,
    Select2Module,
    ColorPickerModule,

    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    SharedModuleModule
  ]
})


export class CorporativoModule { }
