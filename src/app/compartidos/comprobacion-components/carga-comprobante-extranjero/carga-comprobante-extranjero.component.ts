import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FileUpload } from 'src/app/modulos/documentos_add/clases/file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GastosViajeService } from 'src/app/modulos/gastos-viaje/gastos-viaje.service';

@Component({
  selector: 'app-carga-comprobante-extranjero',
  templateUrl: './carga-comprobante-extranjero.component.html',
  styleUrls: ['./carga-comprobante-extranjero.component.css']
})
export class CargaComprobanteExtranjeroComponent implements OnInit {
  @Input() numero_comprobante: string;
  @Input() solicitud: any;
  @Input() fecha_seleccionada: any;
  @Output() cancelarCarga = new EventEmitter();
  @Input() lista_cuentas = [];
  @Input() lista_monedas = [];
  @Input() moneda = 1;
  @Output() enviarConceptos = new EventEmitter();
  @Output() enviarDetalleFactura = new EventEmitter();
  @Output() setTimpoCambio = new EventEmitter();
  formulario: FormGroup;
  // lista_moneda = [];
  lista_forma_pago = [];
  lista_conceptos = ["afds", "afsdfds"];
  total = 0;
  valor_tipomoneda: number
  public origen_pago = false;

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };

  constructor(
    private formBuilder: FormBuilder,
    private _servicioCompartido: CompartidosService,
    private _globals: GlobalsComponent,
    private _gastosViajeService: GastosViajeService,
    private _storageService: StorageService
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
    this.obtenerCatalogos();
    if (this.solicitud) {
      this.setDataInitial();
    }
    setTimeout(() => {
      this.valor_tipomoneda = this.moneda;
    }, 500);
    // this.onMonedaSeleccionado({ value: this.moneda, data: [this.lista_monedas.filter(x => x.calve == this.moneda)] })
  }

  setDataInitial() {
    this.controles.sucursal_identificador.setValue(this.solicitud.sucursal_identificador);
    this.controles.identificador_sucursal.setValue(this.solicitud.sucursal_identificador);
    this.controles.identificador_usuario.setValue(this.solicitud.usuario_identificador);
    this.controles.identificador_contribuyente.setValue(this.solicitud.contributente_identificador);
    this.controles.identificador_corporativo.setValue(this.solicitud.identificador_corporativo);
    this.controles.identificador_departamento.setValue(this.solicitud.identificador_departamento);
    this.controles.id_solicitud.setValue(Number(this.solicitud.id));

  }

  iniciarFormulario() {
    this.formulario = this.formBuilder.group({
      tipo_comprobante: '',
      tipo_documento_id: 6,
      id_tipo_gasto: 1,
      file: ['', Validators.required],
      fecha_comprobante: ['', Validators.required],
      numero_comprobante: ['', Validators.required],
      forma_pago: ['', Validators.required],
      moneda: ['', Validators.required],
      tipo_cambio: [1, Validators.required],
      conceptos: [[]],
      total: '',
      sucursal_identificador: '',
      identificador_usuario: '',
      identificador_contribuyente: '',
      identificador_corporativo: '',
      identificador_sucursal: '',
      identificador_departamento: '',
      identificador_proveedor: '',
      descripcion: '',
      fecha_comprobante_seleccionada: '',
      id_solicitud: 0,
      pagado_compania: 0,
      id_moneda: 0,
    });
  }
  valueCheck(origen_pago) {
    this.origen_pago = origen_pago;
    // console.log('si sirve');
    // console.log(this.origen_pago);
    // console.log(origen_pago);
  }

  obtenerCatalogos() {
    // this._servicioCompartido.obtenerMonedasCorporativo(this._storageService.getCorporativoActivo().corporativo_identificador).subscribe((data: any) => {
    //   this.lista_moneda = this._globals.prepararSelect2(data, 'clave', 'nombre');
    //   this.lista_moneda = this._globals.agregarSeleccione(this.lista_moneda, 'Seleccione Moneda...')
    // });
    this._servicioCompartido.obtenerFormaPago(this._storageService.getCorporativoActivo().corporativo_identificador).subscribe((data: any) => {
      this.lista_forma_pago = this._globals.prepararSelect2(data, 'id', 'descripcion');
      this.lista_forma_pago = this._globals.agregarSeleccione(this.lista_forma_pago, 'Seleccione forma de pago..');
    });
    // this._gastosViajeService.getCuentasContribuyenteSucursal(this.solicitud.contributente_identificador, this.solicitud.sucursal_identificador, this.solicitud.identificador_departamento).subscribe((data: any) => {
    //   this.lista_cuentas = this._globals.prepararSelect2(data, 'id_cuenta_agrupacion', 'cuenta');
    // });
  }

  submitFormulario(boton) {
    this.controles.tipo_cambio.setValue(this.controles.tipo_cambio.value as Number);
    this.enviarConceptos.emit({ data: this.controles.conceptos.value, extranjero: true, header: this.formulario.value });
    this.enviarDatos();
    this.setDataInitial();
  }
  enviarDatos() {
    this.enviarDetalleFactura.emit(this.formulario.value);
  }


  public get controles() { return this.formulario.controls; }

  cargarArchivo(input: any, input_texto: any, tipo?: string) {
    const reader = new FileReader();
    const file = input.currentTarget.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      const archivo = new FileUpload();
      archivo.file_name = file.name;
      archivo.file_data = reader.result.toString().split(',')[1];
      input_texto.value = archivo.file_name;
      input_texto.placeholder = archivo.file_name;
      this.controles.file.setValue(`${archivo.file_data}|${archivo.file_name}`);
    };
  }

  onFechaInicioViaje(fecha) {
    if (fecha.formatted !== '') {
      const fecha_hoy = `${fecha.date.year}-${fecha.date.month < 10 ? ('0' + fecha.date.month) : fecha.date.month}-${fecha.date.day < 10 ? ('0' + fecha.date.day) : fecha.date.day}`;
      // console.log(`${fecha.date.day}/${fecha.date.month}/${fecha.date.year}`);
      this.controles.fecha_comprobante.setValue(fecha_hoy);
      this.controles.fecha_comprobante_seleccionada.setValue(fecha_hoy);
    } else {
      this.controles.fecha_comprobante.setValue(null);
    }
  }
  onMonedaSeleccionado(moneda) {
    console.log(moneda);

    if (moneda.value !== '') {
      this.controles.moneda.setValue(moneda.value);
      this.controles.id_moneda.setValue(moneda.data[0].id_id);
      this.controles.tipo_cambio.setValue(Number(moneda.data[0].tipo_cambio));
      this.setTimpoCambio.emit(Number(moneda.data[0].tipo_cambio));
    } else {
      this.controles.moneda.setValue(null);
      this.controles.tipo_cambio.setValue(null);
    }
  }
  onFormaPagoSelect(forma_pago) {
    if (forma_pago.value !== '') {
      this.controles.forma_pago.setValue(forma_pago.value);
    } else {
      this.controles.forma_pago.setValue(null);
    }
  }

  addConcepto(concepto) {
    concepto.fecha_comprobante = this.controles.fecha_comprobante.value;
    concepto.fecha_comprobante_seleccionada = this.controles.fecha_comprobante.value;
    concepto.uuid = this.controles.numero_comprobante.value;
    const cooncepto_aux = this.controles.conceptos.value;
    cooncepto_aux.push(concepto);
    this.controles.conceptos.setValue(cooncepto_aux);
    let total = 0;
    this.controles.conceptos.setValue(this.controles.conceptos.value.map(x => {
      total += Number(x.importe);
      return { ...x, monto: x.importe }
    }));
    this.controles.total.setValue(total);
  }


  cancelar() {
    this.cancelarCarga.emit();
  }

  removeConcepto(index) {
    let aux = this.controles.conceptos.value;
    aux.splice(index, 1);
    let total = 0;
    aux.map(x => {
      total += Number(x.importe);
    });
    this.controles.total.setValue(total);
    this.controles.conceptos.setValue(aux);
  }

}
