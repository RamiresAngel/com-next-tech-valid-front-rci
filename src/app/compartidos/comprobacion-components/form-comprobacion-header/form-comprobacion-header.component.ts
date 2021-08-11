import { BandejaAprobacionService } from './../../../modulos/bandeja-aprobacion/bandeja-aprobacion.service';
import { Usuario } from './../../../entidades/usuario';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { CompartidosService } from './../../servicios_compartidos/compartidos.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComprobacionGastosHeader } from 'src/app/entidades/ComprobacionGastosHeader';
import { CentroCostosService } from 'src/app/modulos/centro-costos/centro-costos.service';
import { ComprobacionesGastosService } from 'src/app/modulos/comprobaciones-gastos/comprobaciones-gastos.service';
import { UsuarioJefeList } from 'src/app/entidades';

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
  @Input() tipo_gasto: number = 1;
  @Input() title: string;
  @Input() is_reporte;

  public usuario_cc: string;
  recuperable_nota: number;

  formulario_header: FormGroup;
  lista_contribuyentes: Array<any> = [];
  lista_centros_costo: Array<any> = [];
  centros_costos_dispobles: Array<any> = [];
  lista_jefes_usuario: Array<UsuarioJefeList> = [];
  current_user = new UsuarioJefeList();

  lista_monedas = [
    { clave: "MXN", id: 1, id_id: 1, nombre: "Peso Mexicano", text: "Peso Mexicano" },
    { clave: "EXT.", id: 11, id_id: 11, nombre: "Moneda Extranjera", text: "Moneda Extranjera" }
  ];
  contribuyente_value;
  centro_costo_value;
  moneda_value;
  header_comprobante = new ComprobacionGastosHeader();
  datos_aprobacion: { nivel_aproacion: number, is_aprobacion: boolean };

  constructor(private _compartidoService: CompartidosService,
    private _centroCostosService: CentroCostosService,
    private globals: GlobalsComponent,
    private _bandejaAprobacionService: BandejaAprobacionService,
    private _comprobacionService: ComprobacionesGastosService
  ) { }


  async ngOnInit() {
    setTimeout(() => {
      this.header_comprobante.id_moneda = this.moneda_value = 1;
    }, 500);
    await this.obtenerCatalogos();
    this.datos_aprobacion = this._bandejaAprobacionService.datos_aprobacion;
    await this.iniciarFormularioHeader();
    this.comprobacion_header.identificador_compania = this.usuario.identificador_compania;
  }

  ngOnChanges() {
    if (this.comprobacion_header) {
      setTimeout(() => {
        console.log(this.comprobacion_header);
        this.header_comprobante = { ...this.comprobacion_header };
        this.recuperable_nota = this.header_comprobante.recuperable;
        this.lista_monedas.length ? this.moneda_value = this.header_comprobante.id_moneda : null;
        this.header_comprobante.nombre_usuario = this.comprobacion_header.nombre_usuario;
        this.header_comprobante.identificador_compania = this.comprobacion_header.identificador_compania;
        this.header_comprobante.identificador_cc = this.comprobacion_header.identificador_cc;
        this.setComprobacionHeader(this.comprobacion_header);
        if (this.comprobacion_header.identificador_compania) this.onChangeContribuyente(0, this.comprobacion_header.identificador_compania);

        if (this.usuario.asistente && this.header_comprobante.identificador_compania && !this.comprobacion_header.folio_comprobacion) {
          this.onUsuarioSelected(0);
        }
      }, 500)

    }
  }

  iniciarFormularioHeader(): Promise<void> {

    return new Promise((resolve, reject) => {
      if ((this.datos_aprobacion && this.datos_aprobacion.nivel_aproacion == 2 && this.tipo_gasto !== 11) || (this.tipo_gasto === 11)) {
        this.formulario_header = new FormGroup({
          nombre_usuario: new FormControl(this.usuario.nombre, Validators.required),
          contribuyente: new FormControl({ value: '' }, Validators.required),
          centro_costos: new FormControl({ value: '' }, Validators.required),
          aprobador: new FormControl('', Validators.required),
          moneda: new FormControl('', Validators.required),
          id_moneda: new FormControl(1, Validators.required),
          tipo_cambio: new FormControl(1, Validators.required),
          destino: new FormControl(''),
          usuario: new FormControl(''),
          motivo: new FormControl('', Validators.required),
          nota_recuperable: new FormControl(null),
          recuperable: new FormControl(false)
        });
      }

      if (this.tipo_gasto == 1) {
        this.formulario_header = new FormGroup({
          nombre_usuario: new FormControl(this.usuario.nombre, Validators.required),
          contribuyente: new FormControl({ value: '', disabled: true }, Validators.required),
          centro_costos: new FormControl({ value: '', disabled: true }, Validators.required),
          aprobador: new FormControl('', Validators.required),
          moneda: new FormControl('', Validators.required),
          id_moneda: new FormControl(1, Validators.required),
          tipo_cambio: new FormControl(1, Validators.required),
          destino: new FormControl('', Validators.required),
          motivo: new FormControl('', Validators.required),
          nota_recuperable: new FormControl(null),
          usuario: new FormControl(''),
          recuperable: new FormControl(false)
        });
      }
      else {
        this.formulario_header = new FormGroup({
          nombre_usuario: new FormControl(this.usuario.nombre, Validators.required),
          contribuyente: new FormControl({ value: '', disabled: true }, Validators.required),
          centro_costos: new FormControl({ value: '', disabled: true }, Validators.required),
          aprobador: new FormControl('', Validators.required),
          moneda: new FormControl('', Validators.required),
          id_moneda: new FormControl(1, Validators.required),
          tipo_cambio: new FormControl(1, Validators.required),
          destino: new FormControl(''),
          motivo: new FormControl('', Validators.required),
          nota_recuperable: new FormControl(null),
          usuario: new FormControl(''),
          recuperable: new FormControl(false)
        });
      }

      if (this.recuperable_nota === 1) {
        this.controls.nota_recuperable.setValidators([Validators.required]);
        this.controls.nota_recuperable.updateValueAndValidity();
      } else {
        this.controls.nota_recuperable.setValue(null);
        this.controls.nota_recuperable.setValidators([]);
        this.controls.nota_recuperable.updateValueAndValidity();
      }

      if (this.usuario.asistente && this.header_comprobante.identificador_compania && this.comprobacion_header.identificador_usuario) {
        this.onUsuarioSelected(0);
      }
      this.controls.moneda.setValue(1);
      this.controls.id_moneda.setValue(1);
      // this.header_comprobante.id_moneda = Number(1);
      // this.header_comprobante.moneda = 'MXN';
      resolve();
    });

  }
  notaRecuperable(event: HTMLInputElement) {
    this.recuperable_nota = event.checked ? 1 : 0;
    if (this.recuperable_nota === 1) {
      this.controls.nota_recuperable.setValidators([Validators.required]);
      this.controls.nota_recuperable.updateValueAndValidity();
      return;
    } else if (this.numero_comprobacion) {
      this.controls.nota_recuperable.setValidators([]);
      this.controls.nota_recuperable.updateValueAndValidity();
    } else {
      this.controls.nota_recuperable.setValue(null);
      this.controls.nota_recuperable.setValidators([]);
      this.controls.nota_recuperable.updateValueAndValidity();
    }
  }

  submitForm() {
    console.log(this.comprobacion_header);
    if (!this.header_comprobante.identificador_usuario) {
      this.header_comprobante.identificador_usuario = this.usuario.identificador_usuario;
    }
    if (!this.recuperable_nota) {
      this.header_comprobante.nota_recuperable = '';
    }

    if (this.header_comprobante.id_moneda === 0) {
      this.header_comprobante.id_moneda = 1;
      this.onContinuar.emit(this.header_comprobante);
    } else {
      this.onContinuar.emit(this.header_comprobante);
    }
  }
  obtenerCatalogos() {
    this.obtenerContribuyente();
    this.obtenerCentrosCosto();
    this.usuario.asistente ? this.obtenerJefesInmediato() : null;
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
  onMonedaSelected(index) {
    this.controls.moneda.setValue(this.lista_monedas[index].id);
    this.controls.id_moneda.setValue(this.lista_monedas[index].clave);
    this.header_comprobante.id_moneda = Number(this.lista_monedas[index].id);
    this.header_comprobante.moneda = this.lista_monedas[index].clave;
  }
  onUsuarioSelected(index: number) {
    const usr_selected = this.lista_jefes_usuario[index];

    this.controls.nombre_usuario.setValue(usr_selected.nombre);
    this.header_comprobante.nombre_usuario = usr_selected.nombre;
    this.header_comprobante.identificador_usuario = usr_selected.identificador_usuario;

    this.header_comprobante.nombre_usuario_aprobador = usr_selected.nombre_aprobador;
    this.header_comprobante.identificador_aprobador = usr_selected.identificador_aprobador;
    this.comprobacion_header.identificador_aprobador = usr_selected.identificador_aprobador;
    this.usuario.identificador_jefe_inmediato = usr_selected.identificador_aprobador;

    this.header_comprobante.identificador_compania = usr_selected.identificador_contribuyente;
    this.header_comprobante.identificador_cc = usr_selected.identificador_centro_costo;
  }
  cancelarComprobacion() {
    this.onCancelar.emit();
  }

  obtenerJefesInmediato() {
    this._comprobacionService.getUsuarioByAsistente(this.usuario.identificador_usuario).subscribe((data: any) => {

      let aux_jefes = data.map((x, index) => {
        const obj = {
          nombre: x.nombre,
          identificador_usuario: x.identificador_usuario,
          nombre_aprobador: x.nombre_aprobador,
          identificador_contribuyente: x.identificador_contribuyente,
          identificador_centro_costo: x.identificador_centro_costo,
          identificador_aprobador: x.identificador_aprobador
        }
        return obj;
      });

      for (var i = 0; i < aux_jefes.length; i++) {
        if (aux_jefes[i].nombre === "") {
          aux_jefes.splice(i, 1);
          i--;
        }
      }
      aux_jefes = this.globals.prepararSelect2(aux_jefes, 'identificador_usuario', 'nombre');
      this.lista_jefes_usuario = [this.current_user, ...aux_jefes];
      if (this.header_comprobante.identificador_compania) {
        this.onUsuarioSelected(0);
      }
    }, error => {
      console.log(error);
    })
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
          this.onChangeContribuyente(0, this.comprobacion_header.identificador_compania);
        }
      }, 1500);
    })
  }
  obtenerAprobadores(identificador_contribuyente): Promise<string> {
    return new Promise((resolve, reject) => {
      this._comprobacionService.getAprobadoresPrestacion(identificador_contribuyente).subscribe((data: any) => {
        this.comprobacion_header.nombre_usuario_aprobador = `${data.data.nombre} ${data.data.apellido_paterno}`;
        this.comprobacion_header.identificador_aprobador = data.data.identificador_usuario
        resolve(`${data.data.nombre} ${data.data.apellido_paterno}`);
      }, err => reject(err));
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
      if (this.lista_contribuyentes.length > 0) {

      }
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

  onChangeContribuyente(index: number, identificador_contribuyente?: string) {
    if (this.tipo_gasto == 11 && index !== 0) {
      this.obtenerAprobadores(this.lista_contribuyentes[index].identificador);
    }
    if (identificador_contribuyente) {
      const codigo = this.lista_contribuyentes.filter(cont => cont.identificador == identificador_contribuyente);
      if (codigo.length > 0) {
        return this.centros_costos_dispobles = this.lista_centros_costo.filter(x => x.emisor_codigo == codigo[0].codigo)
      }
    }
    if (index > 0) {
      this.centros_costos_dispobles = this.lista_centros_costo.filter(x => x.emisor_codigo == this.lista_contribuyentes[index].codigo);
    } else {
      this.centros_costos_dispobles = this.lista_centros_costo;
    }
  }

  public get controls(): { [key: string]: AbstractControl } {
    return this.formulario_header.controls;
  }

  public setComprobacionHeader(comprobacion: ComprobacionGastosHeader) {
    this.header_comprobante = comprobacion;
    this.current_user.nombre = this.usuario.nombre;
    this.current_user.identificador_centro_costo = this.usuario.identificador_centro_costo;
    this.current_user.identificador_cc = this.usuario.identificador_centro_costo;
    this.current_user.identificador_aprobador = this.usuario.identificador_jefe_inmediato;
    this.current_user.identificador_contribuyente = this.usuario.identificador_compania;
    this.current_user.identificador_usuario = this.usuario.identificador_usuario;
    this.current_user.nombre_aprobador = this.header_comprobante.nombre_usuario_aprobador;
    this.current_user.nombre = this.usuario.nombre;
  }

}
