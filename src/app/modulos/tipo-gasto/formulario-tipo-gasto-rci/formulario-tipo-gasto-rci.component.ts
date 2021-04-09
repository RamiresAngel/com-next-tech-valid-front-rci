import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FrecuenciaFiscal, CorporativoActivo, CuentaAgrupacionHeader, DatosIniciales, CuentaGastoContribuyente, Cuenta } from 'src/app/entidades';
import { TipoGastoService } from '../tipo-gasto.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CuentaService } from '../../cuenta/cuenta.service';
import { HttpResponse } from '@angular/common/http';
import { ContribuyenteService } from '../../contribuyente/contribuyente.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-formulario-tipo-gasto-rci',
  templateUrl: './formulario-tipo-gasto-rci.component.html',
  styleUrls: ['./formulario-tipo-gasto-rci.component.css']
})
export class FormularioTipoGastoRciComponent implements OnInit {

  public cargando = false;
  public logo_img = './assets/img/NEXT_5.png';
  lista_frecuencia_rci = new Array<FrecuenciaFiscal>();
  corporativo_activo: CorporativoActivo;
  public lista_cuentas: any[];
  startValue_cuentas: any;
  relacion_tipo_cuenta = new CuentaGastoContribuyente();
  relacion_tipo_cuenta_selec = new CuentaGastoContribuyente();
  public lista_contribuyentes: any;
  startValue_contribuyente: any;
  public txtAgregarRelacion = ' <i class="fas fa-save"></i>';
  identificador_corporativo: string;
  public lista_relaciones_filtrar = new Array<any>();
  public txtBtnAgregar = 'Finalizar';
  public guardado: any;
  /* formulario */
  formulario_tipo_gasto: FormGroup;
  accion_rci: string;
  cuenta_agrupacion: CuentaAgrupacionHeader;
  public datos_iniciales: DatosIniciales;
  @Input() tipogastoid: string;
  @Input() cuenta_agrupacion_id: number;
  @Output() actualizatabla = new EventEmitter<string>();
  @Output() limpia_id_agrupacion = new EventEmitter<string>();
  cuenta_gasto_contribuyente = new Array<CuentaGastoContribuyente>();
  public nombre_cuenta: string;

  constructor(
    private _tipoGastoService: TipoGastoService,
    private _storageService: StorageService,
    private _cuentaService: CuentaService,
    private _contribuyenteService: ContribuyenteService,
    private _globals: GlobalsComponent,
  ) {
    this.cuenta_agrupacion = new CuentaAgrupacionHeader();
    this.cargaPorId();
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.getFrecuenciaFiscal(this.identificador_corporativo);
  }

  ngOnInit() {
    this.cargarListas();
  }

  ngOnChanges() {
    this.cargaPorId();
  }

  refrescarTabla(): void {
    this.actualizatabla.next();
  }

  cargaPorId() {
    if (this.cuenta_agrupacion_id !== null && this.cuenta_agrupacion_id !== undefined && String(this.cuenta_agrupacion_id) !== '') {
      this.cargando = true;
      this.accion_rci = 'Editar';
      this._tipoGastoService.getObtenerCuentaAgrupacion(this.cuenta_agrupacion_id)
        .subscribe((data: CuentaAgrupacionHeader) => {
          // console.log(data);
          this.cuenta_agrupacion = data;
          this.cuenta_gasto_contribuyente = data.cuenta_gasto_contribuyente;
          this.cargando = false;
        }, error => {
          this.cargando = false;
          console.log(error);
        },
          () => {
          });
      this.iniciarFormularioeditar();
    } else {
      this.accion_rci = 'Agregar Nueva';
      this.cuenta_gasto_contribuyente = new Array<CuentaGastoContribuyente>();
      this.iniciarFormularioCrear();
    }
  }

  iniciarFormularioCrear() {
    this.formulario_tipo_gasto = new FormGroup({
      nombre: new FormControl('', Validators.required),
      frecuencia: new FormControl(''),
      valor_nacional: new FormControl('', [Validators.required, this.validarSoloNumero]),
      numero_dias: new FormControl(''),
    });
  }

  iniciarFormularioeditar() {
    this.formulario_tipo_gasto = new FormGroup({
      nombre: new FormControl(this.cuenta_agrupacion.nombre, Validators.required),
      frecuencia: new FormControl(this.cuenta_agrupacion.frecuencia_fiscal_id),
      valor_nacional: new FormControl(this.cuenta_agrupacion.valor_nacional, [Validators.required, this.validarSoloNumero]),
      numero_dias: new FormControl(this.cuenta_agrupacion.numero_dias),
    });
  }


