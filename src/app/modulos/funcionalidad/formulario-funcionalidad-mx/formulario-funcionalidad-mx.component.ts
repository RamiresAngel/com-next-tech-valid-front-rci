import { Component, OnInit } from '@angular/core';
import { Modulo, Funcionalidad } from 'src/app/entidades/index';
import { ModuloService } from '../../modulo/modulo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { FuncionalidadService } from '../funcionalidad.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-funcionalidad-mx',
  templateUrl: './formulario-funcionalidad-mx.component.html',
  styleUrls: ['./formulario-funcionalidad-mx.component.css']
})
export class FormularioFuncionalidadMxComponent implements OnInit {

  lista_modulos: Modulo[];
  formulario_funcionalidad: FormGroup;
  public funcionalidad: Funcionalidad;
  txtBtnAgregar: string;
  id_funcionalidad: string;
  accion_Funcionalidad: string;
  startValue_modulos = null;

  constructor(
    private _modulosService: ModuloService,
    private activatedRoute: ActivatedRoute,
    private _storageService: StorageService,
    private globals: GlobalsComponent,
    private _funcionalidadService: FuncionalidadService,
    private _router: Router
  ) {
    this.activatedRoute.params.subscribe(id => {
      this.id_funcionalidad = this._storageService.desencriptar_ids(id['id']);
    });
    this.iniciarFormulario();
  }

  ngOnInit() {
    this.txtBtnAgregar = 'Guardar';
    this.obtenerModulos();
    this.funcionalidad = new Funcionalidad();
  }

  setDatosEdit() {
    if (this.id_funcionalidad) {
      this._funcionalidadService
        .obtenerFuncionalidadId(this.id_funcionalidad)
        .subscribe(
          (data: any) => {
            this.accion_Funcionalidad = 'Editar';
            this.funcionalidad = data[0];
          },
          error => {

          },
          () => {
            this.startValue_modulos = this.funcionalidad.modulo_id;
          }
        );
      this.iniciarFormularioEditar();
    } else {
      this.accion_Funcionalidad = 'Agregar Nueva';
      this.iniciarFormulario();
      this.startValue_modulos = '';
    }
  }

  iniciarFormulario() {
    this.formulario_funcionalidad = new FormGroup({
      icono: new FormControl('', Validators.required),
      target: new FormControl('', Validators.required),
      action: new FormControl(''),
      modulo: new FormControl('', Validators.required),
      ambito: new FormControl(1),
    });
  }

  iniciarFormularioEditar() {
    this.formulario_funcionalidad = new FormGroup({
      icono: new FormControl(this.funcionalidad.icono, Validators.required),
      target: new FormControl(this.funcionalidad.target, Validators.required),
      action: new FormControl(this.funcionalidad.action),
      modulo: new FormControl(this.funcionalidad.modulo),
      ambito: new FormControl(this.funcionalidad.ambito),
      activo: new FormControl(this.funcionalidad.activo)
    });
  }

  obtenerModulos() {
    this._modulosService.obtenerModuloCF().subscribe(
      (data: any) => {
        this.lista_modulos = $.map(data, function (obj: any) {
          obj.id = obj.id;
          obj.text = obj.nombre;
          return obj;
        });
      },
      error => {

      },
      () => {
        this.setDatosEdit();
      }
    );
  }

  onSubmit() {
    this.txtBtnAgregar =
      '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    (this.funcionalidad.activo) ? this.funcionalidad.activo = 1 : this.funcionalidad.activo = 0;
    (this.funcionalidad.ambito) ? this.funcionalidad.ambito = 1 : this.funcionalidad.ambito = 0;
    if (this.formulario_funcionalidad.valid) {
      if (this.id_funcionalidad) {
        this.funcionalidad.usuario_creo_id = this.funcionalidad.usuario_creo_id;
        this._funcionalidadService
          .actualizarFuncionalidad(this.funcionalidad)
          .subscribe(
            (data: any) => {
              this._router.navigate(['/home/funcionalidad']);
              swal.fire(
                'Éxito',
                'Guardado Correctamente',
                'success'
              );
            },
            error => {
              this.txtBtnAgregar = 'Guardar';
              swal.fire(
                'Atención',
                'Ha ocurrido un error. <br> Detalle error: ' +
                error.error.mensaje,
                'error'
              );
            }
          );
      } else {
        this._funcionalidadService
          .crearFuncionalidad(this.funcionalidad)
          .subscribe(
            (data: any) => {
              this._router.navigate(['/home/funcionalidad']);
              swal.fire(
                'Éxito',
                'Guardado Correctamente',
                'success'
              );
            },
            error => {
              this.txtBtnAgregar = 'Guardar';
              swal.fire(
                'Atención',
                'Ha ocurrido un error. <br> Detalle error: ' +
                error.error.mensaje,
                'error'
              );
            }
          );
      }
    }
  }

  actualizarTipofuncionalidad(evento: any) {
    console.log(evento);
    if (evento.value !== '') {
      this.funcionalidad.modulo_id = Number(evento.value);
    }
  }

  actualizarModulo(data) {
    this.formulario_funcionalidad.get('modulo').setValue(data.value);
    this.funcionalidad.modulo_id = Number(data.value);
  }
}
