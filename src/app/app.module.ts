import { CompartidosModule } from './compartidos/compartidos.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { NotasDebitoComponent } from './modulos/notas-debito/notas-debito/notas-debito.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './compartidos/cabecera/cabecera.component';
import { SidebarComponent } from './compartidos/sidebar/sidebar.component';
import { ContenidoComponent } from './compartidos/contenido/contenido.component';
import { LoginComponent } from './paginas/login/login.component';
import { ErrorComponent } from './paginas/error/error.component';
import { HomeComponent } from './paginas/home/home.component';
// modulos
import { CorporativoModule } from './modulos/corporativo/corporativo.module';
// import { SucursalModule } from './modulos/sucursal/sucursal.module';
import { ReceptorModule } from './modulos/receptor/receptor.module';
import { UpFacturaModule } from './modulos/documentos_add/documentos_add.module';
import { FuncionalidadModule } from './modulos/funcionalidad/funcionalidad.module';
import { ModuloModule } from './modulos/modulo/modulo.module';
import { RolModule } from './modulos/rol/rol.module';
import { UsuariosModule } from './modulos/usuarios/usuarios.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AuthorizatedGuard } from './compartidos/login/authorizated-guard';
import { StorageService } from './compartidos/login/storage.service';
import { AuthenticationService } from './compartidos/login/authentication.service';
import { GlobalsComponent } from './compartidos/globals/globals.component';
import { ModalRolesComponent } from './modulos/modal-roles/modal-roles.component';
import { ModalRolesService } from './modulos/modal-roles/modal-roles.service';
import { FacturasModule } from './modulos/facturas/facturas.module';
import { CancelarDocumentoService } from './modulos/documentos_add/cancelar-documento.service';
import { NotasCreditoModule } from './modulos/notas-credito/notas-credito.module';
import { NotasDebitoModule } from './modulos/notas-debito/notas-debito.module';
import { EstatusModule } from './modulos/estatus/estatus.module';
import { MainFacturasComponent } from './modulos/main-facturas/main-facturas.component';
import { MainNotaDebitoComponent } from './modulos/main-nota-debito/main-nota-debito.component';
// import { FiltroFacturasComponent } from './compartidos/filtro-facturas/filtro-facturas.component';
import { FacturaComponent } from './modulos/facturas/factura/factura.component';
import { MainFacturasModule } from './modulos/main-facturas/main-facturas.module';
import { NotasCreditoService } from './../app/modulos/notas-credito/notas-credito.service';
import { NotasDebitoService } from './../app/modulos/notas-debito/notas-debito.service';
import { InicioComponent } from './compartidos/inicio/inicio.component';
import { EnviarDgtService } from './compartidos/enviarDgt/enviar-dgt.service';
import { DireccionService } from './compartidos/direccion/direccion.service';
import { Select2Module } from 'ng2-select2';
import { CentroCostosModule } from './modulos/centro-costos/centro-costos.module';
import { ParametrosSistemaModule } from './modulos/parametros-sistema/parametros-sistema.module';
import { CategoriaModule } from './modulos/categoria/categoria.module';
import { DepartamentoModule } from './modulos/departamento/departamento.module';
import { LibroCajaChicaModule } from './modulos/libro-caja-chica/libro-caja-chica.module';
import { ConfiguracionBuzonModule } from './modulos/configuracion-buzon/configuracion-buzon.module';
import { PeriodoValidacionModule } from './modulos/periodo-validacion/periodo-validacion.module';
import { TipoDocumentoSapModule } from './modulos/tipo-documento-sap/tipo-documento-sap.module';
import { NivelGastoModule } from './modulos/nivel-gasto/nivel-gasto.module';
import { ContribuyenteModule } from './modulos/contribuyente/contribuyente.module';
import { MetodoPagoModule } from './modulos/metodo-pago/metodo-pago.module';
import { CuentaModule } from './modulos/cuenta/cuenta.module';
import { CuentaAgrupacionModule } from './modulos/cuenta-agrupacion/cuenta-agrupacion.module';
import { SolicitudGeneralModule } from './modulos/solicitud-general/solicitud-general.module';
import { GastosViajeModule } from './modulos/gastos-viaje/gastos-viaje.module';
import { FlujoAprobacionModule } from './modulos/flujo-aprobacion/flujo-aprobacion.module';
import { CajaChicaModule } from './modulos/caja-chica/caja-chica.module';
import { CargaFacturasModule } from './modulos/flujo-aprobacion/carga-facturas/carga-facturas.module';
import { ProveedoresModule } from './modulos/proveedores/proveedores.module';
import { TipoCuentaModule } from './modulos/tipo-cuenta/tipo-cuenta.module';
import { CargaDocumentosModule } from './modulos/carga-documentos/carga-documentos.module';
import { AcreedoresDiversosModule } from './modulos/acreedores-diversos/acreedores-diversos.module';
import { AmortizacionModule } from './modulos/amortizacion/amortizacion.module';
import { TipoGastoModule } from './modulos/tipo-gasto/tipo-gasto.module';
import { DynamicLoginComponent } from './paginas/dynamic-login/dynamic-login/dynamic-login.component';
import { UsuarioProveedorModule } from './modulos/usuario-proveedor/usuario-proveedor.module';
import { ModalRecPasswordComponent } from './paginas/modal-rec-password/modal-rec-password.component';
import { DescuentoProntoPagoModule } from './modulos/descuento-pronto-pago/descuento-pronto-pago.module';
import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es-PY';
import { ModalPPComponent } from './compartidos/modal-pp/modal-pp.component';
import { OrdenCompraModule } from './modulos/orden-compra/orden-compra.module';
import { CodigosDeRecepcionModule } from './modulos/codigos-de-recepcion/codigos-de-recepcion.module';
import { NotificacionesModule } from './modulos/notificaciones/notificaciones.module';
import { ComprobacionesGeneralModule } from './modulos/comprobaciones-general/comprobaciones-general.module';
import { ComprobacionesCajaChicaModule } from './modulos/comprobaciones-caja-chica/comprobaciones-caja-chica.module';
import { ListarCfdiModule } from './modulos/listar-cfdi/listar-cfdi.module';
import { ComplementoPagoModule } from './modulos/complemento-pago/complemento-pago.module';
import { SustitucionCfdiModule } from './modulos/sustitucion-cfdi/sustitucion-cfdi.module';
import { BandejaAprobacionModule } from './modulos/bandeja-aprobacion/bandeja-aprobacion.module';
import { ConsultaSaldosModule } from './modulos/consulta-saldos/consulta-saldos.module';
import { ModalRessetPaswordComponent } from './paginas/modal-resset-pasword/modal-resset-pasword.component';
import { RessetPasswordComponent } from './paginas/resset-password/resset-password.component';
import { RouterModule } from '@angular/router';
import { FacturasProveedorModule } from './modulos/facturas-proveedor/facturas-proveedor.module';

