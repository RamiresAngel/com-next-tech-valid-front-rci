import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cuenta } from 'src/app/entidades/Cuenta';
import { CuentaService } from '../cuenta.service';
import { HttpResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { NivelGastoService } from '../../nivel-gasto/nivel-gasto.service';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { TipoCuentaService } from '../../tipo-cuenta/tipo-cuenta.service';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';

@Component({
  selector: 'app-formulario-cuenta-mx',
  templateUrl: './formulario-cuenta-mx.component.html',
  styleUrls: ['./formulario-cuenta-mx.component.css']
})
export class FormularioCuentaMxComponent implements OnInit {
  accion_cuenta: string;
  txtBtnAgregar = 'Guardar';
  identificador_cuenta: string;
  formulario_cuenta: FormGroup;
  cuenta: Cuenta;
  startValue_nivel_gasto = '';
  startValue_tipo_gasto = '';
  startValue_tipo_cuenta = '';
  corporativo_activo: CorporativoActivo;
  lista_tipo_cuenta: any;
  lista_nivel_gasto: any;
  lista_tipo_gasto: any;
  identificador_corporativo: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _storageService: StorageService,
    private _cuentaService: CuentaService,
    private _nivelGastoService: NivelGastoService,
    public _globals: GlobalsComponent,
    private _tipoCuentaService: TipoCuentaService,
    private _servicios_compartidos: CompartidosService

  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    // this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.iniciarCampos();
  }

  ngOnInit() {
    this.cuenta = new Cuenta();
    this._activatedRoute.params.subscribe((identificador) => {
      this.identificador_cuenta = this._storageService.desencriptar_ids(identificador['id']);
    });

    this.cargarPorId();
  }


  cargarPorId() {
    if (this.identificador_cuenta !== null && this.identificador_cuenta !== undefined && this.identificador_cuenta !== '') {
      this.accion_cuenta = 'Editar';
      this._cuentaService.obtenerCuetnaId(this.identificador_cuenta).subscribe((data: any) => {
        console.log(data);
        this.cuenta = data[0];
        this.cuenta.descripcion = this.cuenta.descripcion_cuenta;
      }, error => {
        console.log(error);
      },
        () => {
          console.log(this.cuenta);
          this.startValue_nivel_gasto = this.cuenta.identificador_nivel_gasto;
          this.startValue_tipo_cuenta = this.cuenta.identificador_tipo_cuenta;
        }
      );
      console.log('Es edición');
      this.iniciarFormularioeditar();
    } else {
      this.accion_cuenta = 'Agregar Nueva';
      console.log('Es creación');
      this.iniciarFormularioCrear();
    }
  }

  iniciarFormularioCrear() {
    this.formulario_cuenta = new FormGroup({
      nombre_cuenta: new FormControl('', Validators.required),
      // identificador_tipo_cuenta: new FormControl('', Validators.required),
      codigo: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      estatus: new FormControl(this.cuenta.estatus, Validators.required),
      deducible: new FormControl(this.cuenta.deducible, Validators.required),
      tipo_gasto: new FormControl('', Validators.required),
    });
  }
  iniciarFormularioeditar() {
    this.formulario_cuenta = new FormGroup({
      nombre_cuenta: new FormControl(this.cuenta.cuenta, Validators.required),
      // identificador_tipo_cuenta: new FormControl(this.cuenta, Validators.required),
      codigo: new FormControl(this.cuenta.codigo, Validators.required),
      descripcion: new FormControl(this.cuenta.descripcion_cuenta, Validators.required),
      estatus: new FormControl(this.cuenta.estatus, Validators.required),
      deducible: new FormControl(this.cuenta.deducible, Validators.required),
      tipo_gasto: new FormControl(this.cuenta, Validators.required),
    });
  }

  onSubmit() {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.cuenta.estatus = this.formulario_cuenta.get('estatus').value ? 1 : 0;
    this.cuenta.deducible = this.formulario_cuenta.get('deducible').value ? 1 : 0;
    console.log(this.cuenta);
    if (this.formulario_cuenta.valid) {
      if (this.identificador_cuenta !== null && this.identificador_cuenta !== undefined && this.identificador_cuenta !== '') {
        this.actualizarCuenta();
      } else {
        this.crearCuenta();
      }
    }
  }

  crearCuenta() {
    // console.log(this.formulario_cuenta);
    this.cuenta.identificador_corporativo = this.identificador_corporativo;
    this.cuenta.nombre_cuenta = this.cuenta.cuenta;
    this._cuentaService.crearCuenta(this.cuenta).subscribe((data: HttpResponse<any>) => {
      this._router.navigate(['home/cuenta']);
      // console.log(data);
      swal.fire('Éxito', 'Guardado Correctamente', 'success');
    }, error => {
      console.log(error);
      this.txtBtnAgregar = 'Guardar';
      swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
    });

  }
  actualizarCuenta() {
    this.cuenta.nombre_cuenta = this.cuenta.cuenta;
    this._cuentaService.actualizarCuenta(this.cuenta).subscribe((data: HttpResponse<any>) => {
      // console.log(data);
      this._router.navigate(['home/cuenta']);
      swal.fire('Éxito', 'Guardado Correctamente', 'success');
    }, error => {
      // console.log(error);
      this.txtBtnAgregar = 'Guardar';
      swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
    });
  }

  actualizarTipoCuenta(data: any) {
    // console.log(data);
    if (data.value !== null && data.value !== '0') {
      this.cuenta.identificador_tipo_cuenta = data.value;
    } else {
      this.cuenta.identificador_tipo_cuenta = null;
      // console.log(this.cuenta.identificador_tipo_cuenta);
    }
  }
  actualizarNivelGasto(data: any) {
    // console.log(data.value);
    if (data.value !== null && data.value !== '0') {
      this.cuenta.identificador_nivel_gasto = data.value;
    } else {
      this.cuenta.identificador_nivel_gasto = null;
      // console.log(this.cuenta.identificador_nivel_gasto);
    }
  }

  iniciarCampos() {
    this._nivelGastoService.obtenerNivelGastoPorCorporativo(this.identificador_corporativo).subscribe((data: HttpResponse<any>) => {
      this.lista_nivel_gasto = $.map(data, function (obj: any) {
        obj.id = obj.identificador;
        obj.text = obj.descripcion;
        return obj;
      });
      this.lista_nivel_gasto = this._globals.agregarSeleccione(this.lista_nivel_gasto, ' Seleccione Nivel de Gasto...');
    }, errror => {

    }, () => {
      // setTimeout(() => {
      //   this.startValue_nivel_gasto = this.cuenta.identificador_nivel_gasto;
      // }, 2000);
    });
    // Aqui va el consumo de la api del catalogo tipo cuenta
    this._tipoCuentaService.obtenerTipoCuentaCorporativoIdentificador(this.identificador_corporativo).subscribe(
      (data) => {
        this.lista_tipo_cuenta = $.map(data, function (obj: any) {
          obj.id = obj.identificador;
          obj.text = obj.descripcion;
          return obj;
        });
        this.lista_tipo_cuenta = this._globals.agregarSeleccione(this.lista_tipo_cuenta, ' Seleccione Tipo de Cuenta...');
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.cargarPorId();
        // setTimeout(() => {
        //   if (this.cuenta.identificador_tipo_cuenta !== '' && this.startValue_tipo_cuenta === '') {
        //     this.startValue_tipo_cuenta = this.cuenta.identificador_tipo_cuenta;
        //   }
        // }, 1500);
      }
    );


    this._servicios_compartidos.obtenerTipoGasto(this.identificador_corporativo).subscribe(
      (data) => {
        // this.lista_tipo_gasto = $.map(data, function (obj: any) {
        //   obj.id = obj.id;
        //   obj.text = obj.descripcion;
        //   return obj;
        // });
        this.lista_tipo_gasto = this._globals.prepararSelect2(data, 'id', 'descripcion');
        this.lista_tipo_gasto = this._globals.agregarSeleccione(this.lista_tipo_gasto, 'Seleccione tipo de gasto...');
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
      , () => {
        if (this.identificador_cuenta) {
          this.startValue_tipo_gasto = String(this.cuenta.tipo_gasto);
        } else {
          this.startValue_tipo_gasto = '';
        }
      }
    );


  }

  ActualizaCorporativo(data) {
    console.log(data.value);
    if (data.value !== '0') {
      this.identificador_corporativo = data.value;
      this.iniciarCampos();
    } else {
      this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    }
  }

  actualizarTipoGasto(obj: any) {
    if (obj.value !== '' && obj.value !== '0') {
      this.formulario_cuenta.get('tipo_gasto').setValue(obj.value);
      this.cuenta.tipo_gasto = obj.value;
    } else {
      this.formulario_cuenta.get('tipo_gasto').setValue(null);
      this.cuenta.tipo_gasto = 0;
    }
  }


}