  finalizarEdicion() {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.cuenta_agrupacion.numero_dias = this.formulario_tipo_gasto.get('numero_dias').value ? 1 : 0;
    if (this.formulario_tipo_gasto.valid) {
      if (this.cuenta_agrupacion_id !== null && this.cuenta_agrupacion_id !== undefined /* && this.cuenta_agrupacion_id !== '' */) {
        this.actualizarCuentaAgrupacion();
      } else {
        this.crearCuentaAgrupacion();
      }
    }
  }

  crearCuentaAgrupacion() {
    this.txtBtnAgregar = 'Finalizar';
    const aux_cuenta = {
      nombre: this.formulario_tipo_gasto.value.nombre,
      frecuencia_fiscal_id: this.cuenta_agrupacion.frecuencia_fiscal_id,
      valor_nacional: this.formulario_tipo_gasto.value.valor_nacional,
      numero_dias: this.cuenta_agrupacion.numero_dias,
      tipo_gasto_id: this.tipogastoid,
      corporativo_identificador: this.identificador_corporativo,
      usuario_creo_identificador: this.datos_iniciales.usuario.identificador_usuario,
      cuenta_gasto_contribuyente: this.cuenta_gasto_contribuyente,
    };
    // console.log(aux_cuenta);
    this._tipoGastoService.creaCuentaAgrupacion(aux_cuenta)
      .subscribe((data: any) => {
        // console.log(data);
        Swal.fire('Éxito', 'Guardado Correctamente', 'success');
        setTimeout(() => {
          this.cerrarModal();
        }, 500);
        this.refrescarTabla();
      }, error => {
        console.log(error);
        this.txtBtnAgregar = 'Guardar';
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      });
  }

  actualizarCuentaAgrupacion() {
    this.txtBtnAgregar = 'Finalizar';
    const aux_cuenta = {
      id: this.cuenta_agrupacion.id,
      nombre: this.formulario_tipo_gasto.value.nombre,
      frecuencia_fiscal_id: this.cuenta_agrupacion.frecuencia_fiscal_id,
      valor_nacional: this.formulario_tipo_gasto.value.valor_nacional,
      numero_dias: this.cuenta_agrupacion.numero_dias,
      activo: this.cuenta_agrupacion.activo,
      tipo_gasto_id: this.tipogastoid,
      usuario_creo_identificador: this.datos_iniciales.usuario.identificador_usuario,
      cuenta_gasto_contribuyente: this.cuenta_gasto_contribuyente,
    };
    // console.log(aux_cuenta);
    this._tipoGastoService.editaCuentaAgrupacion(aux_cuenta)
      .subscribe((data: any) => {
        // console.log(data);
        Swal.fire('Éxito', 'Guardado Correctamente', 'success');
        setTimeout(() => {
          this.cerrarModal();
        }, 500);
        this.refrescarTabla();
      }, error => {
        console.log(error);
        this.txtBtnAgregar = 'Guardar';
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      });
  }

  public cerrarModal(): Promise<any> {
    return new Promise((resolve) => {
      this.iniciarFormularioCrear();
      this.limpiaIdAgrupacion();
      this.startValue_cuentas = null;
      this.startValue_contribuyente = null;
      this.relacion_tipo_cuenta_selec = new CuentaGastoContribuyente();
      resolve($('#ModalFormularoRci').modal('toggle'));
    });
  }

  limpiaIdAgrupacion(): void {
    this.limpia_id_agrupacion.next();
  }

  identificaFrecuencia(id) {
    // console.log(id.value);
    this.cuenta_agrupacion.frecuencia_fiscal_id = id.value;
  }

  actualizarCuenta(evento) {
    if (evento !== null && evento.value !== null && evento.value !== '0') {
      this.relacion_tipo_cuenta_selec.identificador_cuenta = evento.value;
      this.relacion_tipo_cuenta_selec.cuenta = evento.data[0].text;
    }
  }

  actualizarContribuyente(evento) {
    if (evento !== null && evento.value !== null && evento.value !== '0') {
      this.relacion_tipo_cuenta_selec.identificador_contribuyente = evento.value;
      this.relacion_tipo_cuenta_selec.contribuyente = evento.data[0].text;
    }
  }

