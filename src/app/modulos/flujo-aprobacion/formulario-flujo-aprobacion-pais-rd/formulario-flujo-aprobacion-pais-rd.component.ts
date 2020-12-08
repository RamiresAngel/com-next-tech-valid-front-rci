import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CabeceraFlujoAp, Moneda } from 'src/app/entidades/flujo-aprobacion';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { FlujoAprobacionService } from '../flujo-aprobacion.service';
import swal from 'sweetalert2';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { DatosIniciales } from 'src/app/entidades';

@Component({
  selector: 'app-formulario-flujo-aprobacion-pais-rd',
  templateUrl: './formulario-flujo-aprobacion-pais-rd.component.html',
  styleUrls: ['./formulario-flujo-aprobacion-pais-rd.component.css']
})
export class FormularioFlujoAprobacionPaisRdComponent implements OnInit {
  public formulario_flujo: FormGroup;
  public titulo = 'Nuevo Flujo de aprobación';
  public txtBtnAgregar = 'Continuar';
  public cabecera = new CabeceraFlujoAp();
  public lista_tipos_documento: any;
  public lista_tipo_gasto: any;
  public startValue_tipo_documento = null;
  public startValue_tipo_gasto = null;
  public startValue_contribuyente = null;
  public startValue_sucursal = null;
  public startValue_departamento = null;
  public startValue_cc = null;
  public lista_constribuyentes: any;
  public lista_sucursales: any;
  public lista_despartamentos: any;
  public lista_cc: any;
  public id_cabecera = null;
  public otro_flujo = false;
  public contadorAuxiliar = 0;
  public array_monedas_cargadas = new Array<Array<Moneda>>();
  public flujo_edit: any;
  public contadoFlujosEdit: number;
  public corporativo_activo: CorporativoActivo;
  public identificador_corporativo: string;
  public identificador_sucursal = '';
  public identificador_contribuyente = '';
  public identificador_CC: string;
  public clase = '';
  @ViewChild('cantidades') templateFactura;
  @ViewChild('container', { read: ViewContainerRef }) container;
  datos_inciales: DatosIniciales;
  mostar_finalizar: boolean;
  constructor(
    private _servicios_compartidos: CompartidosService
    , private _servicio_flujo: FlujoAprobacionService
    , public _globales: GlobalsComponent
    , private _activatedRoute: ActivatedRoute
    , private _storageService: StorageService,
  ) {
    this.inicializarFormulario();
    this.datos_inciales = this._storageService.getDatosIniciales();
  }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this._activatedRoute.params.subscribe((id) => {
      this.id_cabecera = this._storageService.desencriptar_ids(id['id']);
    });

