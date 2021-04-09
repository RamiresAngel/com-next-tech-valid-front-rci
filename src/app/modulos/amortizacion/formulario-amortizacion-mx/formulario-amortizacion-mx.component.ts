import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Contribuyente } from 'src/app/entidades/contribuyente';
import { Sucursal } from 'src/app/entidades/sucursal';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { IMyDpOptions } from 'mydatepicker';
import { Amortizacion, CargoNoDedusible } from 'src/app/entidades';
import { FileUpload } from '../../documentos_add/clases/file-upload';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { AmortizacionService } from '../amortizacion.service';
import { ContribuyenteService } from '../../contribuyente/contribuyente.service';
import Swal from 'sweetalert2';
import { ComprobacionesGeneralService } from '../../comprobaciones-general/comprobaciones-general.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-formulario-amortizacion-mx',
  templateUrl: './formulario-amortizacion-mx.component.html',
  styleUrls: ['./formulario-amortizacion-mx.component.css']
})
export class FormularioAmortizacionMxComponent implements OnInit {

  @ViewChild('XML_input') xml_file: ElementRef;
  @ViewChild('PDF_input') pdf_file: ElementRef;
  @Input() mostrar_btn;
  public mostrar_detalles = false;
  public fech_ini: any;
  public fech_fin: any;
  public detalle_periodos: any;
  public cargo_no_facturable = new CargoNoDedusible();
  public cargando: boolean;
  public monto_comprobar: string;

