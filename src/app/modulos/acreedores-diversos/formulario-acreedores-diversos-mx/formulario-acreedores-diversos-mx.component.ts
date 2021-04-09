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
import { AcreedoresDiversosService } from '../acreedores-diversos.service';
import swal from 'sweetalert2';
import { ContribuyenteService } from '../../contribuyente/contribuyente.service';
import { Gasto, Comprobacion } from 'src/app/entidades/comprobacion';
import { ComprobacionesGeneralService } from '../../comprobaciones-general/comprobaciones-general.service';
import { CuentasProrateo } from 'src/app/entidades/cargo-no-dedusible';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-formulario-acreedores-diversos-mx',
  templateUrl: './formulario-acreedores-diversos-mx.component.html',
  styleUrls: ['./formulario-acreedores-diversos-mx.component.css']
})
export class FormularioAcreedoresDiversosMxComponent implements OnInit {

  public tiene_prorrateo: boolean;
  public primer_filtracion = true;
  public monto_factura: number;

  public txtBtnAgregar = 'Guardar';
  public texo_select = 'Selecciona un concepto';
  public fileData = new FileUpload();
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
  txtButonGuardarGasto = 'Guardar Gasto';
  txtButonGuardarContrabilizar = 'Guardar y Contabilizar';

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

  formulario_acreedor: FormGroup;
  si_multiple = false;