    if (this.id_cabecera) {
      this.clase = 'panel-edit';
      this.titulo = 'Editar Flujo de Aprobación';
      this.txtBtnAgregar = 'Actualizar';
      this._servicio_flujo.ObtenerFlujoMXByid(this.id_cabecera).subscribe(
        (data: any) => {
          this.contadoFlujosEdit = data.niveles.length;
          this.contadorAuxiliar = data.niveles.length;
          this.cabecera.id = data.id;
          this.id_cabecera = this.cabecera.id;
          this.cabecera.id_tipo_documento = data.id_tipo_documento;
          this.cabecera.id_tipo_gasto = data.id_tipo_gasto;
          this.cabecera.nombre = data.nombre;
          this.cabecera.descripcion = data.descripcion;
          this.cabecera.identificador_centro_costos = data.identificador_centro_costos;
          this.cabecera.identificador_contribuyente = data.identificador_contribuyente;
          this.cabecera.identificador_corporativo = data.identificador_corporativo;
          this.cabecera.identificador_departamento = data.identificador_departamento;
          this.cabecera.identificador_sucursal = data.identificador_sucursal;
          this.cabecera.niveles = data.niveles;

          this.cabecera.niveles.forEach(element => {
            const moneda_agregar = element.monedas;
            this.array_monedas_cargadas.push(moneda_agregar);
          });
          this.habilitarOtroFlujo();
        },
        (error) => {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        }
        , () => {
          this.obtenerCatalogos();
          // this.obtenerCC();
        }
      );
    } else {
      this.obtenerCatalogos();
      // this.obtenerCC();
      this.titulo = 'Agregar Nuevo Flujo de Aprobación';
    }
  }

  clone() {
    this.contadoFlujosEdit += 1;
    ++this.contadorAuxiliar;
    this.container.createEmbeddedView(this.templateFactura);
    this.otro_flujo = false;
  }


  inicializarFormulario() {
    this.formulario_flujo = new FormGroup({
      nombre: new FormControl('', Validators.required)
      , descripcion: new FormControl('', Validators.required)
    });
  }

  guardarHeader() {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.cabecera.identificador_corporativo = this.identificador_corporativo;

    if (this.id_cabecera) {
      this.cabecera.id = this.id_cabecera;
      this._servicio_flujo.ActualizarCabeceraFlujoApMX(this.cabecera).subscribe(
        (data: any) => {
          this.txtBtnAgregar = 'Actualizar';
        }
        , (error) => {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
          this.txtBtnAgregar = 'Actualizar';
        }
        , () => {
          this.txtBtnAgregar = 'Actualizar';
        }
      );
    } else {
      this._servicio_flujo.GuardarCabeceraFlujoApMX(this.cabecera).subscribe(
        (data: any) => {
          this.id_cabecera = data.id;
          this.clone();
          this.txtBtnAgregar = 'Actualizar';
        }
        , (error) => {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
          this.txtBtnAgregar = 'Actualizar';
        }
        , () => {
          this.txtBtnAgregar = 'Actualizar';
        }
      );
    }

  }

  obtenerCatalogos(identificador_corporativo: any = null) {
    identificador_corporativo = this.identificador_corporativo;

    this._servicios_compartidos.obtenerTipoDocumento(this.identificador_corporativo).subscribe(
      (data) => {
        // console.log(data);
        // this.lista_tipos_documento = $.map(data, function (obj: any) {
        //   obj.id = obj.id;
        //   obj.text = obj.descripcion;
        //   return obj;
        // });
        this.lista_tipos_documento = this._globales.prepararSelect2(data, 'id', 'descripcion');
        this.lista_tipos_documento = this._globales.agregarSeleccione(this.lista_tipos_documento, 'Seleccione tipo de documento...');
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
      , () => {
        if (this.id_cabecera) {
          this.startValue_tipo_documento = this.cabecera.id_tipo_documento;
        } else {
          this.startValue_tipo_documento = '';
        }
      }
    );

    this._servicios_compartidos.obtenerTipoGasto(this.datos_inciales.usuario.identificador_corporativo).subscribe(
      (data) => {
        // this.lista_tipo_gasto = $.map(data, function (obj: any) {
        //   obj.id = obj.id;
        //   obj.text = obj.descripcion;
        //   return obj;
        // });
        this.lista_tipo_gasto = this._globales.prepararSelect2(data, 'id', 'descripcion');
        this.lista_tipo_gasto = this._globales.agregarSeleccione(this.lista_tipo_gasto, 'Seleccione tipo de gasto...');
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
      , () => {
        if (this.id_cabecera) {
          this.startValue_tipo_gasto = this.cabecera.id_tipo_gasto;
        } else {
          this.startValue_tipo_gasto = '';
        }
      }
    );

    this._servicios_compartidos.obtenerContribuyentesXCorporativo(
      identificador_corporativo
      , this.datos_inciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
    ).subscribe(
      (data) => {
        this.lista_constribuyentes = $.map(data, function (obj: any) {
          obj.id = obj.identificador;
          obj.text = `${obj.codigo} - ${obj.nombre}`;
          return obj;
        });
        this.lista_constribuyentes = this._globales.prepararSelect2(data, 'identificador', 'text');
        this.lista_constribuyentes = this._globales.agregarSeleccione(this.lista_constribuyentes, 'Seleccione contribuyente...');
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
      , () => {
        if (this.id_cabecera) {
          this.startValue_contribuyente = this.cabecera.identificador_contribuyente;
        } else {
          this.startValue_contribuyente = '';
        }
      }
    );


    this._servicios_compartidos.obtenerSucursalesXCorporativo(
      identificador_corporativo
      , this.datos_inciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
    ).subscribe(
      (data) => {
        this.lista_sucursales = $.map(data, function (obj: any) {
          obj.id = obj.identificador;
          obj.text = `${obj.codigo} - ${obj.nombre}`;
          return obj;
        });
        this.lista_sucursales = this._globales.prepararSelect2(data, 'identificador', 'text');
        this.lista_sucursales = this._globales.agregarSeleccione(this.lista_sucursales, 'Seleccione sucursal...');
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
      , () => {
        if (this.id_cabecera) {
          this.startValue_sucursal = this.cabecera.identificador_sucursal;
        } else {
          this.startValue_sucursal = '';
        }
      }
    );


    this._servicios_compartidos.obtenerDepartamentosXCorporativo(
      identificador_corporativo
      , this.datos_inciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
    ).subscribe(
      (data) => {
        this.lista_despartamentos = $.map(data, function (obj: any) {
          obj.id = obj.identificador;
          obj.text = `${obj.clave_departamento} - ${obj.descripcion}`;
          return obj;
        });
        console.log(this.lista_despartamentos);
        this.lista_despartamentos = this._globales.prepararSelect2(this.lista_despartamentos, 'identificador', 'text');
        this.lista_despartamentos = this._globales.agregarSeleccione(this.lista_despartamentos, 'Seleccione departamento...');
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
      , () => {
        if (this.id_cabecera) {
          this.startValue_departamento = this.cabecera.identificador_departamento;
        } else {
          this.startValue_departamento = '';
        }
      }
    );

  }

  obtenerCC() {
    console.log(this.cabecera);
    this._servicios_compartidos.obtenerCCXContribuyenteXSucursal(this.identificador_contribuyente, this.cabecera.identificador_sucursal).subscribe(
      (data) => {
        this.lista_cc = $.map(data, function (obj: any) {
          obj.id = obj.identificador;
          // obj.text = `${obj.nombre} -- ${obj.nombre}`;
          obj.text = ` ${obj.codigo_cc} - ${obj.nombre}`;
          return obj;
        });
        this.lista_cc = this._globales.prepararSelect2(this.lista_cc, 'identificador', 'text');
        this.lista_cc = this._globales.agregarSeleccione(this.lista_cc, 'Seleccione centro de costos...');
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
      , () => {
        if (this.id_cabecera) {
          setTimeout(() => {
            console.log(this.lista_cc);
            console.log(this.cabecera.identificador_centro_costos);
            this.startValue_cc = this.cabecera.identificador_centro_costos;
          }, 1500);
        } else {
          // this.startValue_cc = '';
        }
      }
    );
  }

  async actualizarTipoDocumento(obj: any) {
    if (obj.value !== '' && obj.value !== '0') {
      this.cabecera.id_tipo_documento = obj.value;
      // En caso de ser Factura se preselecciona el tipo de gasto
      // de factura provedor y se deshabilita el select
      if (obj.value == "1") {
        await this.limpiarSelects();
        // 9 corresponde al tipo de gasto de factura porveedor
        this.cabecera.id_tipo_gasto = 9;
        debugger;
        // Aseguramos que departamento vaya vacio y se deshabilite
        this.cabecera.identificador_departamento = "";
      }
    } else {
      this.cabecera.id_tipo_documento = 0;
    }
  }

  actualizarTipoGasto(obj: any) {
    if (obj.value !== '' && obj.value !== '0') {
      this.cabecera.id_tipo_gasto = obj.value;
    } else {
      if (this.cabecera.id_tipo_documento != 1) {
        this.cabecera.id_tipo_gasto = 0;
      }
    }
  }

  actualizarContribuyente(obj: any) {
    if (obj.value !== '' && obj.value !== '0') {
      this.cabecera.identificador_contribuyente = obj.value;
      this.identificador_contribuyente = obj.value;
    } else {
      this.cabecera.identificador_contribuyente = '';
      this.identificador_contribuyente = '';
    }
    if (this.identificador_sucursal !== '') {
      // this.obtenerCC();
    }
  }

  actualizarSucursal(obj: any) {
    if (obj.value !== '' && obj.value !== '0') {
      this.cabecera.identificador_sucursal = obj.value;
      this.identificador_sucursal = obj.value;
    } else {
      this.cabecera.identificador_sucursal = '';
      this.identificador_sucursal = '';
    }
    if (this.identificador_contribuyente !== '') {
      // this.obtenerCC();
    }
  }

  actualizarDepartamento(obj: any) {
    if (obj.value !== '' && obj.value !== '0') {
      this.cabecera.identificador_departamento = obj.value;
    } else {
      this.cabecera.identificador_departamento = '';
    }
  }

  actualizarCC(obj: any) {
    if (obj.value !== '' && obj.value !== '0') {
      this.cabecera.identificador_centro_costos = obj.value;
    } else {
      this.cabecera.identificador_centro_costos = '';
    }
  }


  habilitarOtroFlujo() {
    this.mostar_finalizar = true;
    this.otro_flujo = true;
  }

  dedeshabilitarOtroFlujo() {
    this.otro_flujo = false;
  }

  eliminarMoneda() {

  }

  restarNivel() {
    --this.contadorAuxiliar;
  }

  limpiarSelects() {
    return new Promise((resolve, reject) => {

      const departamentos = [...this.lista_despartamentos];
      const tipos_gasto = [...this.lista_tipo_gasto];

      this.lista_despartamentos.length = 0;
      this.lista_tipo_gasto.length = 0;

      setTimeout(() => {
        this.lista_despartamentos = departamentos;
        this.lista_tipo_gasto = tipos_gasto;
        debugger;
        resolve();
      }, 250);
    });


  }

}
