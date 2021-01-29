import { FileUpload } from './../../../documentos_add/clases/file-upload';
import { ComprobacionesGastosService } from './../../comprobaciones-gastos.service';
import { GlobalsComponent } from './../../../../compartidos/globals/globals.component';
import { LoadingService } from './../../../../compartidos/servicios_compartidos/loading.service';
import { CentroCostosService } from './../../../centro-costos/centro-costos.service';
import { CompartidosService } from './../../../../compartidos/servicios_compartidos/compartidos.service';
import { StorageService } from './../../../../compartidos/login/storage.service';
import { ComprobacionGastosHeader } from './../../../../entidades/ComprobacionGastosHeader';
import { Component } from '@angular/core';
import { Contribuyente, Usuario } from 'src/app/entidades';
import { DefaultCFDI } from 'src/app/entidades/cfdi';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { IMyDateModel } from 'mydatepicker';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-otros-gastos-form',
  templateUrl: './otros-gastos-form.component.html',
  styleUrls: ['./otros-gastos-form.component.css']
})
export class OtrosGastosFormComponent {

  public usuario: Usuario;
  public lista_comprobantes = new Array<DefaultCFDI>();
  public comprobante_papel: boolean = false;
  public documento_cfdi: DefaultCFDI;

  comprobacion: any;
  lista_constribuyentes: Contribuyente[];
  lista_centros_costo: Contribuyente[];
  startValue_contribuyente = '';
  startValue_centros_costo = '';

  formulario: FormGroup;
  formulario_header: FormGroup;

  /* tabla Lista de otros gastos */
  public opcionesDt = {
    ordering: false,
    dom: 'lrtip',
    scrollX: true,

    oLanguage: {
      'sProcessing': '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>',
      'sLengthMenu': 'Mostrar _MENU_',
      'sZeroRecords': 'No se encontraron resultados',
      'sEmptyTable': 'Ningún dato disponible en esta tabla',
      'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
      'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
      'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
      'sInfoPostFix': '',
      'sSearch': 'Buscar:',
      'sUrl': '',
      'sInfoThousands': '',
      'sLoadingRecords': '<img src="assets/img/iconoCargando.gif" alt="">',
      'copy': 'Copiar',
      'oPaginate': {
        'sFirst': 'Primero',
        'sLast': 'Último',
        'sNext': 'Siguiente',
        'sPrevious': 'Anterior'
      },
      'oAria': {
        'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
        'sSortDescending': ': Activar para ordenar la columna de manera descendente'
      }
    }
  };

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
    this.comprobacion.folio_comprobacion = new Date().getTime();
    this.comprobacion.tipo_gastos = 'Prestación';
    this.formulario = new FormGroup({
      comprobante_papel: new FormControl(false)
    });
    this.iniciarFormularioHeader();
    this.obtenerCatalogos();
    this.tablaListOtrosGastos();
  }

  tablaListOtrosGastos() {
    setTimeout(() => {
      $('#tabla_otros_gastos_rci').DataTable(this.opcionesDt);
    }, 1000);
  }

  modalDetalle() {
    $('#modal_detalle').modal('toggle');
  }

  iniciarFormularioHeader() {
    this.formulario_header = new FormGroup({
      usuario: new FormControl('', Validators.required),
      compania: new FormControl({ value: '', disabled: true }, Validators.required),
      centro_costos: new FormControl({ value: '', disabled: true }, Validators.required),
      tipo_gasto: new FormControl({ value: '', disabled: true }, Validators.required),
      aprobador: new FormControl('', Validators.required),
      moneda: new FormControl({ value: '', disabled: true }, Validators.required), /* modificar lo de select contribuyente  */
      monto_reembolsar: new FormControl('', Validators.required),
      destino: new FormControl('', Validators.required),
      motivo: new FormControl('', Validators.required),
      recuperable: new FormControl(false, Validators.required),
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

  guardar() {
    swal.fire('Éxito', 'Guardado Correctamente', 'success');
  }

  enviar() {
    swal.fire('Éxito', 'Envido Correctamente', 'success');
  }

}
