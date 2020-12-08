import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCategoriaComponent } from './main-categoria/main-categoria.component';
import { FormularioCategoriaMxComponent } from './formulario-categoria-mx/formulario-categoria-mx.component';
import { ListCategoriaMxComponent } from './list-categoria-mx/list-categoria-mx.component';
import { ListCategoriaPaisComponent } from './list-categoria-pais/list-categoria-pais.component';
import { ListCategoriaCrComponent } from './list-categoria-cr/list-categoria-cr.component';
import { FormularioCategoriaPaisComponent } from './formulario-categoria-pais/formulario-categoria-pais.component';
import { FormularioCategoriaCrComponent } from './formulario-categoria-cr/formulario-categoria-cr.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ],
  providers: [],
  declarations: [
    MainCategoriaComponent,
    FormularioCategoriaMxComponent,
    ListCategoriaMxComponent,
    ListCategoriaPaisComponent,
    ListCategoriaCrComponent,
    FormularioCategoriaPaisComponent,
    FormularioCategoriaCrComponent
  ]
})
export class CategoriaModule {}
