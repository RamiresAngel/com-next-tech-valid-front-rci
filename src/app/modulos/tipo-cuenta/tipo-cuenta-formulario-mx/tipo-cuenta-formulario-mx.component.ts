import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoCuenta } from 'src/app/entidades/tipo-cuenta';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import swal from 'sweetalert2';
import { TipoCuentaService } from '../tipo-cuenta.service';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';

@Component({
  selector: 'app-tipo-cuenta-formulario-mx',
  templateUrl: './tipo-cuenta-formulario-mx.component.html',
  styleUrls: ['./tipo-cuenta-formulario-mx.component.css']
})
export class TipoCuentaFormularioMxComponent implements OnInit {
  accion_tipo_cuenta: string;
  formulario_tipo_cuenta: FormGroup;
  txtBtnAgregar = 'Guardar';
  tipo_cuenta = new TipoCuenta();
  id_tipo_cuenta: string;
  corporativo_activo: CorporativoActivo;
  identificador_corporativo: string;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService,
    private _tipoCuentaService: TipoCuentaService,
    private _router: Router,
    public _globals: GlobalsComponent
  ) {
    this.iniciarFormularioCrear();
  }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this._activatedRoute.params.subscribe((id) => {
      this.id_tipo_cuenta = this._storageService.desencriptar_ids(id['id']);
    });
    console.log(this.id_tipo_cuenta);
    if (this.id_tipo_cuenta) {
      this.accion_tipo_cuenta = 'Editar';
      this._tipoCuentaService.obtenerTipoCuentaIdentificador(this.id_tipo_cuenta).subscribe((data) => {
        this.obtenerTipoCuenta(data);
        this.iniciarFormularioEditar();
      }, error => {

      });
    } else {
      this.accion_tipo_cuenta = 'Crear Nuevo';
      this.iniciarFormularioCrear();
    }
  }
  obtenerTipoCuenta(data: any) {
    this.tipo_cuenta = data;
  }

  iniciarFormularioCrear() {
    this.formulario_tipo_cuenta = new FormGroup({
      descripcion_tipo_cuenta: new FormControl('', Validators.required),
      estatus_tipo_cuenta: new FormControl('')
    });
  }
  iniciarFormularioEditar() {
    this.formulario_tipo_cuenta = new FormGroup({
      descripcion_tipo_cuenta: new FormControl(this.tipo_cuenta.descripcion, Validators.required),
      estatus_tipo_cuenta: new FormControl(this.tipo_cuenta.activo)
    });
  }
  onSubmit() {
    this.tipo_cuenta.identificador_corporativo = this.identificador_corporativo;
    this.tipo_cuenta.activo = this.tipo_cuenta.activo ? 1 : 0;
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    if (this.id_tipo_cuenta) {
      this.actualizarTipoCuenta();
    } else {
      this.crearTipoCuenta();
    }
  }

  actualizarTipoCuenta() {
    this._tipoCuentaService.actualizarTipoCuenta(this.tipo_cuenta).subscribe((data: any) => {
      this._router.navigate(['/home/tipo_cuenta']);
      swal.fire(
        'Éxito',
        'Guardado Correctamente',
        'success'
      );
    }, error => {
      this.txtBtnAgregar = 'Guardar';
      swal.fire(
        'Atención',
        'Ha ocurrido un error. <br> Detalle error: ' +
          error.error.mensaje ? error.error.mensaje : '',
        'error'
      );
    });
  }
  crearTipoCuenta() {
    this._tipoCuentaService.crearTipoCuenta(this.tipo_cuenta).subscribe((data: any) => {
      this._router.navigate(['/home/tipo_cuenta']);
      swal.fire(
        'Éxito',
        'Guardado Correctamente',
        'success'
      );
    }, error => {
      this.txtBtnAgregar = 'Guardar';
      const mensaje = error.error.mensaje ? error.error.mensaje : '';
      swal.fire(
        'Atención',
        `Ha ocurrido un error. <br> Detalle error: ${mensaje}`,
        'error'
      );
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