import { environment } from '../environments/environment';
import { ModalSuplenciaRciComponent } from './modulos/modal-suplencia-rci/modal-suplencia-rci.component';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { MyDatePickerModule } from 'mydatepicker';
import { ModalSuplenciaService } from './modulos/modal-suplencia-rci/modal-suplencia.service';
import { PrestacionesModule } from './modulos/prestaciones/prestaciones.module';

registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    SidebarComponent,
    ContenidoComponent,
    LoginComponent,
    ErrorComponent,
    HomeComponent,
    ModalRolesComponent,
    MainFacturasComponent,
    MainNotaDebitoComponent,
    // FiltroFacturasComponent,
    FacturaComponent,
    NotasDebitoComponent,
    InicioComponent,
    DynamicLoginComponent,
    ModalRecPasswordComponent,
    ModalPPComponent,
    ModalRessetPaswordComponent,
    RessetPasswordComponent,
    ModalSuplenciaRciComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),

    // DynamicLoginModule,
    AppRoutingModule,
    CorporativoModule,
    ConsultaSaldosModule,
    MyDatePickerModule,
    MyDateRangePickerModule,
    // SucursalModule,
    ReceptorModule,
    UpFacturaModule,
    CompartidosModule,
    FuncionalidadModule,
    ModuloModule,
    RolModule,
    FormsModule,
    HttpClientModule,
    CajaChicaModule,
    HttpModule,
    UsuariosModule,
    FacturasModule,
    NotasCreditoModule,
    NotasDebitoModule,
    EstatusModule,
    MainFacturasModule,
    Select2Module,
    CentroCostosModule,
    ParametrosSistemaModule,
    CategoriaModule,
    DepartamentoModule,
    LibroCajaChicaModule,
    ConfiguracionBuzonModule,
    PeriodoValidacionModule,
    TipoDocumentoSapModule,
    NivelGastoModule,
    ContribuyenteModule,
    MetodoPagoModule,
    CuentaModule,
    CuentaAgrupacionModule,
    SolicitudGeneralModule,
    GastosViajeModule,
    FlujoAprobacionModule,
    CargaFacturasModule,
    ProveedoresModule,
    TipoCuentaModule,
    CargaDocumentosModule,
    AcreedoresDiversosModule,
    AmortizacionModule,
    TipoGastoModule,
    UsuarioProveedorModule,
    DescuentoProntoPagoModule,
    OrdenCompraModule,
    CodigosDeRecepcionModule,
    NotificacionesModule,
    ComprobacionesGeneralModule,
    ComprobacionesCajaChicaModule,
    ListarCfdiModule,
    ComplementoPagoModule,
    SustitucionCfdiModule,
    BandejaAprobacionModule,
    RouterModule,
    FacturasProveedorModule,
    PrestacionesModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ],
  exports: [AppComponent, ModalRolesComponent, ModalSuplenciaRciComponent],
  providers: [
    AuthorizatedGuard,
    StorageService,
    FormsModule,
    AuthenticationService,
    GlobalsComponent,
    ModalRolesService,
    ModalSuplenciaService,
    CancelarDocumentoService,
    NotasCreditoService,
    NotasDebitoService,
    EnviarDgtService,
    DireccionService,
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
