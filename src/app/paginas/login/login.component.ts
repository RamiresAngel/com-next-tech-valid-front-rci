import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../compartidos/login/authentication.service';
import { StorageService } from '../../compartidos/login/storage.service';
import { Router } from '@angular/router';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { ModalRolesComponent } from '../../modulos/modal-roles/modal-roles.component';
import { ModalRolesService } from '../../modulos/modal-roles/modal-roles.service';
import { Usuario } from '../../entidades/usuario';
import { CorporativoModule } from 'src/app/modulos/corporativo/corporativo.module';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  public Password: string;
  public Alerta: string;
  corporativo_activo: CorporativoActivo;
  relacion_rol_centro_consumo: any;
  public listaRolSucursales: any;
  public show = false;
  public ojo = 'ojo fas fa-eye';
  constructor(
    private authenticationService: AuthenticationService
    , private storageService: StorageService
    , private router: Router
    , private _modalService: ModalRolesService
    , private globals: GlobalsComponent
  ) { }

  ngOnInit() {
    this.storageService.removeCurrentSession();
  }

  Ingresar() {
    if (!this.username) {
      this.Alerta = 'Para acceder al portal es necesario una dirección de correo electrónico valida.';
    } else {
      if (!this.Password) {
        this.Alerta = 'Es necesario que nos proporcione una contraseña de acceso';
      } else {
        this.Alerta = 'Accediendo...';
        this.Autenticar(this.username, this.Password);
      }
    }
  }

  Autenticar(username, password) {
    this.authenticationService.login(username, password).subscribe(
      data => this.correctLogin(data),
      error => this.errorLogin(error._body)
    );
  }

  private correctLogin(data: any): void {
    if (data === 401) {
      this.Alerta = 'Error de usuario/contraseña';
    } else {
      if (data.identificadorUsuario !== undefined && data.identificadorUsuario !== null && data.identificadorUsuario !== '') {
        $('#ModalRolCC').modal('show');
        this.storageService.setCurrentSession(data);
        this.getRolesCC(data.identificadorUsuario);
      } else {
        this.Alerta = 'Error de usuario/contraseña';
        this.router.navigate(['/login']);
      }
    }
  }

  private errorLogin(error: any) {
    const aux: any = JSON.parse(error);
    this.Alerta = 'Ocurrio un error al acceder al sistema.  Intentalo nuevamente. ' + aux.defaultUserMessage;
  }

  public getRolesCC(username) {
    this._modalService.obtenerDatosIniciales(username).subscribe(
      data => this.correcRolCC(data),
      error => this.errorRolCC(error._body)
    );
  }

  public correcRolCC(data: any) {
    console.log(data);
    console.log(data.roles_acceso);
    this.storageService.setDatosIniciales(data);
    this.relacion_rol_centro_consumo = data.roles_acceso;
    // localStorage.setItem('proveedor', data[0].proveedor);
    this.listaRolSucursales = data.roles_acceso;
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
      // proveeddor = new Proveedores();
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

  public errorRolCC(error: any) {
    const aux: any = JSON.parse(error);
    this.Alerta = 'Ocurrio un error al acceder al sistema.  Intentalo nuevamente.';
  }

  // Powered By Huico
  password() {
    this.show = !this.show;
    if (this.show) {
      this.ojo = 'ojo far fa-eye-slash';
    } else {
      this.ojo = 'ojo fas fa-eye';
    }
  }
}
