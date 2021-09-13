import { Component, OnInit } from '@angular/core';
import { CorpMin } from '../clases/corp_min';
import { ReceptorService } from '../receptor.service';
import { Receptor, TipoIdentificacion } from '../clases/receptor';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
declare var $: any;
import { GlobalsComponent } from './../../../compartidos/globals/globals.component';
import { DireccionService } from 'src/app/compartidos/direccion/direccion.service';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CorporativoService } from '../../corporativo/corporativo.service';



@Component({
  selector: 'app-alta-receptor',
  templateUrl: './alta-receptor.component.html'
})
export class AltaReceptorComponent implements OnInit {
  public corporativos: CorpMin[];
  constructor(private _servicio: ReceptorService,
    private _servicioLocalidades: DireccionService,
    private _storageService: StorageService,
    private _servicioCorporativo: CorporativoService,
    private router: Router, public globals: GlobalsComponent) {
    /* this._servicio.getCorporativoMin()
    .subscribe((data: any) => {
      this.corporativos = data.body;
}); */
  }

  // CREACION DE METODO PARA NOMBRA AL FORM
  public form: FormGroup;
  public receptor = new Receptor();
  alerta = 'hide';
  exito = 'hide';
  error = 'hide';
  messageerror = '';
  public lista_provincias: any;
  public listaProvincias: any;
  public listaCanton: any;
  public listaDistrito: any;
  public listaBarrio: any;
  public startValue: string;
  public startValueCanton: string;
  public startValue_identificacion: any;
  public lista_tipo_identificacion: any;
  public startValue_corporativo: string;
  public auxCambio = false;
  public maxcedula: any;
  public options: Select2Options;
  public txtBtnGuardar: any;
  public showCorporativos = false;
  public tipos: TipoIdentificacion[];
  public txtBtnAgregar: string;

  ngOnInit() {
    this.txtBtnGuardar = 'Guardar';
    this.createForm();
    const usuario: any = this._storageService.loadSessionData();
    if (usuario.admin_next === 1) {
      this.showCorporativos = true;
      // this._servicioCorporativo.obtenerCorporativos(String(usuario.corporativo_id))
      //   .subscribe((data: HttpResponse<any>) => {
      //     this.corporativos = $.map(data.body, function (obj: any) {
      //       obj.id = obj.id || obj.id;
      //       obj.text = obj.nombre || obj.nombre; // replace name with the property used for the text
      //       return obj;
      //     });
      //     this.startValue_corporativo = '';

      //   });
    } else {
      this.receptor.corporativo_id = usuario.corporativo_id;
    }
    this.getListaProvincias();
    this.obtenerTipoIdentificacion();
    // this.getTipoIdentificacion();
    // this.createForm();
  }

  ActualizaCorporativo(corporativo_id: any) {
    this.receptor.corporativo_id = Number(corporativo_id.value);
  }


  obtenerTipoIdentificacion() {
    this._servicio.getTipoIdentificacion()
      .subscribe((data: HttpResponse<any>) => {
        this.tipos = data.body;
      });
  }

  // METODO PARA VALIDAR EL FORM
  private createForm() {
    this.form = new FormGroup({
      nombre: new FormControl('', Validators.required),
      codigo_pais: new FormControl('', Validators.required),
      ubicacion_provincia: new FormControl(''),
      ubicacion_canton: new FormControl(''),
      ubicacion_distrito: new FormControl(''),
      ubicacion_barrio: new FormControl(''),
      identificacion_numero: new FormControl(''),
      ubicacion_otras_senas: new FormControl('', Validators.required),
      tipo_identificacion: new FormControl(''),
    });
  }

  // METODO PARA CREAR
  public addReceptor() {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    if (this.receptor.corporativo_id.toString() === '0') {
      alert('El administrador next no puede tener ningun receptor asociada');
    } else {
      if (this.form.valid) {
        this.receptor.activo = 1;
        this.receptor.usuario_actualizo_id = 0;
        this.receptor.usuario_creo_id = 1;
        this.receptor.estado = '';
        this.receptor.municipio = '';
        this.receptor.pais = '';
        this._servicio.addReceptor(this.receptor)
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
              this.txtBtnAgregar = 'Guardar';
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
              this.txtBtnAgregar = 'Guardar';
            }
          );
      } else {
        this.alerta = 'show';
        setTimeout(() => {
          this.alerta = 'hide';
        }, 1500);
        this.txtBtnAgregar = 'Guardar';
      }
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



  ActualizaProvincia(provincia_id: any) {
    this.receptor.ubicacion_provincia = provincia_id.value;
    if (this.auxCambio === true) {
      this.getCantones(provincia_id.value);
    }
    this.auxCambio = true;
  }


  ActualizaCanton(provincia_id: any) {
    this.receptor.ubicacion_canton = provincia_id.value;
    this.getDestritos(this.receptor.ubicacion_provincia, provincia_id.value);
  }

  ActualizaDistrito(distrito_id: any) {
    this.receptor.ubicacion_distrito = distrito_id.value;
    this.getBarrios(this.receptor.ubicacion_provincia, this.receptor.ubicacion_canton, distrito_id.value);
  }


  ActualizaBarrio(barrio_id: any) {
    this.receptor.ubicacion_barrio = barrio_id.value;
  }

  /*   public getTipoIdentificacion() {
      this._servicioMMoneda.getcat_tipo_identificacion()
        .subscribe((data: HttpResponse<any>) => {
          // = data.body;
          this.lista_tipo_identificacion = $.map(data.body, function (obj: any) {
            obj.id = obj.codigo || obj.codigo;
            obj.text = obj.tipo_identificacion || obj.tipo_identificacion; // replace name with the property used for the text
            return obj;
          });
          this.startValue_identificacion = '';
          this.options = {
            placeholder: 'Seleccione...'
          };
        });
    } */

  getListaProvincias() {
    this._servicioLocalidades.getProvincias().subscribe((data: HttpResponse<any>) => {
      this.lista_provincias = $.map(data.body, function (obj: any) {
        obj.id = obj.provincia || obj.provincia;
        obj.text = obj.nombre_provincia || obj.nombre_provincia;
        return obj;
      });
      this.startValue = '';
      this.options = {
        placeholder: 'Seleccione...'
      };
    });
  }

  getCantones(id_provincia: any) {
    this._servicioLocalidades.getCanton(id_provincia).subscribe((data: HttpResponse<any>) => {
      this.listaCanton = $.map(data.body, function (obj: any) {
        obj.id = obj.canton || obj.canton;
        obj.text = obj.nombre_canton || obj.nombre_canton;
        return obj;
      });
      /* this.startValueCanton = '';
      this.options = {
        placeholder: 'Seleccione...'
      }; */
    });
  }

  getDestritos(id_provincia: any, id_canton: any) {
    this._servicioLocalidades.getDistrito(id_provincia, id_canton).subscribe((data: HttpResponse<any>) => {
      this.listaDistrito = $.map(data.body, function (obj: any) {
        obj.id = obj.distrito || obj.distrito;
        obj.text = obj.nombre_distrito || obj.nombre_distrito;
        return obj;
      });
    });
  }

  getBarrios(id_provincia: any, id_canton: any, id_distrito) {
    this._servicioLocalidades.getBarrio(id_provincia, id_canton, id_distrito).subscribe((data: HttpResponse<any>) => {
      this.listaBarrio = $.map(data.body, function (obj: any) {
        obj.id = obj.barrio || obj.barrio;
        obj.text = obj.nombre_barrio || obj.nombre_barrio;
        return obj;
      });
    });
  }

}

