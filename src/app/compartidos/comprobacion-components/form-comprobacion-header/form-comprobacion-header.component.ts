import { BandejaAprobacionService } from './../../../modulos/bandeja-aprobacion/bandeja-aprobacion.service';
import { Subscription } from 'rxjs';
import { Usuario } from './../../../entidades/usuario';
import { StorageService } from './../../login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { CompartidosService } from './../../servicios_compartidos/compartidos.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComprobacionGastosHeader } from 'src/app/entidades/ComprobacionGastosHeader';
import { CentroCostosService } from 'src/app/modulos/centro-costos/centro-costos.service';
import { ComprobacionesGastosService } from 'src/app/modulos/comprobaciones-gastos/comprobaciones-gastos.service';

@Component({
  selector: 'app-form-comprobacion-header',
  templateUrl: './form-comprobacion-header.component.html',
  styleUrls: ['./form-comprobacion-header.component.css']
})
export class FormComrpobacionHeaderComponent implements OnInit {
  @Output() onContinuar = new EventEmitter();
  @Output() onCancelar = new EventEmitter();
  @Input() numero_comprobacion: string;
  @Input() comprobacion_header = new ComprobacionGastosHeader();
  @Input() usuario: Usuario;
  @Input() title: string;

  monedasSubcripcion: Subscription;
  public usuario_cc: string;
  recuperable_nota: string;

  formulario_header: FormGroup;
  lista_contribuyentes: Array<any> = [];
  lista_centros_costo: Array<any> = [];
  lista_monedas: Array<any> = [];
  contribuyente_value;
  centro_costo_value;
  moneda_value;
  header_comprobante = new ComprobacionGastosHeader();
  datos_aprobacion: { nivel_aproacion: number, is_aprobacion: boolean };

  constructor(private _compartidoService: CompartidosService,
    private _centroCostosService: CentroCostosService,
    private globals: GlobalsComponent,
    private _comprobacionService: ComprobacionesGastosService,
    private _bandejaAprobacionService: BandejaAprobacionService,
  ) {
    this.recuperable_nota = 'no';
  }

  ngOnInit() {
    this.monedasSubcripcion = this._comprobacionService.getListaMonedas().subscribe(data => {
      this.lista_monedas = data;
      this.header_comprobante.id_moneda ? this.moneda_value = this.header_comprobante.id_moneda : this.moneda_value = 1;
    });
    this.datos_aprobacion = this._bandejaAprobacionService.datos_aprobacion;
    this.obtenerCatalogos();
    this.iniciarFormularioHeader();
    this.comprobacion_header.identificador_compania = this.usuario.identificador_compania;
  }

  ngOnChanges() {
    if (this.comprobacion_header) {
      this.header_comprobante = { ...this.comprobacion_header };
      this.lista_monedas.length ? this.moneda_value = this.header_comprobante.id_moneda : null;
    }
  }

  ngOnDestroy(): void {
    this.monedasSubcripcion.unsubscribe();
  }
  iniciarFormularioHeader() {

    if (this.datos_aprobacion && this.datos_aprobacion.nivel_aproacion == 2) {
      return this.formulario_header = new FormGroup({
        nombre_usuario: new FormControl('', Validators.required),
        contribuyente: new FormControl({ value: '' }, Validators.required),
        centro_costos: new FormControl({ value: '' }, Validators.required),
        aprobador: new FormControl('', Validators.required),
        moneda: new FormControl('', Validators.required),
        id_moneda: new FormControl(null, Validators.required),
        tipo_cambio: new FormControl(1, Validators.required),
        destino: new FormControl('', Validators.required),
        motivo: new FormControl('', Validators.required),
        nota_recuperable: new FormControl(''),
        recuperable: new FormControl(false)
      });
    }

    const aux_url = window.location.href;
    if (aux_url.indexOf("/comprobaciones/gastos_viaje") !== -1) {
      this.formulario_header = new FormGroup({
        nombre_usuario: new FormControl('', Validators.required),
        contribuyente: new FormControl({ value: '', disabled: true }, Validators.required),
        centro_costos: new FormControl({ value: '', disabled: true }, Validators.required),
        aprobador: new FormControl('', Validators.required),
        moneda: new FormControl('', Validators.required),
        id_moneda: new FormControl(null, Validators.required),
        tipo_cambio: new FormControl(1, Validators.required),
        destino: new FormControl('', Validators.required),
        motivo: new FormControl('', Validators.required),
        nota_recuperable: new FormControl(''),
        recuperable: new FormControl(false)
      });
    } else {
      this.formulario_header = new FormGroup({
        nombre_usuario: new FormControl('', Validators.required),
        contribuyente: new FormControl({ value: '', disabled: true }, Validators.required),
        centro_costos: new FormControl({ value: '', disabled: true }, Validators.required),
        aprobador: new FormControl('', Validators.required),
        moneda: new FormControl('', Validators.required),
        id_moneda: new FormControl(null, Validators.required),
        tipo_cambio: new FormControl(1, Validators.required),
        destino: new FormControl(''),
        motivo: new FormControl('', Validators.required),
        nota_recuperable: new FormControl(''),
        recuperable: new FormControl(false)
      });
    }

  }
  notaRecuperable(event: HTMLInputElement) {
    this.recuperable_nota = event.checked ? 'recuperable' : 'no';
    if (this.recuperable_nota === 'recuperable') {
      this.formulario_header.controls['nota_recuperable'].setValidators([Validators.required]);
    } else {
      this.controls.nota_recuperable.setValue('');
      this.formulario_header.controls.nota_recuperable = new FormControl('');
    }
  }

