import { BandejaAprobacionService } from './../../modulos/bandeja-aprobacion/bandeja-aprobacion.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StorageService } from '../login/storage.service';
import { ModalRolesService } from '../../modulos/modal-roles/modal-roles.service';
declare var $: any;
import { GlobalsComponent } from '../../compartidos/globals/globals.component';
import { element } from '../../../../node_modules/@angular/core/src/render3/instructions';
import { DatosIniciales } from 'src/app/entidades';
import { PlatformLocation } from '@angular/common';
import { FiltroSaldos } from 'src/app/entidades/filtro';
import { ConsultaSaldosService } from 'src/app/modulos/consulta-saldos/consulta-saldos.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  @Output() toogleMenu = new EventEmitter();
  @Output() actualizarMenu = new EventEmitter();
  public infousuario: any;
  public listaRolSucursales: any;
  public listaCC: any;
  public usuario: string;
  public cambiar_pass_requerido = false;
  public datos_inciales = new DatosIniciales();
  iniciarCargaDocumentos: EventEmitter<any> = new EventEmitter();
  logo_img = '';
  color_bg = '';
  origen_solicitud = 'cabecera';
  public pais: string;
  public vista_carga: any;
  public aprobador: number;
  constructor(
    private _storageService: StorageService,
    private _globales: GlobalsComponent,
    private location: PlatformLocation,
    private _saldosService: ConsultaSaldosService,
    private _bandejaAprobacion: BandejaAprobacionService
  ) {
    const axu_usuario = this._storageService.getDatosIniciales().usuario.pais;
    const axu_vista = this._storageService.getDatosIniciales().funcionalidades.find(o => (o.clave === 'MOD_FLUJO') || (o.clave === 'VISTA_CARGADOC')).valor;
    if (axu_usuario === 'MX') {
      if (axu_vista === 'mod_rci') {
        this.vista_carga = axu_vista;
        this.pais = '';
      } else {
        this.pais = axu_usuario;
        this.vista_carga = '';
      }
    } else {
      this.pais = axu_usuario;
      this.vista_carga = '';
    }
    // this.infousuario = _storageService.getCurrentUser();
    this.location.onPopState(() => {
      $('#modal_resset_pass').modal('hide');
    });
  }

  ngOnInit() {
    const datos_inciales = this._storageService.getDatosIniciales();
    this.usuario = `${datos_inciales.usuario.nombre} ${datos_inciales.usuario.apellido_paterno !== undefined ? datos_inciales.usuario.apellido_paterno : ''}`;
    this.logo_img = localStorage.getItem('logo_login_img') ? localStorage.getItem('logo_login_img') : './assets/img/logo/render.png';
    this.color_bg = `linear-gradient(45deg, ${localStorage.getItem('color_header')} 0%, ${localStorage.getItem('color_header')} 97%)`;
    this.datos_inciales = this._storageService.getDatosIniciales();
    this._globales.datos_inciales = this.datos_inciales;
    this._globales.tipo_menu = this._storageService.getTipoMenu();
    this._globales.menuDinamico = this._storageService.getMenuDinamico();

    const aprobacion_data = localStorage.getItem('aprobacion_data');
    if (aprobacion_data) {
      this._bandejaAprobacion.setAprobacionData(JSON.parse(aprobacion_data));
    }

    // if (true) {
    if (this.datos_inciales.usuario.reset_password === 1) {
      this.msotrarModalPassword();
    }

    const usr = this._storageService.getDatosIniciales().usuario;
    if (usr.proveedor === 1) {
      const fecha_hoy = new Date();
      const dia_hoy = fecha_hoy.getDate();
      const mes_hoy = String(Number(fecha_hoy.getMonth()) + 1);
      const anio_hoy = fecha_hoy.getFullYear();
      const fecha_mes = new Date();
      fecha_mes.setDate(fecha_mes.getDate() - 30);
      const dia_mes = fecha_mes.getDate();
      const mes_mes = String(Number(fecha_mes.getMonth()) + 1);
      const anio_mes = fecha_mes.getFullYear();
      const filtro = new FiltroSaldos();

      filtro.Fecha_Inicio = `${anio_mes}-${mes_mes}-${dia_mes}`;
      filtro.Fecha_Fin = `${anio_hoy}-${mes_hoy}-${dia_hoy}`;
      filtro.No_Proveedor = usr.numero_proveedor;
      filtro.Sociedad = '634';
      filtro.identificador_corporativo = usr.identificador_corporativo;
      this._saldosService.consultarSaldo(filtro).subscribe(data => {
      });
    }
    this.aprobador = Number(this.datos_inciales.usuario.aprobador);
    // console.log(this.datos_inciales);
  }

  msotrarModalPassword() {
    this.cambiar_pass_requerido = true;
    $('#modal_resset_pass').modal({ backdrop: 'static', keyboard: false });
    $('#modal_resset_pass').modal('show');
  }
  Salir() {
    if (this.datos_inciales.usuario.proveedor || this.datos_inciales.usuario.acreedor) {
      this._storageService.logoutProveedores();
    } else {
      this._storageService.logout();
    }
  }

  CambiarCC() {
    this.iniciarCargaDocumentos.emit('evento');
    $('#ModalRolCC').modal('toggle');
  }

  Suplencia() {
    $('#ModalSuplencia').modal('toggle');
  }

  filter_array(test_array) {
    let index = -1;
    const arr_length = test_array ? test_array.length : 0;
    let resIndex = -1;
    const result = [];
    while (++index < arr_length) {
      const value = test_array[index];
      if (value) {
        result[++resIndex] = value;
      }
    }
    return result;
  }
}
