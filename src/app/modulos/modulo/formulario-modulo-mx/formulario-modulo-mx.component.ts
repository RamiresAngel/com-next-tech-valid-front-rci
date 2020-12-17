import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { ModuloService } from '../modulo.service';
import { Modulo } from 'src/app/entidades/modulo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { Categoria } from 'src/app/entidades/categoria';
import { CategoriaService } from '../../categoria/categoria.service';

@Component({
  selector: 'app-formulario-modulo-mx',
  templateUrl: './formulario-modulo-mx.component.html',
  styleUrls: ['./formulario-modulo-mx.component.css']
})
export class FormularioModuloMxComponent implements OnInit {
  id_modulo: string;
  public modulo = new Modulo();
  formulario_modulo: FormGroup;
  accion_modulo: string;
  lista_categoria: Categoria[];
  txtBtnAgregar = 'Guardar';
  startValue_categoria: any;
  public flag = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService,
    private _moduloService: ModuloService,
    private _router: Router,
    private _categoriaService: CategoriaService
  ) {
    this._activatedRoute.params.subscribe(id => {
      this.id_modulo = this._storageService.desencriptar_ids(id['id']);
    });
    this.iniciarFormulario();
  }

  ngOnInit() {
    this.txtBtnAgregar = 'Guardar';
    this.obtenerCategorias();
  }


  //   if(this.id_modulo) {
  //     this.accion_modulo = 'Editar ';
  //     this.obtnerModulo();
  //     this.iniciarFormularioEditar();
  //   } else {
  //   this.accion_modulo = 'Agregar Nuevo ';
  //   this.iniciarFormulario();
  // }

  iniciarFormulario() {
    this.formulario_modulo = new FormGroup({
      nombre: new FormControl('', Validators.required),
      icono: new FormControl('', Validators.required),
      activo: new FormControl(1)
    });
  }

  iniciarFormularioEditar() {
    this.formulario_modulo = new FormGroup({
      nombre: new FormControl(this.modulo.nombre, Validators.required),
      icono: new FormControl(this.modulo.icono, Validators.required),
      activo: new FormControl(this.modulo.activo)
    });
  }

  setDatosEdit() {
    if (this.id_modulo) {
      this._moduloService.obtenerModuloId(this.id_modulo).subscribe(
        (data: any) => {
          this.modulo = data[0];
        },
        error => {
        },
        () => {
          this.startValue_categoria = this.modulo.categoria_id;
        }
      );
      this.iniciarFormularioEditar();
    } else {
      this.iniciarFormulario();
      this.startValue_categoria = '';
      this.modulo.activo = 1;
    }
  }

  onSubmit() {
    (this.modulo.activo) ? this.modulo.activo = 1 : this.modulo.activo = 0;
    this.txtBtnAgregar =
      '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    if (this.formulario_modulo.valid) {
      if (this.id_modulo) {
        this.actualizarModulo();
      } else {
        this._moduloService.crearModulo(this.modulo).subscribe(
          (data: any) => {
            this._router.navigate(['/home/modulo']);
            swal.fire(
              'Éxito',
              'Guardado Correctamente',
              'success'
            );
          },
          (error) => {

            this.txtBtnAgregar = 'Guardar';
            swal.fire(
              'Atención',
              'Ha ocurrido un error. <br> Detalle error: ' +
              error.error.mensaje,
              'error'
            );
          },
          () => {

          }
        );
      }
    }
  }

  actualizarModulo() {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this._moduloService.actualizarModulo(this.modulo).subscribe(
      (data: any) => {
        this._router.navigate(['/home/modulo']);
        swal.fire(
          'Éxito',
          'Guardado Correctamente',
          'success'
        );
      },
      error => {
        console.log(error);
        this.txtBtnAgregar = 'Guardar';
        swal.fire(
          'Atención',
          'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje,
          'error'
        );
      }
    );
  }

  actualizarCategoria(data) {
    this.modulo.categoria_id = data.value;
  }

  obtenerCategorias() {
    this._categoriaService.obtenerListaCategoriaCF().subscribe(
      (data: any) => {
        this.lista_categoria = data;
        this.lista_categoria = $.map(data, obj => {
          obj.id = obj.id;
          obj.text = obj.nombre;
          return obj;
        });
      },
      (error) => {

      },
      () => {
        this.setDatosEdit();
      }
    );
  }
}

  // actualizarCategoria(data) {
  //   if (data.value !== null) {
  //     if (data.value !== 'null') {
  //       if (this.flag) {
  //         this.modulo.categoria_id = data.value;
  //       } else {
  //         this.flag = true;
  //       }
  //     }
  //   }
  // }