  async agregarRelacion() {
    this.txtAgregarRelacion = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    const cantidad = this.cuenta_gasto_contribuyente.filter(x => (
      x.identificador_contribuyente === this.relacion_tipo_cuenta_selec.identificador_contribuyente &&
      x.identificador_cuenta === this.relacion_tipo_cuenta_selec.identificador_cuenta
    ));
    if (cantidad.length !== 0) {
      Swal.fire('Error', 'La Cuenta y el Contribuyente ya han sido seleccionados ', 'error');
      this.txtAgregarRelacion = ' <i class="fas fa-save"></i>';
    } else {
      this.relacion_tipo_cuenta = this.relacion_tipo_cuenta_selec;
      this.cuenta_gasto_contribuyente.push(this.relacion_tipo_cuenta);
      await this.reiniciarRelacion();
      Swal.fire('Éxito', 'La Cuenta y el Contribuyente han sido agregados correctamente ', 'success');
      this.txtAgregarRelacion = ' <i class="fas fa-save"></i>';
    }
  }

  reiniciarRelacion(): Promise<any> {
    return new Promise((resolve) => {
      this.startValue_cuentas = null;
      this.startValue_contribuyente = null;
      this.lista_cuentas = [];
      this.lista_contribuyentes = [];
      this.cargarListas();
      resolve(this.relacion_tipo_cuenta_selec = new CuentaGastoContribuyente());
    });
  }

  eliminarRelacion(indice) {
    // console.log(indice);
    this.cuenta_gasto_contribuyente.splice(indice, 1);
  }

  cargarListas() {
    this._contribuyenteService.ObtenerListaContribuyentesMXPorCorporativo(
      this.identificador_corporativo
      , this.datos_iniciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
    ).subscribe(
      (data: any) => {
        this.lista_contribuyentes = $.map(data, (obj) => {
          obj.id = obj.identificador;
          obj.text = `${obj.codigo} - ${obj.nombre}`;
          return obj;
        });
        this.lista_contribuyentes = this._globals.agregarSeleccione(this.lista_contribuyentes, 'Seleccione Contribuyente...');
      });

    this._cuentaService.obtenerCorporativoCuentaRci(this.identificador_corporativo)
      .subscribe((data: HttpResponse<Cuenta[]>) => {
        // console.log(data);
        this.lista_cuentas = $.map(data, (obj) => {
          obj.id = obj.identificador;
          obj.text = `${obj.codigo} - ${obj.cuenta} - ${obj.deducible == 1 ? 'Deducible' : 'No Deducible'}`;
          return obj;
        });
        this.lista_cuentas = this._globals.agregarSeleccione(this.lista_cuentas, 'Seleccione Cuenta...');
      });
  }

  filtrar(text: string) {
    if (text.length > 2) {
      this.cuenta_gasto_contribuyente = this.lista_relaciones_filtrar.filter(x =>
        String(this.omitirAcentos(x.contribuyente)).toLowerCase().includes(text.toLowerCase()) || String(this.omitirAcentos(x.cuenta)).toLowerCase().includes(text.toLowerCase())
      );
    } else {
      this.cuenta_gasto_contribuyente = this.lista_relaciones_filtrar.filter(x =>
        String(this.omitirAcentos(x.contribuyente)).toLowerCase().includes('') || String(this.omitirAcentos(x.cuenta)).toLowerCase().includes('')
      );
    }
  }

  omitirAcentos(text: string): string {
    const acentos = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
    const original = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
    for (let i = 0; i < acentos.length; i++) {
      text = text.replace(acentos.charAt(i), original.charAt(i));
    }
    return text;
  }

  getFrecuenciaFiscal(id_corporativo) {
    this._tipoGastoService.getlistFrecuenciaFiscal(id_corporativo)
      .subscribe((data: Array<FrecuenciaFiscal>) => {
        this.lista_frecuencia_rci = data.map((x: any) => {
          x.text = x.descripcion;
          x.id = x.id;
          return x;
        });
      }, (error) => {
        console.log(error);
      });
  }

  private validarSoloNumero(control: AbstractControl) {
    const tope = control.value;
    let error = null;
    const regex = new RegExp(/^[0-9]+\.?([0-9]{1,4})?$/);
    if (!regex.test(tope)) {
      error = 'La estructura del Tope Reembolsable es invalida.';
    }
    return error;
  }

  get controles() {
    return this.formulario_tipo_gasto.controls;
  }

}