  submitForm() {
    /* this.formulario_header.disable(); */
    this.onContinuar.emit(this.header_comprobante);
  }
  obtenerCatalogos() {
    this.obtenerContribuyente();
    this.obtenerCentrosCosto();
    // this.obtenerMonedas();
  }
  onContribuyenteSelected(data) {
    const value = data.value != '0' ? data.value : null;
    this.controls.contribuyente.setValue(value);
    this.header_comprobante.identificador_compania = value;
  }
  onCECOSelected(data) {
    const value = data.value != '0' ? data.value : null;
    if (data.value !== '0') {
      this.controls.centro_costos.setValue(value);
      this.header_comprobante.identificador_cc = value;
    } else {
      this.usuario_cc = '';
      setTimeout(() => {
        this.usuario_cc = this.usuario.identificador_centro_costo;
      }, 900);
    }
  }
  onMonedaSelected(data) {
    const value = data.value != '0' ? data.value : null;
    this.controls.moneda.setValue(value);
    this.controls.id_moneda.setValue(value);
    this.header_comprobante.id_moneda = Number(value);
    this.header_comprobante.moneda = data.data[0].clave;
  }
  cancelarComprobacion() {
    this.onCancelar.emit();
  }

  obtenerContribuyente() {
    this._compartidoService.getAllContribuyentesCorporativo(this.usuario.identificador_corporativo).subscribe((data) => {
      this.lista_contribuyentes = $.map(data, function (obj: any) {
        obj.id = obj.identificador;
        obj.text = `${obj.codigo} - ${obj.nombre}`;
        return obj;
      });
      this.lista_contribuyentes = this.globals.prepararSelect2(data, 'identificador', 'text');
      this.lista_contribuyentes = this.globals.agregarSeleccione(this.lista_contribuyentes, 'Seleccione contribuyente...');

    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        if (this.comprobacion_header.identificador_compania) {
          this.contribuyente_value = this.comprobacion_header.identificador_compania;
        }
      }, 200);
    })
  }
  obtenerCentrosCosto() {
    this._centroCostosService.ObtenerListaCentroCostosMXPorCorporativo(this.usuario.identificador_corporativo, this.usuario.identificador_usuario, Number(this.usuario.rol)).subscribe((data) => {
      this.lista_centros_costo = $.map(data, function (obj: any) {
        obj.id = obj.identificador;
        obj.text = `${obj.codigo} - ${obj.nombre}`;
        return obj;
      });
      this.lista_centros_costo = this.globals.prepararSelect2(data, 'identificador', 'text');
      this.lista_centros_costo = this.globals.agregarSeleccione(this.lista_centros_costo, 'Seleccione Centro Costo...');
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        if (this.comprobacion_header.identificador_cc) {
          this.centro_costo_value = this.comprobacion_header.identificador_cc;
        }
      }, 200);
    })
  }

  public get controls(): { [key: string]: AbstractControl } {
    return this.formulario_header.controls;
  }

  public setComprobacionHeader(comprobacion) {
    this.header_comprobante = comprobacion;
  }

}
