import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contribuyente, Comprobacion, DatosIniciales, CargoNoDedusible } from 'src/app/entidades';
import { ContribuyenteService } from '../../contribuyente/contribuyente.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import swal from 'sweetalert2';
import { Gasto } from 'src/app/entidades/comprobacion';
import { ComprobacionesGeneralService } from '../comprobaciones-general.service';
import { CuentasProrateo } from 'src/app/entidades/cargo-no-dedusible';
import { ActivatedRoute, Router } from '@angular/router';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { Moneda } from 'src/app/entidades/flujo-aprobacion';
declare var $: any;
@Component({
  selector: 'app-form-comprobaciones-general-mx',
  templateUrl: './form-comprobaciones-general-mx.component.html',
  styleUrls: ['./form-comprobaciones-general-mx.component.css']
})
export class FormComprobacionesGeneralMxComponent implements OnInit {

  formulario_busqueda: FormGroup;
  formulario_comprobacion: FormGroup;
  public txtBtn = 'Comprobar';
  public prorrateo = false;
  public corporativo_activo;
  public identificador_corproativo = '';
  public array_emisores = new Array<Contribuyente>();
  public numero_solicitud = '';
  public identificador_contribuyente = '0';
  public comprobacion = new Comprobacion();
  public gasto = new Gasto();
  public comprobacion_aux = false;
  @ViewChild('xml_file') xml_file: ElementRef;
  @ViewChild('pdf_file') pdf_file: ElementRef;
  public cargado_xml = false;
  public cargado_pdf = false;
  public texo_select = 'Selecciona un concepto';
  public lista_select = new Array<any>();
  public lista_sin_prorrateo;
  public lista_con_prorrateo;
  public es_deducible = true;
  public datos_inciales: DatosIniciales;
  public titulo_input = '.XML';
  public xml_nombre = 'Seleccione un archivo .XML';
  public pdf_nombre = 'Seleccione un archivo .PDF';
  public monto_comprobar;
  public cargo_no_facturable = new CargoNoDedusible();
  public lista_departamentos_prorrateo = new Array<any>();
  public comprobado;
  public comprobado_maximo;
  public comprobado_minimo;
  public porcentaje_comprobado;
  public descripcion_cuenta: string;
  public moneda_porcentaje = false;
  public cargando = false;
  public identificador_cuenta: string;
  public logo_img: string;
  public total_comprobado = 0;
  public total_comprobar = 0;
  public lista_monedas: any;
  public txtBtnFinalizar = 'Finalizar transacción';

  constructor(
    private _servicioContribuyentes: ContribuyenteService
    , private _storageService: StorageService
    , private _servicio_compartido: CompartidosService
    , private globas: GlobalsComponent
    , private router: Router
    , private _servicioComprobaciones: ComprobacionesGeneralService
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corproativo = this.corporativo_activo.corporativo_identificador;
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.iniciarFormulario();
    this.inciarFormularioComprobacion();
    this.obtenerMonedas();
  }

  inciarFormularioComprobacion() {
    this.formulario_comprobacion = new FormGroup({
      prorrateo: new FormControl(),
      cuenta: new FormControl(),
      xml: new FormControl(),
      pdf: new FormControl(),
      monto_comprobar: new FormControl(),
      monto: new FormControl(),
      moneda_porcentaje: new FormControl()
    });
  }
  ngOnInit() {
    this.logo_img = localStorage.getItem('logo_login_img') !== null ? localStorage.getItem('logo_login_img') : './assets/img/NEXT_5.png';
    this.obtenerEmisores();
  }
  iniciarFormulario() {
    this.formulario_busqueda = new FormGroup({
      solicitud: new FormControl('', Validators.required)
    });
  }

