import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cuenta } from 'src/app/entidades/Cuenta';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CuentaService } from '../cuenta.service';
import { NivelGastoService } from '../../nivel-gasto/nivel-gasto.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { TipoCuentaService } from '../../tipo-cuenta/tipo-cuenta.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-formulario-cuenta-rci',
  templateUrl: './formulario-cuenta-rci.component.html',
  styleUrls: ['./formulario-cuenta-rci.component.css']
})
export class FormularioCuentaRciComponent {
  formulario_rci: FormGroup;
  accion_rci: string;
  txtBtnAgregar = 'Guardar';
  identificador_cuenta: string;
  cuenta: Cuenta;
  corporativo_activo: CorporativoActivo;
  identificador_corporativo: string;
  tipo_cuenta: string;
  nivel_gasto: string;


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _storageService: StorageService,
    private _cuentaService: CuentaService,
    private _nivelGastoService: NivelGastoService,
    public _globals: GlobalsComponent,
    private _tipoCuentaService: TipoCuentaService,
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this._tipoCuentaService.obtenerTipoCuentaCorporativoIdentificador(this.identificador_corporativo)
      .subscribe(data => {
        this.tipo_cuenta = data[0].identificador;
      });
    this._nivelGastoService.obtenerNivelGastoPorCorporativo(this.identificador_corporativo)
      .subscribe(data => {
        this.nivel_gasto = data[0].identificador;
      });
    this.cuenta = new Cuenta();
    this._activatedRoute.params.subscribe((identificador) => {
      this.identificador_cuenta = this._storageService.desencriptar_ids(identificador['id']);
    });
    this.cargaPorId();
  }

  cargaPorId() {
    if (this.identificador_cuenta !== null && this.identificador_cuenta !== undefined && this.identificador_cuenta !== '') {
      this.accion_rci = 'Editar';
      this._cuentaService.obtenerCuetnaIdRci(this.identificador_cuenta)
        .subscribe((data: any) => {
          this.cuenta = data[0];
          // console.log(this.cuenta);
          this.cuenta.deducible = Number(this.cuenta.deducible);
          this.cuenta.estatus = Number(this.cuenta.estatus);
        }, error => {
          console.log(error);
        },
          () => {
          });
      // console.log('Es edición');
      this.iniciarFormularioeditar();
    } else {
      this.accion_rci = 'Agregar Nueva';
      // console.log('Es creación');
      this.iniciarFormularioCrear();
    }
  }

  iniciarFormularioCrear() {
    this.formulario_rci = new FormGroup({
      nombre_rci: new FormControl('', Validators.required),
      codigo: new FormControl('', Validators.required),
      deducible: new FormControl(''),
      estatus: new FormControl(''),
    });
  }

  iniciarFormularioeditar() {
    this.formulario_rci = new FormGroup({
      nombre_rci: new FormControl(this.cuenta.cuenta, Validators.required),
      codigo: new FormControl(this.cuenta.codigo, Validators.required),
      deducible: new FormControl(this.cuenta.deducible),
      estatus: new FormControl(this.cuenta.estatus),
    });
  }

  onSubmit() {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.cuenta.deducible = this.formulario_rci.get('deducible').value ? 1 : 0;
    this.cuenta.estatus = this.formulario_rci.get('estatus').value ? 1 : 0;
    if (this.formulario_rci.valid) {
      if (this.identificador_cuenta !== null && this.identificador_cuenta !== undefined && this.identificador_cuenta !== '') {
        this.actualizarCuenta();
      } else {
        this.crearCuenta();
      }
    }
  }

  actualizarCuenta() {
    this.cuenta.identificador_nivel_gasto = this.nivel_gasto;
    this.cuenta.identificador_tipo_cuenta = this.tipo_cuenta;
    this.cuenta.nombre_cuenta = this.cuenta.cuenta;
    this._cuentaService.actualizarCuentaRci(this.cuenta)
      .subscribe((data: HttpResponse<any>) => {
        this._router.navigate(['home/cuenta']);
        swal.fire('Éxito', 'Guardado Correctamente', 'success');
      }, error => {
        console.log(error);
        this.txtBtnAgregar = 'Guardar';
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      });
  }

  crearCuenta() {
    this.cuenta.identificador_nivel_gasto = this.nivel_gasto;
    this.cuenta.identificador_tipo_cuenta = this.tipo_cuenta;
    this.cuenta.identificador_corporativo = this.identificador_corporativo;
    this.cuenta.nombre_cuenta = this.cuenta.cuenta;
    console.log(this.cuenta);
    this._cuentaService.crearCuentaRci(this.cuenta)
      .subscribe((data: HttpResponse<any>) => {
        this._router.navigate(['home/cuenta']);
        swal.fire('Éxito', 'Guardado Correctamente', 'success');
      }, error => {
        console.log(error);
        this.txtBtnAgregar = 'Guardar';
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      });
  }

}
