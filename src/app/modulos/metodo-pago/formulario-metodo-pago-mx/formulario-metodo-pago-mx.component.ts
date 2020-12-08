import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Departamento } from 'src/app/entidades/Departamento';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { HttpResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { MetodoPagoService } from '../metodo-pago.service';
import { MetodoPago } from 'src/app/entidades/Metodo-Pago';

@Component({
  selector: 'app-formulario-metodo-pago-mx',
  templateUrl: './formulario-metodo-pago-mx.component.html',
  styleUrls: ['./formulario-metodo-pago-mx.component.css']
})
export class FormularioMetodoPagoMxComponent implements OnInit {

  metodo_pago: MetodoPago;
  id_metodo_pago: string;
  accion_metodo_pago: string;
  public formulario_metodo_pago: FormGroup;
  txtBtnAgregar: string;
  identificador_corporativo: string;

  constructor(
    private _activeRoute: ActivatedRoute,
    private _metodoPagoService: MetodoPagoService,
    private _storageService: StorageService,
    private _router: Router
  ) { }

  ngOnInit() {
    const corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = corporativo_activo.corporativo_identificador;
    this.txtBtnAgregar = 'Guardar';
    this.metodo_pago = new MetodoPago();
    this._activeRoute.params.subscribe((paramtetro) => {
      this.id_metodo_pago = paramtetro['id_metodo_pago'];
      this.id_metodo_pago = this._storageService.desencriptar_ids(paramtetro['id_metodo_pago']);
    });
    if (this.id_metodo_pago) {
      console.log(' Es edicion ');
      this._metodoPagoService.obtenerMetodoPagoId(this.id_metodo_pago)
        .subscribe((data: HttpResponse<MetodoPago>) => {
          console.log(data[0]);
          this.metodo_pago = data[0];
          // console.log(this.departamento);
        }, error => {
          console.log(error);
        });
      this.accion_metodo_pago = 'Editar';
      this.iniciarFormularioEditar();
    } else {
      console.log(' Es Creacion ');
      this.accion_metodo_pago = 'Crear';
      this.iniciarFormularioCrear();
    }
  }


  iniciarFormularioCrear() {
    this.formulario_metodo_pago = new FormGroup({
      codigo: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      activo: new FormControl('')
    });
  }
  iniciarFormularioEditar() {
    this.formulario_metodo_pago = new FormGroup({
      codigo: new FormControl(),
      descripcion: new FormControl(''),
      activo: new FormControl('')
    });
  }
  async onSubmit() {
    if (this.formulario_metodo_pago.valid) {
      this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
      if (this.id_metodo_pago !== null && this.id_metodo_pago !== undefined && this.id_metodo_pago !== '') {
        await this.actualizaDepartamento();
      } else {
        this.metodo_pago.identificador_corporativo = this.identificador_corporativo;
        await this.crearDepartamento();
      }
    }
  }

  actualizaDepartamento() {
    this.metodo_pago.activo = this.formulario_metodo_pago.get('activo').value ? 1 : 0;
    this._metodoPagoService.actualizarMetodoPago(this.metodo_pago)
      .subscribe((data: HttpResponse<any>) => {
        console.log(data);
        this._router.navigate(['/home/metodo_pago']);
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
    this._metodoPagoService.crearMetodoPago(this.metodo_pago)
      .subscribe((data: HttpResponse<any>) => {
        this._router.navigate(['/home/metodo_pago']);
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
}
