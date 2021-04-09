import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalsComponent } from '../../../compartidos/globals/globals.component';
import { SucursalMx } from '../../../entidades/sucursal-mx';
import { SucursalService } from '../sucursal.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
@Component({
  selector: 'app-formulario-sucursal',
  templateUrl: './formulario-sucursal.component.html',
  styleUrls: ['./formulario-sucursal.component.css']
})
export class FormularioSucursalComponent implements OnInit {

  public txtBtnAgregar = 'Guardar';
  public showCorporativos = true;
  public startValue_estado = '';
  public lista_estados = new Array<any>();
  public formulario_sucursal: FormGroup;
  public sucursal = new SucursalMx();
  public identificador_corporativo: string;
  public id_sucursal: any;
  public titulo = '';
  corporativo_activo: CorporativoActivo;

  constructor(
    public _globales: GlobalsComponent,
    private _activatedRoute: ActivatedRoute
    , private _servicio_sucursal: SucursalService
    , private _storageService: StorageService,
    private router: Router
  ) {
    this.InicializarFormulario();
    this.lista_estados = this._globales.array_estados;
  }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    console.log(this._storageService.getMenuDinamico());
    this._activatedRoute.params.subscribe((id) => {
      this.id_sucursal = this._storageService.desencriptar_ids(id['id']);
    });

    if (this.id_sucursal) {
      this.titulo = 'Editar Sucursal';
      this._servicio_sucursal.ObtenerSucursalMXByid(this.id_sucursal).subscribe(
        (data) => {
          this.sucursal = data[0];
          this.iniciarFormualarioEditar();
          setTimeout(() => {
            this.startValue_estado = data[0].estado;
          }, 1000);
        },
        (error) => {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        }
      );
    } else {
      this.titulo = 'Agregar Nueva Sucursal';
      this.InicializarFormulario();
    }
  }

  ActualizarEstado(obj: any): void {
    this.sucursal.estado = obj.data[0].id;
  }

  iniciarFormualarioEditar(): void {
    console.log('Entro a Sucursal edit');
    this.formulario_sucursal = new FormGroup({
      nombre_sucursal: new FormControl(this.sucursal.nombre, Validators.required),
      codigo: new FormControl(this.sucursal.codigo),
      codigo_erp: new FormControl(this.sucursal.codigo_erp, Validators.required),
      codigo_postal: new FormControl(this.sucursal.codigo_postal, Validators.required),
      direccion: new FormControl(this.sucursal.direccion, Validators.required),
      estatus: new FormControl(this.sucursal.estatus),
    });
    this.formulario_sucursal.updateValueAndValidity();
  }

  InicializarFormulario(): void {
    this.formulario_sucursal = new FormGroup({
      nombre_sucursal: new FormControl('', Validators.required),
      codigo: new FormControl('', Validators.required),
      codigo_erp: new FormControl(''),
      codigo_postal: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      estatus: new FormControl(''),
    });
  }

  ActualizarSucursal(): void {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    // this.sucursal.corporativo_identificador = this.corporativo_activo.corporativo_identificador;
    if (this.id_sucursal) {
      this.sucursal.estatus ? this.sucursal.estatus = 1 : this.sucursal.estatus = 0;
      this._servicio_sucursal.ActualizarSucursalMX(this.sucursal).subscribe(
        (data) => {
          swal.fire('Éxito', 'Guardado Correctamente', 'success');
          this.txtBtnAgregar = 'Guardar';
          this.router.navigate(['/home/sucursal']);
        }
        , (error) => {
          this.txtBtnAgregar = 'Guardar';
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        }
      );
    } else {
      this.sucursal.corporativo_identificador = this.identificador_corporativo;
      this.sucursal.estatus = 1;
      this._servicio_sucursal.GuardarSucursalMX(this.sucursal).subscribe(
        (data) => {
          swal.fire('Éxito', 'Guardado Correctamente', 'success');
          this.txtBtnAgregar = 'Guardar';
          this.router.navigate(['/home/sucursal']);
        }
        , (error) => {
          this.txtBtnAgregar = 'Guardar';
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        }
      );
    }
  }

  ActualizaCorporativo(data) {
    if (data.value !== '0') {
      this.identificador_corporativo = data.value;
    } else {
      this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    }
  }
}
