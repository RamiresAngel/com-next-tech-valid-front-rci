import { ComprobanteRCI } from './../../../entidades/ComprobanteNacional';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FileUpload } from 'src/app/modulos/documentos_add/clases/file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Usuario } from 'src/app/entidades';
import { ComprobacionGastosHeader } from 'src/app/entidades/ComprobacionGastosHeader';
import { TipoGastoCorporativo } from 'src/app/entidades/TipoGastoCorporativo';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-carga-comprobante-extranjero',
  templateUrl: './carga-comprobante-extranjero.component.html',
  styleUrls: ['./carga-comprobante-extranjero.component.css']
})
export class CargaComprobanteExtranjeroComponent implements OnInit {
  @Output() cancelarCarga = new EventEmitter();
  @Output() onAgregarComprobante = new EventEmitter();
  @Output() enviarDetalleFactura = new EventEmitter();
  @Output() setTimpoCambio = new EventEmitter();
  @Output() calcularMontoDisponible = new EventEmitter();
  @Input() numero_comprobante: string;
  @Input() fecha_seleccionada: any;
  @Input() comprobacion_header: ComprobacionGastosHeader;
  @Input() lista_cuentas: TipoGastoCorporativo[] = [];
  @Input() lista_monedas = [];
  @Input() moneda = 1;
  @Input() tipo_gasto = 1;

  counter_anexos = 0;

  comprobante = new ComprobanteRCI();
  usuario: Usuario;

  formulario: FormGroup;
  lista_forma_pago = [];
  total = 0;
  valor_tipomoneda: number
  cuenta_seleccionada: any;
  public origen_pago = false;
  private today = new Date();

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true,
    disableSince: {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate() + 1,
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private _servicioCompartido: CompartidosService,
    private _globals: GlobalsComponent,
    private _storageService: StorageService
  ) { }

  ngOnInit() {
    this.usuario = this._storageService.getDatosIniciales().usuario;
    this.iniciarFormulario();
    this.obtenerCatalogos();
    setTimeout(() => {
      this.comprobante.forma_pago = "6";
      this.valor_tipomoneda = this.moneda;
      this.comprobante.id_cuenta_agrupacion = this.cuenta_seleccionada;
    }, 500);
    // this.onMonedaSeleccionado({ value: this.moneda, data: [this.lista_monedas.filter(x => x.calve == this.moneda)] })
  }

  setDataInitial() {
    this.controles.identificador_usuario.setValue(this.usuario.identificador_usuario);
    this.controles.identificador_contribuyente.setValue(this.comprobacion_header.identificador_compania);
    this.controles.identificador_corporativo.setValue(this.usuario.identificador_corporativo);
    this.controles.id_solicitud.setValue(Number(this.numero_comprobante));
  }

  iniciarFormulario() {
    this.formulario = this.formBuilder.group({
      tipo_comprobante: '',
      tipo_documento_id: 6,
      id_tipo_gasto: 1,
      file: ['', Validators.required],
      fecha_comprobante: ['', Validators.required],
      uuid: ['', Validators.required],
      forma_pago: [this.comprobante.forma_pago, Validators.required],
      moneda: [''],
      razon_social: ['', Validators.required],
      rfc_proveedor: ['XAXX010101000', Validators.required],
      cuenta: ['', Validators.required],
      conceptos: [[]],
      total: '',
      identificador_usuario: '',
      identificador_contribuyente: '',
      identificador_corporativo: '',
      identificador_proveedor: '',
      descripcion: '',
      fecha_comprobante_seleccionada: '',
      observacion: '',
      id_solicitud: 0,
      nacional: true,
      pagado_compania: 0,
      id_moneda: 0,
    });
  }
  obtenerCatalogos() {
    this._servicioCompartido.obtenerFormaPago(this._storageService.getCorporativoActivo().corporativo_identificador).subscribe((data: any) => {
      this.lista_forma_pago = this._globals.prepararSelect2(data, 'id', 'descripcion');
      this.lista_forma_pago = this._globals.agregarSeleccione(this.lista_forma_pago, 'Seleccione forma de pago..');
    });
  }

