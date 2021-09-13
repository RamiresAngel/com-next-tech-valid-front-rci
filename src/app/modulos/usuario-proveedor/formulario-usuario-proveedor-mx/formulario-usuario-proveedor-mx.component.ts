import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { DatosIniciales, UsuarioProveedor, RecuperarPassword } from 'src/app/entidades/index';
import { UsuarioProveedorService } from '../usuario-proveedor.service';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import swal from 'sweetalert2';
import { DynamicLoginService } from 'src/app/paginas/dynamic-login/dynamic-login.service';
@Component({
  selector: 'app-formulario-usuario-proveedor-mx',
  templateUrl: './formulario-usuario-proveedor-mx.component.html',
  styleUrls: ['./formulario-usuario-proveedor-mx.component.css']
})
export class FormularioUsuarioProveedorMxComponent implements OnInit {

  public formulario_usuario_proveedor: FormGroup;
  public datos_inciales: DatosIniciales;
  public corporativo_activo = '';
  public usuario_proveedor = new UsuarioProveedor();
  public titulo = 'Nuevo Acreedor';
  public txtBtnAgregar = 'Guardar';
  public disabled_inputs = false;
  public lista_estatus: any;
  public bandera_error_rfc = false;
  constructor(
    private activateRoute: ActivatedRoute,
    private _storageService: StorageService,
    public globals: GlobalsComponent,
    private router: Router,
    private _proveedorService: UsuarioProveedorService,
    private _servicio_compartido: CompartidosService,
    private _servicioLogin: DynamicLoginService
  ) {
    this.cargarDatos();
    this.iniciarFormulario();
    const corporativo_activo = this._storageService.getCorporativoActivo();
    this.corporativo_activo = corporativo_activo.corporativo_identificador;
  }

