import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from './../../../compartidos/login/storage.service';
import { CompartidosService } from './../../../compartidos/servicios_compartidos/compartidos.service';
import { FileUpload } from './../../documentos_add/clases/file-upload';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IMyDateModel, IMyDpOptions, MyDatePicker } from 'mydatepicker';
import { Usuario } from 'src/app/entidades';
import { Select2Component } from 'ng2-select2';
declare var $: any;
@Component({
  selector: 'app-notas-credito',
  templateUrl: './notas-credito.component.html',
  styleUrls: ['./notas-credito.component.css']
})
export class NotasCreditoComponent implements OnInit, AfterViewInit {
  @ViewChild('fecha_recepcion') fecha_recepcion: MyDatePicker;
  @ViewChild('selectSucursal') select_sucursal: Select2Component;

  public formulario_header: FormGroup;
  public formulario_documentos: FormGroup;


  public lista_sucursales = new Array();
  public lista_contribuyentes = new Array();
  public identificador_corporativo: string;
  public identificador_contribuyente: string;


  disabledDataPcickerOptions: IMyDpOptions = {}
  usuario: Usuario;
  // Variable para Fechas
  fecha_pago: any;

  constructor(
    private sharedService: CompartidosService,
    private storageService: StorageService,
    public globals: GlobalsComponent
  ) {
    this.usuario = this.storageService.getDatosIniciales().usuario;
    this.identificador_corporativo = this.usuario.identificador_corporativo;
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
      Sucursal: new FormControl('', Validators.required),
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
      } else {
        console.log('Es Factura PDF,', file.name);
      }

      // this.amortizacion.pdf = fileData.file_data;
      // this.controls.archivo.setValue(file.name);
      // this.seleccionarArchivo({ nombre: file.name, data: fileData.file_data });
    };
  }

  //#region  Handlers Select2
  onSucursalSeleccionado(data: any): void {
    console.log(data);
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

}
