import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CentroCostos } from '../../../entidades/centro-costos';
import { Contribuyente } from 'src/app/entidades/contribuyente';
import { Sucursal } from 'src/app/entidades/sucursal';
import { SucursalService } from '../../sucursal/sucursal.service';
declare var $: any;
import swal from 'sweetalert2';
import { ContribuyenteService } from '../../contribuyente/contribuyente.service';
import { CentroCostosService } from '../centro-costos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Departamento } from 'src/app/entidades/Departamento';
import { DepartamentoService } from '../../departamento/departamento.service';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { DatosIniciales } from 'src/app/entidades';
@Component({
  selector: 'app-formulario-centro-costos-mx',
  templateUrl: './formulario-centro-costos-mx.component.html',
  styleUrls: ['./formulario-centro-costos-mx.component.css']
})
export class FormularioCentroCostosMxComponent implements OnInit {

  public formulario_centro_costos: FormGroup;
  public centro_costos = new CentroCostos();
  public array_contribuyentes = new Array<Contribuyente>();
  public array_sucursal = new Array<Sucursal>();
  public array_departamento = new Array<Departamento>();
  public startValue_sucursal = null;
  public startValue_emisor = null;
  public startValue_departamento = null;
  public txtBtnAgregar = 'Guardar';
  public id_centro_costos = null;
  private identificador_corproativo;


  private contribuyente_codigo: string;
  private sucursal_codigo: string;
  private departamento_codigo: string;
  public datos_iniciales: DatosIniciales;
  corporativo_activo: CorporativoActivo;
  public titulo = '';
  public codigo_automatico = true;

  constructor(
    private _servicioSucursales: SucursalService
    , private _servicioContribuyentes: ContribuyenteService
    , private _servicioCentroCostos: CentroCostosService
    , private _servicioDepartamento: DepartamentoService
    , private _activatedRoute: ActivatedRoute
    , private router: Router
    , private _storageService: StorageService
    , public globals: GlobalsComponent
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.centro_costos.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.identificador_corproativo = this.corporativo_activo.corporativo_identificador;
    this.inicializarFormulario();
    this.obtenerSucursales();
    this.obtenerContribuyentes();
    this.obtenerDepartamentos();
    // Valida que el modulo de la funcionalidad sea RCI para que el codigo del formulario de alta no sea automatico
    this.datos_iniciales.funcionalidades.forEach(funcionalidad => {
      if (funcionalidad && funcionalidad.clave === 'MOD_FLUJO' && funcionalidad.valor === 'mod_rci') {
        this.codigo_automatico = false;
      }
    });
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe((id) => {
      this.id_centro_costos = this._storageService.desencriptar_ids(id['id']);
    });

    if (this.id_centro_costos) {
      this.titulo = 'Editar Centro de Costos';
      this._servicioCentroCostos.ObtenerCentroCostosMXByid(this.id_centro_costos).subscribe(
        (data) => {
          const aux = $.map(data, function (obj: any) {
            obj.sucursal_identificador = obj.sucursal_identificador;
            obj.emisor_identificador = obj.emisor_identificador;
            obj.nombre = obj.centro_consumo;
            obj.estatus = obj.estatus;
            return obj;
          });
          this.centro_costos = aux[0];
          console.log(this.centro_costos);
          this.iniciarFormualarioEditar();
        },
        (error) => {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        },
        () => {
          setTimeout(() => {
            this.startValue_sucursal = this.centro_costos.sucursal_identificador;
            this.startValue_emisor = this.centro_costos.emisor_identificador;
            this.startValue_departamento = this.centro_costos.identificador_departamento;
          }, 1500);
        }
      );
    } else {
      this.titulo = 'Agregar Nuevo Centro de Costos';
      this.inicializarFormulario();
    }
  }

  inicializarFormulario() {
    this.formulario_centro_costos = new FormGroup({
      nombre: new FormControl('', Validators.required),
      codigo: new FormControl('', Validators.required),
      estatus: new FormControl('')
    });
  }

  iniciarFormualarioEditar() {
    this.formulario_centro_costos = new FormGroup({
      nombre: new FormControl(this.centro_costos.nombre, Validators.required),
      codigo: new FormControl(this.centro_costos.codigo, Validators.required),
      estatus: new FormControl(this.centro_costos.estatus)
    });
  }

  ActualizarEmisor(dato: any = null): void {
    if (dato.value !== '' && dato.value !== '0') {

      this.centro_costos.emisor_identificador = dato.value;
      this.contribuyente_codigo = dato.data[0].codigo;
    } else {
      this.centro_costos.emisor_identificador = null;
      this.contribuyente_codigo = null;
    }
    this.generarCECO();
  }

  ActualizarSucursal(dato: any = null): void {
    if (dato.value !== '' && dato.value !== '0') {

      this.centro_costos.sucursal_identificador = dato.value;
      this.sucursal_codigo = dato.data[0].codigo;
    } else {
      this.centro_costos.sucursal_identificador = null;
      this.sucursal_codigo = null;
    }
    this.generarCECO();
  }
  ActualizarDepartamento(dato: any = null): void {
    if (dato.value !== '' && dato.value !== '0') {

      this.centro_costos.identificador_departamento = dato.value;
      this.departamento_codigo = dato.data[0].clave_departamento;
    } else {
      this.centro_costos.identificador_departamento = null;
      this.departamento_codigo = null;
    }
    this.generarCECO();
  }

