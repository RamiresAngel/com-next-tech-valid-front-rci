import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Contribuyente } from 'src/app/entidades/contribuyente';
import { Sucursal } from 'src/app/entidades/sucursal';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { IMyDpOptions } from 'mydatepicker';
import { AcreedorDiverso, CargoNoDedusible } from 'src/app/entidades';
import { FileUpload } from '../../documentos_add/clases/file-upload';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AcreedoresDiversosService } from '../../acreedores-diversos/acreedores-diversos.service';
import swal from 'sweetalert2';
import { ContribuyenteService } from '../../contribuyente/contribuyente.service';
import { Gasto, Comprobacion } from 'src/app/entidades/comprobacion';
import { ComprobacionesGeneralService } from '../../comprobaciones-general/comprobaciones-general.service';
import { CuentasProrateo } from 'src/app/entidades/cargo-no-dedusible';
import { Router } from '@angular/router';
import { CargaDocumentosService } from '../carga-documentos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-carga-documentos-noerp-mx',
  templateUrl: './carga-documentos-noerp-mx.component.html',
  styleUrls: ['./carga-documentos-noerp-mx.component.css']
})
export class CargaDocumentosNoerpMxComponent implements OnInit {

  public tiene_prorrateo: boolean;
  public primer_filtracion = true;
  public monto_factura: number;
  vista_carga: string;
  public txtBtnAgregar = 'Guardar';
  public texo_select = 'Selecciona un concepto';
  lista_contribuyentes: Contribuyente[] = [];
  acreedor_diverso = new AcreedorDiverso();
  lista_sucursales: Sucursal[] = [];
  lista_acreedores: any[] = [];
  public cargado_xml = false;
  public hay_cuenta = false;
  public loading_ceco = false;
  public cargado_pdf = false;
  lista_cuenta_departamento: any[] = [];
  lista_cuenta_seleccionada_prorrateo: any[] = [];
  public cargo_no_facturable = new CargoNoDedusible();
  public lista_departamentos_prorrateo = new Array<any>();
  // public comprobacion = new Comprobacion();
  public comprobado;
  public monto_comprobar;
  moneda_porcentaje: string;
  public gasto = new Gasto();
  // lista_cuenta_departamento: Sucursal[] = [];
  public lista_select = new Array<any>();
  public lista_select_prorrateo = new Array<any>();
  public comprobado_maximo;
  public comprobado_minimo;
  public porcentaje_comprobado;
  public lista_sin_prorrateo;
  public lista_con_prorrateo;
  public es_deducible = true;
  public valor_auxiliar: any;
  prorrateo = false;
  startValue_contribuyente = '';
  public titulo_input = '.XML';
  startValue_sucursal = '';
  startValue_cuenta_departamento = '';
  startValue_acreedor = '';
  public cargando = false;
  public identificador_cuenta: string;
  public identificador_sucursal: string;

  datos_inciales: DatosIniciales;
  corporativo_activo: CorporativoActivo;
  identificador_corporativo: string;

  disableGuardaArchvos = false;
  titulo_carga_pdf = 'Seleccione un pdf';
  titulo_carga_xml = 'Seleccione un xml';
  txtButonGuardarGasto = 'Guardar';
  txtButonGuardarContrabilizar = 'Guardar';

  public fech_ini: any;
  public fech_fin: any;
  public logo_img: any;
  nombre_archivo_xml = 'Seleccionar Archivo.';
  nombre_archivo_pdf = 'Seleccionar Archivo.';

