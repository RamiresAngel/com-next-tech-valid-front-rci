/**  HWH
############################################################################
 Servicio auxiliar para administrar el token y usuario almacenados cuando se hace un login.
 Este servicio permite utilizar la información del usuario que se ha logueado desde cualquier lugar.
 También tenemos un método para eliminar la información almacenada y posteriormente regresar a la pantalla de login.
############################################################################
**/
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../entidades/usuario';
import * as CryptoJS from 'crypto-js';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { Corporativo } from 'src/app/entidades/corporativo';
import { GlobalsComponent } from '../globals/globals.component';

@Injectable()
export class StorageService {
  private localStorageService;
  private currentSession: Usuario = null;
  private datos_iniciales: DatosIniciales = null;
  private menuDinammico: any;
  private corporativos: Corporativo[];

  corporativo_activo: CorporativoActivo;

  constructor(
    private router: Router,
    private global: GlobalsComponent
  ) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }
  setCurrentSession(session: Usuario): void {
    this.currentSession = session;
    this.localStorageService.setItem(
      'currentUser',
      this.encriptar(JSON.stringify(session))
    );
  }

  setDatosIniciales(datos_inciales: DatosIniciales): void {
    this.datos_iniciales = datos_inciales;
    this.localStorageService.setItem(
      'datosIniciales',
      this.encriptar(JSON.stringify(datos_inciales))
    );
  }
  getDatosIniciales() {
    const aux = localStorage.getItem('datosIniciales');
    if (this.datos_iniciales) {
      return this.datos_iniciales;
    } else {
      if (aux) {
        return <DatosIniciales>JSON.parse(this.desencriptar(localStorage.getItem('datosIniciales')));
      }
    }
  }

  setTipoMenu(tipo_menu: 'empleado' | 'proveedor'): void {
    const obj = {
      titulo: tipo_menu
    }
    this.localStorageService.setItem('tipo_menu', this.encriptar(JSON.stringify(obj)));
  }
  getTipoMenu(): 'empleado' | 'proveedor' {
    const aux = localStorage.getItem('tipo_menu');
    if (aux) {
      const obj = <{ titulo: 'empleado' | 'proveedor' }>JSON.parse(this.desencriptar(aux));
      return obj.titulo;
    }
  }
  setCorporativoActivo(corporativo_activo: CorporativoActivo): void {
    this.corporativo_activo = corporativo_activo;
    this.localStorageService.setItem(
      'corporativoActivo',
      this.encriptar(JSON.stringify(corporativo_activo))
    );
  }
  getCorporativoActivo() {
    const aux = localStorage.getItem('corporativoActivo');
    if (this.corporativo_activo) {
      return this.corporativo_activo;
    }
    if (aux) {
      return <CorporativoActivo>JSON.parse(this.desencriptar(localStorage.getItem('corporativoActivo')));
    }
  }

  loadSessionData(): Usuario {
    let sessionStr = this.localStorageService.getItem('currentUser');
    if (sessionStr !== undefined && sessionStr !== null) {
      sessionStr = this.desencriptar(sessionStr);
      return sessionStr ? <Usuario>JSON.parse(sessionStr) : null;
    }
  }
  setMenuDinamico(menu: any) {
    this.menuDinammico = menu;
    this.localStorageService.setItem(
      'menuDinamico',
      this.encriptar(JSON.stringify(menu))
    );
  }
  getMenuDinamico() {
    const aux = localStorage.getItem('menuDinamico');
    if (this.menuDinammico) {
      return this.menuDinammico;
    }
    if (aux) {
      return <any>JSON.parse(this.desencriptar(localStorage.getItem('menuDinamico')));
    }
  }

  setCorporativos(menu: any) {
    this.corporativos = menu;
    this.localStorageService.setItem(
      'corporativos',
      this.encriptar(JSON.stringify(menu))
    );
  }
  getCorporativos() {
    const aux = localStorage.getItem('corporativos');
    if (this.corporativos) {
      return this.corporativos;
    }
    if (aux) {
      return <any>JSON.parse(this.desencriptar(localStorage.getItem('corporativos')));
    }
  }

  getCurrentSession(): Usuario {
    return this.currentSession;
  }
  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.localStorageService.removeItem('actions');
    this.localStorageService.removeItem('listaRolSucursales');
    this.localStorageService.removeItem('rolSucursales');
    this.localStorageService.removeItem('datosIniciales');
    this.localStorageService.removeItem('corporativoActivo');
    this.localStorageService.removeItem('menuDinamico');
    this.localStorageService.removeItem('corporativos');
    this.localStorageService.removeItem('tipo_menu');
    this.currentSession = null;
    this.datos_iniciales = null;
    localStorage.clear();
  }
  // getCurrentUser(): Usuario {
  //   const session: Usuario = this.getCurrentSession();
  //   // return (session && session.identificadorUsuario) ? session : null;
  // }
  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  }
  getCurrentToken(): string {
    const session = this.getDatosIniciales();
    return (session && session.usuario.token) ? session.usuario.token : null;
  }
  logout(): void {
    const identificador = localStorage.getItem('identificador');
    this.removeCurrentSession();
    if (identificador !== null) {
      this.router.navigate([`${identificador}/login`]);
    } else {
      this.router.navigate([`/`]);
    }
  }

  logoutProveedores(): void {
    const identificador = localStorage.getItem('identificador');
    this.removeCurrentSession();

    if (identificador !== null) {
      if (this.global.tipo_menu == 'empleado') {
        this.router.navigate([`${identificador}/login/empleado`]);
      } else if (this.global.tipo_menu == 'proveedor') {
        this.router.navigate([`${identificador}/login/proveedores`]);
      }
    } else {
      this.router.navigate([`${identificador}/login`]);
    }
  }

  encriptar(palabra: any) {
    const aux = CryptoJS.AES.encrypt(palabra, 'N0m3L4z39999');
    return aux;
  }

  desencriptar(palabra: any) {
    if (palabra !== undefined && palabra !== null) {
      const aux = CryptoJS.AES.decrypt(palabra, 'N0m3L4z39999').toString(
        CryptoJS.enc.Utf8
      );
      return aux;
    }
  }

  encriptar_ids(palabra: any) {
    const aux = CryptoJS.AES.encrypt(palabra, 'N0m3L4z39999');
    const encodedText = btoa(aux.toString()).replace('/', '*');
    return encodedText;
  }

  desencriptar_ids(palabra: any) {
    if (palabra !== undefined && palabra !== null) {
      const decodedText = atob(palabra.replace('*', '/'));
      const aux = CryptoJS.AES.decrypt(decodedText, 'N0m3L4z39999').toString(
        CryptoJS.enc.Utf8
      );
      return aux;
    }
  }

  // Guarda y encripta los datos de las acciones que puede hacer el usuario.
  setCurrenRolcc(actions: any): void {
    this.localStorageService.setItem(
      'actions',
      this.encriptar(JSON.stringify(actions))
    );
  }

  getCurrenRolcc(palabra: any) {
    if (palabra !== undefined && palabra !== null) {
      const aux = CryptoJS.AES.decrypt(palabra, 'N0m3L4z39999').toString(
        CryptoJS.enc.Utf8
      );
      return aux;
    }
  }
}
