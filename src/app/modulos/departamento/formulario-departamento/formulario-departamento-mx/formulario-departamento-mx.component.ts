import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Departamento } from 'src/app/entidades/Departamento';
import { DepartamentoService } from '../../departamento.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { HttpResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';

@Component({
  selector: 'app-formulario-departamento-mx',
  templateUrl: './formulario-departamento-mx.component.html',
  styleUrls: ['./formulario-departamento-mx.component.css']
})
export class FormularioDepartamentoMxComponent implements OnInit {

  departamento: Departamento;
  id_departamento: string;
  accion_departamento: string;
  public formulario_departamento: FormGroup;
  corporativo_activo: CorporativoActivo;
  txtBtnAgregar: string;
  flag = false;
  identificador_corporativo: string;

  constructor(
    private _activeRoute: ActivatedRoute,
    private _departamentoService: DepartamentoService,
    private _storageService: StorageService,
    public globales: GlobalsComponent,
    private _router: Router
  ) { }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.txtBtnAgregar = 'Guardar';
    this.departamento = new Departamento();
    this._activeRoute.params.subscribe((paramtetro) => {
      this.id_departamento = paramtetro['id_departamento'];
      this.id_departamento = this._storageService.desencriptar_ids(paramtetro['id_departamento']);
    });
    if (this.id_departamento) {
      console.log(' Es edicion ');
      this._departamentoService.obtenerDepartamentoPorIdentificador(this.id_departamento)
        .subscribe((data: HttpResponse<Departamento>) => {
          this.departamento = data[0];
        }, error => {
          console.log(error);
        });
      this.accion_departamento = 'Editar';
      this.iniciarFormularioEditar();
    } else {
      console.log(' Es Creacion ');
      this.accion_departamento = 'Agregar Nuevo';
      this.iniciarFormularioCrear();
    }
  }

  iniciarFormularioCrear() {
    this.formulario_departamento = new FormGroup({
      clave_departamento: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      activo: new FormControl('')
    });
  }
  iniciarFormularioEditar() {
    this.formulario_departamento = new FormGroup({
      clave_departamento: new FormControl(),
      descripcion: new FormControl(''),
      activo: new FormControl('')
    });
  }
  async onSubmit() {
    console.log(this.departamento);
    if (this.formulario_departamento.valid) {
      this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
      if (this.id_departamento !== null && this.id_departamento !== undefined && this.id_departamento !== '') {
        await this.actualizaDepartamento();
      } else {
        // this.departamento.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
        await this.crearDepartamento();
      }
    }
  }

  actualizaDepartamento() {
    this.departamento.activo = this.formulario_departamento.get('activo').value ? 1 : 0;
    this._departamentoService.actualizarDepartamento(this.departamento)
      .subscribe((data: HttpResponse<any>) => {
        this._router.navigate(['/home/departamento']);
        swal.fire('Éxito', 'Guardado Correctamente', 'success').then((result) => {
          if (result) {
          }
        });
      }, error => {
        console.log(error);
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        this.txtBtnAgregar = 'Guardar';
      });
  }

  crearDepartamento() {
    this.departamento.identificador_corporativo = this.identificador_corporativo;
    this._departamentoService.crearDepartamento(this.departamento)
      .subscribe((data: HttpResponse<any>) => {
        this._router.navigate(['/home/departamento']);
        swal.fire('Éxito', 'Guardado Correctamente', 'success').then((result) => {
          if (result) {
          }
        });
      }, error => {
        console.log(error);
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        this.txtBtnAgregar = 'Guardar';
      });
  }

  ActualizaCorporativo(data) {
    if (data.value !== '0') {
      this.identificador_corporativo = data.value;
    } else {
      this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    }
  }
}
