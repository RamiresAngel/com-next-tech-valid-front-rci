import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { AuthenticationService } from 'src/app/compartidos/login/authentication.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { ModalRolesService } from 'src/app/modulos/modal-roles/modal-roles.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { Usuario } from 'src/app/entidades/usuario';
import { DynamicLoginService } from '../dynamic-login.service';
import { CorporativoInicial } from 'src/app/entidades';
import { DatosIniciales, Corporativos } from 'src/app/entidades/DatosIniciales';
import { ModalRolesComponent } from 'src/app/modulos/modal-roles/modal-roles.component';
declare var $: any;

@Component({
  selector: 'app-dynamic-login',
  templateUrl: './dynamic-login.component.html',
  styleUrls: ['./dynamic-login.component.css']
})
export class DynamicLoginComponent implements OnInit {

  loading = true;
  cambiar_pass_requerido = false;
  corporativo_incial: CorporativoInicial;
  public show = false;
  public background_img = 'url(./assets/img/melia-imgs/background.jpg)';
  public logo_login_img = './assets/img/melia-imgs/logomelia.png';
  public color_header = '#2484C6';
  public logo_header_img = '';
  public ojo = 'ojo fas fa-eye';
  public username: string;
  public Password: string;
  public Alerta: string;
  public Alerta_rfc: string;
  corporativo_activo: CorporativoActivo;
  relacion_rol_centro_consumo: any;
  public listaRolSucursales: any;
  public identificador_corporativo: string;
  public bandera_proveedor: string;
  public es_proveedor: boolean;
  // === Datos guardados en Lc === //
  private usuario: Usuario;
  private datos_iniciales = new DatosIniciales();
  private corporativo = new Corporativos();
  private funcionalidad_usuario: Array<any>; // Define el tipo de funcionalidad ( ruta carga de Documentos Simple o Normal )
  public activedirectory = 1;
  @ViewChild('modalRoles') modal_roles: ModalRolesComponent;
  private login_active = false;
  anio = '';

  constructor(
    private authenticationService: AuthenticationService
    , private storageService: StorageService
    , private router: Router
    , private activatedRoute: ActivatedRoute
    , private _modalService: ModalRolesService
    , private globals: GlobalsComponent,
    private _loginService: DynamicLoginService
  ) { }

  ngOnInit() {
    this.anio = new Date().getFullYear().toString();
    this.storageService.removeCurrentSession();
    this.activatedRoute.params.subscribe((parametros => {
      this.identificador_corporativo = parametros['identificador_corporativo'];
      this.bandera_proveedor = parametros['proveedores'];
      // Aqui va el servicio
      try {
        if (this.identificador_corporativo !== '') {
          // Validamos is es proveedor
          if (this.bandera_proveedor === 'proveedor') {
            // alert(' Es proveedor ');
            this.globals.tipo_menu = 'proveedor';
            this.es_proveedor = true;
          } else if (this.bandera_proveedor === 'empleado') {
            // alert(' Es proveedor ');
            this.globals.tipo_menu = 'empleado';
            this.es_proveedor = true;
          } else {
            if (this.bandera_proveedor !== undefined) {
              this.router.navigate([`${this.identificador_corporativo}/login/proveedor`]);
              this.es_proveedor = true;
            }
          }
          this._loginService.obtenerInfoCorporativo(this.identificador_corporativo).subscribe((data: any) => {
            // validar que los campos de imagen color y background
            // no vengan vacios
            this.corporativo_incial = data;
            this.background_img = `url(${this.corporativo_incial.fondo_logo !== null ? this.corporativo_incial.fondo_logo : './assets/img/melia-imgs/nextech_bg.jpg'})`;
            this.logo_login_img = this.corporativo_incial.logo;
            this.color_header = this.corporativo_incial.color;
            localStorage.setItem('bg_img', this.background_img);
            localStorage.setItem('logo_login_img', this.logo_login_img);
            localStorage.setItem('color_header', this.color_header);
            localStorage.setItem('identificador', this.corporativo_incial.identificador);

            this.loading = false;
          }, error => {
            this.router.navigate(['error']);
          });
        } else {
          // Aqui va las imagenes por dafault
        }
      } catch (error) {
        console.log(error);
      }
    }));
  }

  limpiar_mensaje(data) {
    this.Alerta = '';
    this.Alerta_rfc = '';
  }

