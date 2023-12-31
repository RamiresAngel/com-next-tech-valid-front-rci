import { Estatus } from './../clases/estatus';
import { EstatusService } from './../estatus.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-alta-estatus',
  templateUrl: './alta-estatus.component.html',
})
export class AltaEstatusComponent implements OnInit {
  constructor(private _servicio: EstatusService,
    private router: Router
  ) {
  }

  public estatus = new Estatus();
  public form: FormGroup;
  alerta = 'hide';
  exito = 'hide';
  error = 'hide';
  messageerror = '';
  ngOnInit() {
    this.createForm();
  }

  // METODO PARA VALIDAR EL FORM
  private createForm() {
    this.form = new FormGroup({
      estatus: new FormControl('', Validators.required)
    });
  }

  // METODO PARA CREAR
  public add() {

    if (this.form.valid) {

      this._servicio.addEstatusPortal(this.estatus)
        .subscribe(
          result => {
          },
          err => {
            // return Observable.throw(err);
            this.messageerror = err.error;
            this.error = 'show';
            setTimeout(() => {
              this.error = 'hide';
            }, 4000);
          },
          () => {
            this.exito = 'show';
            setTimeout(() => {
              this.exito = 'hide';
            }, 1000);
            setTimeout(() => {
              this.router.navigate(['/home/estatusportal']);
              this.form.reset();
            }, 1500);
          }
        );
      
    } else {
      this.alerta = 'show';
      setTimeout(() => {
        this.alerta = 'hide';
      }, 1500);
    }
  }


}
