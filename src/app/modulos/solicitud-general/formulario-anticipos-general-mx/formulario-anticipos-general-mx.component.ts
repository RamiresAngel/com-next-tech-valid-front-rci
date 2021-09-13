import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AnticipoGeneral } from 'src/app/entidades/anticipoGeneral';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SolicitudGeneralService } from '../solicitud-general.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { ContribuyenteService } from '../../contribuyente/contribuyente.service';
import { SucursalService } from '../../sucursal/sucursal.service';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { DepartamentoService } from '../../departamento/departamento.service';
import { CentroCostosService } from '../../centro-costos/centro-costos.service';
import swal from 'sweetalert2';
import { FileUpload } from '../../documentos_add/clases/file-upload';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { SolicitudAnticipoGastoViaje } from 'src/app/entidades/solicitud-anticipo-gastos-viaje';
import { Contribuyente } from 'src/app/entidades/contribuyente';
import { Sucursal } from 'src/app/entidades/sucursal';
import { DatosIniciales } from 'src/app/entidades';

@Component({
  selector: 'app-formulario-anticipos-general-mx',
  templateUrl: './formulario-anticipos-general-mx.component.html',
  styleUrls: ['./formulario-anticipos-general-mx.component.css']
})
export class FormularioAnticiposGeneralMxComponent implements OnInit {

  @ViewChild('otrosInput') inputArchivo: ElementRef;
  public fileData = new FileUpload();
  public titulo = 'Agregar Nueva Solicitud General';
  public anticiposGeneral = new AnticipoGeneral();
  public formularioSolicitudAnticipos: FormGroup;
  public txtBtnGuardar = 'Guardar';
  // public lista_contribuyente = new Array<any>();
  // public lista_sucursal = new Array<any>();
  public lista_moneda = new Array<any>();
  public lista_departamento = new Array<any>();
  public lista_centroConsumo = new Array<any>();
  public startValue_contribuyente: string;
  public startValue_sucursal: any;
  public startValue_moneda: any;
  public startValue_departamento: any;
  public startValue_centroConsumo: any;
  public id_anticipoGeneral: any;
  public disableValida = true;
  public titulocarga = 'Selecciona un Archivo';
  public disableGuardaArchvos = false;
  public fileArchivo = {
    name: ''
  };
  public datos_iniciales: DatosIniciales;
  private corporativo_activo: CorporativoActivo;
  // public solicitudAnticiposGastosViaje = new SolicitudAnticipoGastoViaje();

  lista_contribuyente: Contribuyente[];
  lista_sucursal: Sucursal[];
  identificador_corporativo: string;
  identificador_usuario: string;

