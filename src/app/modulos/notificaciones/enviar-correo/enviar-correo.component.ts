import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { UsuarioService } from '../../usuarios/usuario.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DatosIniciales } from 'src/app/entidades';
import { ProveedoresService } from '../../proveedores/proveedores.service';
import { Comunicado, Notificacion, FileNotificacion, UploadAdapter } from 'src/app/entidades/comunicado';
import { NotificacionesService } from '../notificaciones.service';
import swal from 'sweetalert2';

// class UploadAdapter {
//   constructor( loader ) {
//      this.loader = loader;
//   }

//   upload() {
//      return this.loader.file
//            .then( file => new Promise( ( resolve, reject ) => {
//                  var myReader= new FileReader();
//                  myReader.onloadend = (e) => {
//                     resolve({ default: myReader.result });
//                  }

//                  myReader.readAsDataURL(file);
//            } ) );
//   };
// }


@Component({
  selector: 'app-enviar-correo',
  templateUrl: './enviar-correo.component.html',
  styleUrls: ['./enviar-correo.component.css']
})

export class EnviarCorreoComponent implements OnInit {

  public identificador_corporativo;
  public datos_inciales: DatosIniciales;
  public corporativo_activo: any;
  public lista_usuarios = [];
  public lista_usuarios_enviar = [];
  public allProviders = false;
  public allUsers = false;
  public Editor = ClassicEditor;
  public cargado_img = true;
  public titulo_logo_corp = '';
  public archivo_adjunto = new FileNotificacion();
  @ViewChild('imgInputlogo') imgInputlogo: ElementRef;
  public config = {
    title: 'Cuerpo del correo'
  };
  public comunicado = new Comunicado();
  public notificacion = new Notificacion();
  public cargando = false;
  public logo_img: string;

  constructor(
    public globals: GlobalsComponent,
    private _usuariosService: UsuarioService,
    private _storageService: StorageService,
    private _servicioProveedores: ProveedoresService,
    private _servicioNotificaciones: NotificacionesService
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.datos_inciales = this._storageService.getDatosIniciales();
  }

  ngOnInit() {
    this.logo_img = localStorage.getItem('logo_login_img') !== null ? localStorage.getItem('logo_login_img') : './assets/img/NEXT_5.png';
    this.notificacion.mensaje = '';
    this.buscarUsuarios(this.datos_inciales.usuario.identificador_corporativo);
  }

  // Consultar usuarios
  buscarUsuarios(identificador_corporativo) {
    this._usuariosService.obtenerUsuariosCorporativoAndProveedor(identificador_corporativo).subscribe((data: any) => {
      this.lista_usuarios = data.map(obj => {
        const aux = {
          id: obj.correo,
          text: obj.correo
        };
        return aux;
      });
    });
    // this._usuariosService.obtenerUsuariosCorporativo(identificador_corporativo)
    //   .subscribe(
    //     (data: any) => {
    //       const lista = data.map(obj => {
    //         const aux = {
    //           identificador: obj.email,
    //           correo: obj.email
    //         };
    //         return aux;
    //       });
    //       this.lista_usuarios.push(lista);
    //       this.buscarProveedores(this.datos_inciales.usuario.identificador_corporativo);
    //     },
    //     error => {
    //       console.log(error);
    //     },
    //     () => {
    //     }
    //   );
  }

  // Consultar proveedores
  buscarProveedores(identificador_corporativo) {
    this._servicioProveedores.ObtenerListaProveedoresPorCorporativoMin(identificador_corporativo)
      .subscribe(
        (data: any) => {
          data.map(obj => {
            const aux = {
              identificador: obj.correo,
              correo: obj.correo
            };
            this.lista_usuarios.push(aux);
          });

          this.lista_usuarios = this.globals.prepararSelect2(this.lista_usuarios, 'identificador', 'correo');
          this.lista_usuarios = this.globals.agregarSeleccione(this.lista_usuarios, 'Selecciona correos');
          this.lista_usuarios = this.globals.eliminarRepetidos(this.lista_usuarios, 'correo');
          console.log(this.lista_usuarios);
        },
        error => {
          console.log(error);
        },
        () => {
        }
      );
  }

  agregarUsuarios(correo: any) {
    this.lista_usuarios_enviar = correo;
  }

  cargarAdjunto() {
    this.cargado_img = true;
    const reader = new FileReader();
    const file = this.imgInputlogo.nativeElement.files[0];
    console.log(file.size);
    if (Number(file.size) < 9999999) {
      if (file !== undefined && file.name !== '') {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.archivo_adjunto.archivo_base_64 = String(reader.result).split(',')[1];
          this.archivo_adjunto.archivo_nombre = file.name; // file.name.split('.').pop();
          this.titulo_logo_corp = this.archivo_adjunto.archivo_nombre;
          this.cargado_img = false;
        };
      }
    } else {
      this.cargado_img = false;
      swal.fire('Atención', 'El tamaño del archivo adjunto es demasiado grande , por favor selecciona uno más pequeño ', 'error');
    }
  }

  enviarNotificacion() {
    this.cargando = true;
    const aux = new FileNotificacion();
    this.notificacion.destinatarios = this.lista_usuarios_enviar.join(';');
    this.notificacion.identificador_corporativo = this.datos_inciales.usuario.identificador_corporativo;
    (this.allProviders) ? this.notificacion.all_providers = '1' : this.notificacion.all_providers = '0';
    (this.allUsers) ? this.notificacion.all_users = '1' : this.notificacion.all_users = '0';
    this.notificacion.archivos_adjuntos = new Array<FileNotificacion>();
    this.notificacion.archivos_adjuntos[0] = this.archivo_adjunto;
    this._servicioNotificaciones.EnviarNotificacion(this.notificacion).subscribe(
      (data) => {
        swal.fire('Éxito', 'Notificación enviada correctamente', 'success');
        this.cargando = false;
        this.notificacion = new Notificacion();
        setTimeout(() => {
          location.reload();
        }, 1500);
      }
      , (error) => {
        this.cargando = false;
        console.log(error);
        if (error.mensaje) {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        } else {
          swal.fire('Atención', 'Ha ocurrido un error inesperado. <br> Porfavor intentalo nuevamente más tarde ', 'error');
        }
      }
      , () => {
        this.cargando = false;
      }
    );
  }

  onReady(eventData) {
    eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      console.log(loader);
      console.log(btoa(loader.file));
      return new UploadAdapter(loader);
    };
  }



}

