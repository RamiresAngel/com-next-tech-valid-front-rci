import { EstatusService } from './../estatus.service';
import { Estatus } from './../clases/estatus';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-edit-estatus-acuse',
  templateUrl: './edit-estatus-acuse.component.html'
})
export class EditEstatusAcuseComponent implements OnInit {



  // DECLARACION DE METODOS Y VARIABLES
  id: number;
  private sub: any;

  public form: FormGroup;
  public estatu: Estatus[];
  alerta = 'hide';
  exito = 'hide';
  error = 'hide';
  messageerror = '';

  constructor(private _servicio: EstatusService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getId(this.id);
    });
    this.upateForm();
  }
  // METODO PARA OBTENER DATOS POR ID
  public getId(id) {
    this._servicio.getEstatusAcuseId(id)
      .subscribe((data: HttpResponse<any>) => {
        this.estatu = data.body;
      });
  }
  // METODO PARA VALIDAR EL FORM
  private upateForm() {
    this.form = new FormGroup({
      estatus: new FormControl('', Validators.required),
    });
  }

  // METODO PARA ACTUALIZAR
  public update() {
    if (this.form.valid) {

      this._servicio.updateEstatusAcuse(this.estatu[0])
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
              this.router.navigate(['/home/estatusacuse']);
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
