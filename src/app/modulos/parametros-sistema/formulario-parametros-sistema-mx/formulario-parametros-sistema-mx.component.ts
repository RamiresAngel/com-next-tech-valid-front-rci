import { Component, OnInit } from '@angular/core';
import { ParametrosSistema } from 'src/app/entidades/parametros-sistema';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ParametrosSistemaService } from '../parametros-sistema.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-formulario-parametros-sistema-mx',
  templateUrl: './formulario-parametros-sistema-mx.component.html',
  styleUrls: ['./formulario-parametros-sistema-mx.component.css']
})
export class FormularioParametrosSistemaMxComponent implements OnInit {
  public array_parametros_sistema: Array<ParametrosSistema>;
  public parametro_sistema = new ParametrosSistema();
  public formulario_parametros_sistema: FormGroup;
  public txtBtnAgregar = 'Guardar';
  public titulo = '';
  public id_parametros = null;
  corporativo_activo: CorporativoActivo;

  constructor(
    private servicio_parametros: ParametrosSistemaService
    , private router: Router
    , private _storageService: StorageService
    , private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this._activatedRoute.params.subscribe((id) => {
      this.id_parametros = this._storageService.desencriptar_ids(id['id']);
    });
    if (this.id_parametros) {
      this.titulo = 'Editar Parametro de Sistema';
      this.servicio_parametros.ObtenerParametrosSistemaMXByid(this.id_parametros).subscribe(
        (data) => {
          this.parametro_sistema = data[0];
        },
        (error) => {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        }
      );
      this.iniciarFormualarioEditar();
    } else {
      this.titulo = 'Agregar Nuevo Parametro de Sistema';
      this.inicializarFormulario();
    }
  }

  inicializarFormulario(): void {
    this.formulario_parametros_sistema = new FormGroup({
      codigo: new FormControl(''),
      llave: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required),
      estatus: new FormControl('')
    });
  }

  iniciarFormualarioEditar(): void {
    this.formulario_parametros_sistema = new FormGroup({
      codigo: new FormControl(this.parametro_sistema.codigo),
      llave: new FormControl(this.parametro_sistema.llave, Validators.required),
      valor: new FormControl(this.parametro_sistema.valor, Validators.required)
      // , estatus: new FormControl('')
    });

    // this.formulario_parametros_sistema.get('codigo').disable();
    this.formulario_parametros_sistema.get('llave').disable();
  }


  actualizarParametros(): void {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.parametro_sistema.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    if (this.id_parametros) {
      this.parametro_sistema.activo ? this.parametro_sistema.activo = 1 : this.parametro_sistema.activo = 0;
      this.servicio_parametros.ActualizarParametrosSistemaMX(this.parametro_sistema).subscribe(
        (data) => {
          swal.fire('Éxito', 'Guardado Correctamente', 'success');
          this.txtBtnAgregar = 'Guardar';
          this.router.navigate(['/home/parametros_sistema']);
        }
        , (error) => {
          this.txtBtnAgregar = 'Guardar';
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        }
      );
    } else {
      this.parametro_sistema.activo ? this.parametro_sistema.activo = 1 : this.parametro_sistema.activo = 0;
      this.servicio_parametros.GuardarParametosSistemaMX(this.parametro_sistema).subscribe(
        (data) => {
          swal.fire('Éxito', 'Guardado Correctamente', 'success');
          this.txtBtnAgregar = 'Guardar';
          this.router.navigate(['/home/parametros_sistema']);
        }
        , (error) => {
          this.txtBtnAgregar = 'Guardar';
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        }
      );
    }


  }


}