  ActualizarCentroCostos(dato: any = null): void {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    if (!this.codigo_automatico) { // El CECO sera el codigo que ingrese el usuario
      this.centro_costos.ceco = this.centro_costos.codigo;
    }
    if (this.centro_costos.id) {
      this.centro_costos.estatus ? this.centro_costos.estatus = 1 : this.centro_costos.estatus = 0;
      this._servicioCentroCostos.ActualizarCentroCostosMX(this.centro_costos).subscribe(
        (data) => {
          swal.fire('Éxito', 'Guardado Correctamente', 'success');
          this.txtBtnAgregar = 'Guardar';
          this.router.navigate(['/home/centro_costos']);
        }
        , (error) => {
          this.txtBtnAgregar = 'Guardar';
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.mensaje, 'error');
        }
        , () => {
          this.txtBtnAgregar = 'Guardar';
        }
      );
    } else {
      this.centro_costos.identificador_corporativo = this.identificador_corproativo;
      this.centro_costos.estatus ? this.centro_costos.estatus = 1 : this.centro_costos.estatus = 0;
      this._servicioCentroCostos.GuardarCentroCostosMX(this.centro_costos).subscribe(
        (data: HttpResponse<any>) => {
          swal.fire('Éxito', 'Guardado Correctamente', 'success');
          this.txtBtnAgregar = 'Guardar';
          this.router.navigate(['/home/centro_costos']);
        }
        , (error) => {
          console.log(error);
          this.txtBtnAgregar = 'Guardar';
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        }
        , () => {
          this.txtBtnAgregar = 'Guardar';
        }
      );
    }
  }

  obtenerContribuyentes(): void {
    // const identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    $('#tabla_contribuyentes').DataTable().destroy();
    this._servicioContribuyentes.obtenerContribuyentesMinSinRol(
      this.identificador_corproativo
      , this.datos_iniciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
    ).subscribe(
      (data: any) => {
        this.array_contribuyentes = $.map(data, function (obj: any) {
          obj.id = obj.identificador;
          obj.text = `${obj.codigo} - ${obj.nombre}`;
          return obj;
        });
        this.startValue_emisor = '';
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
      , () => {
        if (this.startValue_emisor === '') {
          this.startValue_emisor = this.centro_costos.emisor_identificador;
        }
      }
    );
  }

  obtenerSucursales(): void {
    this._servicioSucursales.ObtenerSucursalesCorporativoMin(this.identificador_corproativo).subscribe(
      (data: any) => {
        this.array_sucursal = $.map(data, function (obj: any) {
          obj.id = obj.identificador;
          obj.text = `${obj.codigo} - ${obj.nombre}`;
          return obj;
        });
        this.startValue_sucursal = '';
      },
      (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      },
      () => {
        if (this.startValue_sucursal === '') {
          this.startValue_sucursal = this.centro_costos.sucursal_identificador;
        }
      }
    );
  }

  obtenerDepartamentos(): void {
    const identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this._servicioDepartamento.obtenerDepartamentoPorCorporativoMin(this.identificador_corproativo).subscribe(
      (data: any) => {
        this.array_departamento = $.map(data, function (obj: any) {
          obj.id = obj.identificador;
          obj.text = ` ${obj.clave_departamento} - ${obj.descripcion}`;
          return obj;
        });
        this.startValue_departamento = '';
      },
      (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      },
      () => {
        if (this.startValue_departamento === '') {
          this.startValue_departamento = this.centro_costos.identificador_departamento;
        }
      }
    );
  }

  ActualizaCorporativo(data) {
    if (data.value !== '0') {
      this.identificador_corproativo = data.value;
    } else {
      this.identificador_corproativo = this.corporativo_activo.corporativo_identificador;
    }
    this.obtenerSucursales();
    this.obtenerContribuyentes();
    this.obtenerDepartamentos();
  }
  generarCECO() {
    if (this.codigo_automatico === false) {
      return false;
    }
    if (
      this.centro_costos.identificador_departamento !== null &&
      this.centro_costos.identificador_departamento !== '' &&
      this.centro_costos.sucursal_identificador !== null &&
      this.centro_costos.sucursal_identificador !== '' &&
      this.centro_costos.emisor_identificador !== null &&
      this.centro_costos.emisor_identificador !== ''
    ) {
      if (this.contribuyente_codigo && this.sucursal_codigo && this.departamento_codigo) {
        this.formulario_centro_costos.get('codigo').setValue(this.contribuyente_codigo.substr(-3, 3) + this.sucursal_codigo.substr(-4, 4) + this.departamento_codigo.substr(-3, 3));
      }
    } else {
      this.formulario_centro_costos.get('codigo').setValue('');
    }

  }
}