  Ingresar() {
    console.log(this.activedirectory);
    // return false;
    if (!this.username) {
      this.Alerta = 'Para acceder al portal es necesario una dirección de correo electrónico valida.';
    } else {
      if (!this.Password) {
        this.Alerta = 'Es necesario que nos proporcione una contraseña de acceso';
      } else {
        this.Alerta = 'Accediendo...';
        // Validar si es proveedor, login normal o login alterno
        if (this.activedirectory) { // Acceso Mediante Active Directory
          this.autenticarActiveDirectory(this.username, this.Password);
        } else {
          if (this.es_proveedor) {
            this.validarRFC(this.username);
            this.autenticarProveedor(this.username, this.Password);
          } else {
            if (this.corporativo_incial.login_alterno) {
              this.validarRFC(this.username);
              this.autenticarAlternativo(this.username, this.Password, this.corporativo_incial.identificador);
            } else {
              this.Autenticar(this.username, this.Password);
            }
          }
        }
      }
    }
  }

  autenticarAlternativo(username: string, password: string, identificador_corporativo: string) {
    this.authenticationService.loginAlternativo(username, password, identificador_corporativo).subscribe(
      data => this.correctLogin(data),
      error => this.errorLogin(error._body)
    );
  }

  autenticarActiveDirectory(username: string, password: string) {
    this.authenticationService.getIPAddress().subscribe(
      (data) => {
        this.continuarLoginActive(username, password, data);
      },
      (error) => {
        this.continuarLoginActive(username, password);
      }
    );
  }

  continuarLoginActive(username: string, password: string, ip?) {
    this.authenticationService.loginActive(username, password, ip).subscribe(
      (data: any) => {
        const respuesta = JSON.parse(data);
        if (respuesta.HasError) {
          console.log(respuesta.Message);
          this.Alerta = respuesta.Message;
        } else {
          this.authenticationService.loginAlternativoActive(respuesta.Email).subscribe(
            (data: any) => {
              console.log(data);
              if (data.identificador_usuario) {
                const response: any = {
                  email: data.email,
                  estatus: data.activo,
                  identificadorUsuario: data.identificador_usuario,
                  usuarioDetalle: {
                    nombre: data.nombre,
                    apellidoPaterno: "",
                    apellidoMaterno: "",
                    emailAlterno: data.email_alterno,
                    telefono: data.telefono
                  }
                }
                this.correctLogin(response);
              } else {
                this.Alerta = 'Error de usuario/contraseña';
              }
            },
            (error: any) => {
              console.log(error);
            }
          );
        }
      },
      (error) => {
        console.log(error);
        this.errorLogin(error._body);
      }
    );
  }

  Autenticar(username, password) {
    this.authenticationService.login(username, password).subscribe(
      (data) => {
        this.correctLogin(data);
      },
      (error) => {
        this.errorLogin(error._body);
      }
    );
  }

  private correctLogin(data: any): void {
    if (data === 401) {
      this.Alerta = 'Error de usuario/contraseña';
    } else {
      const identificador = data.identificadorUsuario ? 'identificadorUsuario' : 'usuario_identificador';
      if (data[identificador] !== undefined && data[identificador] !== null && data[identificador] !== '') {
        this.storageService.setCurrentSession(data);
        this.getRolesCC(data[identificador]);
      } else {
        this.Alerta = 'Error de usuario/contraseña';
        this.router.navigate(['/login']);
      }
    }
  }

  private errorLogin(error: any) {
    const aux: any = JSON.parse(error);
    const msj = aux.defaultUserMessage ? aux.defaultUserMessage : aux.status;
    this.Alerta = 'Ocurrió un error al acceder al sistema.  Intentalo nuevamente. ' + msj;
  }

  public getRolesCC(username) {
    this._modalService.obtenerDatosIniciales(username).subscribe(
      data => this.correcRolCC(data),
      error => this.errorRolCC(error._body,)
    );
  }

  public correcRolCC(data: any) {
    if (!this.activedirectory) {
      $('#ModalRolCC').modal('show');
    }
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
    if (this.activedirectory) {
      if (this.relacion_rol_centro_consumo[0].rol_id) {
        this.modal_roles.rol_seleccionado = this.relacion_rol_centro_consumo[0].rol_id;
      } else {
        this.modal_roles.rol_seleccionado = 0;
      }
      this.modal_roles.ContinuarMain()
    }
  }

  public errorRolCC(error: any) {
    console.log(error);
    if (error.type === 'error') {
      console.log(error.type);
      this.Alerta = 'Ocurrió un error al acceder al sistema.  Intentalo nuevamente.';
    } else {
      const aux: any = JSON.parse(error);
      console.log(aux);
      this.Alerta = error ? error : 'Ocurrió un error al acceder al sistema.  Intentalo nuevamente.';
    }
  }

