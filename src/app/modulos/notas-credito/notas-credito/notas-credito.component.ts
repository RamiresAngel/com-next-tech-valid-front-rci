import { CargaDocumentosService } from './../../carga-documentos/carga-documentos.service';
import { CargaDocumento } from './../../carga-documentos/models/carga-documentos.state';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from './../../../compartidos/login/storage.service';
import { CompartidosService } from './../../../compartidos/servicios_compartidos/compartidos.service';
import { FileUpload } from './../../documentos_add/clases/file-upload';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IMyDateModel, IMyDpOptions, MyDatePicker } from 'mydatepicker';
import { CargaDocumentoOC, Usuario } from 'src/app/entidades';
import { Select2Component } from 'ng2-select2';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-notas-credito',
  templateUrl: './notas-credito.component.html',
  styleUrls: ['./notas-credito.component.css']
})
export class NotasCreditoComponent implements OnInit, AfterViewInit {
  @ViewChild('fecha_recepcion') fecha_recepcion: MyDatePicker;
  @ViewChild('selectSucursal') select_sucursal: Select2Component;

  disabledDataPcickerOptions: IMyDpOptions = {}

  public formulario_header: FormGroup;
  public formulario_documentos: FormGroup;

  public lista_sucursales = new Array();
  public lista_contribuyentes = new Array();
  public identificador_corporativo: string;
  public identificador_contribuyente: string;

  public usuario: Usuario;
  public nivel_aprobacion: 1 | 0 = 1;

  fecha_pago: any;
  public carga_documento = new CargaDocumentoOC();

  constructor(
    private sharedService: CompartidosService,
    private cargaDocumentosService: CargaDocumentosService,
    private storageService: StorageService,
    public globals: GlobalsComponent
  ) {
    this.usuario = this.storageService.getDatosIniciales().usuario;
    this.identificador_corporativo = this.usuario.identificador_corporativo;
    this.carga_documento.identificador_corporativo = this.usuario.identificador_corporativo;
    this.carga_documento.identificador_proveedor = this.usuario.identificador_usuario;
    this.carga_documento.tipo_movimiento = 3;
    this.iniciarFormularios();
    this.obtenerCatalogos();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.disabledDataPcickerOptions = { ...this.globals.myDatePickerOptions, componentDisabled: true }
    this.fecha_recepcion.updateDateValue(this.fecha_recepcion.getToday());
    this.controlsHeader.correo.setValue(this.usuario.email);
  }

  iniciarFormularios() {
    this.formulario_header = new FormGroup({
      tipo_documento: new FormControl('', Validators.required),
      sucursal: new FormControl('', Validators.required),
      unidad_responsable: new FormControl('', Validators.required),
      correo: new FormControl({ value: '', disabled: true }, [Validators.required]),
      fecha_recepcion: new FormControl('', Validators.required),
      fecha_pago: new FormControl('', Validators.required),
    });

    this.formulario_documentos = new FormGroup({
      xml: new FormControl('', Validators.required),
      pdf: new FormControl('', Validators.required),
      cuenta_contable: new FormControl('', Validators.required),
      site: new FormControl('', Validators.required),
    });
  }

  obtenerCatalogos(): void {
    this.sharedService.getAllContribuyentesCorporativo(this.identificador_corporativo).subscribe((data: any) => {
      this.lista_contribuyentes = this.lista_contribuyentes.map(contribuyente => { contribuyente.nombre = `${contribuyente.codigo} - ${contribuyente.nombre}`; return contribuyente });
      this.lista_contribuyentes = this.globals.agregarSeleccione(this.globals.prepararSelect2(data, 'identificador', 'nombre'), 'Seleccione Contribuyente...');
    }, err => {
      console.log(err);
      this.lista_contribuyentes.length = 0;
    });
  }

  obtenerSucursales(identificador_contribuyente: string) {
    if (identificador_contribuyente) {
      this.sharedService.obtenerSucursalesXCorporativoXContribuyente(this.identificador_corporativo, identificador_contribuyente).subscribe((data: any) => {
        this.lista_sucursales = this.lista_sucursales.map(sucursal => { sucursal.nombre = `${sucursal.codigo} - ${sucursal.nombre}`; return sucursal });
        this.lista_sucursales = this.globals.prepararSelect2(data, 'identificador', 'nombre');
      }, err => {
        console.log('Error obteniendo las sucursales: ', err);
        this.lista_sucursales.length = 0;
      });
    } else {
      this.lista_sucursales = null;
      setTimeout(() => {
        this.lista_sucursales = [];
      }, 100);
    }
  }

  cargarArchivo(input_archivo: HTMLInputElement, input_txt: HTMLInputElement, tipo: 'xml' | 'pdf') {
    const reader = new FileReader();
    const fileData = new FileUpload();
    const file = input_archivo.files[0];

    reader.readAsDataURL(file);
    reader.onload = () => {
      fileData.file_name = file.name;
      fileData.file_data = reader.result.toString().split(',')[1];
      input_txt.value = file.name;
      console.log(file.name);
      if (tipo == 'xml') {
        console.log('Es Factura XML,', file.name);
        this.carga_documento.xml = fileData.file_data;
      } else {
        console.log('Es Factura PDF,', file.name);
        this.carga_documento.pdf = fileData.file_data;
      }

      // this.amortizacion.pdf = fileData.file_data;
      // this.controls.archivo.setValue(file.name);
      // this.seleccionarArchivo({ nombre: file.name, data: fileData.file_data });
    };
  }

  //#region  Handlers Select2
  onSucursalSeleccionado(data: Select2Component): void {
    console.log(data);
    if (data.value !== '0') {
      this.controlsHeader.sucursal.setValue(data.value)
    }
    else {
      this.controlsHeader.sucursal.setValue(null)
    }
  }
  onContrbiuyenteSeleccionado(data: Select2Component): void {
    console.log(data);
    if (data.value !== '0') {
      this.identificador_contribuyente = data.value.toString();
      this.controlsHeader.unidad_responsable.setValue(data.value);
    } else {
      this.identificador_contribuyente = null;
      this.controlsHeader.unidad_responsable.setValue(null);
    }
    this.obtenerSucursales(this.identificador_contribuyente);
  }
  onFechaRecepcionSelected(data: IMyDateModel, origin: 'fecha_pago' | 'fecha_recepcion'): void {
    if (origin === 'fecha_pago') {
      this.controlsHeader.fecha_pago.setValue(data ? data.formatted : null);
    }
    else if (origin) {
      this.controlsHeader.fecha_recepcion.setValue(data ? data.formatted : null);
    }
  }
  //#endregion

  public get controlsHeader(): { [key: string]: AbstractControl } {
    return this.formulario_header.controls;
  }

  mostrarModal() {
    $('#id_modal').modal('show');
  }

  cargarDocumento() {
    this.carga_documento.identificador_proveedor = this.controlsHeader.unidad_responsable.value;
    this.carga_documento.identificador_sucursal = this.controlsHeader.sucursal.value;
    console.log(this.carga_documento);
    this.cargaDocumentosService.cargarDocumento(this.carga_documento).subscribe((data: any) => {
      console.log(data);
      Swal.fire('Exito', 'Nota de crédito cargada correctamente.', 'success');
    }, error => {
      console.log(error);
      if (error.error.mensaje) {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      } else {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: Algo salio mal, por favor inténtalo de nuevo más tarde.', 'error');
      }
    });
  }

}
