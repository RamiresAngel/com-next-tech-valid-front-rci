import { Component, OnInit, Input } from '@angular/core';
import { ReceptorService } from '../receptor.service';
import { Receptor } from '../clases/receptor';
import { CorpMin } from '../clases/corp_min';
import { HttpResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DireccionService } from 'src/app/compartidos/direccion/direccion.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CorporativoService } from '../../corporativo/corporativo.service';
declare var $: any;

@Component({
  selector: 'app-edit-receptor',
  templateUrl: './edit-receptor.component.html'
})
export class EditReceptorComponent implements OnInit {

  // DECLARACION DE METODOS Y VARIABLES
  id: number;
  private sub: any;
  public corporativos: CorpMin[];
  @Input('irec') irec: Receptor;
  public receptor = new Receptor;
  public receptores: Receptor[];
  alerta = 'hide';
  exito = 'hide';
  error = 'hide';
  messageerror = '';
  public showCorporativos = false;
  public lista_provincias: any;
  public listaProvincias: any;
  public listaCanton: any;
  public listaDistrito: any;
  public listaBarrio: any;
  public startValue: string;
  public startValue_provincia: string;
  public startValue_canton: string;
  public startValue_distrito: string;
  public startValue_barrio: string;
  public lista_tipo_identificacion: any;
  public startValue_identificacion: any;
  public maxcedula: any;
  public txtBtnGuardar: string;
  public auxCambio = false;
  public options: Select2Options;
  public form: FormGroup;

  constructor(
    private _ServicioReceptor: ReceptorService,
    private route: ActivatedRoute,
    private _servicioLocalidades: DireccionService,
    private _storageService: StorageService,
    private _servicioCorporativo: CorporativoService,
    private router: Router) { }



