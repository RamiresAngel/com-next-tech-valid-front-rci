import { Usuario } from './../../../entidades/usuario';
import { StorageService } from './../../login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { CompartidosService } from './../../servicios_compartidos/compartidos.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComprobacionGastosHeader } from 'src/app/entidades/ComprobacionGastosHeader';
import { CentroCostosService } from 'src/app/modulos/centro-costos/centro-costos.service';

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
  public usuario_cc: string;

  formulario_header: FormGroup;
  lista_contribuyentes: Array<any> = [];
  lista_centros_costo: Array<any> = [];
  lista_monedas: Array<any> = [];

  contribuyente_value;
  centro_costo_value;
  moneda_value;

  header_comprobante = new ComprobacionGastosHeader();

  constructor(private _compartidoService: CompartidosService,
    private _centroCostosService: CentroCostosService,
    private globals: GlobalsComponent,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.usuario);
      this.header_comprobante.identificador_cc = this.usuario.centro_costo;
      this.header_comprobante.nombre_usuario = this.usuario.nombre;
      this.header_comprobante.nombre_usuario_aprobador = this.comprobacion_header.aprobador;
    }, 800);
    this.obtenerCatalogos();
    this.iniciarFormularioHeader();
  }

  ngOnChanges() {
    if (this.comprobacion_header) {
      this.header_comprobante = { ...this.comprobacion_header };
    }
  }

  iniciarFormularioHeader() {
    this.formulario_header = new FormGroup({
      nombre_usuario: new FormControl('', Validators.required),
      contribuyente: new FormControl('', Validators.required),
      centro_costos: new FormControl('', Validators.required),
      aprobador: new FormControl('', Validators.required),
      moneda: new FormControl('', Validators.required),
      destino: new FormControl('', Validators.required),
      motivo: new FormControl('', Validators.required),
      recuperable: new FormControl(false)
    });
  }
  submitForm() {
    this.formulario_header.disable();
    this.onContinuar.emit(this.formulario_header.value);
    // this.formulario_header.disable();
  }
  obtenerCatalogos() {
    this.obtenerContribuyente();
    this.obtenerCentrosCosto();
    this.obtenerMonedas();
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
    this.header_comprobante.id_moneda = value;
  }
  cancelarComprobacion() {
    this.onCancelar.emit();
  }

  obtenerMonedas() {
    this._compartidoService.obtenerMonedasCorporativo(this.storageService.getCorporativoActivo().corporativo_identificador).subscribe((data: any) => {
      this.lista_monedas = this.globals.prepararSelect2(data, 'id', 'nombre');
      this.lista_monedas = this.globals.agregarSeleccione(this.lista_monedas, 'Seleccione moneda...');
    }, err => { console.log(err) }, () => {
      this.moneda_value = this.comprobacion_header.id_moneda;
    });
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
      this.centro_costo_value = this.comprobacion_header.identificador_cc;
    })
  }

  public get controls(): { [key: string]: AbstractControl } {
    return this.formulario_header.controls;
  }

}
