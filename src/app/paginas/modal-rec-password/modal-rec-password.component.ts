import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { RecuperarPassword, RessetPassword, Usuario } from 'src/app/entidades';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { DynamicLoginService } from '../dynamic-login/dynamic-login.service';
declare var $: any;
@Component({
  selector: 'app-modal-rec-password',
  templateUrl: './modal-rec-password.component.html',
  styleUrls: ['./modal-rec-password.component.css']
})
export class ModalRecPasswordComponent implements OnInit {
  @Input() resset_password: boolean;
  @Input() origen_solicitud: string;
  @Input() identificador_corporativo: string;
  @Input() identificador_proveedor: string;
  @Input() usuario_email: string;
  public formulario_resset_pass: FormGroup;
  public formulario_recuperar_pass: FormGroup;

  public recuperar_password = new RecuperarPassword();
  public resset_pass = new RessetPassword();
  public USUARIO: Usuario;
  public mensaje_alerta: string;
  mostrar_error = false;
  mostrar_correcto = false;
  mostrar_error_reset = false;
  mostrar_correcto_reset = false;
  password_cambiado = false;
  disabled_aceptar = false;
  password_recuperado = false;
  public txtBtnAgregar = 'Aceptar';
  constructor(
    private _storageService: StorageService,
    private dynamicLoginService: DynamicLoginService
  ) { }

  ngOnInit() {
    this.iniciarFormularioRessetPass();
    this.iniciarFormularioRecuperarPass();
    $('.modal').modal('hide');
    // if (this.origen_solicitud === 'cabecera') {
    // } else {
    // }
    // this.USUARIO = this._storageService.getDatosIniciales().usuario;
    // if (this.USUARIO) {
    //   this.resset_pass.correo = this.USUARIO.email;
    // }
    this.recuperar_password.identificador_corporativo = this.identificador_corporativo;
    this.resset_pass.identificador_proveedor = this.identificador_corporativo;
    if (this.identificador_corporativo !== '') {
    }
    if (this.identificador_proveedor && this.identificador_proveedor !== '') {
      this.resset_pass.identificador_proveedor = this.identificador_proveedor;
    }
    if (this.usuario_email && this.usuario_email !== '') {
      this.resset_pass.email = this.usuario_email;
    }
  }


  iniciarFormularioRecuperarPass() {
    this.formulario_recuperar_pass = new FormGroup({
      rfc: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  iniciarFormularioRessetPass() {
    this.formulario_resset_pass = new FormGroup({
      // rfc: new FormControl('', Validators.required),
      contrasena: new FormControl('', [
        Validators.required,
        this.patternValidator(
          /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
        )
      ]),
      password_conf: new FormControl('', [
        Validators.required,
        this.patternValidator(
          /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
        )
      ])
    });
  }


  // Metodo solicitar ressetpassword
  ressetPassword() {
    this.disabled_aceptar = true;
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.mostrar_correcto_reset = false;
    this.mostrar_error_reset = false;
    // console.log(this.formulario_resset_pass.value);
    console.log(this.resset_pass);
    this.dynamicLoginService.resetPassword(this.resset_pass).subscribe((data: any) => {
      this.mostrar_correcto_reset = true;
      this.mostrar_error_reset = false;
      this.password_cambiado = true;
      this.mensaje_alerta = data.mensaje;
      // Setea bandera resset password en 0
      const datos_inciales = this._storageService.getDatosIniciales();
      datos_inciales.usuario.reset_password = 0;
      this._storageService.setDatosIniciales(datos_inciales);
      this.disabled_aceptar = false;
    }, error => {
      this.mostrar_error_reset = true;
      this.mostrar_correcto_reset = false;
      this.mensaje_alerta = error.error.mensaje;
      this.txtBtnAgregar = 'Aceptar';
      this.disabled_aceptar = false;
      console.log(error);
    }, () => {
      this.txtBtnAgregar = 'Aceptar';
      this.disabled_aceptar = false;
      setTimeout(() => {
        $('.modal').modal('hide');
      }, 3000);
    });
  }
  recuperarPassword() {
    // console.log(this.formulario_recuperar_pass.value);
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.mostrar_correcto = false;
    this.mostrar_error = false;
    console.log(this.recuperar_password);
    this.dynamicLoginService.recuperarPassword(this.recuperar_password).subscribe((data: any) => {
      this.mostrar_correcto = true;
      this.mostrar_error = false;
      this.mensaje_alerta = data.mensaje;
      this.password_recuperado = true;
    }, error => {
      this.mostrar_correcto = false;
      this.mostrar_error = true;
      this.mensaje_alerta = error.error.mensaje;
      this.txtBtnAgregar = 'Aceptar';
      console.log(error);
    }, () => {
      this.txtBtnAgregar = 'Aceptar';
      setTimeout(() => {
        $('.modal').modal('hide');
      }, 2500);
    });
  }

  // METODO PARA EXPRESIONES REGULARES
  private patternValidator(regexp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const value = control.value;
      if (value === '') {
        return null;
      }
      return !regexp.test(value) ? { patternInvalid: { regexp } } : null;
    };
  }

}
