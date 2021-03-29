import { UsuarioService } from './usuario.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ListUsuarioComponent } from './list-usuario/list-usuario.component';
import { MainUsuarioComponent } from './main-usuario/main-usuario.component';
import { ListUsuarioMxComponent } from './list-usuario-mx/list-usuario-mx.component';
import { FormularioUsuarioMxComponent } from './formulario-usuario-mx/formulario-usuario-mx.component';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';
import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';
import { ModalRolesCcComponent } from './modal-roles-cc/modal-roles-cc.component';
import { Select2Module } from 'ng2-select2';
import { FormularioUsuarioRciComponent } from './formulario-usuario-rci/formulario-usuario-rci.component';
import { ListUsuarioRciComponent } from './list-usuario-rci/list-usuario-rci.component';
import { ModalSaldoRciComponent } from './modal-saldo-rci/modal-saldo-rci.component';
import { ModalSitioRciComponent } from './modal-sitio-rci/modal-sitio-rci.component';
import { ModalPrestacionRciComponent } from './modal-prestacion-rci/modal-prestacion-rci.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgSelectModule } from '@ng-select/ng-select';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';
@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    Select2Module,
    CompartidosModule,
    DirectivasModule,
    NgxCurrencyModule,
    NgSelectModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ],
  declarations: [
    ListUsuarioComponent,
    MainUsuarioComponent,
    ListUsuarioMxComponent,
    FormularioUsuarioMxComponent,
    FormularioUsuarioComponent,
    ModalRolesCcComponent,
    FormularioUsuarioRciComponent,
    ListUsuarioRciComponent,
    ModalSaldoRciComponent,
    ModalSitioRciComponent,
    ModalPrestacionRciComponent
  ],
  exports: [MainUsuarioComponent],
  providers: [UsuarioService]
})
export class UsuariosModule { }
