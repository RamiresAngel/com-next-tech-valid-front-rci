import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categoria } from 'src/app/entidades/categoria';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../categoria.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-categoria-mx',
  templateUrl: './formulario-categoria-mx.component.html',
  styleUrls: ['./formulario-categoria-mx.component.css']
})
export class FormularioCategoriaMxComponent implements OnInit {
  public txtBtnAgregar = 'Guardar';
  public mostrar_categoria = true;
  public formulario_categoria: FormGroup;
  public categoria = new Categoria();
  public id_categoria: any;
  public titulo = '';

  constructor(
    public _globales: GlobalsComponent,
    private _activatedRoute: ActivatedRoute,
    private _service_categoria: CategoriaService,
    private _storageService: StorageService,
    private router: Router
  ) {
    this.iniciarFormulario();
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(id => {
      this.id_categoria = this._storageService.desencriptar_ids(id['id']);
    });

    if (this.id_categoria) {
      this.titulo = 'Editar Categoría';
      this._service_categoria.obtenerCategoriaId(this.id_categoria).subscribe(
        data => {
          this.categoria = data[0];
          this.iniciarFormualarioEditar();
        },
        error => {
          swal.fire(
            'Atención',
            'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje,
            'error'
          );
        },
        () => {

        }
      );
    } else {
      this.titulo = 'Agregar Nueva Categoría';
      this.iniciarFormulario();
    }
  }

  iniciarFormualarioEditar(): void {
    this.formulario_categoria = new FormGroup({
      nombre_categoria: new FormControl(this.categoria.nombre, Validators.required),
      icono: new FormControl(this.categoria.icono, Validators.required),
      activo: new FormControl(this.categoria.activo)
    });
    this.formulario_categoria.updateValueAndValidity();
  }

  iniciarFormulario(): void {
    this.formulario_categoria = new FormGroup({
      nombre_categoria: new FormControl('', Validators.required),
      icono: new FormControl('', Validators.required),
      activo: new FormControl('', Validators.required)
    });
  }

  actualizarCategoria(): void {
    (this.categoria.activo) ? this.categoria.activo = 1 : this.categoria.activo = 0;
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    if (this.id_categoria) {
      this._service_categoria.actualizarCategoria(this.categoria).subscribe(
        data => {
          swal.fire(
            'Éxito',
            'Guardado Correctamente',
            'success'
          );
          this.txtBtnAgregar = 'Guardar';
          this.router.navigate(['/home/categoria']);
        },
        error => {
          this.txtBtnAgregar = 'Guardar';
          swal.fire(
            'Atención',
            'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje,
            'error'
          );
        },
        () => {

        }
      );
    } else {
      this._service_categoria.guardarCategoria(this.categoria).subscribe(
        data => {
          swal.fire(
            'Éxito',
            'Guardado Correctamente',
            'success'
          );
          this.txtBtnAgregar = 'Guardar';
          this.router.navigate(['/home/categoria']);
        },
        error => {
          this.txtBtnAgregar = 'Guardar';
          swal.fire(
            'Atención',
            'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje,
            'error'
          );
        },
        () => {

        }
      );
    }
  }
}