  buscar() {
    this.txtBtn = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this._servicioContribuyentes.getComprobacionbyNumero(this.identificador_contribuyente, this.numero_solicitud, this.datos_inciales.usuario.identificador_usuario).subscribe(
      (data: any) => {
        this.comprobacion = data;

        if (this.comprobacion.estatus_preliminar === 1) {
          this.comprobacion_aux = true;
          this.cargo_no_facturable.identificador_departamento = this.comprobacion.identificador_departamento;
          this.cargo_no_facturable.preliminar_id = this.comprobacion.preliminar_id;
          this.cargo_no_facturable.identificador_contribuyente = this.comprobacion.contributente_identificador;
          console.log(data);
          this.consultarToteles(this.comprobacion.id, this.comprobacion.preliminar_id);
          this.llenarListaSelect();
        } else {
          swal.fire('Atención', 'Ya no es posible agregar comprobaciones', 'warning');
          this.comprobacion_aux = false;
        }
      }
      , (error) => {
        if (error.error) {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        } else {
          swal.fire('Atención', 'Ha ocurrido un error. Intentalo nuevamente más tarde');
        }
        this.txtBtn = 'Comprobar';
      }
      , () => {
        this.txtBtn = 'Comprobar';
      }
    );
  }

  llenarListaSelect() {
    this._servicioContribuyentes.obtenerUsuarioCuentas_by(this.comprobacion.contributente_identificador, 7, this.datos_inciales.usuario.identificador_proveedor).subscribe(
      (data: any) => {
        const aux = data.map(obj => {
          obj.identificador = obj.identificador_cuenta + ':' + obj.identificador_departamento + '|' + obj.deducible;
          obj.texto = obj.cuenta + ' - ' + obj.departamento;
          return obj;
        });
        this.lista_sin_prorrateo = this.globas.prepararSelect2(aux, 'identificador', 'texto');
        this.lista_sin_prorrateo = this.globas.agregarSeleccione(this.lista_sin_prorrateo, 'Selecciona...');
      }
      , (error) => {
        if (error.error) {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        } else {
          swal.fire('Atención', 'Ha ocurrido un error. Intentalo nuevamente mas tarde: ', 'error');
        }
      }
      , () => {
        this.lista_select = this.lista_sin_prorrateo;
      }
    );

    // Cuentas con prorrateo
    this._servicioContribuyentes.obtenerUsuarioCuentas_byProrrateo(this.comprobacion.contributente_identificador, 7, this.datos_inciales.usuario.identificador_proveedor).subscribe(
      (data: any) => {

        const aux = data.map(obj => {
          obj.identificador = obj.identificador_cuenta + '|' + obj.deducible;
          obj.texto = obj.cuenta;
          return obj;
        });
        this.lista_con_prorrateo = this.globas.prepararSelect2(aux, 'identificador', 'texto');
        this.lista_con_prorrateo = this.globas.agregarSeleccione(this.lista_con_prorrateo, 'Selecciona...');
      }
      , (error) => {
        if (error.error) {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        } else {
          swal.fire('Atención', 'Ha ocurrido un error. Intentalo nuevamente mas tarde: ', 'error');
        }
      }
      , () => { }
    );

  }