  ngOnInit() {
    this.txtBtnGuardar = 'Guardar';
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
      //   });
    } else {
      this.receptores[0].corporativo_id = usuario.corporativo_id;
    }

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
        if (this.receptores[0].activo === 1) {
          this.receptores[0].estatus = true;
        }
        this.getListaProvinciasById(this.receptores[0].ubicacion_provincia);
      });

    /* this._ServicioReceptor.getCorporativoMin()
      .subscribe((data: HttpResponse<any>) => {
        this.corporativos = data.body;
      }); */
  }

  // METODO PARA VALIDAR EL FORM
  private updateForm() {
    this.form = new FormGroup({
      nombre: new FormControl('', Validators.required),
      ubicacion_provincia: new FormControl(''),
      ubicacion_canton: new FormControl(''),
      ubicacion_distrito: new FormControl(''),
      ubicacion_barrio: new FormControl(''),
      codigo_pais: new FormControl('', Validators.required),
      ubicacion_otras_senas: new FormControl('', Validators.required),
      identificacion_numero: new FormControl('', [Validators.required, this.patternValidator(/[0-9]/)]),
      estatus: new FormControl('')
    });
  }


  // METODO PARA CREAR
  public updateReceptor() {
    if (this.form.valid) {

      // validación de estatus
      if (this.receptores[0].estatus === true) {
        this.receptores[0].activo = 1;
      } else {
        this.receptores[0].activo = 0;
      }

      this._ServicioReceptor.updateReceptor(this.receptores[0])
        .subscribe((data) => {
          this.exito = 'show';
          setTimeout(() => {
            this.exito = 'hide';
          }, 1000);
          setTimeout(() => {
            this.router.navigate(['/home/receptor']);
            this.form.reset();
          }, 1500);
        },
          err => {
            this.messageerror = err.error;
            this.error = 'show';
            setTimeout(() => {
              this.error = 'hide';
            }, 4000);
          },
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


  ActualizaCorporativo(corporativo_id: any) {
    if (this.auxCambio === true) {
      this.receptores[0].corporativo_id = Number(corporativo_id.value);
    }
  }

  ActualizaProvincia(provincia_id: any) {
    if (this.auxCambio === true) {
      this.receptores[0].ubicacion_provincia = provincia_id.value;
      this.getCantones(provincia_id.value);
    }
  }


  ActualizaCanton(provincia_id: any) {
    if (this.auxCambio === true) {
      this.receptores[0].ubicacion_canton = provincia_id.value;
      this.getDestritos(this.receptores[0].ubicacion_provincia, provincia_id.value);
    }
  }

  ActualizaDistrito(distrito_id: any) {
    if (this.auxCambio === true) {
      this.receptores[0].ubicacion_distrito = distrito_id.value;
      this.getBarrios(this.receptores[0].ubicacion_provincia, this.receptores[0].ubicacion_canton, distrito_id.value);
    }
  }


  ActualizaBarrio(barrio_id: any) {
    if (this.auxCambio === true) {
      this.receptores[0].ubicacion_barrio = barrio_id.value;
    }
  }



  getListaProvincias() {
    this._servicioLocalidades.getProvincias().subscribe((data: HttpResponse<any>) => {
      this.lista_provincias = $.map(data.body, function (obj: any) {
        obj.id = obj.provincia || obj.provincia;
        obj.text = obj.nombre_provincia || obj.nombre_provincia;
        return obj;
      });
      this.startValue = '';
    });
  }



  getListaProvinciasById(provincia_id: any) {
    this._servicioLocalidades.getProvincias().subscribe((data: HttpResponse<any>) => {
      this.lista_provincias = $.map(data.body, function (obj: any) {
        obj.id = obj.provincia || obj.provincia;
        obj.text = obj.nombre_provincia || obj.nombre_provincia;
        return obj;
      });
      this.startValue_provincia = provincia_id;
      this.getCantonesById(provincia_id);
    });
  }


  getCantones(id_provincia: any) {
    this._servicioLocalidades.getCanton(id_provincia).subscribe((data: HttpResponse<any>) => {
      this.listaCanton = $.map(data.body, function (obj: any) {
        obj.id = obj.canton || obj.canton;
        obj.text = obj.nombre_canton || obj.nombre_canton;
        return obj;
      });
    });
  }

  getCantonesById(id_provincia: any) {
    this._servicioLocalidades.getCanton(id_provincia).subscribe((data: HttpResponse<any>) => {
      this.listaCanton = $.map(data.body, function (obj: any) {
        obj.id = obj.canton || obj.canton;
        obj.text = obj.nombre_canton || obj.nombre_canton;
        return obj;
      });
      this.startValue_canton = this.receptores[0].ubicacion_canton;
      this.getDestritosById(this.receptores[0].ubicacion_provincia, this.receptores[0].ubicacion_canton);
    });
  }

  getDestritos(id_provincia: any, id_canton: any) {
    this._servicioLocalidades.getDistrito(id_provincia, id_canton).subscribe((data: HttpResponse<any>) => {
      this.listaDistrito = $.map(data.body, function (obj: any) {
        obj.id = obj.distrito || obj.distrito;
        obj.text = obj.nombre_distrito || obj.nombre_distrito;
        return obj;
      });
      this.startValue_distrito = '';
    });
  }

  getDestritosById(id_provincia: any, id_canton: any) {
    this._servicioLocalidades.getDistrito(id_provincia, id_canton).subscribe((data: HttpResponse<any>) => {
      this.listaDistrito = $.map(data.body, function (obj: any) {
        obj.id = obj.distrito || obj.distrito;
        obj.text = obj.nombre_distrito || obj.nombre_distrito;
        return obj;
      });

      this.startValue_distrito = this.receptores[0].ubicacion_distrito;
      // tslint:disable-next-line:max-line-length
      this.getBarriosById(this.receptores[0].ubicacion_provincia, this.receptores[0].ubicacion_canton, this.receptores[0].ubicacion_distrito);

    });
  }

  getBarrios(id_provincia: any, id_canton: any, id_distrito: any) {
    this._servicioLocalidades.getBarrio(id_provincia, id_canton, id_distrito).subscribe((data: HttpResponse<any>) => {
      this.listaBarrio = $.map(data.body, function (obj: any) {
        obj.id = obj.barrio || obj.barrio;
        obj.text = obj.nombre_barrio || obj.nombre_barrio;
        return obj;
      });
      this.startValue_barrio = '';
    });
  }

  getBarriosById(id_provincia: any, id_canton: any, id_distrito: any) {
    this._servicioLocalidades.getBarrio(id_provincia, id_canton, id_distrito).subscribe((data: HttpResponse<any>) => {
      this.listaBarrio = $.map(data.body, function (obj: any) {
        obj.id = obj.barrio || obj.barrio;
        obj.text = obj.nombre_barrio || obj.nombre_barrio;
        return obj;
      });

      this.startValue_barrio = this.receptores[0].ubicacion_barrio;
      this.auxCambio = true;
    });
  }



}
