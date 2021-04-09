import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contribuyente } from 'src/app/entidades/contribuyente';
import { ContribuyenteService } from '../contribuyente.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';

@Component({
  selector: 'app-formulario-contribuyente-mx',
  templateUrl: './formulario-contribuyente-mx.component.html',
  styleUrls: ['./formulario-contribuyente-mx.component.css']
})
export class FormularioContribuyenteMxComponent implements OnInit {

  public formulario_contribuyente: FormGroup;
  public accionContribuyente: string;
  public contribuyente = new Contribuyente();
  public txtBtnAgregar = 'Guardar';
  public id_contibuyente: any;
  public lista_estados = new Array<any>();
  public lista_pais: any;
  public startValue_estado: any;
  corporativo_activo: CorporativoActivo;
  public startValue_pais: any;
  public identificador_corporativo: string;
  constructor(
    private _servicioContribuyentes: ContribuyenteService
    , public globals: GlobalsComponent
    , private _storageService: StorageService
    , private _activatedRoute: ActivatedRoute
    , private router: Router,
  ) {
    this.lista_estados = this.globals.array_estados;
    this.lista_pais = this.globals.array_lista_pais;
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.InicializarFormulario();
  }

  ngOnInit() {

    this.startValue_estado = null;
    this.startValue_pais = null;
    this._activatedRoute.params.subscribe((id) => {
      this.id_contibuyente = this._storageService.desencriptar_ids(id['id']);
    });

    if (this.id_contibuyente) {
      this.accionContribuyente = 'Editar';
      this._servicioContribuyentes.ObtenerContribuyenteMXByid(this.id_contibuyente).subscribe(
        (data) => {
          this.contribuyente = data[0];
          this.iniciarFormualarioEditar();
          setTimeout(() => {
            this.startValue_estado = data[0].estado;
            this.startValue_pais = data[0].pais;
          }, 1000);
        },
        (error) => {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        }
      );
    } else {
      this.accionContribuyente = 'Agregar Nuevo';
      this.InicializarFormulario();
    }
  }


  ActualizarEstado(obj: any): void {
    this.contribuyente.estado = obj.data[0].id;
  }

  Actualizarpais(obj: any): void {
    this.contribuyente.pais = obj.data[0].id;
  }

  iniciarFormualarioEditar(): void {
    this.formulario_contribuyente = new FormGroup({
      nombre: new FormControl(this.contribuyente.nombre, Validators.required),
      nombre_corto: new FormControl(this.contribuyente.nombre_corto),
      razon_social: new FormControl(this.contribuyente.razon_social, Validators.required),
      identificador_fiscal: new FormControl(this.contribuyente.identificador_fiscal, Validators.required),
      codigo: new FormControl(this.contribuyente.codigo),
      calle: new FormControl(this.contribuyente.calle),
      no_interior: new FormControl(this.contribuyente.no_interior),
      no_exterior: new FormControl(this.contribuyente.no_exterior),
      colonia: new FormControl(this.contribuyente.colonia),
      localidad: new FormControl(this.contribuyente.localidad),
      municipio: new FormControl(this.contribuyente.municipio),
      estado: new FormControl(this.contribuyente.estado),
      pais: new FormControl(this.contribuyente.pais),
      codigo_postal: new FormControl(this.contribuyente.codigo_postal),
      estatus: new FormControl(this.contribuyente.estatus),
    });
    this.formulario_contribuyente.updateValueAndValidity();
  }

  InicializarFormulario(): void {
    this.formulario_contribuyente = new FormGroup({
      nombre: new FormControl('', Validators.required),
      nombre_corto: new FormControl('', Validators.required),
      razon_social: new FormControl('', Validators.required),
      identificador_fiscal: new FormControl('', Validators.required),
      codigo: new FormControl('', Validators.required),
      calle: new FormControl('', Validators.required),
      no_interior: new FormControl(''),
      no_exterior: new FormControl('', Validators.required),
      colonia: new FormControl('', Validators.required),
      localidad: new FormControl(''),
      municipio: new FormControl('', Validators.required),
      estado: new FormControl(''),
      pais: new FormControl(''),
      codigo_postal: new FormControl('', Validators.required),
      estatus: new FormControl('')
    });
  }

  ActualizarContribuyente(): void {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.contribuyente.corporativo_identificador = this.identificador_corporativo;
    if (this.id_contibuyente) {
      this.contribuyente.estatus ? this.contribuyente.estatus = 1 : this.contribuyente.estatus = 0;
      this._servicioContribuyentes.ActualizarContibuyentelMX(this.contribuyente).subscribe(
        (data) => {
          swal.fire('Éxito', 'Guardado Correctamente', 'success');
          this.txtBtnAgregar = 'Guardar';
          this.router.navigate(['/home/contribuyente']);
        }
        , (error) => {
          this.txtBtnAgregar = 'Guardar';
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        }
      );
    } else {
      this.contribuyente.estatus ? this.contribuyente.estatus = 1 : this.contribuyente.estatus = 0;
      this._servicioContribuyentes.GuardarContribuyenteMX(this.contribuyente).subscribe(
        (data) => {
          swal.fire('Éxito', 'Guardado Correctamente', 'success');
          this.txtBtnAgregar = 'Guardar';
          this.router.navigate(['/home/contribuyente']);
        }
        , (error) => {
          if (error.estatus) {
            console.log(error);
          }
          this.txtBtnAgregar = 'Guardar';
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        }
      );
    }
  }

  actualizaCorporativo(obj: any) {
    this.identificador_corporativo = obj.value;
  }

}
