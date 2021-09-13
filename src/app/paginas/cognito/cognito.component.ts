import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { AuthenticationService } from 'src/app/compartidos/login/authentication.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CorporativoActivo, Usuario } from 'src/app/entidades';
import { ModalRolesService } from 'src/app/modulos/modal-roles/modal-roles.service';
import { DynamicLoginService } from '../dynamic-login/dynamic-login.service';

@Component({
  selector: 'app-cognito',
  templateUrl: './cognito.component.html',
  styleUrls: ['./cognito.component.css']
})
export class CognitoComponent {

  public objeto_usuario;
  public username;


  public Password: string;
  public Alerta: string;
  public Alerta_rfc: string;
  corporativo_activo: CorporativoActivo;
  relacion_rol_centro_consumo: any;
  public listaRolSucursales: any;
  public identificador_corporativo: string;
  public bandera_proveedor: string;

  constructor(
    private authenticationService: AuthenticationService
    , private storageService: StorageService
    , private router: Router
    , private activatedRoute: ActivatedRoute
    , private _modalService: ModalRolesService
    , private globals: GlobalsComponent,
    private _loginService: DynamicLoginService
  ) {
    const token = localStorage.getItem('id_token').split('id_token=')[1];
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    this.objeto_usuario = JSON.parse(jsonPayload);
    this.username = this.objeto_usuario.email;
    this.Ingresar();
  }


  Ingresar() {
    if (!this.username) {
      // this.Alerta = 'Para acceder al portal es necesario una dirección de correo electrónico valida.';
    } else {
      this.Autenticar(this.username);
    }
  }

  Autenticar(username) {
    this.authenticationService.login_cognito(username).subscribe(
      (data: any) => {
        this.correctLogin(data.data)
      },
      // error => this.errorLogin(error._body)
    );
  }

  private correctLogin(data: any): void {

    if (data === 401) {
      // this.Alerta = 'Error de usuario/contraseña';
    } else {
      if (data.identificador_usuario) {
        this.storageService.setCurrentSession(data);
        this.getRolesCC(data.identificador_usuario);
      } else {
        // this.Alerta = 'Error de usuario/contraseña';
        // this.router.navigate(['/login']);
      }
    }
  }


  public getRolesCC(username) {
    this._modalService.obtenerDatosIniciales(username).subscribe(
      data => this.correcRolCC(data),
      // error => this.errorRolCC(error._body,)
    );
  }

  public correcRolCC(data: any) {

    const corporativo_activo = new CorporativoActivo();
    corporativo_activo.corporativo_identificador = this.identificador_corporativo;
    this.storageService.setDatosIniciales(data);
    this.storageService.setCorporativoActivo(corporativo_activo);
    this.relacion_rol_centro_consumo = data.roles_acceso;
    this.listaRolSucursales = data.roles_acceso;
    this.listaRolSucursales = this.globals.eliminarRepetidos(this.listaRolSucursales, 'rol_id');
    let usuarioId: any;
    const aux = this.listaRolSucursales.map(function (x) {
      usuarioId = x.usuario_id;
      return x.rol_id;
    });
    this.globals.usuario = usuarioId;
    const names = this.listaRolSucursales.map(function (person) { return person.rol_nombre; });
    const sorted = names.sort();
    const unique = sorted.filter(function (value, index) {
      return value !== sorted[index + 1];
    });

    class Datossuc {
      idRol: string;
      nombreCC: string;
      idCC: string;
      select: string;
    }

    const elObjeto = {
      roles: new Array({
        nombreRol: '',
        idRol: '',
        selected: '',
        Datossucursales: new Array(),
      })
    };
    let auxNum = 0;
    let user: '';
    let token = '';
    let corporativo_id = '';
    let auxCountCC = 0;
    let admin_next: any;
    unique.forEach(element => {
      auxCountCC = 0;
      let auxIdRol = '';
      elObjeto.roles[auxNum].nombreRol = element;
      this.listaRolSucursales.forEach(elementList => {
        const aucCCS = new Datossuc;
        if (element === elementList.rol_nombre) {
          aucCCS.nombreCC = elementList.cc_nombre;
          aucCCS.idCC = elementList.cc_id;
          aucCCS.idRol = elementList.rol_id;
          auxIdRol = elementList.rol_id;
          aucCCS.select = '';
          corporativo_id = elementList.corporativo_id;
          user = elementList.usuario_id;
          token = elementList.token;
          admin_next = elementList.admin_next;
          elObjeto.roles[auxNum].Datossucursales[auxCountCC] = new Datossuc();
          elObjeto.roles[auxNum].Datossucursales[auxCountCC] = aucCCS;
          auxCountCC++;
        }
      });
      elObjeto.roles[auxNum].idRol = auxIdRol;
      auxNum++;
      const nueva = new Array({
        nombreRol: '',
        idRol: '',
        selected: '',
        Datossucursales: new Array(),
      });

      elObjeto.roles.push(nueva[0]);
    });
    elObjeto.roles.splice(-1, 1);
    if (user !== '' && token !== '') {
      const usuario: any = <Usuario>this.storageService.loadSessionData();
      usuario.usuarioId = user;
      usuario.token = token;
      usuario.admin_next = admin_next;
      usuario.corporativo_id = corporativo_id;
      this.storageService.setCurrentSession(usuario);
    }
    this.listaRolSucursales = elObjeto.roles;
  }


}
