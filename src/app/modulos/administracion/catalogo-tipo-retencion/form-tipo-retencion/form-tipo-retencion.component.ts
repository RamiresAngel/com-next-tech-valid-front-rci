import { Component, OnInit } from '@angular/core';
import { TipoRetencion } from 'src/app/entidades';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { CatalogoTipoRetencionService } from '../catalogo-tipo-retencion.service';
import { throwError } from 'rxjs';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-tipo-retencion',
  templateUrl: './form-tipo-retencion.component.html',
  styleUrls: ['./form-tipo-retencion.component.css']
})
export class FormTipoRetencionComponent {
  tipo_retencion = new TipoRetencion();
  id_tipo_retencion: number;
  lista_corporativos = new Array<any>();
  formulario: FormGroup;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService,
    private tipoRetencionService: CatalogoTipoRetencionService,
    public _globals: GlobalsComponent
  ) {
    this._activatedRoute.params.subscribe(async (params) => {
      if (params['id']) {
        try {
          this.id_tipo_retencion = Number(this._storageService.desencriptar_ids(params['id']));
          this.tipo_retencion = await this.obtenerTipoRetencion();
        } catch (error) {
          console.log(error);
        }
      }
    });
    // this. = this._globals.prepararSelect2(this._globals.lista_corporativos, 'id', 'nombre');
    // console.loglista_corporativos(this.lista_corporativos);
    this.formulario = new FormGroup({
      nombre: new FormControl(this.tipo_retencion.nombre, Validators.required),
      clave_tipo: new FormControl(this.tipo_retencion.clave_tipo, Validators.required),
      descripcion_tipo: new FormControl(this.tipo_retencion.descripcion_tipo, Validators.required),
      clave_indicador: new FormControl(this.tipo_retencion.clave_indicador, Validators.required),
      descripcion_indicador: new FormControl(this.tipo_retencion.descripcion_indicador, Validators.required),
      porcentaje: new FormControl(this.tipo_retencion.porcentaje, Validators.required),
      identificador_corporativo: new FormControl(this.tipo_retencion.identificador_corporativo, Validators.required),
    })
  }

  obtenerTipoRetencion(): Promise<TipoRetencion> {
    const promise = new Promise<TipoRetencion>((resolve, reject) => {
      this.tipoRetencionService.obtenerTipoRetencion(this.id_tipo_retencion).subscribe((data: TipoRetencion) => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
    return promise;
  }

  async submitFormulario(btn?: HTMLButtonElement) {
    for (let prop_name in this.tipo_retencion) {
      const aux = this.tipo_retencion[prop_name];
      if (!aux || aux === '') {
        throw new Error(`${prop_name} no debe ser vacio.`);
      }
    }
    const txt = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    // Validar
    try {
      if (this.id_tipo_retencion) {
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
    console.log(this.tipo_retencion);
  }

  guardarTipoRetencion() {
    const promise = new Promise((resolve, reject) => {
      this.tipoRetencionService.crearTipoRetencion(this.tipo_retencion).subscribe((data) => { resolve(data) }, err => {
        reject(err);
        Swal.fire('Atención', 'Ha ocurrido un error. Intentalo nuevamente mas tarde. ', 'error');
      });
    });
    return promise;
  }

  actualizarTipoRetencion() {
    const promise = new Promise((resolve, reject) => {
      this.tipoRetencionService.actualizarTipoRetencion(this.id_tipo_retencion, this.tipo_retencion).subscribe((data) => { resolve(data) }, err => {
        reject(err);
        Swal.fire('Atención', 'Ha ocurrido un error. Intentalo nuevamente mas tarde. ', 'error');
      });
    });
    return promise;
  }

  onCorporativoSelect(event) {
    this.controls.identificador_corporativo = event.value;
    this.tipo_retencion.identificador_corporativo = event.value;
  }


  public get controls(): { [key: string]: AbstractControl; } {
    return this.formulario.controls
  }

}