  constructor(
    public _globales: GlobalsComponent,
    private _activatedRoute: ActivatedRoute,
    private _servicio_anticipo_general: SolicitudGeneralService,
    // private _servicios_compartidos_cajaChica: LibroCajaChicaService,
    private _storageService: StorageService,
    private _servicio_contribuyente: ContribuyenteService,
    private _servicio_sucursal: SucursalService,
    private _servicios_compartidos: CompartidosService,
    private _servicios_departamento: DepartamentoService,
    private _servicio_centro_consumo: CentroCostosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.identificador_usuario = this.datos_iniciales.usuario.identificador_usuario;
    this.formularioSolicitudAnticipos = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl('', Validators.required),
      xml: new FormControl('', Validators.required)
    });
    this.obtenerCatalogos(this.identificador_corporativo);
  }

  obtenerCatalogos(identificador_corporativo: any = null) {
    this.cargarEmpresas();
    this._servicios_compartidos.obtenerMonedasCorporativo(this.identificador_corporativo).subscribe(
      (data) => {
        this.lista_moneda = $.map(data, function (obj: any) {
          obj.id = obj.id;
          obj.text = obj.nombre;
          return obj;
        });
      }
      , (error) => {
        console.log(error);
      }
      , () => {
        this.startValue_moneda = '';
      }
    );



    this._servicios_compartidos.obtenerDepartamentosXCorporativo(
      identificador_corporativo
      , this.datos_iniciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
    ).subscribe(
      (data) => {
        // this.lista_despartamentos = $.map(data, function (obj: any) {
        //   obj.id = obj.identificador;
        //   obj.text = obj.descripcion;
        //   return obj;
        // });
        this.lista_departamento = this._globales.prepararSelect2(data, 'identificador', 'descripcion');
        this.lista_departamento = this._globales.agregarSeleccione(this.lista_departamento, 'Seleccione departamento...');
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
      , () => {

      }
    );

    // this._servicios_departamento.obtenerTodosDepartamentos().subscribe(
    //   (data) => {
    //     this.lista_departamento = this._globales.prepararSelect2(data, 'identificador', 'descripcion');
    //     this.lista_departamento = this._globales.agregarSeleccione(data, 'Seleccione una Empresa...');
    //   }
    //   , (error) => {
    //     console.log(error);
    //   }
    //   , () => {
    //     this.startValue_departamento = '';
    //   }
    // );

    // this._servicio_centro_consumo.ObtenerListaCentroCostosMX().subscribe(
    //   (data) => {
    //     this.lista_centroConsumo = $.map(data, function (obj: any) {
    //       obj.id = obj.centro_consumo_identificador;
    //       obj.text = obj.centro_consumo;
    //       return obj;
    //     });
    //   }
    //   , (error) => {
    //     console.log(error);
    //   }
    //   , () => {
    //     this.startValue_centroConsumo = '';
    //   }
    // );
  }

  obtenerCC() {
    this._servicios_compartidos.obtenerCCXContribuyenteXSucursal(this.anticiposGeneral.contributente_identificador, this.anticiposGeneral.sucursal_identificador).subscribe(
      (data) => {
        // this.lista_cc = $.map(data, function (obj: any) {
        //   obj.id = obj.identificador;
        //   obj.text = obj.nombre;
        //   return obj;
        // });
        this.lista_centroConsumo = this._globales.prepararSelect2(data, 'identificador', 'nombre');
        this.lista_centroConsumo = this._globales.agregarSeleccione(this.lista_centroConsumo, 'Seleccione centro de costos...');
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
      , () => {
        // if (this.id_cabecera) {
        //   setTimeout(() => {
        //     this.startValue_cc = this.cabecera.identificador_centro_costos;
        //   }, 200);
        // } else {
        //   // this.startValue_cc = '';
        // }
      }
    );
  }

  cargarEmpresas() {
    const usr = this.datos_iniciales.usuario;
    console.log(usr);

    if (usr.acreedor === 1 || usr.proveedor === 1) {
      this.cargarEmpresasSAP();
    } else {
      this.cargarEmpresasPortal();
    }
    // this._servicios_compartidos.obtenerEmpresasIdCorporativoIdUsuario(this.corporativo_activo.corporativo_identificador, this.datos_iniciales.usuario.identificador_usuario)
    //   .subscribe((data: any) => {
    //     this.lista_contribuyente = this._globales.prepararSelect2(data, 'identificador', 'nombre');
    //     this.lista_contribuyente = this._globales.agregarSeleccione(this.lista_contribuyente, 'Seleccione una Empresa...');
    //   },
    //     error => {
    //       console.log(error);
    //     }
    //   );
  }
  cargarEmpresasSAP() {

    this._servicios_compartidos.obtenerContribuyentesProveedorId(this.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_contribuyente = this._globales.prepararSelect2(data, 'identificador_contribuyente', 'contribuyente');
        // this.lista_contribuyentes = this._globals.agregarSeleccione(this.lista_contribuyentes, 'Seleccionar empresa...');
        console.log(this.lista_contribuyente);
      },
        error => {

        },
      );
  }

  cargarEmpresasPortal() {
    this._servicios_compartidos.obtenerEmpresasIdCorporativoIdUsuario(this.identificador_corporativo, this.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_contribuyente = this._globales.prepararSelect2(data, 'identificador', 'nombre');
        console.log(this.lista_contribuyente);

        // this.lista_contribuyentes = this._globals.agregarSeleccione(this.lista_contribuyentes, 'Seleccionar empresa...');
      },
        error => {

        },
      );
  }

  cargarHoteles(identificador_contribuyente) {
    this._servicios_compartidos.obtenerSucursalesXCorporativoXContribuyente(this.corporativo_activo.corporativo_identificador, identificador_contribuyente)
      .subscribe((data: any) => {
        this.lista_sucursal = this._globales.prepararSelect2(data, 'identificador', 'nombre');
        this.lista_sucursal = this._globales.agregarSeleccione(this.lista_sucursal, 'Seleccione un Hotel...');
      }, error => {
        console.log(error);
      });
  }

  actualizaAnticipoGeneral(): void {
    const datos_iniciales = this._storageService.getDatosIniciales();
    this.anticiposGeneral.usuario_identificador = datos_iniciales.usuario.identificador_usuario;
    this.anticiposGeneral.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.anticiposGeneral.monto = Number(this.anticiposGeneral.monto);
    this.txtBtnGuardar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    if (this.id_anticipoGeneral) {
      this._servicio_anticipo_general.actualizarAnticipoGeneral(this.anticiposGeneral).subscribe(
        data => {
          swal.fire(
            'Éxito',
            'Guardado Correctamente',
            'success'
          );
          this.txtBtnGuardar = 'Guardar';
          this.router.navigate(['/home/solicitud_general/anticipo_general']);
        },
        error => {
          this.txtBtnGuardar = 'Guardar';
          swal.fire(
            'Atención',
            'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje,
            'error'
          );
        }
      );
    } else {

      this._servicio_anticipo_general.guardaAnticipoGeneral(this.anticiposGeneral).subscribe(
        data => {
          swal.fire(
            'Éxito',
            'Guardado Correctamente',
            'success'
          );
          this.txtBtnGuardar = 'Guardar';
          this.router.navigate(['/home/solicitud_general/anticipo_general']);
        },
        error => {
          this.txtBtnGuardar = 'Guardar';
          swal.fire(
            'Atención',
            'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje,
            'error'
          );
        }
      );
    }
  }

  onContribuyenteSelected(dato: any) {
    // console.log(dato);
    if (dato.value !== 0) {
      this.anticiposGeneral.contributente_identificador = dato.value;
      this.cargarHoteles(dato.value);
      this.obtenerCC();
    } else {
      this.anticiposGeneral.contributente_identificador = null;
      this.anticiposGeneral.sucursal_identificador = null;
      this.lista_sucursal = [];
    }
  }
  onSucursalSeleccionado(dato: any) {
    // console.log(dato);
    // this.anticiposGeneral.sucursal_identificador = dato.value;
    if (dato.value !== 0) {
      this.anticiposGeneral.sucursal_identificador = dato.value;
    } else {
      this.anticiposGeneral.sucursal_identificador = null;
    }
  }

  actualizarArchivoBtn() {

    const reader = new FileReader();
    const file = this.inputArchivo.nativeElement.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileData.file_name = file.name;
      this.fileData.file_data = String(reader.result).split(',')[1];
      this.titulocarga = file.name;
      this.formularioSolicitudAnticipos.get('xml').setValue('validado');
      this.anticiposGeneral.file = this.fileData.file_data;
    };
  }

  habilitarValida() {
    this.disableValida = false;
  }

  actualizarContribuyente(dato: any) {
    this.anticiposGeneral.contributente_identificador = dato.value;
  }
  actualizarSucursal(dato: any) {
    console.log(dato);
    this.anticiposGeneral.sucursal_identificador = dato.value;
    this.obtenerCC();
  }
  actualizarMoneda(dato: any) {
    this.anticiposGeneral.id_moneda = dato.value;
  }
  actualizarDepartamento(dato: any) {
    console.log(dato);
    this.anticiposGeneral.identificador_departamento = dato.value;
    // this.obtenerCC();
  }
  actualizarCentroConsumo(dato: any) {
    this.anticiposGeneral.identificador_centro_consumo = dato.value;
  }
}
