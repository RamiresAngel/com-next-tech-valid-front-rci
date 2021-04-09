import { MainBandejaAprobacionComponent } from './modulos/bandeja-aprobacion/main-bandeja-aprobacion/main-bandeja-aprobacion.component';
import { ComplementoPaisComponent } from './modulos/complemento-pago/complemento-pais/complemento-pais.component';
import { MainComplementoPagoComponent } from './modulos/complemento-pago/main-complemento-pago/main-complemento-pago.component';
import { ListarCfdiPaisComponent } from './modulos/listar-cfdi/listar-cfdi-pais/listar-cfdi-pais.component';
import { MainListarCfdiComponent } from './modulos/listar-cfdi/main-listar-cfdi/main-listar-cfdi.component';
import { FormularioNotificacionesPaisComponent } from './modulos/notificaciones/formulario-notificaciones-pais/formulario-notificaciones-pais.component';
import { MainNotificacionesComponent } from './modulos/notificaciones/main-notificaciones/main-notificaciones.component';
import { ListCodigoPaisComponent } from './modulos/codigos-de-recepcion/list-codigo-pais/list-codigo-pais.component';
import { MainCodigosRecepcionComponent } from './modulos/codigos-de-recepcion/main-codigos-recepcion/main-codigos-recepcion.component';
import { AltaEstatusDgtComponent } from './modulos/estatus/alta-estatus-dgt/alta-estatus-dgt.component';
import { EditEstatusDgtComponent } from './modulos/estatus/edit-estatus-dgt/edit-estatus-dgt.component';
import { ListEstatusDgtComponent } from './modulos/estatus/list-estatus-dgt/list-estatus-dgt.component';
import { AltaEstatusAcuseComponent } from './modulos/estatus/alta-estatus-acuse/alta-estatus-acuse.component';
import { ListEstatusAcuseComponent } from './modulos/estatus/list-estatus-acuse/list-estatus-acuse.component';
import { EditEstatusComponent } from './modulos/estatus/edit-estatus/edit-estatus.component';
import { AltaEstatusComponent } from './modulos/estatus/alta-estatus/alta-estatus.component';
import { MainEstatusComponent } from './modulos/estatus/main-estatus/main-estatus.component';
import { MainNotaDebitoComponent } from './modulos/main-nota-debito/main-nota-debito.component';
import { ListUsuarioComponent } from './modulos/usuarios/list-usuario/list-usuario.component';
import { MainUsuarioComponent } from './modulos/usuarios/main-usuario/main-usuario.component';
import { ListFuncionalidadComponent } from './modulos/funcionalidad/list-funcionalidad/list-funcionalidad.component';
import { ListRolComponent } from './modulos/rol/list-rol/list-rol.component';
import { MainRolComponent } from './modulos/rol/main-rol/main-rol.component';
import { ListModuloComponent } from './modulos/modulo/list-modulo/list-modulo.component';
import { MainModuloComponent } from './modulos/modulo/main-modulo/main-modulo.component';
import { MainReceptorComponent } from './modulos/receptor/main-receptor/main-receptor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { ErrorComponent } from './paginas/error/error.component';
import { UpMainComponent } from './modulos/documentos_add/up-main/up-main.component';
import { AltaReceptorComponent } from './modulos/receptor/alta-receptor/alta-receptor.component';
import { EditReceptorComponent } from './modulos/receptor/edit-receptor/edit-receptor.component';
import { ListReceptorComponent } from './modulos/receptor/list-receptor/list-receptor.component';
import { AjustesReceptorComponent } from './modulos/receptor/ajustes-receptor/ajustes-receptor.component';
import { AjustesDgtReceptorComponent } from './modulos/receptor/ajustes-dgt-receptor/ajustes-dgt-receptor.component';
import { MainFuncionalidadComponent } from './modulos/funcionalidad/main-funcionalidad/main-funcionalidad.component';
import { ListEstatusComponent } from './modulos/estatus/list-estatus/list-estatus.component';
import { EditEstatusAcuseComponent } from './modulos/estatus/edit-estatus-acuse/edit-estatus-acuse.component';
import { MainFacturasComponent } from './modulos/main-facturas/main-facturas.component';
import { InicioComponent } from './compartidos/inicio/inicio.component';
import { MainNivelGastoComponent } from './modulos/nivel-gasto/main-nivel-gasto/main-nivel-gasto.component';
import { ListNivelGastoPaisComponent } from './modulos/nivel-gasto/list-nivel-gasto-pais/list-nivel-gasto-pais.component';
import { FormularioNivelGastoMxComponent } from './modulos/nivel-gasto/formulario-nivel-gasto/formulario-nivel-gasto-mx/formulario-nivel-gasto-mx.component';
import { ListTipoDocumentoSapComponent } from './modulos/tipo-documento-sap/list-tipo-documento-sap/list-tipo-documento-sap.component';
import { FormularioTipoDocumentoSapComponent } from './modulos/tipo-documento-sap/formulario-tipo-documento-sap/formulario-tipo-documento-sap.component';
import { MainTipoDocumentoSapComponent } from './modulos/tipo-documento-sap/main-tipo-documento-sap/main-tipo-documento-sap.component';
import { ListMetodoPagoComponent } from './modulos/metodo-pago/list-metodo-pago/list-metodo-pago.component';
import { MainMetodoPagoComponent } from './modulos/metodo-pago/main-metodo-pago/main-metodo-pago.component';
import { FormularioMetodoPagoComponent } from './modulos/metodo-pago/formulario-metodo-pago/formulario-metodo-pago.component';
import { MainConfiguracionBuzonComponent } from './modulos/configuracion-buzon/main-configuracion-buzon/main-configuracion-buzon.component';
import { FormualrioConfiguracionBuzonPaisComponent } from './modulos/configuracion-buzon/formualrio-configuracion-buzon-pais/formualrio-configuracion-buzon-pais.component';
import { MainPeriodoValidacionComponent } from './modulos/periodo-validacion/main-periodo-validacion/main-periodo-validacion.component';
import { FormularioPeriodoValidacionPaisComponent } from './modulos/periodo-validacion/formulario-periodo-validacion-pais/formulario-periodo-validacion-pais.component';
import { ListCuentaAgrupacionComponent } from './modulos/cuenta-agrupacion/list-cuenta-agrupacion/list-cuenta-agrupacion.component';
import { FormularioCuentaAgrupacionComponent } from './modulos/cuenta-agrupacion/formulario-cuenta-agrupacion/formulario-cuenta-agrupacion.component';
import { CuentaAgrupacionMainComponent } from './modulos/cuenta-agrupacion/cuenta-agrupacion-main/cuenta-agrupacion-main.component';
import { MainParametrosSistemaComponent } from './modulos/parametros-sistema/main-parametros-sistema/main-parametros-sistema.component';
import { ListaParametrosSistemaPaisComponent } from './modulos/parametros-sistema/lista-parametros-sistema-pais/lista-parametros-sistema-pais.component';
import { FormularioParametrosSistemaPaisComponent } from './modulos/parametros-sistema/formulario-parametros-sistema-pais/formulario-parametros-sistema-pais.component';
import { MainCategoriaComponent } from './modulos/categoria/main-categoria/main-categoria.component';
import { ListCategoriaPaisComponent } from './modulos/categoria/list-categoria-pais/list-categoria-pais.component';
import { FormularioCategoriaPaisComponent } from './modulos/categoria/formulario-categoria-pais/formulario-categoria-pais.component';
import { FormularioModuloComponent } from './modulos/modulo/formulario-modulo/formulario-modulo.component';
import { MainLibroCajaChicaComponent } from './modulos/libro-caja-chica/main-libro-caja-chica/main-libro-caja-chica.component';
import { ListLibroCajaChicaComponent } from './modulos/libro-caja-chica/list-libro-caja-chica/list-libro-caja-chica.component';
import { FormularioUsuarioComponent } from './modulos/usuarios/formulario-usuario/formulario-usuario.component';
import { FormularioRolComponent } from './modulos/rol/formulario-rol/formulario-rol.component';
import { FormularioLibroCajaChicaComponent } from './modulos/libro-caja-chica/formulario-libro-caja-chica/formulario-libro-caja-chica.component';
import { FormularioFuncionalidadComponent } from './modulos/funcionalidad/formulario-funcionalidad/formulario-funcionalidad.component';
import { MainSolicitudGeneralComponent } from './modulos/solicitud-general/main-solicitud-general/main-solicitud-general.component';
import { ListAnticiposGeneralPaisComponent } from './modulos/solicitud-general/list-anticipos-general-pais/list-anticipos-general-pais.component';
import { FormularioAnticiposGeneralPaisComponent } from './modulos/solicitud-general/formulario-anticipos-general-pais/formulario-anticipos-general-pais.component';
import { MainFlujoAprobacionComponent } from './modulos/flujo-aprobacion/main-flujo-aprobacion/main-flujo-aprobacion.component';
import { ListFlujoAprobacionPaisComponent } from './modulos/flujo-aprobacion/list-flujo-aprobacion-pais/list-flujo-aprobacion-pais.component';
import { FormularioFlujoAprobacionPaisMxComponent } from './modulos/flujo-aprobacion/formulario-flujo-aprobacion-pais-mx/formulario-flujo-aprobacion-pais-mx.component';
import { ListSolicitudAnticipoCcPaisComponent } from './modulos/caja-chica/list-solicitud-anticipo-cc-pais/list-solicitud-anticipo-cc-pais.component';
import { FormularioSolicitudAnticipoCcPaisComponent } from './modulos/caja-chica/formulario-solicitud-anticipo-cc-pais/formulario-solicitud-anticipo-cc-pais.component';
import { MainCajaChicaComponent } from './modulos/caja-chica/main-caja-chica/main-caja-chica.component';
import { AuthorizatedGuard } from './compartidos/login/authorizated-guard';
import { MainCargaFacturasComponent } from './modulos/flujo-aprobacion/carga-facturas/main-carga-facturas/main-carga-facturas.component';
import { ListCargaFacturasComponent } from './modulos/flujo-aprobacion/carga-facturas/list-carga-facturas/list-carga-facturas.component';
import { TipoCuentaMainComponent } from './modulos/tipo-cuenta/tipo-cuenta-main/tipo-cuenta-main.component';
import { TipoCuentaListComponent } from './modulos/tipo-cuenta/tipo-cuenta-list/tipo-cuenta-list.component';
import { TipoCuentaFormularioComponent } from './modulos/tipo-cuenta/tipo-cuenta-formulario/tipo-cuenta-formulario.component';
import { AcreedoresDiversosMainComponent } from './modulos/acreedores-diversos/acreedores-diversos-main/acreedores-diversos-main.component';
import { ListAcreedoresDiversosPaisComponent } from './modulos/acreedores-diversos/list-acreedores-diversos-pais/list-acreedores-diversos-pais.component';
import { FormularioAcreedoresDiversosPaisComponent } from './modulos/acreedores-diversos/formulario-acreedores-diversos-pais/formulario-acreedores-diversos-pais.component';
import { MainCargaDocumentosComponent } from './modulos/carga-documentos/main-carga-documentos/main-carga-documentos.component';
import { CargaDocumentosPaisComponent } from './modulos/carga-documentos/carga-documentos-pais/carga-documentos-pais.component';
import { MainAmortizacionComponent } from './modulos/amortizacion/main-amortizacion/main-amortizacion.component';
import { ListAmortizacionPaisComponent } from './modulos/amortizacion/list-amortizacion-pais/list-amortizacion-pais.component';
import { FormularioAmortizacionPaisComponent } from './modulos/amortizacion/formulario-amortizacion-pais/formulario-amortizacion-pais.component';
import { MainTipoGastoComponent } from './modulos/tipo-gasto/main-tipo-gasto/main-tipo-gasto.component';
import { ListTipoGastoPaisComponent } from './modulos/tipo-gasto/list-tipo-gasto-pais/list-tipo-gasto-pais.component';
import { FormularioTipoGastoPaisComponent } from './modulos/tipo-gasto/formulario-tipo-gasto-pais/formulario-tipo-gasto-pais.component';
import { DynamicLoginComponent } from './paginas/dynamic-login/dynamic-login/dynamic-login.component';
import { MainUsuarioProveedorComponent } from './modulos/usuario-proveedor/main-usuario-proveedor/main-usuario-proveedor.component';
import { ListUsuarioProveedorComponent } from './modulos/usuario-proveedor/list-usuario-proveedor/list-usuario-proveedor.component';
import { FormularioUsuarioProveedorComponent } from './modulos/usuario-proveedor/formulario-usuario-proveedor/formulario-usuario-proveedor.component';
import { MainDescuentoProntoPagoComponent } from './modulos/descuento-pronto-pago/main-descuento-pronto-pago/main-descuento-pronto-pago.component';
import { FormDescuentoProntoPagoComponent } from './modulos/descuento-pronto-pago/form-descuento-pronto-pago/form-descuento-pronto-pago.component';
import { ListDescuentoProntoPagoComponent } from './modulos/descuento-pronto-pago/list-descuento-pronto-pago/list-descuento-pronto-pago.component';
import { MainOrdenCompraComponent } from './modulos/orden-compra/main-orden-compra/main-orden-compra.component';
import { ListOrdenCompraComponent } from './modulos/orden-compra/list-orden-compra/list-orden-compra.component';
import { NotificacionesPaisComponent } from './modulos/notificaciones/notificaciones-pais/notificaciones-pais.component';
import { MainComprobacionesGeneralComponent } from './modulos/comprobaciones-general/main-comprobaciones-general/main-comprobaciones-general.component';
import { ListComprobacionesGeneralComponent } from './modulos/comprobaciones-general/list-comprobaciones-general/list-comprobaciones-general.component';
import { MainComprobacionesCajaChicaComponent } from './modulos/comprobaciones-caja-chica/main-comprobaciones-caja-chica/main-comprobaciones-caja-chica.component';
import { FormComprobacionesCajaChicaComponent } from './modulos/comprobaciones-caja-chica/form-comprobaciones-caja-chica/form-comprobaciones-caja-chica.component';
import { DetallesValidacionComponent } from './modulos/carga-documentos/detalles-validacion/detalles-validacion.component';
import { MainSustitucionCfdiComponent } from './modulos/sustitucion-cfdi/main-sustitucion-cfdi/main-sustitucion-cfdi.component';
import { FormSustitucionCfdiComponent } from './modulos/sustitucion-cfdi/form-sustitucion-cfdi/form-sustitucion-cfdi.component';
import { BandejaAprobacionPaisComponent } from './modulos/bandeja-aprobacion/bandeja-aprobacion-pais/bandeja-aprobacion-pais.component';
import { UsuarioEmpresasComponent } from './modulos/usuario-proveedor/usuario-empresas/usuario-empresas.component';
import { MainConsultaSaldosComponent } from './modulos/consulta-saldos/main-consulta-saldos/main-consulta-saldos.component';
import { ListConsultaSaldosComponent } from './modulos/consulta-saldos/list-consulta-saldos/list-consulta-saldos.component';
import { FormComprobacionesGeneralMxComponent } from './modulos/comprobaciones-general/form-comprobaciones-general-mx/form-comprobaciones-general-mx.component';
import { ListaCfdiPaisComponent } from './modulos/descuento-pronto-pago/lista-cfdi-pais/lista-cfdi-pais.component';
import { ListaCodigosPaisComponent } from './modulos/descuento-pronto-pago/lista-codigos-pais/lista-codigos-pais.component';
import { CargaNotaCreditoComponent } from './modulos/descuento-pronto-pago/carga-nota-credito/carga-nota-credito.component';
import { EnviarCorreoComponent } from './modulos/notificaciones/enviar-correo/enviar-correo.component';
import { CargaNcAcreedoresComponent } from './modulos/acreedores-diversos/carga-nc-acreedores/carga-nc-acreedores.component';
import { ListaFacturasAceptadasComponent } from './modulos/descuento-pronto-pago/lista-facturas-aceptadas/lista-facturas-aceptadas.component';
import { RessetPasswordComponent } from './paginas/resset-password/resset-password.component';
import { UsuarioProveedorProveedorMainComponent } from './modulos/usuario-proveedor/usuario-proveedor-proveedor-main/usuario-proveedor-proveedor-main.component';
import { ListarEstatusCfdiComponent } from './modulos/listar-cfdi/listar-estatus-cfdi/listar-estatus-cfdi.component';
import { MainEstatusCfdiComponent } from './modulos/listar-cfdi/main-estatus-cfdi/main-estatus-cfdi.component';
import { ListSolicitudesAdmPaisComponent } from './modulos/gastos-viaje/solicitudes/list-solicitudes-adm-pais/list-solicitudes-adm-pais.component';
import { ListSolicitudesPaisComponent } from './modulos/gastos-viaje/solicitudes/list-solicitudes-pais/list-solicitudes-pais.component';
import { ListComprobacionesPaisComponent } from './modulos/gastos-viaje/comprobaciones/list-comprobaciones-pais/list-comprobaciones-pais.component';
import { ListComprobacionesAdmPaisComponent } from './modulos/gastos-viaje/comprobaciones/list-comprobaciones-adm-pais/list-comprobaciones-adm-pais.component';
import { FormSolicitudesPaisComponent } from './modulos/gastos-viaje/solicitudes/form-solicitudes-pais/form-solicitudes-pais.component';
import { FormSolicitudAnticipoPaisComponent } from './modulos/gastos-viaje/solicitudes/form-solicitud-anticipo-pais/form-solicitud-anticipo-pais.component';
import { FormComprobacionesPaisComponent } from './modulos/gastos-viaje/comprobaciones/form-comprobaciones-pais/form-comprobaciones-pais.component';
import { MainSolicitudesComponent } from './modulos/gastos-viaje/solicitudes/main-solicitudes/main-solicitudes.component';
import { MainGastosViajeComponent } from './modulos/gastos-viaje/main-gastos-viaje/main-gastos-viaje.component';
import { MainComprobacionesComponent } from './modulos/gastos-viaje/comprobaciones/main-comprobaciones/main-comprobaciones.component';
import { FormUsuarioProveedorMxComponent } from './modulos/usuario-proveedor/form-usuario-proveedor-mx/form-usuario-proveedor-mx.component';
import { FacturasProveedorMainComponent } from './modulos/facturas-proveedor/facturas-proveedor-main/facturas-proveedor-main.component';
import { ListFacturasProveedorPaisComponent } from './modulos/facturas-proveedor/list-facturas-proveedor-pais/list-facturas-proveedor-pais.component';
import { FormularioFacturasProveedorPaisComponent } from './modulos/facturas-proveedor/formulario-facturas-proveedor-pais/formulario-facturas-proveedor-pais.component';
import { FormularioFlujoAprobacionPaisComponent } from './modulos/flujo-aprobacion/formulario-flujo-aprobacion-pais/formulario-flujo-aprobacion-pais.component';

