import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { NivelGasto } from 'src/app/entidades/Nivel-Gasto';
import { NivelGastoService } from '../../nivel-gasto.service';
import { HttpResponse } from '@angular/common/http';

import swal from 'sweetalert2';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
declare var $: any;

@Component({
  selector: 'app-formulario-nivel-gasto-mx',
  templateUrl: './formulario-nivel-gasto-mx.component.html',
  styleUrls: ['./formulario-nivel-gasto-mx.component.css']
})
export class FormularioNivelGastoMxComponent implements OnInit {

  public txtBtnAgregar = 'Guardar';
  public accion_nivel_gasto = 'Agregar Nuevo';
  public formulario_nivel_gasto: FormGroup;
  public nivel_gasto = new NivelGasto();
  indentificador_nivel_gasto: string;
  corporativo_activo: CorporativoActivo;
  identificador_corporativo: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public globals: GlobalsComponent,
    private _storageService: StorageService,
    private _nivelGastoServie: NivelGastoService
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
  }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.txtBtnAgregar = 'Guardar';
    this._activatedRoute.params.subscribe((identificador) => {
      this.indentificador_nivel_gasto = this._storageService.desencriptar_ids(identificador['identificador_nivel_gasto']);
    });

    if (this.indentificador_nivel_gasto !== null && this.indentificador_nivel_gasto !== undefined && this.indentificador_nivel_gasto !== '') {
      this.accion_nivel_gasto = 'Editar';
      this._nivelGastoServie.obtenerNivelGastoPorIdentificador(this.indentificador_nivel_gasto)
        .subscribe((data: HttpResponse<NivelGasto>) => {
          this.obtenerNivelGasto(data[0]);
          console.log(this.nivel_gasto);
        }, error => {
          console.log(error);
        });
      this.inciarFormularioEditar();
    } else {
      this.inciarFormularioCrear();
    }
  }

  obtenerNivelGasto(data: any) {
    this.nivel_gasto = data;
  }

  inciarFormularioEditar() {
    this.formulario_nivel_gasto = new FormGroup({
      terminacion: new FormControl(this.nivel_gasto.terminacion, Validators.required),
      descripcion: new FormControl(this.nivel_gasto.descripcion, Validators.required),
      activo: new FormControl('')
    });
    console.log('Editar');
  }

  inciarFormularioCrear() {
    this.nivel_gasto.activo = 1;
    this.formulario_nivel_gasto = new FormGroup({
      terminacion: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required)
    });
    console.log('Crear');
  }

  onSubmit() {
    this.nivel_gasto.identificador_corporativo = this.identificador_corporativo;
    if (this.formulario_nivel_gasto.valid && this.nivel_gasto.terminacion.trim() !== '' && this.nivel_gasto.descripcion.trim() !== '') {
      this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
      if (this.indentificador_nivel_gasto !== null && this.indentificador_nivel_gasto !== undefined && this.indentificador_nivel_gasto !== '') {
        this.actualizarNivelGasto();
      } else {
        this.crearNivelGasto();
      }
    } else {
      swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: Verifique los campos.', 'error');
    }
  }

  actualizarNivelGasto() {
    this.nivel_gasto.activo = this.formulario_nivel_gasto.get('activo').value ? 1 : 0;
    this._nivelGastoServie.actualizarNivelGasto(this.nivel_gasto).subscribe((data: HttpResponse<any>) => {
      this._router.navigate(['home/nivel_gasto']);
      swal.fire('Éxito', 'Guardado Correctamente', 'success');
    }, error => {
      console.log(error);
      swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      this.txtBtnAgregar = 'Guardar';
    });
  }
  crearNivelGasto() {
    this.nivel_gasto.activo = 1;
    this._nivelGastoServie.agregarNivelGasto(this.nivel_gasto).subscribe((data: HttpResponse<any>) => {
      this._router.navigate(['home/nivel_gasto']);
      swal.fire('Éxito', 'Guardado Correctamente', 'success');
    }, error => {
      console.log(error);
      swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      this.txtBtnAgregar = 'Guardar';
    });
  }
  ActualizaCorporativo(data) {
    console.log(data.value);
    if (data.value !== '0') {
      this.identificador_corporativo = data.value;
    } else {
      this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    }
  }

}