  fecha_inicio_palceholder = 'Desde';
  fecha_fin_palceholder = 'Registro Hasta';
  options_select2: any;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };
  @ViewChild('xml_file') xml_file: ElementRef;
  @ViewChild('pdf_file') pdf_file: ElementRef;
  public fileData = new FileUpload();

  formulario_acreedor: FormGroup;
  si_multiple = false;
  lista_tipo_gasto: any;
  startValue_tipo_gasto = '';
  public lista_constribuyentes: any;
  constructor(
    private _compartidosService: CompartidosService,
    private _storageService: StorageService,
    private _servicioContribuyentes: ContribuyenteService,
    private router: Router,
    private _acreedorDiversoService: CargaDocumentosService,
    private _servicioComprobaciones: ComprobacionesGeneralService,
    public _globals: GlobalsComponent,
    private _servicios_compartidos: CompartidosService
  ) {

  }

  ngOnInit() {
    this.logo_img = localStorage.getItem('logo_login_img') !== null ? localStorage.getItem('logo_login_img') : './assets/img/NEXT_5.png';
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.iniciarFormulario();
    this.cargarEmpresas();
    this.options_select2 = {
      placeholder: 'Seleccione...',
      multiple: true,
      tags: true
    };
    this.vista_carga = this._storageService.getDatosIniciales().funcionalidades.find(o => o.clave === 'VISTA_CARGADOC').valor;
    console.log(this.datos_inciales.usuario.proveedor);
    this.getTiposdeGasto();
    // this.getDepartamentoXCC();
  }

  activarMonedaPorcentaje() {

  }

  obtenerCeco() {
    try {
      this._servicioContribuyentes.obtenerDepartamentoProrrateo(
        this.identificador_cuenta,
        this.acreedor_diverso.identificador_contribuyente, 5,
        this.datos_inciales.usuario.identificador_usuario).subscribe((data: any) => {
          $('#modal-deptos').modal('show');
          this.loading_ceco = false;
        }, error => {
          swal.fire('Atención', 'Ha ocurrido un error. Intentalo nuevamente mas tarde ', 'error');
          this.loading_ceco = false;
        });
    } catch (error) {
      this.loading_ceco = false;
      swal.fire('Atención', 'Ha ocurrido un error. Intentalo nuevamente mas tarde. ', 'error');
    }
  }

  iniciarFormulario() {
    this.formulario_acreedor = new FormGroup({
      empresa: new FormControl('', Validators.required),
      hotel: new FormControl('', Validators.required),
      tipo_gasto: new FormControl('', Validators.required),
      identificador_departamento: new FormControl('', Validators.required),
      acreedor: new FormControl('', this.datos_inciales.usuario.proveedor !== 1 ? Validators.required : null),
      monto_comprobar: new FormControl(''),
      xml: new FormControl('', Validators.required),
      pdf: new FormControl('', Validators.required),
      monto: new FormControl(''),
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

  calcularComprobadoPorcentaje() {

    let aux_monto_comprobado = 0;
    this.monto_comprobar = Number(this.monto_comprobar); // .toFixed(2);
    this.lista_departamentos_prorrateo.forEach(element => {
      const monto = (element.porcentaje * this.monto_comprobar) / 100;
      element.monto = monto; // .toFixed(2);
      aux_monto_comprobado += Number(element.monto);
    });
    this.comprobado = aux_monto_comprobado; // .toFixed(2);
    this.comprobado = Number(Number(this.comprobado).toFixed(2));
    let aux_porcentaje_comprobado = 0;
    this.lista_departamentos_prorrateo.forEach(prorrateo => {
      aux_porcentaje_comprobado += Number(prorrateo.porcentaje);
    });
    this.porcentaje_comprobado = aux_porcentaje_comprobado.toFixed(2);
  }

  cargarEmpresaSAP() {
    this._compartidosService.obtenerContribuyentesProveedorId(this.datos_inciales.usuario.identificador_usuario)
      .subscribe(
        (data: any) => {
          this.lista_contribuyentes = this._globals.prepararSelect2(data, 'identificador_contribuyente', 'contribuyente');
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
          this.lista_contribuyentes = this._globals.prepararSelect2(data, 'identificador', 'nombre', 'codigo_sociedad');
        },
        (error) => {
          console.log(error);
        },
        () => {
        }
      );
  }

  llenarListaSelect() {
    this._servicioContribuyentes.obtenerUsuarioCuentas_by(this.acreedor_diverso.identificador_contribuyente, 5, this.acreedor_diverso.identificador_proveedor).subscribe(
      (data: any) => {
        const aux = data.map(obj => {
          obj.identificador = obj.identificador_cuenta + ':' + obj.identificador_departamento + '|' + obj.deducible;
          obj.texto = obj.cuenta_codigo + ' - ' + obj.cuenta + ' - ' + obj.departamento;
          return obj;
        });
        this.lista_sin_prorrateo = this._globals.prepararSelect2(aux, 'identificador', 'texto');
        this.lista_sin_prorrateo = this._globals.agregarSeleccione(this.lista_sin_prorrateo, 'Selecciona...');
      }
      , (error) => {
        if (error.error) {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        } else {
          swal.fire('Atención', 'Ha ocurrido un error. Intentalo nuevamente mas tarde: ', 'error');
        }
      }
      , () => {
        this.lista_select = this.lista_sin_prorrateo;
      }
    );
    // Cuentas con prorrateo
    this._servicioContribuyentes.obtenerUsuarioCuentas_byProrrateo(this.acreedor_diverso.identificador_contribuyente, 5, this.acreedor_diverso.identificador_proveedor).subscribe(
      (data: any) => {
        const aux = data.map(obj => {
          obj.identificador = obj.identificador_cuenta + '|' + obj.deducible;
          obj.texto = obj.cuenta_codigo + ' - ' + obj.cuenta;
          return obj;
        });
        this.lista_con_prorrateo = this._globals.prepararSelect2(aux, 'identificador', 'texto');
        this.lista_con_prorrateo = this._globals.agregarSeleccione(this.lista_con_prorrateo, 'Selecciona...');
      }
      , (error) => {
        if (error.error) {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        } else {
          swal.fire('Atención', 'Ha ocurrido un error. Intentalo nuevamente mas tarde: ', 'error');
        }
      }
      , () => { }
    );
  }

  cargarHoteles(identificador_contribuyente) {
    this._compartidosService.obtenerSucursalesXCorporativoXContribuyente(this.identificador_corporativo, identificador_contribuyente)
      .subscribe((data: any) => {
        this.lista_sucursales = this._globals.prepararSelect2(data, 'identificador', 'nombre');
        this.lista_sucursales = this._globals.agregarSeleccione(this.lista_sucursales, 'Seleccione Sucursal...');
      }, error => {
        console.log(error);
      },
        () => {
        }
      );
  }


  cargarAcreedores(identificador_contribuyente) {
    // Nota -> Siemrpe va 5 ya que es el id del tipode gasto de acreedores diversos
    this._compartidosService.obtenerAcreedoresTipoGastoIdContribuyente(5, identificador_contribuyente)
      // this._compartidosService.obtenerAcreedoresTipoGastoIdContribuyente(5, this.acreedor_diverso.identificador_proveedor)
      .subscribe((data: any) => {
        this.lista_acreedores = this._globals.prepararSelect2(data, 'identificador', 'nombre');
        this.lista_acreedores = this._globals.agregarSeleccione(this.lista_acreedores, 'Seleccione Proveedor...');
      },
        error => {
          console.log(error);
        }
      );
  }

  cargarAcreedoresNoERP(identificador_contribuyente) {
    this._compartidosService.obtenerAcreedoresContribuyente(identificador_contribuyente).subscribe((data: any) => {
      console.log(data);
      this.lista_acreedores = this._globals.prepararSelect2(data, 'identificador_proveedor', 'proveedor');
      this.lista_acreedores = this._globals.agregarSeleccione(this.lista_acreedores, 'Seleccione Proveedor...');
    },
      error => {
        console.log(error);
      }
    );
  }

  onSucursalSeleccionado(dato) {
    console.log(dato);
    if (dato.value !== '' && dato.value !== '0') {
      // this.filtro.sucursal_identificador = dato.value;
      this.identificador_sucursal = dato.value;
      this.formulario_acreedor.get('hotel').setValue(dato.value);
      this.acreedor_diverso.identificador_sucursal = dato.value;
      this.getDepartamentoXCC(this.acreedor_diverso.identificador_sucursal);
    } else {
      // this.filtro.sucursal_identificador = '';
      this.formulario_acreedor.get('hotel').setValue(null);
      this.lista_constribuyentes ? this.lista_constribuyentes.length = 0 : null;
    }
  }

  actualizarArchivoBtn() {

  }

  onCentaDepartamentoSelect(dato: any) {
    if (dato.value !== '' && dato.value !== '0') {
      this.acreedor_diverso.identificador_cuenta = dato.value;
      this.formulario_acreedor.get('empresa').setValue(dato.value);
    } else {
      this.acreedor_diverso.identificador_cuenta = '';
    }
  }

  onAcreedorSeleccionado(dato: any) {
    if (dato.value !== '' && dato.value !== '0') {
      // this.filtro.sucursal_identificador = dato.value;
      this.formulario_acreedor.get('acreedor').setValue(dato.value);
      this.acreedor_diverso.identificador_proveedor = dato.value;
      this.llenarListaSelect();
    } else {
      this.acreedor_diverso.identificador_proveedor = '';
      this.formulario_acreedor.get('acreedor').setValue(null);
    }
  }

  onContribuyenteSelected(dato) {
    if (dato.value !== null && dato.value !== '0') {
      this.acreedor_diverso.identificador_contribuyente = dato.value;
      this.cargo_no_facturable.identificador_contribuyente = dato.value;
      this.formulario_acreedor.get('empresa').setValue(dato.value);
      console.log(dato);
      this.cargarHoteles(dato.value);
      if (this.datos_inciales.usuario.proveedor !== 1) {
        if (this.vista_carga === 'carga_doc_no_erp') {
          this.cargarAcreedoresNoERP(dato.value);
        } else {
          this.cargarAcreedores(dato.value);
        }
      } else {
        this.acreedor_diverso.identificador_proveedor = this.datos_inciales.usuario.identificador_proveedor;
      }
      if (this.primer_filtracion) {
        this.primer_filtracion = false;
      }
    } else {
      this.formulario_acreedor.get('empresa').setValue(null);
      this.lista_sucursales = [];
      this.lista_acreedores = [];
    }

  }

  guardar() {
    this.txtButonGuardarGasto = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.acreedor_diverso.identificador_corporativo = this.identificador_corporativo;
    this.acreedor_diverso.identificador_usuario = this.datos_inciales.usuario.identificador_usuario;
    this.acreedor_diverso.lista_negra = this.datos_inciales.usuario.lista_negra;
    this.acreedor_diverso.pdf = this.gasto.pdf;
    this._acreedorDiversoService.agregarDocumento(this.acreedor_diverso).subscribe((data: any) => {
      // Si la carga fue correcta y las validaciones correctas
      $('#modal-deptos').modal('hide');
      this.txtButonGuardarGasto = 'Guardar';
      if (data.valid === 1) {
        swal.fire('Éxito', 'Guardado Correctamente', 'success');
        this.router.navigateByUrl('/home/consulta_cfdi');
      } else {  // Si las validaciones no fueron correctas manda a ver validaciones
        swal.fire({
          title: 'Alerta',
          text: 'El documento ha sido cargado.',
          type: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Ver Validación',
          cancelButtonText: 'Aceptar'
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['home', 'validacion', this._storageService.encriptar_ids(String(data.documento_cfdi_id))]);
          } else {
            this.router.navigate(['home', 'consulta_cfdi']);
          }
        });
      }
    }, error => {
      console.log((error));
      this.txtButonGuardarGasto = 'Guardar';
      if (error.error.mensaje) {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      } else {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: Algo salio mal, intentalo nuevamente.', 'error');
      }
      this.txtButonGuardarGasto = 'Guardar';
    });
  }

  guardarConProrrateo() {
    this.acreedor_diverso.cuentas_prorrateo = new Array<CuentasProrateo>();
    // this.acreedor_diverso.identificador_cuenta = this.identificador_cuenta;
    this.acreedor_diverso.identificador_cuenta = this.identificador_cuenta;
    this.acreedor_diverso.identificador_departamento = '';
    this.lista_departamentos_prorrateo.forEach(cuenta => {
      if (Number(cuenta.monto) > 0) {
        const cuenta_prorrateo = new CuentasProrateo();
        cuenta_prorrateo.importe_asignado = cuenta.monto;
        cuenta_prorrateo.porcentaje_asignado = cuenta.porcentaje;
        cuenta_prorrateo.id_cuenta_agrupacion = cuenta.id_cuenta_agrupacion;
        cuenta_prorrateo.ceco = cuenta.ceco;
        // cuenta_prorrateo.ceco = this.acreedor_diverso.ceco;
        cuenta_prorrateo.preliminar_detalle_id = 0;
        // cuenta_prorrateo.id_cuenta_agrupacion = cuenta.identificador_departamento; // poner el id
        this.acreedor_diverso.cuentas_prorrateo.push(cuenta_prorrateo);
        this.acreedor_diverso.prorrateo = 1;
      }
    });
    this.guardar();
  }

  onSelectXMLFile() {
    const reader = new FileReader();
    const file = this.xml_file.nativeElement.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileData.file_name = file.name;
      this.fileData.file_data = reader.result.toString().split(',')[1];
      this.nombre_archivo_xml = file.name;
      this.acreedor_diverso.xml = this.fileData.file_data;
      this.subirArchivos(false);
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
      this.acreedor_diverso.pdf = this.fileData.file_data;
    };
  }

  subirArchivos(guarda: boolean) {
    this.cargo_no_facturable.guardar = 0;
    this.cargo_no_facturable.identificador_corporativo = this.identificador_corporativo;
    this.cargo_no_facturable.pdf = '';
    this.cargo_no_facturable.xml = this.gasto.xml;
    this.cargo_no_facturable.identificador_sucursal = this.acreedor_diverso.identificador_sucursal;
    this.cargo_no_facturable.identificador_proveedor = this.datos_inciales.usuario.identificador_usuario;
    //   else {
    //   this.cargando = true;
    //   this.cargo_no_facturable.monto_no_deducible = this.monto_comprobar;
    //   this._acreedorDiversoService.agregarAcreedorDiverso(this.cargo_no_facturable).subscribe(
    //     (data: any) => {
    //       this.monto_comprobar = data.monto;
    //       this.cargando = false;
    //       if (data.pre_detalle_id) {
    //         swal.fire('Éxito', 'Comprobante cargado correctamente', 'success');
    //         // this.limpiarDatos();
    //       } else {
    //         console.log(data);
    //         swal.fire('Atención', 'Ha ocurrido un error. <br> Intentalo nuevamente: ', 'error');
    //       }
    //     }
    //     , (error) => {
    //       this.cargando = false;
    //       if (error.error) {
    //         swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
    //       } else {
    //         swal.fire('Atención', 'Ha ocurrido un error inesperado, por favor intentalo nuevamente más tarde: ', 'error');
    //       }
    //     }
    //     , () => {
    //       this.cargando = false;
    //     }
    //   );

    // }
  }

  obtenerMontoFactura() {
    this.cargo_no_facturable.guardar = 0;
    this.cargo_no_facturable.identificador_corporativo = this.identificador_corporativo;
    this.cargo_no_facturable.pdf = '';
    this.cargo_no_facturable.xml = this.gasto.xml;
    this.cargo_no_facturable.identificador_sucursal = this.acreedor_diverso.identificador_sucursal;
    this.cargo_no_facturable.identificador_proveedor = this.datos_inciales.usuario.identificador_usuario;
    this.cargo_no_facturable.tipo_movimiento = 7;
    this._servicioComprobaciones.agregarCargoDeducible(this.cargo_no_facturable).subscribe(
      (data: any) => {
        this.monto_comprobar = data.monto;
        this.cargando = false;
      }
      , (error) => {
        this.cargando = false;
        if (error.error) {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        } else {
          swal.fire('Atención', 'Ha ocurrido un error inesperado, por favor intentalo nuevamente más tarde: ', 'error');
        }
      }
      , () => {
        this.cargando = false;
      }
    );
  }

  cargarXml() {
    this.cargado_xml = true;
    const reader1 = new FileReader();
    const file1 = this.xml_file.nativeElement.files[0];
    if (file1 !== undefined && file1.name !== '') {
      reader1.readAsDataURL(file1);
      reader1.onload = () => {
        this.nombre_archivo_xml = file1.name;
        this.gasto.xml = String(reader1.result).split(',')[1];
        this.acreedor_diverso.xml = String(reader1.result).split(',')[1];
        this.subirArchivos(false);
      };
    }
  }

  cargarPdf() {
    this.cargado_pdf = true;
    const reader1 = new FileReader();
    const file1 = this.pdf_file.nativeElement.files[0];
    if (file1 !== undefined && file1.name !== '') {
      reader1.readAsDataURL(file1);
      reader1.onload = () => {
        this.gasto.pdf = String(reader1.result).split(',')[1];
        this.nombre_archivo_pdf = file1.name;
      };
    }
  }

  activarProrrateo(value) {
    value.checked ? this.si_multiple = true : this.si_multiple = false;
    value.checked ? this.texo_select = 'Selecciona cuentas' : this.texo_select = 'Selecciona un concepto';
    if (this.monto_comprobar > 0) {
      if (value.checked) { // lista con prorrateo
        this.lista_select_prorrateo = this.lista_con_prorrateo;
      } else { // lista sin prorrateo
        this.lista_select_prorrateo = this.lista_sin_prorrateo;
      }
    } else {
      swal.fire('Atención', 'Primero debe seleccionar un archivo xml', 'error');
      value.checked = false;
    }
  }
  cuentaSeleccionada(obj: any) {
    console.log(obj);
    if (obj.data.length > 0 && obj.data[0].identificador_departamento && obj.data[0].identificador_departamento !== '') {
      this.acreedor_diverso.identificador_departamento = obj.data[0].identificador_departamento;
    } else {
      this.acreedor_diverso.identificador_departamento = '';
    }
    console.log(this.formulario_acreedor);
    if (obj.value && obj.value.length > 0) {
      this.hay_cuenta = true;
      this.lista_cuenta_seleccionada_prorrateo = [];
      obj.value.forEach(element => {
        const is_true = element.split('|');
        console.log(is_true);
        if (is_true[1] === 'True') {
          this.lista_cuenta_seleccionada_prorrateo.push({ identificador_cuenta: is_true[0] });
        }
      });
      this.formulario_acreedor.get('cuenta').setValue(obj.value);
      if (obj.data && obj.data.length > 0) {
        this.cargo_no_facturable.descripcion_cuenta = obj.data[0].text;
      } else {
        this.cargo_no_facturable.descripcion_cuenta = '';
      }

      this.acreedor_diverso.id_cuenta_agrupacion = 0;
    } else {
      this.hay_cuenta = false;
      // this.prorrateo = false;
      this.formulario_acreedor.get('cuenta').setValue(null);
    }
  }

  obtenerDepartamentosProrrateo() {
    // tslint:disable-next-line:max-line-length
    this._servicioContribuyentes.obtenerDepartamentoProrrateoArrayCuentas(this.acreedor_diverso.identificador_contribuyente, 5, this.acreedor_diverso.identificador_proveedor, this.lista_cuenta_seleccionada_prorrateo, this.identificador_sucursal).subscribe(
      (data: any) => {
        const aux_dep = data.map(obj_depto => {
          obj_depto.clave_departamento = obj_depto.clave_departamento;
          obj_depto.identificador_departamento = obj_depto.identificador_departamento;
          obj_depto.monto = 0;
          obj_depto.porcentaje = 0;
          return obj_depto;
        });
        this.hay_cuenta = true;
        this.loading_ceco = false;
        this.lista_departamentos_prorrateo = aux_dep;


        if (this.lista_departamentos_prorrateo.length > 0) {
          const monto_dividido = (this.monto_comprobar / this.lista_departamentos_prorrateo.length);
          const porcentaje = ((monto_dividido) * this.comprobado) / 100;
          this.lista_departamentos_prorrateo.forEach(element => {
            element.monto = monto_dividido;
            element.porcentaje = porcentaje;
          });
          this.calcularComprobado();
          if (this.identificador_cuenta !== '' &&
            this.acreedor_diverso.identificador_contribuyente !== '' &&
            this.datos_inciales.usuario.identificador_usuario !== '') {
            // this.obtenerCeco();
          } else {
            swal.fire('Atención', 'Seleccione empresa y cuenta para poder continuar.', 'error');
            this.loading_ceco = false;
          }
          $('#modal-deptos').modal(
            { backdrop: 'static', keyboard: false },
            'show');
        } else {
          swal.fire('Atención', 'Esta cuenta no contiene departamentos asociados, por favor contacta con el administrador del sistema', 'error');
          this.loading_ceco = false;
        }

      }
      , (error) => {
        this.loading_ceco = false;
        console.log(error);
      }
      , () => {
        this.loading_ceco = false;
      }

    );
  }

  cuentaSeleccionadaSinProrrateo(obj: any) {
    console.log(obj);
    this.hay_cuenta = false;
    if (obj.data.length > 0 && obj.data[0].identificador_departamento && obj.data[0].identificador_departamento !== '') {
      this.acreedor_diverso.identificador_departamento = obj.data[0].identificador_departamento;
    } else {
      this.acreedor_diverso.identificador_departamento = null;
    }
    console.log(this.formulario_acreedor);
    if (obj.value && obj.value !== '0') {
      // const cuentas = [];
      // // obj.value.forEach(element => {
      const is_true = obj.value.split('|');
      // console.log(is_true);
      if (is_true[1] === 'True') {
        //   cuentas.push({ identificador_cuenta: is_true[0] });
        this.acreedor_diverso.cuenta_deducible = 1;
      } else {
        this.acreedor_diverso.cuenta_deducible = 0;
      }
      // }
      // );
      this.formulario_acreedor.get('cuenta').setValue(obj.value);
      this.cargo_no_facturable.descripcion_cuenta = obj.data[0].text;
      this.acreedor_diverso.id_cuenta_agrupacion = obj.data[0].id_cuenta_agrupacion;
      this.acreedor_diverso.identificador_cuenta = obj.data[0].identificador_cuenta;
    } else {
      this.hay_cuenta = false;
      // this.prorrateo = false;
      this.formulario_acreedor.get('cuenta').setValue(null);
    }
  }


  public cerrarModalDepartamento(): void {
    this.loading_ceco = false;
    $('#modal-deptos').modal('toggle');
  }

  public abrirModalDepartamento(): void {
    this.loading_ceco = true;
    this.obtenerDepartamentosProrrateo();
  }
  calcularComprobado() {
    let aux_comprobado = 0;
    this.lista_departamentos_prorrateo.forEach(prorrateo => {
      aux_comprobado += Number(prorrateo.monto);
    });
    this.comprobado = aux_comprobado.toFixed(2);
    this.comprobado_minimo = Number(this.monto_comprobar) - 0.01;
    this.comprobado_maximo = Number(this.monto_comprobar) + 0.01;
    this.comprobado_minimo = Number(this.comprobado_minimo).toFixed(2);
    this.comprobado_maximo = Number(this.comprobado_maximo).toFixed(2);
    this.comprobado = aux_comprobado.toFixed(2);

    let aux_procentaje_comprobado = 0;
    this.monto_comprobar = Number(this.monto_comprobar).toFixed(2);
    this.lista_departamentos_prorrateo.forEach(element => {
      const porcentaje = (element.monto * 100) / this.monto_comprobar;
      element.porcentaje = porcentaje.toFixed(2);
      aux_procentaje_comprobado += Number(element.porcentaje);
    });
    this.porcentaje_comprobado = aux_procentaje_comprobado.toFixed(2);
    this.comprobado = Number(this.comprobado).toFixed(2);
  }

  getTiposdeGasto() {
    this._servicios_compartidos.obtenerTipoGasto(this.identificador_corporativo).subscribe(
      (data) => {
        this.lista_tipo_gasto = this._globals.prepararSelect2(data, 'id', 'descripcion');
        this.lista_tipo_gasto = this._globals.agregarSeleccione(this.lista_tipo_gasto, 'Seleccione tipo de gasto...');
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
      , () => {
        this.startValue_tipo_gasto = '';
      }
    );
  }

  actualizarTipoGasto(obj: any) {
    console.log(obj);
    if (obj.value !== '' && obj.value !== '0') {
      this.formulario_acreedor.get('tipo_gasto').setValue(obj.value);
      this.acreedor_diverso.tipo_gasto = Number(obj.value);
    } else {
      this.formulario_acreedor.get('tipo_gasto').setValue(null);
      this.acreedor_diverso.tipo_gasto = 0;
    }
  }

  getDepartamentoXCC(identificador_sucursal) {
    this._servicios_compartidos.obtenerDepartamentosXSucursal(identificador_sucursal).subscribe(
      (data) => {
        console.log(data);
        this.lista_constribuyentes = $.map(data, function (obj: any) {
          obj.id = obj.identificador;
          obj.text = `${obj.descripcion}`;
          return obj;
        });
        this.lista_constribuyentes = this._globals.prepararSelect2(data, 'identificador', 'text');
        this.lista_constribuyentes = this._globals.agregarSeleccione(this.lista_constribuyentes, 'Seleccione departamento...');
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
    );
  }

  actualizarDepartamento(obj: any) {
    if (obj.value !== '' && obj.value !== '0') {
      this.formulario_acreedor.get('identificador_departamento').setValue(obj.value);
      this.acreedor_diverso.identificador_departamento = obj.value;
    } else {
      this.formulario_acreedor.get('identificador_departamento').setValue(null);
      this.acreedor_diverso.identificador_departamento = '0';
    }
  }

}
