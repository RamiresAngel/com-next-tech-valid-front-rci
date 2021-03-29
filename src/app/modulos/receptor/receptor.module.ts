import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AltaReceptorComponent } from './alta-receptor/alta-receptor.component';
import { ListReceptorComponent } from './list-receptor/list-receptor.component';
import { EditReceptorComponent } from './edit-receptor/edit-receptor.component';
import { MainReceptorComponent } from './main-receptor/main-receptor.component';
import { ReceptorService } from './receptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AjustesReceptorComponent } from './ajustes-receptor/ajustes-receptor.component';
import { AjustesDgtReceptorComponent } from './ajustes-dgt-receptor/ajustes-dgt-receptor.component';
import { Select2Module } from 'ng2-select2';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';

@NgModule({

  declarations: [
    MainReceptorComponent,
    AltaReceptorComponent,
    ListReceptorComponent,
    EditReceptorComponent,
    AjustesReceptorComponent,
    AjustesDgtReceptorComponent,

  ],
  exports: [
    MainReceptorComponent
  ],
  providers: [
    ReceptorService
  ]
  , imports: [
    HttpClientModule,
    Select2Module,
    BrowserModule,
    FormsModule,
    RouterModule,
    CompartidosModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ]
})


export class ReceptorModule { }
