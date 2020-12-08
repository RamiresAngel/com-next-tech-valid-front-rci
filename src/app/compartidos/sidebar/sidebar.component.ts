import { Component, EventEmitter, Input, OnInit, Output, HostListener, ElementRef } from '@angular/core';
import { GlobalsComponent } from './../globals/globals.component';
import { DatosIniciales } from 'src/app/entidades';
import { StorageService } from '../login/storage.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('expand', style({ height: '*', overflow: 'hidden', display: 'block' })),
      state('collapse', style({ height: '0px', overflow: 'hidden', display: 'block' })),
      state('active', style({ height: '*', overflow: 'hidden', display: 'block' })),
      transition('expand <=> collapse', animate(100)),
      transition('active => collapse', animate(100))
    ]),
    trigger('minifiedMenu', [
      state('expand', style({ width: '220px' })),
      state('collapse', style({ width: '60px' })),
      transition('expand <=> collapse', animate(100)),
    ]),
    trigger('sidebarStatus', [
      state('show', style({ transform: 'translateX(0)' })),
      state('hide', style({ transform: 'translateX(-220px)' })),
      transition('hide <=> show', animate(100)),
    ]),
    trigger('minifiedButton', [
      state('collapse', style({ transform: 'rotate(180deg)' })),
      state('expand', style({ transform: 'rotate(0deg)' })),
      transition('hide <=> show', animate(100)),
    ])
  ]
})
export class SidebarComponent implements OnInit {
  navProfileState: 'expand' | 'collapse' = 'collapse';
  sidebarMinified: 'collapse' | 'expand' = 'expand';
  sidebarStatus: 'show' | 'hide' = 'show';
  minifiedButton: 'collapse' | 'expand' = 'expand';
  resizeListener;

  // slimScrollOptions = global.whiteSlimScrollOptions;
  @Output() toggleSidebarMinified = new EventEmitter<boolean>();
  @Output() hideMobileSidebar = new EventEmitter<boolean>();
  @Input() pageSidebarTransparent;

  mobileMode;
  desktopMode;
  menus;

  public datos_inciales: DatosIniciales;
  public vista_carga = '';



  toggleNavProfile() {
    if (this.navProfileState == 'collapse') {
      this.navProfileState = 'expand';
    } else {
      this.navProfileState = 'collapse';
    }
  }

  toggleMinified() {
    if (this.sidebarMinified == 'expand') {
      for (let menu of this.menus) {
        menu.state = 'collapse';
      }
      this.sidebarMinified = 'collapse';
      this.minifiedButton = 'collapse';
      this.clearActiveMenu();
      this.toggleSidebarMinified.emit(true);
      return;
    }
    this.sidebarMinified = 'expand';
    this.minifiedButton = 'expand';
    setTimeout(() => {
      this.toggleSidebarMinified.emit(true);
    }, 100);
    // this.sidebarMinified = this.sidebarMinified == 'expand' ? 'collapse' : 'expand'
  }

