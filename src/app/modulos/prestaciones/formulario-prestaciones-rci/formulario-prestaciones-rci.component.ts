import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { PrestacionesService } from '../prestaciones.service';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { Prestaciones } from 'src/app/entidades';
import swal from 'sweetalert2';


@Component({
  selector: 'app-formulario-prestaciones-rci',
  templateUrl: './formulario-prestaciones-rci.component.html',
  styleUrls: ['./formulario-prestaciones-rci.component.css']
})
export class FormularioPrestacionesRciComponent implements OnInit {

  public datos_inciales: DatosIniciales;
  formularioPrestacion: FormGroup;
  accion_prestacion: string;
  txtBtnAgregar = 'Guardar';
  id_prestacion: string;
  corporativo_activo: CorporativoActivo;
  identificador_corporativo: string;
  prestacion: Prestaciones;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _storageService: StorageService,
    public _globals: GlobalsComponent,
    public _servicePrestacion: PrestacionesService
  ) {
    this.prestacion = new Prestaciones();
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this._activatedRoute.params.subscribe((id) => {
      this.id_prestacion = this._storageService.desencriptar_ids(id['id']);
    });
    // console.log(this.id_prestacion);
    this.cargaPorId();
  }

  ngOnInit() {
  }

  cargaPorId() {
    if (this.id_prestacion !== null && this.id_prestacion !== undefined && this.id_prestacion !== '') {
      this.accion_prestacion = 'Editar';
      this._servicePrestacion.getPrestacionId(this.id_prestacion)
        .subscribe((data: any) => {
          // console.log(data);
          this.prestacion = data;
        }, error => {
          console.log(error);
        },
          () => {
          });
      // console.log('Es edición');
      this.iniciarFormularioeditar();
    } else {
      this.accion_prestacion = 'Agregar Nueva';
      // console.log('Es creación');
      this.iniciarFormularioCrear();
    }
  }

  iniciarFormularioCrear() {
    this.formularioPrestacion = new FormGroup({
      nombre_prest: new FormControl('', Validators.required),
      tope: new FormControl('', [Validators.required, this.validarSoloNumero]),
      porcentaje: new FormControl('', [Validators.required, this.validarporcentaje])
    });
  }

  iniciarFormularioeditar() {
    this.formularioPrestacion = new FormGroup({
      nombre_prest: new FormControl('', Validators.required),
      tope: new FormControl('', [Validators.required, this.validarSoloNumero]),
      porcentaje: new FormControl('', [Validators.required, this.validarporcentaje])
    });
  }

  onSubmit() {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    if (this.formularioPrestacion.valid) {
      if (this.id_prestacion !== null && this.id_prestacion !== undefined && this.id_prestacion !== '') {
        this.actualizarCuenta();
      } else {
        this.crearCuenta();
      }
    }
  }

  actualizarCuenta() {
    // console.log(this.formularioPrestacion.value);
    const aux_prestacion = {
      nombre: this.formularioPrestacion.value.nombre_prest,
      tope_reembolsable: this.formularioPrestacion.value.tope,
      porcentaje_reembolsable: this.formularioPrestacion.value.porcentaje,
      identificador_usuario_creo: this.prestacion.identificador_usuario_creo,
      id: this.prestacion.id,
      activo: this.prestacion.activo,
    };
    // console.log(aux_prestacion);
    this._servicePrestacion.editaPrestacion(aux_prestacion)
      .subscribe((data: any) => {
        this._router.navigate(['home/prestaciones']);
        swal.fire('Éxito', 'Guardado Correctamente', 'success');
      }, error => {
        console.log(error);
        this.txtBtnAgregar = 'Guardar';
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      });
  }

  crearCuenta() {
    // thconsole.log(is.formularioPrestacion.value);
    const aux_prestacion = {
      nombre: this.formularioPrestacion.value.nombre_prest,
      tope_reembolsable: this.formularioPrestacion.value.tope,
      porcentaje_reembolsable: this.formularioPrestacion.value.porcentaje,
      identificador_corporativo: this.identificador_corporativo,
      identificador_usuario_creo: this.datos_inciales.usuario.identificador_usuario,
    };
    // console.log(aux_prestacion);
    this._servicePrestacion.creaPrestaciones(aux_prestacion)
      .subscribe((data: any) => {
        this._router.navigate(['home/prestaciones']);
        swal.fire('Éxito', 'Guardado Correctamente', 'success');
      }, error => {
        console.log(error);
        this.txtBtnAgregar = 'Guardar';
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      });
  }

  private validarSoloNumero(control: AbstractControl) {
    const tope = control.value;
    let error = null;
    const regex = new RegExp(/^[0-9]+\.?([0-9]{1,4})?$/);
    if (!regex.test(tope)) {
      error = 'La estructura del Tope Reembolsable es invalida.';
    }
    return error;
  }

  private validarporcentaje(control: AbstractControl) {
    const tope = control.value;
    let error = null;
    const regex = new RegExp(/^[0-9]{1,3}?$/);
    if (!regex.test(tope)) {
      error = 'La estructura del Tope Reembolsable es invalida.';
    }
    if (Number(tope) > 100) {
      error = 'El porcentaje debe de ser de 1 a 100.';
    }
    return error;
  }

  get controles() {
    return this.formularioPrestacion.controls;
  }

}
