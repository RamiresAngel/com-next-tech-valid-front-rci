import { EstatusService } from './estatus.service';
import { NgModule } from '@angular/core'; import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AltaEstatusComponent } from './alta-estatus/alta-estatus.component';
import { EditEstatusComponent } from './edit-estatus/edit-estatus.component';
import { ListEstatusComponent } from './list-estatus/list-estatus.component';
import { ListEstatusAcuseComponent } from './list-estatus-acuse/list-estatus-acuse.component';
import { AltaEstatusAcuseComponent } from './alta-estatus-acuse/alta-estatus-acuse.component';
import { EditEstatusAcuseComponent } from './edit-estatus-acuse/edit-estatus-acuse.component';
import { EditEstatusDgtComponent } from './edit-estatus-dgt/edit-estatus-dgt.component';
import { AltaEstatusDgtComponent } from './alta-estatus-dgt/alta-estatus-dgt.component';
import { ListEstatusDgtComponent } from './list-estatus-dgt/list-estatus-dgt.component';
import { MainEstatusComponent } from './main-estatus/main-estatus.component';
import { FormsModule, ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    CompartidosModule
  ],
  declarations: [AltaEstatusComponent,
    EditEstatusComponent,
    ListEstatusComponent,
    ListEstatusAcuseComponent,
    AltaEstatusAcuseComponent,
    EditEstatusAcuseComponent,
    EditEstatusDgtComponent,
    AltaEstatusDgtComponent,
    ListEstatusDgtComponent,
    MainEstatusComponent],
  exports:
    [
      MainEstatusComponent
    ],
  providers: [
    EstatusService
  ]
})
export class EstatusModule { }
