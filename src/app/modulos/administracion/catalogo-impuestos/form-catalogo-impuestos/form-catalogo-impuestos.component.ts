import { Component, OnInit } from '@angular/core';
import { Impuesto } from 'src/app/entidades';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { CatalogoImpuestosService } from '../catalogo-impuestos.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-catalogo-impuestos',
  templateUrl: './form-catalogo-impuestos.component.html',
  styleUrls: ['./form-catalogo-impuestos.component.css']
})
export class FormCatalogoImpuestosComponent implements OnInit {
  impuesto = new Impuesto();
  id_impuesto: number;
  lista_corporativos = new Array<any>();
  formulario: FormGroup;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService,
    private impuestoService: CatalogoImpuestosService,
    public _globals: GlobalsComponent
  ) {
    this._activatedRoute.params.subscribe(async (params) => {
      if (params['id']) {
        try {
          this.id_impuesto = Number(this._storageService.desencriptar_ids(params['id']));
          this.impuesto = await this.obtenerImpuesto();
        } catch (error) {
          console.log(error);
        }
      }
    });
    this.lista_corporativos = this._globals.prepararSelect2(this._globals.lista_corporativos, 'id', 'nombre');
    console.log(this.lista_corporativos);
    this.formulario = new FormGroup({
      descripcion: new FormControl(this.impuesto.descripcion, Validators.required),
      tasa: new FormControl(this.impuesto.tasa, Validators.required),
      clave: new FormControl(this.impuesto.clave, Validators.required),
      identificador_corporativo: new FormControl(this.impuesto.identificador_corporativo, Validators.required),
    })
  }

  ngOnInit() {

  }

  obtenerImpuesto(): Promise<Impuesto> {
    const promise = new Promise<Impuesto>((resolve, reject) => {
      this.impuestoService.obtenerImpuesto(this.id_impuesto).subscribe((data: Impuesto) => {
        console.log(data);
        resolve(data);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
    return promise;
  }

  async submitFormulario(btn?: HTMLButtonElement) {
    for (let prop_name in this.impuesto) {
      const aux = this.impuesto[prop_name];
      if (!aux || aux === '') {
        throw new Error(`${prop_name} no debe ser vacio.`);
      }
    }
    const txt = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    // Validar
    try {
      if (this.id_impuesto) {
        await this.actualizarTipoRetencion();
      } else {
        await this.guardarTipoRetencion();
      }
      Swal.fire('Éxito', 'Guardado Correctamente', 'success');
    } catch (error) {
      console.log(error);
    }
    btn.innerHTML = txt;
    btn.disabled = false;
    console.log(this.impuesto);
  }

  guardarTipoRetencion() {
    const promise = new Promise((resolve, reject) => {
      this.impuestoService.crearImpuesto(this.impuesto).subscribe((data) => {
        console.log(data);
        resolve(data);
      }, err => {
        console.log(err);
        Swal.fire('Atención', 'Ha ocurrido un error. Intentalo nuevamente mas tarde. ', 'error');
        reject(err);
      });
    });
    return promise;
  }

  actualizarTipoRetencion() {
    const promise = new Promise((resolve, reject) => {
      this.impuestoService.actualizarImpuesto(this.id_impuesto, this.impuesto).subscribe((data) => {
        console.log(data);
        resolve(data);
      }, err => {
        console.log(err);
        Swal.fire('Atención', 'Ha ocurrido un error. Intentalo nuevamente mas tarde. ', 'error');
        reject(err);
      });
    });
    return promise;
  }

  onCorporativoSelect(event) {
    this.controls.identificador_corporativo = event.value;
    this.impuesto.identificador_corporativo = event.value;
  }


  public get controls(): { [key: string]: AbstractControl; } {
    return this.formulario.controls
  }

}