  obtenerEmisores(): void {
    $('#tabla_contribuyentes').DataTable().destroy();
    this._servicioContribuyentes.ObtenerListaContribuyentesMXPorCorporativo(
      this.identificador_corproativo
      , this.datos_inciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
    ).subscribe(
      (data: any) => {
        this.array_emisores = this.globas.prepararSelect2(data, 'identificador', 'nombre');
        this.array_emisores = this.globas.agregarSeleccione(this.array_emisores);
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
    );
  }

  ActualizarEmisor(obj: any) {
    this.identificador_contribuyente = obj.value;
  }

  activarProrrateo(value) {
    value ? this.texo_select = 'Selecciona una cuenta' : this.texo_select = 'Selecciona un concepto';
    if (value) { // lista con prorrateo
      this.lista_select = this.lista_con_prorrateo;
    } else { // lista sin prorrateo
      this.lista_select = this.lista_sin_prorrateo;
    }
  }

  cargarPdf() {
    this.cargado_pdf = true;
    const reader1 = new FileReader();
    const file1 = this.pdf_file.nativeElement.files[0];
    if (file1 !== undefined && file1.name !== '') {
      reader1.readAsDataURL(file1);
      reader1.onload = () => {
        this.gasto.pdf = String(reader1.result).split(',')[1];
        this.pdf_nombre = file1.name;
      };
    }
  }

  cargarXml() {
    this.cargado_xml = true;
    const reader1 = new FileReader();
    const file1 = this.xml_file.nativeElement.files[0];
    if (file1 !== undefined && file1.name !== '') {
      reader1.readAsDataURL(file1);
      reader1.onload = () => {
        this.xml_nombre = file1.name;
        this.gasto.xml = String(reader1.result).split(',')[1];
        this.subirArchivos(false);
      };
    }
  }

  cuentaSeleccionada(obj: any) {
    console.log(obj);
    if (obj.value !== '0') {
      const aux = obj.value.split('|');
      if (aux[1] === 'True') {
        this.es_deducible = true;
        // this.cargo_no_facturable.cuenta_deducible = '';
        this.titulo_input = '.XML';
      } else {
        this.titulo_input = 'Ingrese el monto';
        // this.cargo_no_facturable.cuenta_deducible = '';
        this.es_deducible = false;
      }
      this.cargo_no_facturable.descripcion_cuenta = obj.data[0].text;
      this.identificador_cuenta = aux[0].split(':')[0];
      if (!this.prorrateo) {
        console.log(aux);
        this.cargo_no_facturable.id_cuenta_agrupacion = aux[0].split(':')[0];
      } else {
        // tslint:disable-next-line:max-line-length
        this._servicioContribuyentes.obtenerDepartamentoProrrateo(aux[0].split(':')[0], this.comprobacion.contributente_identificador, 7, this.datos_inciales.usuario.identificador_proveedor).subscribe(
          (data: any) => {
            const aux_dep = data.map(obj_depto => {
              obj_depto.clave_departamento = obj_depto.clave_departamento;
              obj_depto.identificador_departamento = obj_depto.identificador_departamento;
              obj_depto.monto = 0;
              obj_depto.porcentaje = 0;
              return obj_depto;
            });
            this.lista_departamentos_prorrateo = aux_dep;
          }
          , (error) => {
            console.log(error);
          }
          , () => {

          }

        );
      }
    }
  }

  public cerrarModalDepartamento(): void {
    $('#modal-deptos').modal('toggle');
  }

  public abrirModalDepartamento(): void {
    if (this.lista_departamentos_prorrateo.length > 0) {
      const monto_dividido = (this.monto_comprobar / this.lista_departamentos_prorrateo.length);
      const porcentaje = ((monto_dividido) * this.comprobado) / 100;
      this.lista_departamentos_prorrateo.forEach(element => {
        element.monto = monto_dividido;
        element.porcentaje = porcentaje;
      });
      this.calcularComprobado();
      $('#modal-deptos').modal('toggle');
    } else {
      swal.fire('Atención', 'Esta cuenta no contiene departamentos asociados, por favor contacta con el administrador del sistema', 'error');
    }

  }

  subirArchivos(guarda: boolean) {
    guarda ? this.cargo_no_facturable.guardar = 1 : this.cargo_no_facturable.guardar = 0;
    this.cargo_no_facturable.identificador_corporativo = this.identificador_corproativo;
    guarda ? this.cargo_no_facturable.pdf = this.gasto.pdf : this.cargo_no_facturable.pdf = '';
    this.cargo_no_facturable.xml = this.gasto.xml;
    this.cargo_no_facturable.identificador_sucursal = this.comprobacion.sucursal_identificador;
    this.cargo_no_facturable.identificador_proveedor = this.datos_inciales.usuario.identificador_usuario;
    this.cargo_no_facturable.tipo_movimiento = 4;
    this.cargo_no_facturable.monto_solicitud = this.comprobacion.monto;
    this.es_deducible ? this.cargo_no_facturable.monto_no_deducible = 1 : this.cargo_no_facturable.monto_no_deducible = 0;
    this.cargo_no_facturable.preliminar_id = this.comprobacion.preliminar_id;
    if (this.es_deducible) {
      this.cargando = true;
      this._servicioComprobaciones.agregarCargoDeducible(this.cargo_no_facturable).subscribe(
        (data: any) => {
          this.consultarToteles(this.comprobacion.id, this.comprobacion.preliminar_id);
          this.monto_comprobar = data.monto;
          this.cargando = false;
          // this.limpiarDatos();
        }
        , (error) => {
          this.cargando = false;
          if (error.error) {
            swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
          } else {
            swal.fire('Atención', 'Ha ocurrido un error inesperado, por favor intentalo nuevamente más tarde: ', 'error');
          }
        }
        , () => {
          this.cargando = false;
        }
      );
    } else {
      if (this.cargo_no_facturable.pdf) {
        this.cargando = true;
        this.cargo_no_facturable.monto_no_deducible = this.monto_comprobar;
        this._servicioComprobaciones.agregarCargoNodeducible(this.cargo_no_facturable).subscribe(
          (data: any) => {
            this.monto_comprobar = data.monto;
            this.cargando = false;
            this.consultarToteles(this.comprobacion.id, this.comprobacion.preliminar_id);
            if (data.pre_detalle_id) {
              swal.fire('Éxito', 'Comprobante cargado correctamente', 'success');
              this.limpiarDatos();
            } else {
              console.log(data);
              swal.fire('Atención', 'Ha ocurrido un error. <br> Intentalo nuevamente: ', 'error');
            }
          }
          , (error) => {
            this.cargando = false;
            if (error.error) {
              swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
            } else {
              swal.fire('Atención', 'Ha ocurrido un error inesperado, por favor intentalo nuevamente más tarde: ', 'error');
            }
          }
          , () => {
            this.cargando = false;
          }
        );
      } else {
        this.cargando = false;
        swal.fire('Atención', 'Debe agregar un archivo .pdf', 'error');
      }
    }
  }

  calcularComprobado() {
    let aux_comprobado = 0;
    this.lista_departamentos_prorrateo.forEach(prorrateo => {
      aux_comprobado += Number(prorrateo.monto);
    });
    this.comprobado = aux_comprobado.toFixed(2);
    this.comprobado_minimo = Number(this.monto_comprobar) - 0.01;
    this.comprobado_maximo = Number(this.monto_comprobar) + 0.01;
    this.comprobado_minimo = Number(this.comprobado_minimo).toFixed(2);
    this.comprobado_maximo = Number(this.comprobado_maximo).toFixed(2);
    this.comprobado = aux_comprobado.toFixed(2);

    let aux_procentaje_comprobado = 0;
    this.monto_comprobar = Number(this.monto_comprobar).toFixed(2);
    this.lista_departamentos_prorrateo.forEach(element => {
      const porcentaje = (element.monto * 100) / this.monto_comprobar;
      element.porcentaje = porcentaje.toFixed(2);
      aux_procentaje_comprobado += Number(element.porcentaje);
    });
    this.porcentaje_comprobado = aux_procentaje_comprobado.toFixed(2);
    this.comprobado = Number(this.comprobado).toFixed(2);
  }

  calcularComprobadoPorcentaje() {

    let aux_monto_comprobado = 0;
    this.monto_comprobar = Number(this.monto_comprobar); // .toFixed(2);
    this.lista_departamentos_prorrateo.forEach(element => {
      console.log(this.monto_comprobar);
      const monto = (element.porcentaje * this.monto_comprobar) / 100;
      console.log(monto);
      element.monto = monto; // .toFixed(2);
      aux_monto_comprobado += Number(element.monto);
    });
    this.comprobado = aux_monto_comprobado; // .toFixed(2);
    this.comprobado = Number(this.comprobado).toFixed(2);

    let aux_porcentaje_comprobado = 0;
    this.lista_departamentos_prorrateo.forEach(prorrateo => {
      aux_porcentaje_comprobado += Number(prorrateo.porcentaje);
    });
    this.porcentaje_comprobado = aux_porcentaje_comprobado.toFixed(2);
  }

  activarMonedaPorcentaje() {
    console.log('Aqui');
  }

  comprobarProrrateo() {
    console.log('Enviando');
    this.cargo_no_facturable.cuentas_prorrateo = new Array<CuentasProrateo>();
    if (this.prorrateo) {
      // this.cargo_no_facturable.identificador_cuenta = this.identificador_cuenta;
      this.cargo_no_facturable.identificador_cuenta = this.identificador_cuenta;
      this.lista_departamentos_prorrateo.forEach(cuenta => {
        if (Number(cuenta.monto) > 0) {
          const cuenta_prorrateo = new CuentasProrateo();
          cuenta_prorrateo.importe_asignado = cuenta.monto;
          cuenta_prorrateo.porcentaje_asignado = cuenta.porcentaje;
          cuenta_prorrateo.ceco = this.comprobacion.ceco;
          cuenta_prorrateo.preliminar_detalle_id = 0;
          cuenta_prorrateo.id_cuenta_agrupacion = cuenta.identificador_departamento; // poner el id
          this.cargo_no_facturable.cuentas_prorrateo.push(cuenta_prorrateo);
          this.cargo_no_facturable.prorrateo = 1;
        }
      });
    } else {
      this.cargo_no_facturable.cuentas_prorrateo = null;
      this.cargo_no_facturable.ceco = this.comprobacion.ceco;
      this.cargo_no_facturable.prorrateo = 0;
    }

    this.subirArchivos(true);
  }


  limpiarDatos() {
    // es_deducible
    this.cargo_no_facturable = null;
    this.gasto = null;
    this.pdf_nombre = '';
    this.gasto = new Gasto();
    this.cargo_no_facturable = new CargoNoDedusible();
    this.lista_select = null;
    this.cargo_no_facturable.identificador_departamento = this.comprobacion.identificador_departamento;
    this.cargo_no_facturable.preliminar_id = this.comprobacion.preliminar_id;
    this.cargo_no_facturable.identificador_contribuyente = this.comprobacion.contributente_identificador;
    this.cargo_no_facturable.prorrateo = 0;
    this.cargo_no_facturable.monto_solicitud = 0;
    // this.monto_comprobar = 0;
    // this.comprobacion.monto = 0;
    this.iniciarFormulario();
    this.inciarFormularioComprobacion();
    this.activarProrrateo(false);
  }


  consultarToteles(id_solicitud: number, id_perliminar: number) {
    this._servicioComprobaciones.obtenerTotales(id_solicitud, id_perliminar).subscribe(
      (data: any) => {
        this.total_comprobado = data.total_comprobar;
        this.total_comprobar = data.total_por_comprobar;
        console.log(data);
      }
      , (error) => {
        console.log(error);
      }
      , () => {

      }
    );
  }

  finalizarTransaccion() {
    this.txtBtnFinalizar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    const obj = {
      preliminar_id: this.cargo_no_facturable.preliminar_id,
      monto_solicitud: this.total_comprobar,
      identificador_contribuyente: this.cargo_no_facturable.identificador_contribuyente,
      identificador_sucursal: this.comprobacion.sucursal_identificador,
      identificador_departamento: this.cargo_no_facturable.identificador_departamento,
      id_moneda: this.comprobacion.id_moneda,
      moneda: this.comprobacion.codigo_moneda,
      identificador_proveedor: this.comprobacion.usuario_identificador,
    };
    this._servicioComprobaciones.finalizarTransaccion(obj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.monto) {
          this.txtBtnFinalizar = 'Finalizada';
          this.router.navigate(['/home/comprobaciones_generales']);
        } else {
          swal.fire('Atención', 'Ha ocurrido un error inesperado. <br>  Por favor intentalo nuevamente más tarde', 'error');
        }
      }
      , (error) => {
        console.log(error);
        if (error.error) {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        } else {
          swal.fire('Atención', 'Ha ocurrido un error inesperado. <br>  Por favor intentalo nuevamente más tarde', 'error');
        }
        this.txtBtnFinalizar = 'Finalizar transacción';
      }
      , () => {

      }
    );
  }

  obtenerMonedas() {
    this._servicio_compartido.obtenerMonedasCorporativo(this.corporativo_activo.corporativo_identificador).subscribe(
      (data) => {
        console.log(data);
        this.lista_monedas = data;
        this.lista_monedas = this.globas.prepararSelect2(data, 'clave', 'nombre');
        this.lista_monedas = this.globas.agregarSeleccione(data, 'Selecciona una moneda');
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
      , () => {

      }
    );
  }

  tipoMonedaSeleccionada(tipo: any) {
    console.log(tipo);
    this.cargo_no_facturable.moneda = tipo.value;
  }

}