  expandCollapseSubmenu(currentMenu, allMenu, active, menuElement?: HTMLElement) {
    const sub_menu = menuElement.querySelector('.sub-menu') as HTMLElement;
    sub_menu.style.display = 'block';

    for (let menu of allMenu) {
      if (menu != currentMenu) {
        menu.state = 'collapse';
      }
    }
    if (currentMenu.state == 'expand' || (active.isActive && !currentMenu.state)) {
      currentMenu.state = 'collapse';
    } else {
      if (this.sidebarMinified == 'collapse') this.toggleMinified();
      currentMenu.state = 'expand';
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.hideMobileSidebar.emit(true);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    clearTimeout(this.resizeListener);
    this.resizeListener = setTimeout(() => {
      if (window.innerWidth <= 767) {
        this.sidebarMinified = 'expand';
        this.sidebarStatus = 'hide';
      } else {
        this.sidebarStatus = 'show';
      }
      this.sidebarMinified = 'expand';
      const sb = document.getElementById('sidebar');
      const layout = document.getElementById('page-container');
      sb.classList.add('show');
      layout.classList.remove('page-sidebar-minified');
    }, 100);
  }

  constructor(
    private eRef: ElementRef,
    public globals: GlobalsComponent,
    private _storageService: StorageService
  ) {

    if (window.innerWidth <= 767) {
      this.mobileMode = true;
      this.sidebarStatus = 'hide';
      this.desktopMode = false;
    } else {
      this.mobileMode = false;
      this.sidebarStatus = 'show';
      this.desktopMode = true;
    }

    this.datos_inciales = this._storageService.getDatosIniciales();
    this.vista_carga = this.datos_inciales.funcionalidades.find(o => o.clave === 'VISTA_CARGADOC').valor;
    this.inciarMenu();
  }

  ngOnInit() {
    this.globals.tipo_menu = this._storageService.getTipoMenu();
    $(document).ready(function () {
      App.init();
      Dashboard.init();
      $('[data-toggle="tooltip"]').tooltip();
    });

    // this.initMenu();
  }

  ngAfterViewInit(): void {
    this.configMenu();
    // this.initMenu();
  }

  // initMenu() {
  // }
  toggleMenu() {
    this.sidebarStatus = this.sidebarStatus == 'hide' ? 'show' : 'hide';
  }

  configMenu() {
    const itemsMenu = document.querySelectorAll('#menu > li.has-sub');
    if (itemsMenu.length > 0) {
      for (let item in itemsMenu) {
        itemsMenu[item].classList.remove('active');
        itemsMenu[item].addEventListener('click', async (event) => {
          await this.clearActiveMenu();
          const elemento: HTMLElement = <HTMLElement>event.currentTarget;
          elemento.classList.add('active');
        });
      }
    }
    // itemsMenu.forEach(x => {
    // })
  }

  clearActiveMenu() {
    return new Promise((resolve, reject) => {
      const itemsMenu = document.querySelectorAll('#menu > li.has-sub');
      if (itemsMenu.length > 0) {
        for (let item in itemsMenu) {
          itemsMenu[item].classList.remove('active');
        }
      }
      resolve();
    });
  }

  whiteSlimScrollOptions = {
    position: 'right',
    barBackground: 'rgba(255,255,255,0.5)',
    barOpacity: 0.4,
    barWidth: 6,
    barBorderRadius: 20,
    barMargin: '2px',
    gridBackground: 'transparent',
    gridOpacity: 0,
    gridBorderRadius: 20,
    gridWidth: 0,
    gridMargin: 20,
    alwaysVisible: false,
    visibleTimeout: 1000,
    scrollSensitivity: 1
  };

  inciarMenu() {
    this.menus = [{
      'icon': 'fa fa-building',
      'title': 'Gestion Corporativa',
      'url': '',
      'state': null,
      'status': 'collapse',
      'caret': 'true',
      show: (
        this.globals.menuDinamico.gestion_Sucursales ||
        this.globals.menuDinamico.gestion_Contribuyente ||
        this.globals.menuDinamico.gestion_Departamentos ||
        this.globals.menuDinamico.gestion_Centro_Costos ||
        this.globals.menuDinamico.gestion_Cuenta ||
        this.globals.menuDinamico.gestion_Proveedores
      ),
      'submenu': [
        {
          url: '/home/corporativo',
          title: 'Corporativo',
          show: this.globals.menuDinamico.gestion_Corporativos
        },
        {
          url: '/home/sucursal',
          title: 'Sucursales',
          show: this.globals.menuDinamico.gestion_Sucursales
        },
        {
          url: '/home/contribuyente',
          title: 'Contribuyentes',
          show: this.globals.menuDinamico.gestion_Contribuyente
        },
        {
          url: '/home/departamento',
          title: 'Departamentos',
          show: this.globals.menuDinamico.gestion_Departamentos
        },
        {
          url: '/home/centro_costos',
          title: 'Centro Costos',
          show: this.globals.menuDinamico.gestion_Centro_Costos
        },
        {
          url: '/home/cuenta',
          title: 'Cuentas',
          show: this.globals.menuDinamico.gestion_Cuenta
        },
        {
          url: '/home/proveedores',
          title: 'Proveedores',
          show: this.globals.menuDinamico.gestion_Proveedores
        },
      ]
    }, {
      'icon': 'fa fa-cog',
      'title': 'Administracion',
      'url': '',
      'status': 'collapse',
      'caret': 'true',
      show: (
        this.globals.menuDinamico.administracion_Periodos_Validacion ||
        this.globals.menuDinamico.administracion_Cuenta_Agrupacion ||
        this.globals.menuDinamico.administracion_Tipo_Documento_SAP ||
        this.globals.menuDinamico.administracion_Parametros_Sistema ||
        this.globals.menuDinamico.administracion_Flujo_Aprobacion ||
        this.globals.menuDinamico.administracion_Configuracion_Buzon ||
        this.globals.menuDinamico.notificaciones ||
        this.globals.menuDinamico.documentos_Tipo_Gasto ||
        this.globals.menuDinamico.documentos_Tipo_Cuenta ||
        this.globals.menuDinamico.documentos_desc_pronto_pago ||
        this.globals.menuDinamico.metodo_pago ||
        this.globals.menuDinamico.administracion_catalogo_tipo_retencion ||
        this.globals.menuDinamico.administracion_catalogo_impuestos ||
        this.globals.menuDinamico.administracion_bolsa_flexible ||
        this.globals.menuDinamico.administracion_catalogo_impuestos ||
        this.globals.menuDinamico.administracion_prestaciones
      ),
      'submenu': [
        {
          url: '/home/periodo_validacion',
          title: 'Periodos de Validación',
          show: this.globals.menuDinamico.administracion_Periodos_Validacion
        },
        {
          url: '/home/cuenta_agrupacion',
          title: 'Cuenta Agrupación',
          show: this.globals.menuDinamico.administracion_Cuenta_Agrupacion
        },
        {
          url: '/home/documento_sap',
          title: 'Tipo Documentos SAP',
          show: this.globals.menuDinamico.administracion_Tipo_Documento_SAP
        },
        {
          url: '/home/parametros_sistema',
          title: 'Parámetros de Sistema',
          show: this.globals.menuDinamico.administracion_Parametros_Sistema
        },
        {
          url: '/home/flujo_aprobacion',
          title: 'Flujo de Aprobación',
          show: this.globals.menuDinamico.administracion_Flujo_Aprobacion
        },
        {
          url: '/home/buzon',
          title: 'Configuración de Buzón',
          show: this.globals.menuDinamico.administracion_Configuracion_Buzon
        },
        {
          url: '/home/notificaciones/notificar',
          title: 'Enviar Notificaciones',
          show: this.globals.menuDinamico.notificaciones
        },
        {
          url: '/home/tipo_gasto',
          title: 'Tipo de            Gastos',
          show: this.globals.menuDinamico.documentos_Tipo_Gasto
        },
        {
          url: '/home/tipo_cuenta',
          title: 'Tipo de Cuenta',
          show: this.globals.menuDinamico.documentos_Tipo_Cuenta
        },
        {
          url: '/home/desc_pronto_pago',
          title: 'Descuentos Pronto Pago',
          show: this.globals.menuDinamico.documentos_desc_pronto_pago
        },
        {
          url: '/home/metodo_pago',
          title: 'Método de Pago',
          show: this.globals.menuDinamico.metodo_pago
        },
        {
          url: '/home/catalogo_tipo_retencion',
          title: ' Tipo Retención ',
          show: this.globals.menuDinamico.administracion_catalogo_tipo_retencion
        },
        {
          url: '/home/catalogo_impuestos',
          title: ' Catálogo Impuestos ',
          show: this.globals.menuDinamico.administracion_catalogo_impuestos
        },
        {
          url: '/home/catalogo_forma_pago',
          title: ' Formas de Pagos ',
          show: this.globals.menuDinamico.administracion_catalogo_impuestos
        },
        {
          url: '/home/bolsa_flexible',
          title: 'Bolsa Flexible',
          // show: false
          show: this.globals.menuDinamico.administracion_bolsa_flexible
        },
        {
          url: '/home/prestaciones',
          title: 'Admin Prestaciones',
          show: this.globals.menuDinamico.administracion_prestaciones
        },
      ]
    }, {
      'icon': 'fas fa-chart-line',
      'title': 'Bandeja de Aprobación',
      'url': '',
      'status': 'collapse',
      'caret': 'true',
      show: (
        this.globals.menuDinamico.bandeja_aprobacion
      ),
      'submenu': [
        {
          url: '/home/bandeja_aprobacion',
          title: 'Bandeja de Aprobación',
          show: this.globals.menuDinamico.bandeja_aprobacion
        },
      ]
    }, {
      'icon': 'fas fa-money-bill',
      'title': 'Gastos',
      'url': '',
      'status': 'collapse',
      'caret': 'true',
      show: (
        this.globals.menuDinamico.gastos_Acreedores_Diversos ||
        this.globals.menuDinamico.gastos_Amortizadores ||
        this.globals.menuDinamico.gastos_Proveedor_Informal
      ),
      'submenu': [
        {
          url: '/home/acreedores_diversos',
          title: ' Acreedores Diversos',
          show: this.globals.menuDinamico.gastos_Acreedores_Diversos
        },
        {
          url: '/home/amortizacion',
          title: ' Amortizaciones',
          show: this.globals.menuDinamico.gastos_Amortizadores
        },
        {
          url: '/home/proveedores_informales',
          title: ' Proveedores Informales',
          show: this.globals.menuDinamico.gastos_Proveedor_Informal
        }
      ]
    }, {
      'icon': 'fas fa-money-bill',
      'title': 'Comprobaciones',
      'url': '',
      'status': 'collapse',
      'caret': 'true',
      show: (
        this.globals.menuDinamico.gastos_comprobacion_prestacion ||
        this.globals.menuDinamico.gastos_comprobacion_otros_gastos ||
        this.globals.menuDinamico.gastos_comprobacion_gastos_viaje ||
        this.globals.menuDinamico.gastos_comprobacion_caja_chica
      ),
      'submenu': [
        {
          url: '/home/comprobaciones/otros_gastos',
          title: ' Otros Gastos',
          show: this.globals.menuDinamico.gastos_comprobacion_otros_gastos
        },
        {
          url: '/home/comprobaciones/prestaciones',
          title: ' Prestaciones',
          show: this.globals.menuDinamico.gastos_comprobacion_prestacion
        },
        {
          url: '/home/comprobaciones/caja_chica',
          title: ' Caja Chica',
          show: this.globals.menuDinamico.gastos_comprobacion_caja_chica
        },
      ]
    }, {
      'icon': 'fas fa-money-bill',
      'title': 'Gastos de Viaje',
      'url': '',
      'status': 'collapse',
      'caret': 'true',
      show: (
        this.globals.menuDinamico.solicitud_Anticipo_Gastos_Viaje ||
        this.globals.menuDinamico.solicitud_Anticipo_Gastos_Viaje_Adm ||
        this.globals.menuDinamico.comprobacion_Gastos_Viaje ||
        this.globals.menuDinamico.comprobacion_Gastos_Viaje_Adm ||
        this.globals.menuDinamico.comprobacion_Caja_Chica
      ),
      'submenu': [
        {
          url: '/home/gastos_viaje/solicitud/solicitudes',
          title: 'Solicitudes Administrador',
          show: this.globals.menuDinamico.solicitud_Anticipo_Gastos_Viaje_Adm
        },
        {
          url: '/home/gastos_viaje/solicitud',
          title: 'Solicitudes',
          show: this.globals.menuDinamico.solicitud_Anticipo_Gastos_Viaje
        },
        {
          url: '/home/gastos_viaje/comprobacion/comprobaciones',
          title: 'Comprobaciones Administrador',
          show: this.globals.menuDinamico.comprobacion_Gastos_Viaje_Adm
        },
        {
          url: '/home/gastos_viaje/comprobacion',
          title: 'Comprobacion Caja chica',
          show: this.globals.menuDinamico.comprobacion_Caja_Chica
        },
        {
          url: '/home/gastos_viaje/comprobacion',
          title: 'Comprobacion Gastos Viaje',
          show: this.globals.menuDinamico.comprobacion_Gastos_Viaje
        },
      ]
    }, {
      'icon': 'fas fa-file-alt',
      'title': 'Documentos',
      'url': '',
      'status': 'collapse',
      'caret': 'true',
      show: (
        this.globals.menuDinamico.documentos_Ordenes_Compra ||
        this.globals.menuDinamico.documentos_codigos_recepcion ||
        this.globals.menuDinamico.documentos_CargaDocumentos ||
        this.globals.menuDinamico.documentos_CargaMasiva ||
        this.globals.menuDinamico.consulta_cfdi ||
        this.globals.menuDinamico.complemento_pago ||
        this.globals.menuDinamico.documentos_Factura_Sustitucion_CFDI ||
        this.globals.menuDinamico.documentos_Consulta_Saldos
      ),
      'submenu': [
        {
          url: '/home/ordenes_compra',
          title: 'Órdenes de Compra',
          show: this.globals.menuDinamico.documentos_Ordenes_Compra
        },
        {
          url: '/home/codigos_recepcion',
          title: 'Códigos de Recepción',
          show: this.globals.menuDinamico.documentos_codigos_recepcion
        },
        {
          url: '/home/carga_documentos',
          title: 'Carga Documentos',
          show: this.globals.menuDinamico.documentos_CargaDocumentos
        },
        {
          url: '/home/carga_masiva',
          title: 'Carga Masiva',
          show: this.globals.menuDinamico.documentos_CargaMasiva
        },
        {
          url: '/home/consulta_cfdi',
          title: 'Consultar Documentos',
          show: this.globals.menuDinamico.consulta_cfdi
        },
        {
          url: '/home/notas_credito',
          title: 'Notas de Crédito',
          show: this.globals.menuDinamico.documentos_NotasCredito
        },
        {
          url: '/home/complemento_pago',
          title: 'Complemento de Pago',
          show: this.globals.menuDinamico.complemento_pago
        },
        {
          url: '/home/sustitucion_cfdi',
          title: 'Sustitución de Factura ',
          show: this.globals.menuDinamico.documentos_Factura_Sustitucion_CFDI
        },
        {
          url: '/home/saldos',
          title: 'Consulta de Saldos',
          show: this.globals.menuDinamico.documentos_Consulta_Saldos
        },
      ]
    }, {
      'icon': 'fa fa-users',
      'title': 'Roles y Usuarios',
      'url': '',
      'status': 'collapse',
      'caret': 'true',
      show: (
        this.globals.menuDinamico.roles_Aplicacion_Rol ||
        this.globals.menuDinamico.roles_Modulos ||
        this.globals.menuDinamico.roles_Funcionalidad ||
        this.globals.menuDinamico.roles_Categoria
      ),
      'submenu': [
        {
          url: '/home/rol',
          title: 'Roles',
          show: this.globals.menuDinamico.roles_Aplicacion_Rol
        },
        {
          url: '/home/modulo',
          title: 'Módulos',
          show: this.globals.menuDinamico.roles_Modulos
        },
        {
          url: '/home/funcionalidad',
          title: 'Funcionalidades',
          show: this.globals.menuDinamico.roles_Funcionalidad
        },
        {
          url: '/home/categoria',
          title: 'Categoría',
          show: this.globals.menuDinamico.roles_Categoria
        },
      ]
    }, {
      'icon': 'fas fa-money-check-alt',
      'title': 'Descuento Pronto Pago',
      'url': '',
      'status': 'collapse',
      'caret': 'true',
      show: (
        this.datos_inciales.usuario.descuento_pp
      ),
      'submenu': [
        {
          url: '/home/desc_pronto_pago/dpp_cfdi',
          title: 'Facturas Aplicables',
          show: this.datos_inciales.usuario.descuento_pp
        },
        {
          url: '/home/desc_pronto_pago/codigos_dpp',
          title: 'Facturas Seleccionadas',
          show: this.datos_inciales.usuario.descuento_pp
        },
      ]
    }, {
      'icon': 'fa fa-user',
      'title': 'Usuarios',
      'url': '',
      'status': 'collapse',
      'caret': 'true',
      show: (
        this.globals.menuDinamico.usuarios_Usuario ||
        this.globals.menuDinamico.usuarios_Usuario_Acreedor
      ),
      'submenu': [
        {
          url: '/home/usuario',
          title: 'Usuarios',
          show: this.globals.menuDinamico.usuarios_Usuario
        },
        {
          url: '/home/usuario_proveedor',
          title: 'Usuarios Acreedor',
          show: this.globals.menuDinamico.usuarios_Usuario_Acreedor
        },
      ]
    }];
  }

}