  constructor(
    private _compartidosService: CompartidosService,
    private _storageService: StorageService,
    private _servicioContribuyentes: ContribuyenteService,
    private router: Router,
    private _acreedorDiversoService: AcreedoresDiversosService,
    private _servicioComprobaciones: ComprobacionesGeneralService,
    public _globals: GlobalsComponent
  ) { }

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
  }

  activarMonedaPorcentaje() {

  }

  obtenerCeco() {
    try {
      this._servicioContribuyentes.obtenerDepartamentoProrrateo(
        this.identificador_cuenta,
        this.acreedor_diverso.identificador_contribuyente, 5,
        this.datos_inciales.usuario.identificador_usuario).subscribe((data: any) => {
          console.log(data);
          $('#modal-deptos').modal('show');
          this.loading_ceco = false;
        }, error => {
          console.log(error);
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
      acreedor: new FormControl('', Validators.required),
      monto_comprobar: new FormControl(''),
      xml: new FormControl('', Validators.required),
      pdf: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      prorrateo: new FormControl(''),
      cuenta: new FormControl('', Validators.required),
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
      console.log(this.monto_comprobar);
      const monto = (element.porcentaje * this.monto_comprobar) / 100;
      element.monto = monto; // .toFixed(2);
      console.log(monto);
      aux_monto_comprobado += Number(element.monto);
    });
    this.comprobado = aux_monto_comprobado; // .toFixed(2);
    this.comprobado = Number(Number(this.comprobado).toFixed(2));
    console.log(this.comprobado);
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
          // this.lista_contribuyentes = this._globals.agregarSeleccione(this.lista_contribuyentes, 'Seleccione Empresa...');
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
          // this.lista_contribuyentes = this._globals.agregarSeleccione(this.lista_contribuyentes, 'Seleccione Empresa...');
        },
        (error) => {
          console.log(error);
        },
        () => {
        }
      );
  }
  comprobarProrrateo() {
    this.acreedor_diverso.cuentas_prorrateo = new Array<CuentasProrateo>();
    if (this.prorrateo) {
      // this.acreedor_diverso.identificador_cuenta = this.identificador_cuenta;
      this.acreedor_diverso.identificador_cuenta = this.identificador_cuenta;
      this.lista_departamentos_prorrateo.forEach(cuenta => {
        if (Number(cuenta.monto) > 0) {
          const cuenta_prorrateo = new CuentasProrateo();
          cuenta_prorrateo.importe_asignado = cuenta.monto;
          cuenta_prorrateo.porcentaje_asignado = cuenta.porcentaje;
          // cuenta_prorrateo.ceco = this.acreedor_diverso.ceco;
          cuenta_prorrateo.preliminar_detalle_id = 0;
          cuenta_prorrateo.id_cuenta_agrupacion = cuenta.identificador_departamento; // poner el id
          this.acreedor_diverso.cuentas_prorrateo.push(cuenta_prorrateo);
          this.acreedor_diverso.prorrateo = 1;
        }
      });
    } else {
      this.acreedor_diverso.cuentas_prorrateo = null;
      // this.acreedor_diverso.ceco = this.comprobacion.ceco;
      this.acreedor_diverso.prorrateo = 0;
    }

    // this.subirArchivos(true);
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
        this.lista_sucursales = this._globals.agregarSeleccione(this.lista_sucursales, 'Seleccione Hotel...');
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
        this.lista_acreedores = this._globals.agregarSeleccione(this.lista_acreedores, 'Seleccione Acreedor...');
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
    } else {
      // this.filtro.sucursal_identificador = '';
      this.formulario_acreedor.get('hotel').setValue(null);
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
      this.cargarAcreedores(dato.value);
      if (this.primer_filtracion) {
        this.primer_filtracion = false;
      }
    } else {
      this.formulario_acreedor.get('empresa').setValue(null);
      this.lista_sucursales = [];
      this.lista_acreedores = [];
    }
    // if (dato.value !== '' && dato.value !== '0') {
    //   this.filtro.contributente_identificador = dato.value;
    // } else {
    //   this.filtro.contributente_identificador = '';
    // }
  }

  guardar() {
    this.txtButonGuardarGasto = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    // this.prorrateo;
    console.log(this.acreedor_diverso);
    this.acreedor_diverso.tipo_movimiento = 7;
    this.acreedor_diverso.id_tipo_gasto = 5;
    this.acreedor_diverso.identificador_corporativo = this.identificador_corporativo;
    this.acreedor_diverso.lista_negra = this.datos_inciales.usuario.lista_negra;
    // this.acreedor_diverso.identificador_proveedor = this.acreedor_diverso.identificador_proveedor; // this.datos_inciales.usuario.identificador_usuario;
    this.acreedor_diverso.identificador_usuario = this.datos_inciales.usuario.identificador_usuario;
    this.acreedor_diverso.pdf = this.gasto.pdf;
    // console.log(this.acreedor_diverso);
    this._acreedorDiversoService.agregarAcreedorDiverso(this.acreedor_diverso).subscribe((data: any) => {
      // console.log(data);
      $('#modal-deptos').modal('hide');
      // this.cerrarModalDepartamento();
      swal.fire('Éxito', 'Guardado Correctamente', 'success');
      this.txtButonGuardarGasto = 'Guardar Gasto';
      this.router.navigateByUrl('/home/acreedores_diversos');
    }, error => {
      console.log((error));
      if (error.error.mensaje) {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      } else {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: Algo salio mal, intentalo nuevamente.', 'error');
      }
      this.txtButonGuardarGasto = 'Guardar Gasto';
    });
  }

  guardarConProrrateo() {
    this.acreedor_diverso.cuentas_prorrateo = new Array<CuentasProrateo>();
    // this.acreedor_diverso.identificador_cuenta = this.identificador_cuenta;
    this.acreedor_diverso.identificador_cuenta = this.identificador_cuenta;
    this.acreedor_diverso.lista_negra = this.datos_inciales.usuario.lista_negra;
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

    console.log(this.acreedor_diverso);
    console.log(this.cargo_no_facturable);

    this.cargo_no_facturable.guardar = 0;
    this.cargo_no_facturable.identificador_corporativo = this.identificador_corporativo;
    this.cargo_no_facturable.pdf = '';
    this.cargo_no_facturable.xml = this.gasto.xml;
    this.cargo_no_facturable.identificador_sucursal = this.acreedor_diverso.identificador_sucursal;
    this.cargo_no_facturable.identificador_proveedor = this.datos_inciales.usuario.identificador_usuario;
    this.cargo_no_facturable.tipo_movimiento = 7;
    if (this.es_deducible) {
      this.cargando = true;
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
            swal.fire('Atención', 'Ha ocurrido un error inesperado, por favor intente de nuevo con otro archvio.', 'error');
          }
        }
        , () => {
          this.cargando = false;
        }
      );
    } else {
      this.cargando = true;
      this.cargo_no_facturable.monto_no_deducible = this.monto_comprobar;
      this._acreedorDiversoService.agregarAcreedorDiverso(this.cargo_no_facturable).subscribe(
        (data: any) => {
          this.monto_comprobar = data.monto;
          this.cargando = false;
          if (data.pre_detalle_id) {
            swal.fire('Éxito', 'Comprobante cargado correctamente', 'success');
            // this.limpiarDatos();
          } else {
            console.log(data);
            swal.fire('Atención', 'Ha ocurrido un error. <br> Intentalo nuevamente: ', 'error');
          }
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
}