const routes: Routes = [
  { path: '', redirectTo: 'error', pathMatch: 'full' },
  // { path: '', component: LoginComponent },
  { path: ':identificador_corporativo/login', component: DynamicLoginComponent },
  { path: ':identificador_corporativo/login/:proveedores', component: DynamicLoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'inicio', component: InicioComponent, canActivate: [AuthorizatedGuard] },
      //#region Gestion Corporativa
      {
        path: 'corporativo', loadChildren: './modulos/corporativo/corporativo.module#CorporativoModule'
      },
      {
        path: 'sucursal', loadChildren: './modulos/sucursal/sucursal.module#SucursalModule'
      },
      {
        path: 'contribuyente', loadChildren: './modulos/contribuyente/contribuyente.module#ContribuyenteModule'
      },
      {
        path: 'departamento', loadChildren: './modulos/departamento/departamento.module#DepartamentoModule'
      },
      {
        path: 'centro_costos', loadChildren: './modulos/centro-costos/centro-costos.module#CentroCostosModule'
      },
      {
        path: 'proveedores', loadChildren: './modulos/proveedores/proveedores.module#ProveedoresModule'
      },
      {
        path: 'cuenta', loadChildren: './modulos/cuenta/cuenta.module#CuentaModule'
      },
      {
        path: 'notas_credito', loadChildren: './modulos/notas-credito/notas-credito.module#NotasCreditoModule'
      },
      //#endregion
      //#region Administracion

      {
        path: 'bolsa_flexible', loadChildren: './modulos/bolsa-flexible/bolsa-flexible.module#BolsaFlexibleModule'
      },
      {
        path: 'cancelacion', loadChildren: './modulos/cancelaciones/cancelaciones.module#CancelacionesModule'
      },
      {
        path: 'catalogo_tipo_retencion', loadChildren: './modulos/administracion/catalogo-tipo-retencion/catalogo-tipo-retencion.module#CatalogoTipoRetencionModule'
      },
      {
        path: 'catalogo_impuestos', loadChildren: './modulos/administracion/catalogo-impuestos/catalogo-impuestos.module#CatalogoImpuestosModule'
      },
      {
        path: 'catalogo_forma_pago', loadChildren: './modulos/administracion/catalogo-forma-pago/catalogo-forma-pago.module#CatalogoFormaPagoModule'
      },
      {
        path: 'proveedores_informales', loadChildren: './modulos/proveedores-informales/proveedores-informales.module#ProveedoresInformalesModule'
      },
      {
        path: 'prestaciones', loadChildren: './modulos/prestaciones/prestaciones.module#PrestacionesModule'
      },
      {
        path: 'comprobaciones', loadChildren: './modulos/comprobaciones-gastos/comprobaciones-gastos.module#ComprobacionesGastosModule'
      },
      {
        path: 'gastos_viaje', loadChildren: './modulos/gastos-viaje/gastos-viaje.module#GastosViajeModule'
      },
      // {
      //   path: 'gastos_viaje',
      //   component: MainGastosViajeComponent,
      //   children: [
      //     {
      //       path: 'solicitud', component: MainSolicitudesComponent, canActivate: [AuthorizatedGuard], children: [
      //         { path: '', component: ListSolicitudesPaisComponent, canActivate: [AuthorizatedGuard] },
      //         { path: 'add', component: FormSolicitudesPaisComponent },
      //         { path: 'add_anticipo', component: FormSolicitudAnticipoPaisComponent },
      //         { path: 'solicitudes', component: ListSolicitudesAdmPaisComponent, canActivate: [AuthorizatedGuard] },
      //         { path: 'edit/:id', component: FormSolicitudesPaisComponent, canActivate: [AuthorizatedGuard] }
      //       ]
      //     },
      //     {
      //       path: 'comprobacion', component: MainComprobacionesComponent, canActivate: [AuthorizatedGuard],
      //       children: [
      //         { path: '', component: ListComprobacionesPaisComponent, canActivate: [AuthorizatedGuard] },
      //         { path: 'add', component: FormComprobacionesPaisComponent },
      //         { path: 'comprobaciones', component: ListComprobacionesAdmPaisComponent, canActivate: [AuthorizatedGuard] },
      //         { path: 'edit/:id', component: FormComprobacionesPaisComponent, canActivate: [AuthorizatedGuard] }
      //       ]
      //     },
      //     { path: '**', redirectTo: 'solicitud', pathMatch: 'prefix' },
      //   ]
      //   , canActivate: [AuthorizatedGuard]
      // },
      {
        path: 'flujo_aprobacion',
        component: MainFlujoAprobacionComponent,
        children: [
          { path: '', component: ListFlujoAprobacionPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'list', component: ListFlujoAprobacionPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: FormularioFlujoAprobacionPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'edit/:id', component: FormularioFlujoAprobacionPaisMxComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'carga-facturas',
        component: MainCargaFacturasComponent,
        children: [
          { path: '', component: ListCargaFacturasComponent, canActivate: [AuthorizatedGuard] },
          { path: 'list', component: ListCargaFacturasComponent, canActivate: [AuthorizatedGuard] },
        ]
      },
      {
        path: 'consulta_cfdi',
        component: MainListarCfdiComponent,
        children: [
          { path: '', component: ListarCfdiPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListarCfdiPaisComponent, canActivate: [AuthorizatedGuard] },
        ]
      },
      {
        path: 'reasignar_cfdi',
        component: MainEstatusCfdiComponent,
        children: [
          { path: '', component: ListarEstatusCfdiComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListarEstatusCfdiComponent, canActivate: [AuthorizatedGuard] },
        ]
      },
      {
        path: 'libro',
        component: MainLibroCajaChicaComponent,
        children: [
          { path: '', component: ListLibroCajaChicaComponent, canActivate: [AuthorizatedGuard] },
          { path: 'list', component: ListLibroCajaChicaComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: FormularioLibroCajaChicaComponent, canActivate: [AuthorizatedGuard] },
          { path: 'edit/:id', component: FormularioLibroCajaChicaComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'parametros_sistema',
        component: MainParametrosSistemaComponent,
        children: [
          { path: '', component: ListaParametrosSistemaPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'list', component: ListaParametrosSistemaPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: FormularioParametrosSistemaPaisComponent, canActivate: [AuthorizatedGuard] },
          {
            path: 'edit/:id',
            component: FormularioParametrosSistemaPaisComponent
          }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'categoria',
        component: MainCategoriaComponent,
        children: [
          { path: '', component: ListCategoriaPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'list', component: ListCategoriaPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: FormularioCategoriaPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'edit/:id', component: FormularioCategoriaPaisComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'solicitud_general',
        component: MainSolicitudGeneralComponent,
        children: [
          // { path: '', component: ListComprobacionGastosPaisesComponent, canActivate: [AuthorizatedGuard] },
          { path: 'anticipo_general', component: ListAnticiposGeneralPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'anticipo_general_add', component: FormularioAnticiposGeneralPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'edit/:id', component: FormularioAnticiposGeneralPaisComponent, canActivate: [AuthorizatedGuard] },
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'carga_masiva', loadChildren: './modulos/carga-masiva/carga-masiva.module#CargaMasivaModule'
      },
      // {
      //   path: 'comprobacion_gasto_viaje',
      //   component: MainComprobacionGastoViajeComponent,
      //   children: [
      //     //{ path: 'comprobacion_gasto_viaje', component: ListComprobacionGastosViajePaisesComponent, canActivate: [AuthorizatedGuard] },
      //     { path: '', component: ListComprobacionGastosViajePaisesComponent, canActivate: [AuthorizatedGuard] },
      //     //{ path: '', component: FormComprobacionGastoViajeComponent, canActivate: [AuthorizatedGuard] },
      //     { path: '**', component: FormComprobacionGastoViajeComponent, canActivate: [AuthorizatedGuard] }
      //   ]
      //   , canActivate: [AuthorizatedGuard]
      // },
      {
        path: 'carga_documentos',
        component: MainCargaDocumentosComponent,
        children: [
          { path: '', component: CargaDocumentosPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'reasignacion/:numero_orden/:uuid', component: CargaDocumentosPaisComponent, canActivate: [AuthorizatedGuard] },
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'validacion/:id',
        component: DetallesValidacionComponent, canActivate: [AuthorizatedGuard]
      },
      {
        path: 'complemento_pago',
        component: MainComplementoPagoComponent,
        children: [
          { path: '', component: ComplementoPaisComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'bandeja_aprobacion',
        component: MainBandejaAprobacionComponent,
        children: [
          { path: '', component: BandejaAprobacionPaisComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'carga_documentos/oc/:numero_orden',
        component: MainCargaDocumentosComponent,
        children: [
          { path: '', component: CargaDocumentosPaisComponent, canActivate: [AuthorizatedGuard] },
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'caja_chica',
        component: MainCajaChicaComponent,
        children: [
          { path: 'solicitud_anticipo_cc', component: ListSolicitudAnticipoCcPaisComponent },
          { path: 'solicitud_anticipo_cc_add', component: FormularioSolicitudAnticipoCcPaisComponent },
          { path: 'edit/:id', component: FormularioSolicitudAnticipoCcPaisComponent }
        ]
      },
      {
        path: 'buzon',
        component: MainConfiguracionBuzonComponent,
        children: [
          { path: '', component: FormualrioConfiguracionBuzonPaisComponent }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'periodo_validacion',
        component: MainPeriodoValidacionComponent,
        children: [
          { path: '', component: FormularioPeriodoValidacionPaisComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'documento_sap',
        component: MainTipoDocumentoSapComponent,
        children: [
          { path: '', component: ListTipoDocumentoSapComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: FormularioTipoDocumentoSapComponent, canActivate: [AuthorizatedGuard] },
          {
            path: 'edit/:id_tipo_documento',
            component: FormularioTipoDocumentoSapComponent, canActivate: [AuthorizatedGuard]
          }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'nivel_gasto',
        component: MainNivelGastoComponent,
        children: [
          { path: '', component: ListNivelGastoPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: FormularioNivelGastoMxComponent, canActivate: [AuthorizatedGuard] },
          {
            path: 'edit/:identificador_nivel_gasto',
            component: FormularioNivelGastoMxComponent
          }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'saldos',
        component: MainConsultaSaldosComponent,
        children: [
          { path: '', component: ListConsultaSaldosComponent, canActivate: [AuthorizatedGuard] },
          { path: ':id_proveedor/:numero_proveedor', component: ListConsultaSaldosComponent, canActivate: [AuthorizatedGuard] },
          // { path: 'add', component: FormularioNivelGastoMxComponent, canActivate: [AuthorizatedGuard] },
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'metodo_pago',
        component: MainMetodoPagoComponent,
        children: [
          { path: '', component: ListMetodoPagoComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: FormularioMetodoPagoComponent, canActivate: [AuthorizatedGuard] },
          {
            path: 'edit/:id_metodo_pago',
            component: FormularioMetodoPagoComponent
            , canActivate: [AuthorizatedGuard]
          },
          { path: '**', component: ListMetodoPagoComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'receptor',
        component: MainReceptorComponent,
        children: [
          { path: '', component: ListReceptorComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: AltaReceptorComponent, canActivate: [AuthorizatedGuard] },
          { path: 'edit/:id', component: EditReceptorComponent, canActivate: [AuthorizatedGuard] },
          { path: 'ajustes/:id', component: AjustesReceptorComponent, canActivate: [AuthorizatedGuard] },
          { path: 'ajustes_dgt/:id', component: AjustesDgtReceptorComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListReceptorComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      { path: 'documento/up', component: UpMainComponent, canActivate: [AuthorizatedGuard] },
      {
        path: 'categoria',
        component: MainCategoriaComponent,
        children: [
          { path: '', component: ListCategoriaPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: FormularioCategoriaPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'edit/:id', component: FormularioCategoriaPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListCategoriaPaisComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'modulo',
        component: MainModuloComponent,
        children: [
          { path: '', component: ListModuloComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: FormularioModuloComponent, canActivate: [AuthorizatedGuard] },
          { path: 'edit/:id', component: FormularioModuloComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListModuloComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'rol',
        component: MainRolComponent,
        children: [
          { path: '', component: ListRolComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: FormularioRolComponent, canActivate: [AuthorizatedGuard] },
          { path: 'addnext', component: FormularioRolComponent, canActivate: [AuthorizatedGuard] },
          { path: 'addnext/:id', component: FormularioRolComponent, canActivate: [AuthorizatedGuard] },
          { path: 'edit/:id', component: FormularioRolComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListRolComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'funcionalidad',
        component: MainFuncionalidadComponent,
        children: [
          { path: '', component: ListFuncionalidadComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: FormularioFuncionalidadComponent, canActivate: [AuthorizatedGuard] },
          { path: 'edit/:id', component: FormularioFuncionalidadComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListFuncionalidadComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'usuario_proveedor', component: MainUsuarioProveedorComponent,
        children: [
          { path: '', component: ListUsuarioProveedorComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: FormularioUsuarioProveedorComponent, canActivate: [AuthorizatedGuard] },
          { path: 'proveedor', component: UsuarioProveedorProveedorMainComponent, canActivate: [AuthorizatedGuard] },
          { path: 'contribuyentes/:id', component: UsuarioEmpresasComponent, canActivate: [AuthorizatedGuard] },
          { path: 'edit/:id', component: FormularioUsuarioProveedorComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListUsuarioProveedorComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'formulario_proveedor', component: UsuarioProveedorProveedorMainComponent, children: [
          { path: '', component: FormUsuarioProveedorMxComponent, canActivate: [AuthorizatedGuard] },
          { path: 'edit/:identificador', component: FormUsuarioProveedorMxComponent, canActivate: [AuthorizatedGuard] }
        ], canActivate: [AuthorizatedGuard]
      },
      {
        path: 'usuario',
        component: MainUsuarioComponent,
        children: [
          { path: '', component: ListUsuarioComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: FormularioUsuarioComponent, canActivate: [AuthorizatedGuard] },
          { path: 'edit/:id', component: FormularioUsuarioComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListUsuarioComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'estatusportal',
        component: MainEstatusComponent,
        children: [
          { path: '', component: ListEstatusComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: AltaEstatusComponent, canActivate: [AuthorizatedGuard] },
          { path: 'edit/:id', component: EditEstatusComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListEstatusComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'estatusacuse',
        component: MainEstatusComponent,
        children: [
          { path: '', component: ListEstatusAcuseComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: AltaEstatusAcuseComponent, canActivate: [AuthorizatedGuard] },
          { path: 'edit/:id', component: EditEstatusAcuseComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListEstatusAcuseComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'estatusfiscal',
        component: MainEstatusComponent,
        children: [
          { path: '', component: ListEstatusDgtComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: AltaEstatusDgtComponent, canActivate: [AuthorizatedGuard] },
          { path: 'edit/:id', component: EditEstatusDgtComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListEstatusDgtComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'cuenta_agrupacion',
        component: CuentaAgrupacionMainComponent,
        children: [
          { path: '', component: ListCuentaAgrupacionComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: FormularioCuentaAgrupacionComponent, canActivate: [AuthorizatedGuard] },
          { path: 'edit/:id', component: FormularioCuentaAgrupacionComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListCuentaAgrupacionComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'tipo_cuenta',
        component: TipoCuentaMainComponent,
        children: [
          { path: '', component: TipoCuentaListComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: TipoCuentaFormularioComponent, canActivate: [AuthorizatedGuard] },
          { path: 'edit/:id', component: TipoCuentaFormularioComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: TipoCuentaListComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'acreedores_diversos',
        component: AcreedoresDiversosMainComponent,
        children: [
          { path: '', component: ListAcreedoresDiversosPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: FormularioAcreedoresDiversosPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'carga_nc/:id_documento', component: CargaNcAcreedoresComponent, canActivate: [AuthorizatedGuard] },
          // { path: 'edit/:id', component: TipoCuentaFormularioComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListAcreedoresDiversosPaisComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'amortizacion',
        component: MainAmortizacionComponent,
        children: [
          { path: '', component: ListAmortizacionPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: FormularioAmortizacionPaisComponent, canActivate: [AuthorizatedGuard] },
          // { path: 'edit/:id', component: TipoCuentaFormularioComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListAmortizacionPaisComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'tipo_gasto',
        component: MainTipoGastoComponent,
        children: [
          { path: '', component: ListTipoGastoPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'edit/:id/:identificador_corporativo', component: FormularioTipoGastoPaisComponent, canActivate: [AuthorizatedGuard] },
          // { path: '  edit/:id', component: TipoCuentaFormularioComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListTipoGastoPaisComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'desc_pronto_pago',
        component: MainDescuentoProntoPagoComponent,
        children: [
          { path: '', component: ListDescuentoProntoPagoComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: FormDescuentoProntoPagoComponent, canActivate: [AuthorizatedGuard] },
          { path: 'edit/:id', component: FormDescuentoProntoPagoComponent, canActivate: [AuthorizatedGuard] },
          { path: 'dpp_cfdi', component: ListaCfdiPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'codigos_dpp', component: ListaCodigosPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'carga_nc', component: CargaNotaCreditoComponent, canActivate: [AuthorizatedGuard] },
          { path: 'carga_nc/:numero_codigo', component: CargaNotaCreditoComponent, canActivate: [AuthorizatedGuard] },
          { path: 'detalles/:id', component: ListaFacturasAceptadasComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListDescuentoProntoPagoComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'ordenes_compra',
        component: MainOrdenCompraComponent,
        children: [
          { path: '', component: ListOrdenCompraComponent, canActivate: [AuthorizatedGuard] },
          // { path: 'add', component: FormDescuentoProntoPagoComponent, canActivate: [AuthorizatedGuard] },
          // { path: 'edit/:id', component: TipoCuentaFormularioComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListOrdenCompraComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'notificaciones',
        component: MainNotificacionesComponent,
        children: [
          { path: '', component: NotificacionesPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'edit/:id', component: FormularioNotificacionesPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'notificar', component: EnviarCorreoComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: NotificacionesPaisComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'codigos_recepcion',
        component: MainCodigosRecepcionComponent,
        children: [
          { path: '', component: ListCodigoPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListCodigoPaisComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'comprobaciones_generales',
        component: MainComprobacionesGeneralComponent,
        children: [
          { path: '', component: ListComprobacionesGeneralComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: FormComprobacionesGeneralMxComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListComprobacionesGeneralComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'comprobaciones_caja_chica',
        component: MainComprobacionesCajaChicaComponent,
        children: [
          { path: '', component: FormComprobacionesCajaChicaComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: FormComprobacionesCajaChicaComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'sustitucion_cfdi',
        component: MainSustitucionCfdiComponent,
        children: [
          { path: '', component: FormSustitucionCfdiComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: FormSustitucionCfdiComponent, canActivate: [AuthorizatedGuard] }
        ]
        , canActivate: [AuthorizatedGuard]
      },
      {
        path: 'facturas_proveedor',
        component: FacturasProveedorMainComponent,
        children: [
          { path: '', component: ListFacturasProveedorPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: 'add', component: FormularioFacturasProveedorPaisComponent, canActivate: [AuthorizatedGuard] },
          { path: '**', component: ListFacturasProveedorPaisComponent, canActivate: [AuthorizatedGuard] }
        ]
      },
      { path: '**', component: ErrorComponent, canActivate: [AuthorizatedGuard] },
      { path: 'error', component: ErrorComponent }
    ]
    , canActivate: [AuthorizatedGuard]
  },
  {
    path: 'documento',
    component: HomeComponent,
    children: [{ path: 'up', component: UpMainComponent }]
    , canActivate: [AuthorizatedGuard]
  },
  {
    path: 'facturas',
    component: HomeComponent,
    children: [{ path: 'list', component: MainFacturasComponent }]
    , canActivate: [AuthorizatedGuard]
  },
  {
    path: 'debito',
    component: HomeComponent,
    children: [{ path: 'list', component: MainNotaDebitoComponent }]
    , canActivate: [AuthorizatedGuard]
  },
  {
    path: 'actualizaPassword/:token',
    component: RessetPasswordComponent,
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