  public lista_select = new Array<any>();
  public lista_sin_prorrateo;
  public lista_con_prorrateo;
  fecha_inicio_palceholder = 'Desde';
  fecha_fin_palceholder = 'Registro Hasta';
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };
  formulario_amortizacion: FormGroup;
  public fileData = new FileUpload();
  nombre_archivo_xml = 'Seleccione un archivo';
  nombre_archivo_pdf = 'Seleccione un archivo';
  lista_contribuyentes: Contribuyente[] = [];
  lista_sucursales: Sucursal[] = [];
  lista_acreedores: Sucursal[] = [];
  lista_cuenta_departamento: Sucursal[] = [];

  startValue_contribuyente = '';
  startValue_sucursal = '';
  startValue_cuenta_departamento = '';
  startValue_acreedor = '';
  prorrateo = false;

  datos_inciales: DatosIniciales;
  corporativo_activo: CorporativoActivo;

  disableGuardaArchvos = false;
  titulo_carga_pdf = 'Seleccione un pdf';
  titulo_carga_xml = 'Seleccione un xml';
  public txtButonGuardarGasto = 'Guardar Gasto';
  public txtButonGuardarContrabilizar = 'Guardar y Contabilizar';
  public btnContinuar = 'Continuar';
  amortizacion: Amortizacion;
  identificador_corporativo: string;

  constructor(
    private _compartidosService: CompartidosService,
    private _servicioContribuyentes: ContribuyenteService,
    private _storageService: StorageService,
    private _amortizacionService: AmortizacionService,
    private _servicioComprobaciones: ComprobacionesGeneralService,
    public _globals: GlobalsComponent,
    public router: Router
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
    this.amortizacion = new Amortizacion();
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.cargarEmpresas();
  }

  iniciarFormulario() {
    this.formulario_amortizacion = new FormGroup({
      empresa: new FormControl('', Validators.required),
      hotel: new FormControl('', Validators.required),
      acreedor: new FormControl('', Validators.required),
      cuenta: new FormControl('', Validators.required),
      fecha_inicio: new FormControl('', Validators.required),
      fecha_fin: new FormControl('', Validators.required),
      xml: new FormControl('', Validators.required),
      pdf: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required)
    });
  }

  cargarEmpresas() {
    const usr = this.datos_inciales.usuario;
    if (usr.acreedor === 1 || usr.proveedor === 1) {
      this.cargarEmpresaSAP();
    } else {
      this.cargarEmpresaPortal();
    }
  }
  cargarEmpresaSAP() {
    this._compartidosService.obtenerContribuyentesProveedorId(this.datos_inciales.usuario.identificador_usuario)
      .subscribe(
        (data: any) => {
          this.lista_contribuyentes = this._globals.prepararSelect2(data, 'identificador_contribuyente', 'contribuyente');
          this.lista_contribuyentes = this._globals.agregarSeleccione(this.lista_contribuyentes, 'Seleccione Empresa...');
        },
        (error) => {
          console.log(error);
        },
        () => {
        }
      );
  }

  cargarEmpresaPortal() {
    this._compartidosService.obtenerEmpresasIdCorporativoIdUsuario(this.corporativo_activo.corporativo_identificador, this.datos_inciales.usuario.identificador_usuario)
      .subscribe(
        (data: any) => {
          this.lista_contribuyentes = this._globals.prepararSelect2(data, 'identificador', 'nombre');
          this.lista_contribuyentes = this._globals.agregarSeleccione(this.lista_contribuyentes, 'Seleccione Empresa...');
        },
        (error) => {
          console.log(error);
        },
        () => {
        }
      );

  }

  cargarHoteles(identificador_contribuyente) {
    this._compartidosService.obtenerSucursalesXCorporativoXContribuyente(this.identificador_corporativo, identificador_contribuyente)
      .subscribe((data: any) => {
        this.lista_sucursales = this._globals.prepararSelect2(data, 'identificador', 'nombre');
        this.lista_sucursales = this._globals.agregarSeleccione(this.lista_sucursales, 'Seleccione Hotel...');
      }, error => {
        console.log(error);
      },
        () => {
        }
      );
  }


  cargarAcreedores(identificador_contribuyente) {
    // Nota -> Siemrpe va 6 ya que es el id del tipode gasto de amortizacion
    this._compartidosService.obtenerAcreedoresTipoGastoIdContribuyente(6, identificador_contribuyente)
      .subscribe((data: any) => {
        this.lista_acreedores = this._globals.prepararSelect2(data, 'identificador', 'nombre');
        this.lista_acreedores = this._globals.agregarSeleccione(this.lista_acreedores, 'Seleccione Acreedor...');
      },
        error => {
          console.log(error);
        }
      );
  }
  llenarListaSelect(identificador_contribuyente, identificador_proveeor) {
    this._servicioContribuyentes.obtenerUsuarioCuentas_by(identificador_contribuyente, 6, identificador_proveeor).subscribe(
      (data: any) => {
        const aux = data.map(obj => {
          obj.identificador = obj.identificador_cuenta;
          obj.texto = obj.cuenta + ' - ' + obj.departamento;
          return obj;
        });
        this.lista_sin_prorrateo = this._globals.prepararSelect2(aux, 'identificador', 'texto');
        this.lista_sin_prorrateo = this._globals.agregarSeleccione(this.lista_sin_prorrateo, 'Selecciona...');
      }
      , (error) => {
        if (error.error) {
          Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        } else {
          Swal.fire('Atención', 'Ha ocurrido un error. Intentalo nuevamente mas tarde: ', 'error');
        }
      }
      , () => {
        this.lista_select = this.lista_sin_prorrateo;
      }
    );

  }

  onFechaDesdeAmortizacion(dato) {
    // console.log(dato);
    if (dato.value !== '') {
      // this.filtro.fecha_creacion_desde = dato.jsdate;
      this.formulario_amortizacion.get('fecha_inicio').setValue(dato.jsdate);
      this.mostrar_detalles = false;
      this.amortizacion.fecha_inicio = dato.formatted;
    } else {
      // this.filtro.fecha_creacion_desde = '';
      this.formulario_amortizacion.get('fecha_inicio').setValue(null);
    }
  }
  onFechahastaAmortizacion(dato) {
    // console.log(dato);
    if (dato.value !== '') {
      this.amortizacion.fecha_fin = dato.formatted;
      this.mostrar_detalles = false;
      // this.filtro.fecha_creacion_hasta = dato.jsdate;
    } else {
      this.formulario_amortizacion.get('fecha_fin').setValue(null);
      // this.filtro.fecha_creacion_hasta = '';
    }
  }


  actualizarArchivoBtn() {

  }

  onCuentaDptoSeleccionado(obj) {
    console.log(obj);

    if (obj.value !== '' && obj.value !== '0') {
      this.amortizacion.id_cuenta_agrupacion = obj.value;
      this.amortizacion.identificador_departamento = obj.data[0].identificador_departamento;
      this.formulario_amortizacion.get('cuenta').setValue(obj.value);
    } else {
      this.formulario_amortizacion.get('cuenta').setValue(null);
    }
  }

  onSelectXMLFile() {
    const reader = new FileReader();
    this.mostrar_detalles = false;
    const file = this.xml_file.nativeElement.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileData.file_name = file.name;
      this.fileData.file_data = reader.result.toString().split(',')[1];
      this.nombre_archivo_xml = file.name;
      //  Agregar a la entidad
      // this.formulario_amortizacion.get('xml').setValue('Cargado');
      this.amortizacion.xml = this.fileData.file_data;
    };
  }
  onSelectPDFFile() {
    const reader = new FileReader();
    const file = this.pdf_file.nativeElement.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileData.file_name = file.name;
      this.fileData.file_data = reader.result.toString().split(',')[1];
      this.nombre_archivo_pdf = file.name;
      //  Agregar a la entidad
      this.formulario_amortizacion.get('pdf').setValue('Cargado');
      this.amortizacion.pdf = this.fileData.file_data;
    };
  }

  onContribuyenteSelected(dato) {
    if (dato.value !== null && dato.value !== '0') {
      console.log(dato);
      this.formulario_amortizacion.get('empresa').setValue(dato.value);
      this.amortizacion.identificador_contribuyente = dato.value;
      this.cargarHoteles(dato.value);
      this.cargarAcreedores(dato.value);
    } else {
      this.formulario_amortizacion.get('empresa').setValue(null);
      this.lista_sucursales = [];
      this.lista_acreedores = [];
    }
    // if (dato.value !== '' && dato.value !== '0') {
    //   this.filtro.contributente_identificador = dato.value;
    // } else {
    //   this.filtro.contributente_identificador = '';
    // }
  }
  onSucursalSeleccionado(dato) {
    console.log(dato);
    if (dato.value !== '' && dato.value !== '0') {
      // this.filtro.sucursal_identificador = dato.value;
      this.formulario_amortizacion.get('hotel').setValue(dato.value);
      this.amortizacion.identificador_sucursal = dato.value;
    } else {
      // this.filtro.sucursal_identificador = '';
      this.formulario_amortizacion.get('hotel').setValue(null);
    }
  }

  onAcreedorSeleccionado(dato: any) {
    if (dato.value !== '' && dato.value !== '0') {
      // this.filtro.sucursal_identificador = dato.value;
      this.formulario_amortizacion.get('acreedor').setValue(dato.value);
      this.amortizacion.identificador_proveedor = dato.value;
      this.llenarListaSelect(this.amortizacion.identificador_contribuyente, dato.value);
    } else {
      this.formulario_amortizacion.get('acreedor').setValue(null);
      // this.filtro.sucursal_identificador = '';
    }
  }
  guardar() {
    this.txtButonGuardarGasto = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    console.log(this.amortizacion);
    console.log(this.formulario_amortizacion);
    this.amortizacion.identificador_corporativo = this.identificador_corporativo;
    this.amortizacion.identificador_usuario = this.datos_inciales.usuario.identificador_usuario;
    this.amortizacion.lista_negra = this.datos_inciales.usuario.lista_negra;
    this.amortizacion.tipo_movimiento = 8;
    this.amortizacion.id_tipo_gasto = 6;
    this._amortizacionService.crearAmortizacion(this.amortizacion).subscribe((data: any) => {
      this.txtButonGuardarGasto = 'Guardar Gasto';
      Swal.fire('Éxito', 'Guardado Correctamente', 'success');
      this.router.navigateByUrl('/home/amortizacion');
    }, error => {
      console.log(error);
      this.txtButonGuardarGasto = 'Guardar Gasto';
      if (error.error) {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      } else {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: <br> Por favor vuelve a intentarlo.', 'error');
      }
    });
  }

  obtenerPeriodos() {
    console.log(this.formulario_amortizacion);

    this.subirArchivos(false);
  }

  subirArchivos(guarda: boolean) {
    this.btnContinuar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.cargando = true;
    this.cargo_no_facturable.guardar = 0;
    this.cargo_no_facturable.identificador_corporativo = this.identificador_corporativo;
    guarda ? this.cargo_no_facturable.pdf = this.amortizacion.pdf : this.cargo_no_facturable.pdf = '';
    this.cargo_no_facturable.xml = this.amortizacion.xml;
    this.cargo_no_facturable.identificador_sucursal = this.amortizacion.identificador_sucursal;
    this.cargo_no_facturable.identificador_proveedor = this.datos_inciales.usuario.identificador_usuario;
    this.cargo_no_facturable.tipo_movimiento = 4;
    this.cargo_no_facturable.monto_solicitud = 0;
    this.cargo_no_facturable.monto_no_deducible = 0;
    this._servicioComprobaciones.agregarCargoDeducible(this.cargo_no_facturable).subscribe(
      (data: any) => {
        this.btnContinuar = 'Continuar';
        this.monto_comprobar = data.monto;
        this.cargando = false;
        this._amortizacionService.obtenerMontosPeriodo(this.amortizacion.fecha_inicio, this.amortizacion.fecha_fin, this.monto_comprobar)
          .subscribe((doto: any) => {
            console.log(doto);
            this.detalle_periodos = doto.periodos;
            $('#modal-periodos-amortizacion').modal('show');
            this.btnContinuar = 'Continuar';
            this.mostrar_detalles = true;
          }, err => {
            console.log(err);
            this.btnContinuar = 'Continuar';
          });
      }
      , (error) => {
        this.cargando = false;
        this.btnContinuar = 'Continuar';
        if (error.error) {
          Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        } else {
          Swal.fire('Atención', 'Ha ocurrido un error inesperado, por favor intentalo nuevamente más tarde: ', 'error');
        }
      }
      , () => {
        this.cargando = false;
      }
    );
  }

  verDetalles() {
    $('#modal-periodos-amortizacion').modal('show');
  }

}