  // == Login Proveedor == //
  /**
   * Inicia session con un usuario Proveedor
   * @param username usuario
   * @param Password contraseña correspondiente al usuario
   */

  validarRFC(username: string) {
    const re = /^[A-Z]{3,4}(\d{6})((\D|\d){2,3})?$/;
    const validado = username.match(re);
    if (!validado) {
      this.Alerta_rfc = 'El usuario de un proveedor es el RFC registrado';
      console.log(username, '!validad');
    } else {
      this.Alerta_rfc = '';
    }
  }
  autenticarProveedor(username: string, Password: string) {
    this.corporativo.identificador = this.identificador_corporativo;
    this.datos_iniciales.corporativos = new Array<Corporativos>();
    this.datos_iniciales.corporativos.push(this.corporativo);
    this._loginService.loginProveedor(username, Password, this.identificador_corporativo)
      .subscribe((data: any) => {
        // aqui se guarda la sesion
        this.usuario = data.usuario;
        // Aqui se guardan las funcionalidades
        if (data.funcionalidades) {
          this.funcionalidad_usuario = data.funcionalidades;
        }
        if (this.usuario.identificador_corporativo === this.identificador_corporativo) {
          this.datos_iniciales.usuario = this.usuario;
          this.datos_iniciales.funcionalidades = data.funcionalidades;

          // Guarda los datos iniciales obtenidos
          const corporativo_activo = new CorporativoActivo();
          corporativo_activo.corporativo_identificador = this.identificador_corporativo;
          this.storageService.setDatosIniciales(this.datos_iniciales);
          this.storageService.setCorporativoActivo(corporativo_activo);
          if (data === 401) {
            this.Alerta = 'Error de usuario/contraseña';
          } else {
            if (this.usuario.identificador_usuario !== undefined && this.usuario.identificador_usuario !== null && this.usuario.identificador_usuario !== '') {
              // Guarda la session actual
              // Si el usuario es proveedor y tiene activo el resset password
              this.bloqueasAcciones();
              this.ContinuarMain();
            } else {
              this.Alerta = 'Error de usuario/contraseña';
              this.router.navigate([`${this.identificador_corporativo}/login`]);
            }
          }
        } else {
          this.Alerta = 'Error, por favor verifique su usuario.';
        }
      }, error => {
        console.log(error);
        this.Alerta = error.error.mensaje;
      });
  }
  // Reemplaza la funcionalidad del modal roles ya que en este proceso no se
  // requiere de seleccionar un rol ni un centro de costos.
  ContinuarMain() {
    // Validamos si es un usurio
    if (this.globals.tipo_menu == 'empleado') {
      this.storageService.setTipoMenu('empleado');
      this.mapearAccionesEmpleado();
    } else {
      // Crea el menu para un proveedor
      if (this.usuario.proveedor === 1) {
        this.storageService.setTipoMenu('proveedor');

        this.mapearAccionesProveedor();
      }
      // if (this.usuario.acreedor === 1) {
      //   this.mapearAccionesAcreedor();
      // }
    }
    // Guarda el menu de proveedor en el localstorage
    this.storageService.setMenuDinamico(this.globals.menuDinamico);
    // Redirecciona a inicio si la autenticacion es correcta.
    this.router.navigate(['/home/inicio']);
  }
  // Recorre el menu de proveedor y convierte en true las funcionalidades
  // correspondientes.
  mapearAccionesProveedor() {
    // Si es carga simple mapea menuProveedorCS en globals
    if (this.funcionalidad_usuario.find(o => o.clave === 'VISTA_CARGADOC').valor === 'carga_doc_no_erp') {
      for (const accion in this.globals.menuProveerCS) {
        if (accion) {
          this.globals.menuDinamico[accion] = true;
        }
      }
    } else {
      // Si no es carga simple mapea menuProveedor
      for (const accion in this.globals.menuProveedor) {
        if (accion) {
          this.globals.menuDinamico[accion] = true;
        }
      }
    }
  }
  mapearAccionesAcreedor() {
    for (const accion in this.globals.menuAcreedor) {
      if (accion) {
        this.globals.menuDinamico[accion] = true;
      }
    }
  }
  mapearAccionesEmpleado() {
    for (const accion in this.globals.menuEmpleado) {
      if (accion) {
        this.globals.menuDinamico[accion] = true;
      }
    }
  }
  bloqueasAcciones() {
    // tslint:disable-next-line:forin
    for (const aux in this.globals.menuDinamico) {
      this.globals.menuDinamico[aux] = false;
    }
  }

  // cambiarPassword() {
  //   this.cambiar_pass_requerido = true;
  // }
  // == Fin Login Proveedor == //

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
