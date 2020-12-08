import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { GastosViaje } from 'src/app/entidades/gastos-viaje';
import { Sucursal } from 'src/app/entidades/sucursal';
import { Contribuyente } from 'src/app/entidades/contribuyente';
import { Departamento } from 'src/app/entidades/Departamento';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CentroCostos } from 'src/app/entidades/centro-costos';
import { SolicitudAnticipoGastoViaje } from 'src/app/entidades/solicitud-anticipo-gastos-viaje';
import { Moneda } from 'src/app/entidades/flujo-aprobacion';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { FileUpload } from 'src/app/modulos/documentos_add/clases/file-upload';
import { DepartamentoService } from 'src/app/modulos/departamento/departamento.service';
import { CentroCostosService } from 'src/app/modulos/centro-costos/centro-costos.service';
import { ContribuyenteService } from 'src/app/modulos/contribuyente/contribuyente.service';
import { GastosViajeService } from '../../gastos-viaje.service';
import Swal from 'sweetalert2';
import { renderEmbeddedTemplate } from '@angular/core/src/render3/instructions';
@Component({
  selector: 'app-form-solicitudes-mx',
  templateUrl: './form-solicitudes-mx.component.html',
  styleUrls: ['./form-solicitudes-mx.component.css']
})
export class FormSolicitudesMxComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };

  lista_archivos = new Array<Archivos>();
  lista_archivos_envio = [];
  lista_cuentas: any[];
  guardado: any;

  // Initialized to specific date (09.10.2018).
  public model: any = { date: { year: 2018, month: 10, day: 9 } };

  @ViewChild('otrosInput') inputArchivo: ElementRef;
  public fileData = new FileUpload();
  public titulo = 'Agregar Nueva Solicitud de Viaje';
  public solicitudAnticiposGastosViaje = new SolicitudAnticipoGastoViaje();
  public formularioAnticiposGeneral: FormGroup;
  public txtBtnGuardar = 'Guardar';
  public lista_empresas = new Array<any>();
  public lista_hoteles = new Array<any>();
  public _servicios_compartidos: any;
  public startValue_empresas: any;
  public startValue_hoteles: any;
  public lista_repercutir = Array<any>();
  public startValue_repercutir: any;
  public startValue_contribuyente: string;
  public startValue_sucursal: string;
  public startValue_departamento: string;
  public startValue_centro_consumo: string;
  public startValue_moneda: string;
  public disableValida = true;
  public titulocarga = 'Selecciona un archivo';
  public disableGuardaArchvos = false;
  public anticipo = false;
  public anticipoMontoAprox = true;
  public fileArchivo = {
    name: ''
  };
  datos_inciales: DatosIniciales;
  lista_sucursales: Sucursal[];
  lista_contribuyentes: Contribuyente[];
  lista_departamento: Departamento[];
  lista_centro_consumo: CentroCostos[];
  lista_moneda: any[];

  private datos_iniciales: DatosIniciales;
  private corporativo_activo: CorporativoActivo;

  fecha_inicio = 'Fecha inicio';
  fecha_fin = 'Fecha fin';

  formulario_solicitud: FormGroup;

  constructor(
    private _departamentoService: DepartamentoService,
    private _centroConsumoService: CentroCostosService,
    private _contribuyenteService: ContribuyenteService,
    private _storageService: StorageService,
    private _compratidosService: CompartidosService,
    private _router: Router,
    private _gastoViajeService: GastosViajeService,
    private _globals: GlobalsComponent,
    private formBuilder: FormBuilder
  ) {
    this.datos_inciales = this._storageService.getDatosIniciales();
  }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.iniciarFormulario();
    this.obtenerCatalogos(this.corporativo_activo.corporativo_identificador);
  }

  iniciarFormulario() {
    this.formulario_solicitud = this.formBuilder.group({
      contributente_identificador: ['', Validators.required],
      sucursal_identificador: ['', Validators.required],
      identificador_departamento: ['', Validators.required],
      identificador_centro_consumo: [''],
      fecha_inicio_viaje: ['', Validators.required],
      fecha_fin_viaje: ['', Validators.required],
      destino: ['', Validators.required],
      descripcion: ['', Validators.required],
      motivo: ['', Validators.required],

      id_cuenta_agrupacion_gasto_viaje: [''],
      file: [new Array<string>()],
      monto: [0],

      anticipo: false,

      monto_aprox: [0, Validators.required],
      id_moneda: [0, Validators.required],
      moneda: ['', Validators.required],

      usuario_identificador: [this.datos_inciales.usuario.identificador_usuario, Validators.required],
      identificador_corporativo: [this.datos_inciales.usuario.identificador_corporativo, Validators.required]
    });
  }
  get controles() { return this.formulario_solicitud.controls; }

  clearFormulario() {
    this.formulario_solicitud.reset();
  }
  submitFormulario(btn_submit) {
    // this.controles.file.setValue(this.lista_archivos_envio);
    const text = btn_submit.innerHTML;

    btn_submit.disabled = true;
    btn_submit.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';

    this.controles.anticipo.setValue(this.controles.anticipo.value ? 1 : 0);
    this.controles.id_cuenta_agrupacion_gasto_viaje.setValue(Number(this.controles.id_cuenta_agrupacion_gasto_viaje.value));
    this.controles.id_moneda.setValue(Number(this.controles.id_moneda.value));
    if (!this.controles.anticipo.value) {
      this._gastoViajeService.crearSolicitud(this.formulario_solicitud.value).subscribe((data: any) => {
        swal.fire('Exito', 'Solicitud creada correctamente.', 'success');
        this._router.navigate(['home', 'gastos_viaje', 'solicitud_anticipo']);
        btn_submit.innerHTML = text;
        btn_submit.disabled = false;
      }, error => {
        const mensaje = error.error && error.error.mensaje ? error.error.mensaje : 'Error Desconocido.';
        btn_submit.innerHTML = text;
        btn_submit.disabled = false;
        swal.fire('Atención', mensaje, 'info');
      }, () => {
      });
    } else {
      this._gastoViajeService.crearSolicitudAnticipo(this.formulario_solicitud.value).subscribe((data: any) => {
        btn_submit.innerHTML = text;
        btn_submit.disabled = false;
        swal.fire('Exito', 'Solicitud creada correctamente.', 'success');
        this._router.navigate(['home', 'gastos_viaje', 'solicitud_anticipo']);
      }, error => {
        btn_submit.innerHTML = text;
        btn_submit.disabled = false;
        const mensaje = error.error && error.error.mensaje ? error.error.mensaje : 'Error Desconocido.';
        swal.fire('Atención', mensaje, 'info');
      }, () => {
        btn_submit.innerHTML = text;
        btn_submit.disabled = false;
      });
    }
  }

  obtenerCatalogos(identificador_corporativo: any = null) {
    this.cargarEmpresas();
    this._compratidosService.obtenerMonedasCorporativo(this.datos_iniciales.usuario.identificador_corporativo).subscribe((data: any) => {
      this.lista_moneda = $.map(data, (obj: any) => {
        obj.id = obj.id as number;
        obj.text = obj.nombre;
        return obj;
      });
      this.lista_moneda = this._globals.agregarSeleccione(data, 'Seleccione Moneda');
    },
      (error) => {
      });

    this._departamentoService.obtenerDepartamentoPorCorporativo(
      identificador_corporativo
      , this.datos_inciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
    ).subscribe((data: any) => {
      this.lista_departamento = $.map(data, (obj: any) => {
        obj.id = obj.identificador;
        obj.text = obj.descripcion;
        return obj;
      });
      this.lista_departamento = this._globals.agregarSeleccione(this.lista_departamento, 'Seleccione Departamento');
    },
      (error) => {
      });

    this._centroConsumoService.ObtenerListaCentroCostosMXPorCorporativo(
      identificador_corporativo
      , this.datos_inciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
    ).subscribe((data: any) => {
      this.lista_centro_consumo = $.map(data, (obj: any) => {
        obj.id = obj.identificador;
        obj.text = obj.nombre;
        return obj;
      });
      this.lista_centro_consumo = this._globals.agregarSeleccione(this.lista_centro_consumo, 'Seleccione Centro Consumo');
    },
      (error) => {
      });
  }

  obtenerCuentas() {
    const contribuyente = this.controles.contributente_identificador.value;
    const sucursal = this.controles.sucursal_identificador.value;
    const departamento = this.controles.identificador_departamento.value;
    if (this.controles.contributente_identificador.value && this.controles.contributente_identificador.value !== '' &&
      this.controles.sucursal_identificador.value && this.controles.sucursal_identificador.value !== '' &&
      this.controles.identificador_departamento.value && this.controles.identificador_departamento.value !== '' && this.controles.anticipo) {
      this._gastoViajeService.getCuentasContribuyenteSucursal(contribuyente, sucursal, departamento).subscribe((data: any) => {
        this.lista_cuentas = this._globals.prepararSelect2(data, 'id_cuenta_agrupacion', 'cuenta');
        this.lista_cuentas = this._globals.agregarSeleccione(this.lista_cuentas);
      });
    } else {
      this.lista_cuentas = [];
    }
  }
  cargarEmpresas() {

    const usr = this.datos_inciales.usuario;
    if (usr.proveedor === 1 || usr.acreedor === 1) {
      this.cargarEmpresasSAP();
    } else {
      this.cargarEmpresasPortal();
    }
  }



  cargarEmpresasSAP() {
    this._compratidosService.obtenerContribuyentesProveedorId(this.datos_iniciales.usuario.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_contribuyentes = $.map(data, (obj) => {
          obj.id = obj.identificador;
          obj.text = obj.nombre;
          return obj;
        });
        this.lista_contribuyentes = this._globals.prepararSelect2(data, 'identificador_contribuyente', 'contribuyente');
        this.lista_contribuyentes = this._globals.eliminarRepetidos(this.lista_contribuyentes, 'identificador_contribuyente');

        this.lista_contribuyentes = this._globals.agregarSeleccione(this.lista_contribuyentes, 'Seleccione una Empresa...');
      },
        error => {
        }
      );
  }
  cargarEmpresasPortal() {
    this._compratidosService.obtenerEmpresasIdCorporativoIdUsuario(this.corporativo_activo.corporativo_identificador, this.datos_iniciales.usuario.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_contribuyentes = $.map(data, (obj) => {
          obj.id = obj.identificador;
          obj.text = obj.nombre;
          return obj;
        });
        this.lista_contribuyentes = this._globals.prepararSelect2(data, 'identificador', 'nombre');
        this.lista_contribuyentes = this._globals.eliminarRepetidos(this.lista_contribuyentes, 'identificador');
        this.lista_contribuyentes = this._globals.agregarSeleccione(this.lista_contribuyentes, 'Seleccione una Empresa...');
      },
        error => {
        }
      );
  }

  cargarHoteles(identificador_contribuyente) {
    if (identificador_contribuyente) {
      if (this.datos_inciales.usuario.proveedor) {
        this._compratidosService.obtenerSucursalesXCorporativoXContribuyente(this.datos_inciales.usuario.identificador_corporativo, identificador_contribuyente)
          .subscribe((data: any) => {
            this.lista_sucursales = this._globals.prepararSelect2(data, 'identificador', 'nombre');
          }, error => { },
          );
      } else {

        this._compratidosService.obtenerHotelIdContribuyenteIdUsuario(identificador_contribuyente, this.datos_iniciales.usuario.identificador_usuario)
          .subscribe((data: any) => {
            this.lista_sucursales = $.map(data, (obj) => {
              obj.id = obj.identificador;
              obj.text = obj.nombre;
              return obj;
            });
            this.lista_sucursales = this._globals.eliminarRepetidos(this.lista_sucursales, 'identificador');
            this.lista_sucursales = this._globals.agregarSeleccione(this.lista_sucursales, 'Seleccione un Hotel...');
          }, error => {
          });
      }
    }
  }

  actualizarArchivoBtn() {
    if (this, this.lista_archivos.length >= 3) {
      Swal.fire('Alerta', 'Solo se puede agregar un máximo de 3 archivos por solicitud.', 'warning');
      this.inputArchivo.nativeElement.value = '';
      return;
    }
    const archivo = new Archivos();
    const reader = new FileReader();
    if (this.inputArchivo.nativeElement.files[0]) {
      const file = this.inputArchivo.nativeElement.files[0];
      const size = this.inputArchivo.nativeElement.files[0].size;
      if (size >= (1048576 * 10)) {
        Swal.fire('Alerta', 'El tamaño del archivo debe ser menor de 10MB.', 'error');
        this.inputArchivo.nativeElement.value = '';
        return;
      }
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileData.file_name = file.name;
        this.fileData.file_data = String(reader.result).split(',')[1];
        this.titulocarga = file.name;
        if (this.lista_archivos.filter(x => x.nombre == this.titulocarga).length > 0) {
          this.inputArchivo.nativeElement.value = '';
          return;
        };
        archivo.data = this.fileData.file_data + '|' + this.fileData.file_name;
        archivo.nombre = this.fileData.file_name;
        this.lista_archivos.push(archivo);
        // this.controles.file.setValue([...this.controles.file.value, archivo.data]);
        this.lista_archivos_envio.push(archivo.data);
        this.controles.file.setValue(this.lista_archivos_envio);
        this.inputArchivo.nativeElement.value = '';
      };
    }
  }

  onCuentaSelected(dato) {
    console.log(dato);
    if (dato.value !== 0 && dato.value !== '0') {
      this.controles.id_cuenta_agrupacion_gasto_viaje.setValue(dato.value);
    } else {
      this.controles.id_cuenta_agrupacion_gasto_viaje.setValue(null);
    }
  }

  eliminaritem(index) {
    this.lista_archivos.splice(index, 1);
    this.lista_archivos_envio = [];
    this.lista_archivos.map(x => {
      this.lista_archivos_envio.push(x.data + '|' + x.nombre);
    });
    this.controles.file.setValue(this.lista_archivos_envio);
  }

  habilitarValida() {
    this.disableValida = false;
  }

  onContribuyenteSelected(dato: any) {
    if (dato.value !== 0 && dato.value !== '0') {
      this.controles.contributente_identificador.setValue(dato.value)
      this.cargarHoteles(dato.value);
      this.obtenerCuentas();
    } else {
      this.controles.contributente_identificador.setValue(null)
      this.controles.sucursal_identificador.setValue(null)
      this.lista_sucursales = [];
    }
  }
  onSucursalSeleccionado(dato: any) {
    if (dato.value !== 0 && dato.value !== '0') {
      this.controles.sucursal_identificador.setValue(dato.value);
      this.obtenerCuentas();
    } else {
      this.controles.sucursal_identificador.setValue(null);
    }
  }
  onDepartamentoSeleccionado(dato: any) {
    if (dato.value !== 0 && dato.value !== '0') {
      this.controles.identificador_departamento.setValue(dato.value);
      this.obtenerCuentas();
    } else {
      this.controles.identificador_departamento.setValue(null);
    }
  }
  onCentroConsumoSeleccionado(dato: any) {
    if (dato.value !== 0 && dato.value !== '0') {
      this.controles.identificador_centro_consumo.setValue(dato.value);
    } else {
      this.controles.identificador_centro_consumo.setValue(null);
    }
  }
  onFechaInicioViaje(fecha: any) {
    this.controles.fecha_inicio_viaje.setValue(fecha.formatted);
  }
  onFechaFinViaje(fecha: any) {
    this.controles.fecha_fin_viaje.setValue(fecha.formatted);
  }
  onMonedaSeleccionado(dato: any) {
    if (dato.value && dato.value != '0' && dato.value !== 0) {
      this.controles.id_moneda.setValue(dato.value);
      this.controles.moneda.setValue(dato.data[0].clave);
    } else {
      this.controles.id_moneda.setValue(null);
      this.controles.moneda.setValue(null);
    }
  }

  guardar() {
    this.txtBtnGuardar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    const datos_inciales = this._storageService.getDatosIniciales();
    this._gastoViajeService.crearSolicitud(this.solicitudAnticiposGastosViaje).subscribe((data: any) => {
      swal.fire('Éxito', 'Solicitud de viaje enviada, espere aprobación.', 'success');
      this._router.navigate(['/home/gastos_viaje/solicitud_anticipo']);
    },
      error => {
        this.txtBtnGuardar = 'Guardar';
        swal.fire('Atención', 'No tiene flujo de aprobación: ');
      });
  }


  cambiarCheck(data) {
    this.lista_archivos_envio = [];
    this.controles.id_cuenta_agrupacion_gasto_viaje.setValue(0);
    this.controles.file.setValue(this.lista_archivos_envio);
    if (data.target.checked == true) {

      this.controles.id_cuenta_agrupacion_gasto_viaje.setValidators([Validators.required]);
      this.controles.file.setValidators([Validators.required]);
      this.controles.file.updateValueAndValidity();
      this.controles.id_cuenta_agrupacion_gasto_viaje.updateValueAndValidity();
      this.controles.anticipo.setValue(true);

      this.anticipoMontoAprox = false;
      this.anticipo = true;
      this.obtenerCuentas();
    } else {
      this.anticipoMontoAprox = true;
      this.anticipo = false;
      this.controles.id_cuenta_agrupacion_gasto_viaje.setValidators([]);
      this.controles.file.setValidators([]);
      this.controles.file.updateValueAndValidity();
      this.controles.id_cuenta_agrupacion_gasto_viaje.updateValueAndValidity();
      this.controles.anticipo.setValue(false);
    }
  }
}


class Archivos {
  nombre: string;
  data: string;
}
