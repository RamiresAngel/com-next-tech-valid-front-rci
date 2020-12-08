import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { DynamicLoginService } from '../dynamic-login/dynamic-login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-resset-pasword',
  templateUrl: './modal-resset-pasword.component.html',
  styleUrls: ['./modal-resset-pasword.component.css']
})
export class ModalRessetPaswordComponent implements OnInit {

  public formulario: FormGroup;
  public formulario_pass: FormGroup;
  mensaje = '';
  mostrar_mensaje = false;
  mostrar_mensaje_error = false;
  desabilitar_recuperar = false;
  correo = '';
  token_resset_pass = '';
  contrasena = '';
  titulo_cancelar = 'Cancelar';
  contrasena_repeat = '';
  desabilitar_cancelar = false;
  public txt_valida_email = 'Recuperar';
  public txt_recuperar = 'Recuperar';
  public correo_valido = false;

  constructor(
    private ssoService: DynamicLoginService
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
    this.iniciarValidacionPass();
  }

  iniciarFormulario() {
    this.formulario = new FormGroup({
      correo: new FormControl('', [
        Validators.required,
        this.patternValidator(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)])
    });
    // contrasena: new FormControl
  }

  recuperarPassword() {
    this.txt_recuperar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.desabilitar_cancelar = true;
    this.mostrar_mensaje = false;
    this.mostrar_mensaje_error = false;
    this.mensaje = '';
    this.ssoService.ressetPasswordSSO(this.token_resset_pass, this.correo, this.contrasena).subscribe((data: any) => {
      console.log(data);
      this.txt_recuperar = 'Recuperar';
      this.desabilitar_cancelar = false;
      if (data.errorCode && data.errorCode === 404) {
        this.mensaje = data.defaultUserMessage;
        this.mostrar_mensaje = true;
      } else {
        this.correo_valido = true;
      }
    }, error => {
      console.log(error);
      this.txt_recuperar = 'Recuperar';
      this.desabilitar_cancelar = false;
      this.correo_valido = true;
      Swal.fire('Alerta', 'Algo salió mal, por favor intenta de nuevo más tarde.', 'error');
    });
  }

  iniciarValidacionPass() {
    this.formulario_pass = new FormGroup({
      password: new FormControl('', Validators.required),
      password_repeat: new FormControl('', Validators.required)
    });
  }

  validarCorreo() {
    this.mostrar_mensaje_error = false;
    this.txt_valida_email = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.desabilitar_cancelar = true;
    this.ssoService.getTokenRessetPass(this.correo).subscribe((data: any) => {
      // this.token_resset_pass = data;
      console.log(data);
      this.txt_valida_email = 'Enviado';
      this.mensaje = 'Se ha enviado un correo con los pasos a seguir para recuperar su contraseña.';
      this.desabilitar_cancelar = false;
      this.titulo_cancelar = 'cerrar';
      this.desabilitar_recuperar = true;
      this.mostrar_mensaje = true;
      // this.correo_valido = true;
    }, error => {
      console.log(error);
      if (error.error.errorCode === 404) {
        this.txt_valida_email = 'Recuperar';
        this.mensaje = error.error.defaultUserMessage;
        this.desabilitar_cancelar = false;
        this.mostrar_mensaje_error = true;
        return 0;
      }
      Swal.fire('Alerta', 'Algo salió mal, por favor intenta de nuevo más tarde.', 'error');
      this.txt_valida_email = 'Recuperar';
      this.desabilitar_cancelar = false;
      this.desabilitar_recuperar = false;
      // this.correo_valido = true;
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

  cancelar() {
    this.formulario.reset();
    this.formulario_pass.reset();
    this.correo_valido = false;
    this.correo = '';
    this.contrasena = '';
    this.contrasena_repeat = '';
  }

}