  submitFormulario(boton) {
    this.comprobante.tipo_cambio = this.comprobacion_header.tipo_cambio;
    this.comprobante.id_moneda = this.comprobacion_header.id_moneda;
    this.comprobante.total = this.total;
    this.comprobante.conceptos = this.tipo_gasto == 11 ? this.controles.conceptos.value.map(x => { x.id_cuenta_agrupacion = this.cuenta_seleccionada; return x }) : this.controles.conceptos.value;
    this.comprobante.fecha_comprobante = this.comprobante.fecha_comprobante_seleccionada;
    this.comprobante.razon_social = this.controles.razon_social.value;
    this.comprobante.rfc_proveedor = this.controles.rfc_proveedor.value;
    this.comprobante.tipo_cambio = this.comprobacion_header.tipo_cambio;
    this.comprobante.id_moneda = this.comprobacion_header.id_moneda;
    this.comprobante.moneda = this.comprobacion_header.moneda;
    this.comprobante.observaciones = this.controles.observacion.value;
    this.onAgregarComprobante.emit(this.comprobante);
  }
  enviarDatos() {
    this.enviarDetalleFactura.emit(this.formulario.value);
  }

  public get controles() { return this.formulario.controls; }

  cargarArchivo(input: any, input_texto: any, tipo?: string) {
    const reader = new FileReader();
    const file = input.currentTarget.files[0];
    if (input.currentTarget.files[0].type.toLowerCase() === 'text/xml') {
      Swal.fire({
        title: '¡Error!',
        text: "Seleccione un archivo con un formato distinto.",
        type: 'warning',
      })
    } else {
      reader.readAsDataURL(file);
      reader.onload = () => {
        const archivo = new FileUpload();
        archivo.file_name = file.name;
        archivo.file_data = reader.result.toString().split(',')[1];
        input_texto.value = archivo.file_name;
        input_texto.placeholder = archivo.file_name;
        this.controles.file.setValue(`${archivo.file_data}|${archivo.file_name}`);
        this.comprobante.file = `${archivo.file_data}|${archivo.file_name}`;
      };
    }
  }

  onFechaSelected(fecha_seleccionada) {
    if (fecha_seleccionada.formatted !== '') {
      const fecha = `${fecha_seleccionada.date.year}-${fecha_seleccionada.date.month < 10 ? ('0' + fecha_seleccionada.date.month) : fecha_seleccionada.date.month}-${fecha_seleccionada.date.day < 10 ? ('0' + fecha_seleccionada.date.day) : fecha_seleccionada.date.day}`;
      // console.log(`${fecha_seleccionada.date.day}/${fecha.date.month}/${fecha.date.year}`);
      this.controles.fecha_comprobante.setValue(fecha);
      this.controles.fecha_comprobante_seleccionada.setValue(fecha);
      this.comprobante.fecha_comprobante = fecha;
    } else {
      this.controles.fecha_comprobante.setValue(null);
      this.comprobante.fecha_comprobante = null;
    }
  }
  onFormaPagoSelect(forma_pago) {
    if (forma_pago.value !== '0') {
      this.controles.forma_pago.setValue(forma_pago.value);
      this.comprobante.forma_pago = forma_pago.value;
    } else {
      this.controles.forma_pago.setValue(null);
      this.comprobante.forma_pago = null;
    }
  }

  onNacionalChange(target: HTMLInputElement) {
    console.log(target.checked);
    this.comprobante.nacional = target.checked ? 1 : 0;
  }

  addConcepto(concepto) {
    this.comprobante.fecha_comprobante = this.controles.fecha_comprobante.value;
    this.comprobante.fecha_comprobante_seleccionada = this.controles.fecha_comprobante.value;
    this.comprobante.uuid = this.controles.uuid.value;
    const cooncepto_aux = this.controles.conceptos.value;
    console.log(concepto);
    cooncepto_aux.push(concepto);

    this.controles.conceptos.setValue(cooncepto_aux);
    this.comprobante.conceptos = cooncepto_aux;
    let total = 0;
    this.controles.conceptos.setValue(this.controles.conceptos.value.map(x => {
      total += Number(x.monto_rembolsar);
      return { ...x, monto: x.importe }
    }));
    this.controles.total.setValue(total);
    this.total = total;
  }

  onChangeConcepto(event: HTMLSelectElement) {
    const id = Number(event.selectedOptions[0].value);
    const seleccionado = this.lista_cuentas.filter(x => x.id == id)[0];
    this.cuenta_seleccionada = seleccionado.id;
    this.calcularMontoDisponible.emit(seleccionado.id);
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

  setCountAnexos(anexos) {
    if (anexos.length > 0) {
      this.controles.uuid.disable();
    } else {
      this.controles.uuid.enable();
    }
    this.counter_anexos = anexos.length;
  }
  public abrirModalAgregarAnexos() {
    $('#modalAnexos').modal('show');
  }
}
