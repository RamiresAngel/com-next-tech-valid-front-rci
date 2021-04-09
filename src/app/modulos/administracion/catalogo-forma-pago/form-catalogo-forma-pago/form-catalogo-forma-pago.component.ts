import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FormaPago } from 'src/app/entidades/forma-pago';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CatalogoFormaPagoService } from '../catalogo-forma-pago.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-catalogo-forma-pago',
  templateUrl: './form-catalogo-forma-pago.component.html',
  styleUrls: ['./form-catalogo-forma-pago.component.css']
})
export class FormCatalogoFormaPagoComponent implements OnInit {

  public formulario: FormGroup;
  public forma_pago = new FormaPago();
  private id_forma_pago: number;
  public identificador_corporativo: string;
  lista_corporativos = new Array<any>();
  public titulo = 'Nueva forma de pago'

  constructor(
    private storage: StorageService,
    private activateRoute: ActivatedRoute,
    public globals: GlobalsComponent,
    private formaPagoService: CatalogoFormaPagoService
  ) {
    this.activateRoute.params.subscribe(async (params) => {
      this.id_forma_pago = Number(this.storage.desencriptar_ids(params['id']));
      if (this.id_forma_pago) {
        this.titulo = 'Actualizar forma de pago'
        this.forma_pago = await this.obtenerFormaPago();
      }
    });
    this.identificador_corporativo = this.storage.getDatosIniciales().usuario.identificador_corporativo;
    this.formulario = new FormGroup({
      descripcion: new FormControl(this.forma_pago.descripcion, Validators.required)
    });
  }

  ngOnInit() {
  }

  async submitFormluario() {
    console.log(this.formulario.value);
    console.log(this.forma_pago);

    this.forma_pago.identificador_corporativo = this.identificador_corporativo;
    for (let prop_name in this.forma_pago) {
      const aux = this.forma_pago[prop_name];
      if (!aux || aux === '') {
        throw new Error(`${prop_name} no debe ser vacio.`);
      }
    }
    try {
      if (this.id_forma_pago) {
        await this.actualizarFormaPago();
      } else {
        await this.crearFormaPago();
      }
      Swal.fire('Éxito', 'Guardado Correctamente', 'success');
    } catch (error) {
      console.log(error);
    }
  }
  crearFormaPago() {
    const promise = new Promise((resolve, reject) => {
      this.formaPagoService.crearFormaPago(this.forma_pago).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        Swal.fire('Atención', 'Ha ocurrido un error. Intentalo nuevamente mas tarde. ', 'error');
        reject(err);
      });
    });
    return promise;
  }

  actualizarFormaPago() {
    const promise = new Promise((resolve, reject) => {
      this.formaPagoService.actualizarFormaPago(this.id_forma_pago, this.forma_pago)
        .subscribe((data: any) => {
          resolve(data);
        }, err => {
          console.log(err);
          Swal.fire('Atención', 'Ha ocurrido un error. Intentalo nuevamente mas tarde. ', 'error');
          reject(err);
        });
    });
    return promise;
  }

  obtenerFormaPago(): Promise<FormaPago> {
    const promesa = new Promise<FormaPago>((resolve, reject) => {
      this.formaPagoService.obtenerFormaPago(this.id_forma_pago).subscribe((data: FormaPago) => {
        this.forma_pago = data;
        resolve(data);
      }, err => {
        console.log(err);
        Swal.fire('Atención', 'Ha ocurrido un error. Intentalo nuevamente mas tarde. ', 'error');
        reject(err);
      });
    })
    return promesa;
  }

  onCorporativoSelect(event) {
    this.controls.identificador_corporativo = event.value;
    this.identificador_corporativo = event.value;
  }

  public get controls(): { [key: string]: AbstractControl; } {
    return this.formulario.controls
  }
}
