import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { ContribuyenteService } from '../../contribuyente/contribuyente.service';
import { CuentaService } from '../../cuenta/cuenta.service';
import { DepartamentoService } from '../../departamento/departamento.service';
import { HttpResponse } from '@angular/common/http';
import { CuentaAgrupacion } from 'src/app/entidades/CuentaAgrupacion';
import { CuentaAgrupacionService } from '../cuenta-agrupacion.service';
import swal from 'sweetalert2';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { Router } from '@angular/router';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';

@Component({
  selector: 'app-formulario-cuenta-agrupacion-mx',
  templateUrl: './formulario-cuenta-agrupacion-mx.component.html',
  styleUrls: ['./formulario-cuenta-agrupacion-mx.component.css']
})
export class FormularioCuentaAgrupacionMxComponent implements OnInit {


  txtBtnAgregar = 'Guardar';
  formulario_cuenta_agrupacion: FormGroup;
  identificador_corporativo: string;
  identificador_cuenta_agrupacion: string;
  accion_cuenta_agrupacion: string;
  cuenta_agrupacion = new CuentaAgrupacion();
  corporativo_activo: CorporativoActivo;
  lista_contribuyente: any;
  lista_cuenta: any;
  lista_departamento: any;
  lista_sucursal: any[];

  startValue_contribuyente: any;
  startValue_cuenta: any;
  startValue_departamento: any;
  startValue_sucursal: any;
  datos_inciales: DatosIniciales;


  is_gasto_viaje = false;

  constructor(
    private _storageService: StorageService,
    private _contribuyenteServie: ContribuyenteService,
    private _cuentaService: CuentaService,
    private _departamentoService: DepartamentoService,
    private _compartidoService: CompartidosService,
    private _cuentasAgrupacionService: CuentaAgrupacionService,
    private globals: GlobalsComponent,
    private _router: Router
  ) { }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.cargarSelects();
    this.accion_cuenta_agrupacion = 'Agregar';
    this.iniciarFormularioCrear();
  }

  iniciarFormularioCrear() {
    this.formulario_cuenta_agrupacion = new FormGroup({

    });
  }
  onSubmit() {
    this.cuenta_agrupacion.identificador_corporativo = this.identificador_corporativo;
    this.cuenta_agrupacion.corporativo = 'Hilton';
    // console.log(this.cuenta_agrupacion);
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this._cuentasAgrupacionService.crearCuetnaAgrupacion(this.cuenta_agrupacion).subscribe((data: HttpResponse<any>) => {
      // console.log(data);
      this._router.navigate(['/home/cuenta_agrupacion']);
      swal.fire('Éxito', 'Guardado Correctamente', 'success');
    }, error => {
      console.log(error);
      swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      this.txtBtnAgregar = 'Guardar';
    });
  }

  cargarSelects() {
    this._contribuyenteServie.ObtenerListaContribuyentesMXPorCorporativo(
      this.identificador_corporativo
      , this.datos_inciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
    ).subscribe((data: HttpResponse<any>) => {
      // this.lista_contribuyente = data;
      this.lista_contribuyente = $.map(data, function (obj: any) {
        obj.id = obj.identificador;
        obj.text = `${obj.codigo} - ${obj.nombre}`;
        return obj;
      });
      this.lista_contribuyente = this.globals.agregarSeleccione(this.lista_contribuyente, 'Seleccione Contribuyente');

      // console.log(data);
    }, error => {
      console.log(error);
    }, () => {
      this.startValue_contribuyente = null;
      setTimeout(() => {
        this.startValue_contribuyente = this.cuenta_agrupacion.identificador_contribuyente;
      }, 2500);
    });
    this._cuentaService.obtenerCuentaCorporativo(this.identificador_corporativo).subscribe((data: HttpResponse<any>) => {
      // this.lista_cuenta = data;
      this.lista_cuenta = $.map(data, function (obj: any) {
        obj.id = obj.identificador;
        obj.text = `${obj.codigo} - ${obj.cuenta}`;
        return obj;
      });
      this.lista_cuenta = this.globals.agregarSeleccione(this.lista_cuenta, 'Seleccione Cuenta');
      // console.log(data);
    }, error => {
      console.log(error);
    }, () => {
      this.startValue_cuenta = null;
      setTimeout(() => {
        this.startValue_cuenta = this.cuenta_agrupacion.identificador_cuenta;
      }, 2500);
    });
    this._departamentoService.obtenerDepartamentoPorCorporativo(
      this.identificador_corporativo
      , this.datos_inciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
    ).subscribe((data: HttpResponse<any>) => {
      // this.lista_departamento = data;
      this.lista_departamento = $.map(data, function (obj: any) {
        obj.id = obj.identificador;
        obj.text = `${obj.clave_departamento} - ${obj.descripcion}`;
        return obj;
      });
      this.lista_departamento = this.globals.agregarSeleccione(this.lista_departamento, 'Seleccione Departamento');
      // console.log(data);
    }, error => {
      console.log(error);
    }, () => {
      this.startValue_departamento = null;
      setTimeout(() => {
        this.startValue_departamento = this.cuenta_agrupacion.identificador_departamento;
      }, 2500);
    });

    this._compartidoService.obtenerSucursalesXCorporativo(this.identificador_corporativo, this.datos_inciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
    ).subscribe(
      (data) => {
        this.lista_sucursal = $.map(data, function (obj: any) {
          obj.id = obj.identificador;
          obj.text = `${obj.codigo} - ${obj.nombre}`;
          return obj;
        });
        this.lista_sucursal = this.globals.prepararSelect2(data, 'identificador', 'text');
        this.lista_sucursal = this.globals.agregarSeleccione(this.lista_sucursal, 'Seleccione sucursal...');
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
    );
  }



  actualizarContribuyente(dato: any) {
    // console.log(dato);
    if (dato.value !== null && dato.value !== '0') {
      this.cuenta_agrupacion.identificador_contribuyente = dato.value;
      this.cuenta_agrupacion.contribuyente = dato.data[0].nombre;
    } else {
      this.cuenta_agrupacion.identificador_contribuyente = null;
    }
  }
  actualizarCuenta(dato: any) {
    // console.log(dato);
    if (dato.value !== null && dato.value !== '0') {
      this.cuenta_agrupacion.tipo_gasto = dato.data[0].tipo_gasto;
      this.cuenta_agrupacion.identificador_cuenta = dato.value;
      this.cuenta_agrupacion.cuenta = dato.data[0].cuenta;
      if (dato.data[0].tipo_gasto) {
        this.is_gasto_viaje = true;
      } else {
        this.is_gasto_viaje = false;
      }
    } else {
      this.is_gasto_viaje = false;
      this.cuenta_agrupacion.identificador_cuenta = null;
    }
  }
  actualizarDepartamento(dato: any) {
    // console.log(dato);
    if (dato.value !== null && dato.value !== '0') {
      this.cuenta_agrupacion.identificador_departamento = dato.value;
      this.cuenta_agrupacion.departamento = dato.data[0].descripcion;
    } else {
      this.cuenta_agrupacion.identificador_departamento = null;
    }
  }
  actualizarSucursal(dato: any) {
    // console.log(dato);
    if (dato.value !== null && dato.value !== '0') {
      this.cuenta_agrupacion.identificador_sucursal = dato.value;
      // this.cuenta_agrupacion.departamento = dato.data[0].descripcion;
    } else {
      this.cuenta_agrupacion.identificador_sucursal = null;
    }
  }
}
