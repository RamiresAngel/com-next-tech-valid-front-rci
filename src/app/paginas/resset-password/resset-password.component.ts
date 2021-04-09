import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, EmailValidator } from '@angular/forms';
import { DynamicLoginService } from '../dynamic-login/dynamic-login.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-resset-password',
  templateUrl: './resset-password.component.html',
  styleUrls: ['./resset-password.component.css']
})
export class RessetPasswordComponent implements OnInit {


  formulario: FormGroup;
  mensaje = '';
  text_aceptar = 'Aceptar';
  mostrar_mensaje = false;
  disabled_aceptar = false;
  datos = {
    newPassword: '',
    token: '',
    email: ''
  };

  constructor(
    private activatesdRoute: ActivatedRoute,
    private ssoService: DynamicLoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatesdRoute.params.subscribe(token => {
      console.log(token['token']);
      this.datos.token = token['token'];
    });
    this.iniciarFormularioRessetPass();
  }


  actualizar() {
    this.disabled_aceptar = true;
    this.text_aceptar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.mostrar_mensaje = false;
    this.ssoService.ressetPasswordSSO(this.datos.token, this.datos.email, this.datos.newPassword).subscribe((data: any) => {
      this.text_aceptar = 'Aceptar';
      this.mensaje = 'La contraseña se ha reestablecido correctamente, utilizela la próxima vez que desee inicar sesión.';
      this.mostrar_mensaje = true;
      setTimeout(() => {
        this.ssoService.obtenerCorporativoByCorreo(this.datos.email).subscribe((dat: any) => {
          this.router.navigate([dat.identificador_corporativo, 'login']);
        });
      }, 2500);
    }, error => {
      this.disabled_aceptar = false;
      this.text_aceptar = 'Aceptar';
      // console.log(error);
      this.mensaje = error.error.defaultUserMessage;
      this.mostrar_mensaje = true;
    });
  }

  iniciarFormularioRessetPass() {
    this.formulario = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        this.patternValidator(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      password: new FormControl('', [
        Validators.required,
        this.patternValidator(
          /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
        )
      ]),
      password2: new FormControl('', [
        Validators.required,
        this.patternValidator(
          /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
        )
      ])
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
