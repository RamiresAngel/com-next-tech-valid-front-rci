import { UpDebitoComponent } from './up-debito/up-debito.component';
import { UpCreditoComponent } from './up-credito/up-credito.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpFacturaComponent } from './up-factura/up-factura.component';
import { UpMainComponent } from './up-main/up-main.component';
import { DocumentoAddService } from './documento-add.service';
import { Select2Module } from 'ng2-select2';




@NgModule({

  declarations: [
    UpFacturaComponent,
    UpCreditoComponent,
    UpDebitoComponent,
    UpMainComponent
  ],
  exports: [
    UpMainComponent

  ],
  providers: [
    DocumentoAddService
  ]
  , imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    Select2Module,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ]
})


export class UpFacturaModule { }
/* Is 26:3
You will keep in perfect peace
those whose minds are steadfast,
because they trust in you.
*/
