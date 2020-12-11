import { FileUpload } from './../../../documentos_add/clases/file-upload';
import { ComprobacionesGastosService } from './../../comprobaciones-gastos.service';
import { GlobalsComponent } from './../../../../compartidos/globals/globals.component';
import { LoadingService } from './../../../../compartidos/servicios_compartidos/loading.service';
import { CentroCostosService } from './../../../centro-costos/centro-costos.service';
import { CompartidosService } from './../../../../compartidos/servicios_compartidos/compartidos.service';
import { StorageService } from './../../../../compartidos/login/storage.service';
import { ComprobacionGastosHeader } from './../../../../entidades/ComprobacionGastosHeader';
import { Component } from '@angular/core';
import { Usuario, Contribuyente } from 'src/app/entidades';
import { DefaultCFDI } from 'src/app/entidades/cfdi';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { IMyDateModel } from 'mydatepicker';
declare var $: any;

@Component({
  selector: 'app-gastos-viajes-form',
  templateUrl: './gastos-viajes-form.component.html',
  styleUrls: ['./gastos-viajes-form.component.css']
})
export class GastosViajesFormComponent {

  public usuario: Usuario;
  public lista_comprobantes = new Array<DefaultCFDI>();
  public comprobante_papel: boolean = false;
  public documento_cfdi: DefaultCFDI;

  comprobacion = new ComprobacionGastosHeader();
  lista_constribuyentes: Contribuyente[];
  lista_centros_costo: Contribuyente[];
  startValue_contribuyente = '';
  startValue_centros_costo = '';

  formulario: FormGroup;
  formulario_header: FormGroup;

  lista_cuentas = [];
  constructor(private storeageService: StorageService,
    private compartidosService: CompartidosService,
    private centroCostosService: CentroCostosService,
    private loadingService: LoadingService,
    public globals: GlobalsComponent,
    public comprobacionesService: ComprobacionesGastosService
  ) {
    this.usuario = this.storeageService.getDatosIniciales().usuario;
    this.comprobacion.nombre_usuario = `${this.usuario.nombre} ${this.usuario.apellido_paterno} `;
    this.comprobacion.folio_comrpobacion = new Date().getTime();
    this.comprobacion.tipo_gastos = 'Prestación';
    this.formulario = new FormGroup({
      comprobante_papel: new FormControl(false)
    });
    this.iniciarFormularioHeader();
    this.obtenerCatalogos();
  }

  iniciarFormularioHeader() {
    this.formulario_header = new FormGroup({
      usuario: new FormControl({ value: '', disabled: true }, Validators.required),
      folio_comprobacion: new FormControl({ value: '', disabled: true }, Validators.required),
      contribuyente: new FormControl('', Validators.required),
      centro_costos: new FormControl('', Validators.required),
      tipo_gasto: new FormControl({ value: '', disabled: true }, Validators.required),
      monto_reembolsar: new FormControl('', Validators.required),
      recuperable: new FormControl(false, Validators.required),
      motivo: new FormControl('', Validators.required),
    });
  }

  obtenerCatalogos() {
    this.obtenerContribuyente();
    this.obtenerCentrosCosto();
  }

  obtenerContribuyente() {
    this.compartidosService.getAllContribuyentesCorporativo(this.usuario.identificador_corporativo).subscribe((data) => {
      this.lista_constribuyentes = $.map(data, function (obj: any) {
        obj.id = obj.identificador;
        obj.text = `${obj.codigo} - ${obj.nombre}`;
        return obj;
      });
      this.lista_constribuyentes = this.globals.prepararSelect2(data, 'identificador', 'text');
      this.lista_constribuyentes = this.globals.agregarSeleccione(this.lista_constribuyentes, 'Seleccione contribuyente...');

    }, error => {
      console.log(error);
    }, () => {
      if (this.comprobacion.contribuyente) {
        this.startValue_contribuyente = this.comprobacion.contribuyente;
      } else {
        this.startValue_contribuyente = '';
      }
    })
  }
  obtenerCentrosCosto() {
    this.centroCostosService.ObtenerListaCentroCostosMXPorCorporativo(this.usuario.identificador_corporativo, this.usuario.identificador_usuario, Number(this.usuario.rol)).subscribe((data) => {
      this.lista_centros_costo = $.map(data, function (obj: any) {
        obj.id = obj.identificador;
        obj.text = `${obj.codigo} - ${obj.nombre}`;
        return obj;
      });
      this.lista_centros_costo = this.globals.prepararSelect2(data, 'identificador', 'text');
      this.lista_centros_costo = this.globals.agregarSeleccione(this.lista_centros_costo, 'Seleccione contribuyente...');
    }, error => {
      console.log(error);
    }, () => {
      if (this.comprobacion.centro_costos) {
        this.startValue_centros_costo = this.comprobacion.centro_costos;
      } else {
        this.startValue_centros_costo = '';
      }
    })
  }

  cargarArchivo(input: any, input_texto: any, tipo: string) {
    const reader = new FileReader();
    const file = input.currentTarget.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      const archivo = new FileUpload();
      archivo.file_name = file.name;
      archivo.file_data = reader.result.toString().split(',')[1];
      input_texto.value = archivo.file_name;
      input_texto.placeholder = archivo.file_name;
      this.obtenerDetallesXML(archivo);
    };
  }

  obtenerDetallesXML(archivo: FileUpload) {
    this.loadingService.showLoading();
    this.comprobacionesService.obtenerDetallesXML({ xml: archivo.file_data }).subscribe((response: DefaultCFDI) => {
      console.log(response);
      this.documento_cfdi = response;
      this.loadingService.hideLoading();
    }, error => {
      console.error(error);
      this.loadingService.hideLoading();
      this.documento_cfdi = null;
    })
  }

  onTipoDocumentoChange(event) {
    console.log(event);
    this.resetData();
  }

  cerrarModal() {
    this.documento_cfdi = null;
    this.comprobante_papel = null;
    $('#modal_comprobante').modal('hide');
    setTimeout(() => {
      this.comprobante_papel = false;
    }, 100);
  }

  addConcepto() {
    this.lista_comprobantes.push(this.documento_cfdi);
    this.cerrarModal();
  }

  onFehcaSelected(event: IMyDateModel) {
    console.log(event)
  }

  resetData() {
    this.documento_cfdi = null;
  }

  onContribuyenteSelected(dato: any) {
    if (dato.value !== 0) {
      this.comprobacion.contribuyente = dato.value;
      this.headerControls.contribuyente.setValue(this.comprobacion.contribuyente);
    } else {
      this.comprobacion.contribuyente = null;
      this.headerControls.contribuyente.setValue(null);
    }
  }

  onCECOSelected(dato: any) {
    if (dato.value !== 0) {
      this.comprobacion.centro_costos = dato.value;
      this.headerControls.centro_costos.setValue(this.comprobacion.centro_costos);
    } else {
      this.comprobacion.centro_costos = null;
      this.headerControls.centro_costos.setValue(null);
    }
  }

  eliminarConcepto(index: number) {
    this.lista_comprobantes.splice(index, 1);
  }

  public get headerControls(): { [key: string]: AbstractControl; } {
    return this.formulario_header.controls;
  }

}