  ngOnInit() {

    this.activateRoute.params.subscribe(id => {
      this.usuario_proveedor.identificador_proveedor = id['id'];

      if (this.usuario_proveedor.identificador_proveedor) {
        this.titulo = 'Editar Usuario Acreedor';
        this._proveedorService.ObtenerProveedorMXByidentificador(this.usuario_proveedor.identificador_proveedor).subscribe(
          (data: any) => {
            this.usuario_proveedor = data;
            console.log(this.usuario_proveedor);
            if (this.usuario_proveedor.origen_portal === 0) {
              this.bloquearCampos();
            }
          },
          (error) => {
            swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + error.error.mensaje, 'error');
          },
          () => {

          }
        );
      }

    });
  }

  iniciarFormulario() {
    this.formulario_usuario_proveedor = new FormGroup({
      nombre: new FormControl({ value: this.usuario_proveedor.nombre, disabled: this.disabled_inputs }, Validators.required),
      correo: new FormControl({ value: this.usuario_proveedor.email, disabled: this.disabled_inputs }, [Validators.required, Validators.email]),
      correo_adjuntos: new FormControl({ value: this.usuario_proveedor.email_alterno }, [Validators.required, Validators.email]),
      estatus: new FormControl({ value: this.usuario_proveedor.activo, disabled: this.disabled_inputs }),
      rfc: new FormControl({ value: this.usuario_proveedor.rfc, disabled: this.disabled_inputs }, Validators.required),
      resetPass: new FormControl({ value: this.usuario_proveedor.reset_password })
    });
  }

  bloquearCampos() {
    this.formulario_usuario_proveedor.get('nombre').disable();
    this.formulario_usuario_proveedor.get('correo').disable();
    this.formulario_usuario_proveedor.get('correo_adjuntos').disable();
    this.formulario_usuario_proveedor.get('estatus').disable();
    this.formulario_usuario_proveedor.get('rfc').disable();
  }

  actualizaUsuario() {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.usuario_proveedor.reset_password ? this.usuario_proveedor.reset_password = 1 : this.usuario_proveedor.reset_password = 0;
    this.usuario_proveedor.identificador_corporativo = this.corporativo_activo;
    this.usuario_proveedor.activo = Number(this.usuario_proveedor.activo);
    if (this.usuario_proveedor.identificador_proveedor) {
      if (this.usuario_proveedor.origen_portal === 0) {
        if (this.usuario_proveedor.reset_password === 1) {
          const obj = new RecuperarPassword();
          obj.email = this.usuario_proveedor.email;
          obj.identificador_corporativo = this.corporativo_activo;
          obj.rfc = this.usuario_proveedor.rfc;
          this._servicioLogin.recuperarPassword(obj).subscribe(
            (data: any) => {
              swal.fire('Éxito', 'Guardado Correctamente', 'success');
              this.router.navigate(['/home/usuario_proveedor']);
              this.txtBtnAgregar = 'Guardar';
            }
          );
        }
        this._proveedorService.ActualizarProveedorSAPById(this.usuario_proveedor).subscribe((data: any) => {
          swal.fire('Éxito', 'Guardado Correctamente', 'success');
          this.router.navigate(['/home/usuario_proveedor']);
          this.txtBtnAgregar = 'Guardar';
        }, error => {
          console.log(error);
          if (error.error.mensaje) {
            swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + error.error.mensaje, 'error');
          } else {
            swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: Algo salio mal, por favor intentalo de nuevo más tarde.', 'error');
          }
          this.txtBtnAgregar = 'Guardar';
        });
      } else {
        if (!this.validarRFC(this.usuario_proveedor.rfc)) {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: El RFC ingresado no contiene un formato válido', 'error');
          this.txtBtnAgregar = 'Guardar';
        } else {
          this._proveedorService.ActualizarProveedorById(this.usuario_proveedor).subscribe(
            (data) => {
              swal.fire('Éxito', 'Guardado Correctamente', 'success');
              this.router.navigate(['/home/usuario_proveedor']);
              this.txtBtnAgregar = 'Guardar';
            },
            (error) => {
              swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + error.error.mensaje, 'error');
              this.txtBtnAgregar = 'Guardar';
            },
            () => {
              this.txtBtnAgregar = 'Guardar';
            }
          );
        }
      }
    } else {
      this.usuario_proveedor.origen_portal = 1;
      this.usuario_proveedor.acreedor = 1;
      if (!this.validarRFC(this.usuario_proveedor.rfc)) {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: El RFC ingresado no contiene un formato válido', 'error');
        this.txtBtnAgregar = 'Guardar';
      } else {
        this._proveedorService.GuardarProveedoreMX(this.usuario_proveedor).subscribe(
          (data) => {
            swal.fire('Éxito', 'Guardado Correctamente', 'success');
            this.router.navigate(['/home/usuario_proveedor']);
            this.txtBtnAgregar = 'Guardar';
          },
          (error) => {
            swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + error.error.mensaje, 'error');
            this.txtBtnAgregar = 'Guardar';
          },
          () => {
            this.txtBtnAgregar = 'Guardar';
          }
        );
      }
    }
  }

  cargarDatos() {
    this._servicio_compartido.obtenerEstatusProveedor().subscribe(
      (data) => {
        this.lista_estatus = data;
      }
      , (error) => {

      }
      , () => {

      }
    );
  }

  /**
  * Función para validar un RFC,
  * Valida si la cadena de texto proporcionada es un RFC valida,
  * Devuelve false si es inválido,
  * Tambien valida el RFC para público en general 'XAXX010101000'.
  * - Eduardo Castellanos Huicochea 10/04/2019
  * @param rfc RFC a validar
  */
  validarRFC(rfc: any) {
    if (this.usuario_proveedor.rfc.length > 11) {
      if (rfc === 'XAXX010101000') { // RFC Genérico (ventas a público general)?
        this.bandera_error_rfc = false;
        return true;
      } else {
        const re = /^[a-zA-Z]{3,4}(\d{6})((\D|\d){2,3})?$/;
        const validado = rfc.match(re);
        if (!validado) {  // Coincide con el formato general del regex?
          this.bandera_error_rfc = true;
          return false;
        }
        this.bandera_error_rfc = false;
        return true;
      }
    }
  }

}
