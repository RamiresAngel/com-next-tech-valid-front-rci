import { Component, OnInit, Input } from '@angular/core';
import { ReceptorService } from '../receptor.service';
import { Receptor } from '../clases/receptor';
import { HttpResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-ajustes-receptor',
  templateUrl: './ajustes-receptor.component.html'
})
export class AjustesReceptorComponent implements OnInit {

  // DECLARACION DE METODOS Y VARIABLES
  id: number;
  private sub: any;
  public receptores: Receptor[];
  alerta = 'hide';
  exito = 'hide';
  error = 'hide';
  messageerror = '';

  constructor(private _ServicioReceptor: ReceptorService,
    private route: ActivatedRoute,
    private router: Router) { }

  // CREACION DE METODO PARA NOMBRA AL FORM
  public form: FormGroup;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getReceptorId(this.id);
    });
    this.updateForm();
  }
  // METODO PARA OBTENER DATOS POR ID
  public getReceptorId(id) {
    this._ServicioReceptor.getReceptoresId(id)
      .subscribe((data: HttpResponse<any>) => {
        this.receptores = data.body;
      });
  }

  // METODO PARA VALIDAR EL FORM
  private updateForm() {
    this.form = new FormGroup({
      asunto_aceptado: new FormControl('', Validators.required),
      mensaje_aceptado: new FormControl('', Validators.required),
      correo_aviso: new FormControl('', [Validators.required, this.patternValidator(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) ])
    });
  }

  // METODO PARA CREAR
  public updateReceptor() {
    if (this.form.valid) {

      this._ServicioReceptor.updateAjustesReceptor(this.receptores[0])
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
              this.router.navigate(['/home/receptor']);
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

  // METODO PARA EXPRESIONES REGULARES
  private patternValidator(regexp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const value = control.value;
      if (value === '') {
        return null;
      }
      return !regexp.test(value) ? { 'patternInvalid': { regexp } } : null;
    };
  }


}
