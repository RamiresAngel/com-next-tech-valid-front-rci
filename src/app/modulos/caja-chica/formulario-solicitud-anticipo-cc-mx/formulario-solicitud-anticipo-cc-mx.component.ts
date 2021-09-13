import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AnticipoGeneral } from 'src/app/entidades/anticipoGeneral';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CajaChicaService } from '../caja-chica.service';
import { CajaChica } from 'src/app/entidades/caja-chica';
import swal from 'sweetalert2';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../categoria/categoria.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { LibroCajaChicaService } from '../../libro-caja-chica/libro-caja-chica.service';
import { ContribuyenteService } from '../../contribuyente/contribuyente.service';
import { SucursalService } from '../../sucursal/sucursal.service';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { DepartamentoService } from '../../departamento/departamento.service';
import { CentroCostosService } from '../../centro-costos/centro-costos.service';
import { from } from 'rxjs';
import { FileUpload } from '../../documentos_add/clases/file-upload';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { SolicitudAnticipoGastoViaje } from 'src/app/entidades/solicitud-anticipo-gastos-viaje';
import { Contribuyente } from 'src/app/entidades/contribuyente';
import { Sucursal } from 'src/app/entidades/sucursal';

@Component({
  selector: 'app-formulario-solicitud-anticipo-cc-mx',
  templateUrl: './formulario-solicitud-anticipo-cc-mx.component.html',
  styleUrls: ['./formulario-solicitud-anticipo-cc-mx.component.css']
})
export class FormularioSolicitudAnticipoCcMxComponent implements OnInit {

  @ViewChild('otrosInput') inputArchivo: ElementRef;
  public fileData = new FileUpload();
  public titulo = 'Agregar Nueva Solicitud de Caja Chica';
  public anticiposGeneral = new AnticipoGeneral();
  public cajaChica = new CajaChica();
  public formularioSolicitudAnticiposCC: FormGroup;
  public solicitudAnticiposGastosViaje = new SolicitudAnticipoGastoViaje();
  public txtBtnGuardar = 'Guardar';
  public lista_caja_chica = new Array<any>();
  // public lista_contribuyente = new Array<any>();
  public lista_moneda = new Array<any>();
  public lista_departamento = new Array<any>();
  // public lista_sucursal = new Array<any>();
  public lista_centroConsumo = new Array<any>();
  public startValue_caja_chica: any;
  public startValue_contribuyente: string;
  public startValue_sucursal: any;
  public startValue_moneda: any;
  public startValue_departamento: any;
  public id_cajaChica: any;
  public startValue_centroConsumo: any;
  public datos_iniciales: any;
  public identificador_usuario: any;
  public disableValida = true;
  public titulocarga = 'Selecciona un archivo';
  public disableGuardaArchvos = false;
  public fileArchivo = {
    name: ''
  };
  private corporativo_activo: CorporativoActivo;

  lista_contribuyente: Contribuyente[];
  lista_sucursal: Sucursal[];

  constructor(
    public _globales: GlobalsComponent,
    private _activatedRoute: ActivatedRoute,
    private _service_caja_chica: CajaChicaService,
    private _servicios_compartidos_cajaChica: LibroCajaChicaService,
    private _storageService: StorageService,
    private _servicio_contribuyente: ContribuyenteService,
    private _servicio_sucursal: SucursalService,
    private _servicios_compartidos: CompartidosService,
    private _servicios_departamento: DepartamentoService,
    private _servicio_centro_consumo: CentroCostosService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.formularioSolicitudAnticiposCC = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl('', Validators.required)
    });
    //  this.obtenerCatalogos(this.cajaChica.identificador_corporativo, this.cajaChica.usuario_identificador);
    this.obtenerCatalogos(this.datos_iniciales.identificador_corporativo);
  }

  obtenerCatalogos(identificador_corporativo: any = null) {
    this.cargarEmpresas();

    this._servicios_compartidos_cajaChica.ObtenerListaLibroCajaChica().subscribe(
      (data) => {
        this.lista_caja_chica = $.map(data, function (obj: any) {
          obj.id = obj.id;
          obj.text = obj.numero_libro;
          return obj;
        });
        // console.log(data);
      }
      , (error) => {
        console.log(error);
      }
      , () => {
        this.startValue_caja_chica = '';
      }
    );

    /*this._servicio_contribuyente.ObtenerListaContribuyentesMXPorCorporativo(identificador_corporativo).subscribe(
      (data) => {
        this.lista_contribuyente = $.map(data, function (obj: any) {
          obj.id = obj.identificador;
          obj.text = obj.nombre;
          return obj;
        });
      }
      , (error) => {
        console.log(error);
      }
      , () => {
        this.startValue_contribuyente = '';
      }
    );*/

    /*this._servicio_sucursal.ObtenerListaSucursalesMXPorCorporativo(identificador_corporativo).subscribe(
      (data) => {
        this.lista_sucursal = $.map(data, function (obj: any) {
          obj.id = obj.identificador;
          obj.text = obj.nombre;
          return obj;
        });
      }
      , (error) => {
        console.log(error);
      }
      , () => {
        this.startValue_sucursal = '';
      }
    );*/

    this._servicios_compartidos.obtenerMonedasCorporativo(this.corporativo_activo.corporativo_identificador).subscribe(
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

    this._servicios_departamento.obtenerTodosDepartamentos().subscribe(
      (data) => {
        this.lista_departamento = $.map(data, function (obj: any) {
          obj.id = obj.id;
          obj.text = obj.descripcion;
          return obj;
        });
      }
      , (error) => {
        console.log(error);
      }
      , () => {
        this.startValue_departamento = '';
      }
    );

    this._servicio_centro_consumo.ObtenerListaCentroCostosMX().subscribe(
      (data) => {
        this.lista_centroConsumo = $.map(data, function (obj: any) {
          obj.id = obj.centro_consumo_identificador;
          obj.text = obj.centro_consumo;
          return obj;
        });
        // console.log(data);
      }
      , (error) => {
        console.log(error);
      }
      , () => {
        this.startValue_centroConsumo = '';
      }
    );
  }

  cargarEmpresas() {
    this._servicios_compartidos.obtenerEmpresasIdCorporativoIdUsuario(this.corporativo_activo.corporativo_identificador, this.datos_iniciales.usuario.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_contribuyente = $.map(data, (obj) => {
          obj.id = obj.identificador;
          obj.text = obj.nombre;
          return obj;
        });
        this.lista_contribuyente = this._globales.agregarSeleccione(this.lista_contribuyente, 'Seleccione una Empresa...');
      },
        error => {
          console.log(error);
        }
      );
  }

  cargarHoteles(identificador_contribuyente) {
    this._servicios_compartidos.obtenerHotelIdContribuyenteIdUsuario(identificador_contribuyente, this.datos_iniciales.usuario.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_sucursal = $.map(data, (obj) => {
          obj.id = obj.identificador;
          obj.text = obj.nombre;
          return obj;
        });
        this.lista_sucursal = this._globales.agregarSeleccione(this.lista_sucursal, 'Seleccione un Hotel...');
      }, error => {
        console.log(error);
      });
  }

  actualizaSolicitudCC(): void {
    const datos_iniciales = this._storageService.getDatosIniciales();
    this.cajaChica.usuario_identificador = datos_iniciales.usuario.identificador_usuario;

    this.cajaChica.monto = Number(this.cajaChica.monto);
    this.txtBtnGuardar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    if (this.id_cajaChica) {
      this._service_caja_chica.actualizaSolicitudCC(this.cajaChica).subscribe(
        data => {
          swal.fire(
            'Éxito',
            'Guardado Correctamente',
            'success'
          );
          this.txtBtnGuardar = 'Guardar';
          this.router.navigate(['/home/caja_chica/solicitud_anticipo_cc']);
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

      this._service_caja_chica.guardarSolicitudCC(this.cajaChica).subscribe(
        data => {
          swal.fire(
            'Éxito',
            'Guardado Correctamente',
            'success'
          );
          this.txtBtnGuardar = 'Guardar';
          this.router.navigate(['/home/caja_chica/solicitud_anticipo_cc']);
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
    //  console.log(dato);
    if (dato.value !== 0) {
      this.solicitudAnticiposGastosViaje.contributente_identificador = dato.value;
      this.cargarHoteles(dato.value);
    } else {
      this.solicitudAnticiposGastosViaje.contributente_identificador = null;
      this.solicitudAnticiposGastosViaje.sucursal_identificador = null;
      this.lista_sucursal = [];
    }
  }
  onSucursalSeleccionado(dato: any) {
    //  console.log(dato);
    //  this.solicitudAnticiposGastosViaje.sucursal_identificador = dato.value;
    if (dato.value !== 0) {
      this.solicitudAnticiposGastosViaje.sucursal_identificador = dato.value;
    } else {
      this.solicitudAnticiposGastosViaje.sucursal_identificador = null;
    }
  }

  actualizarArchivoBtn() {
    const reader = new FileReader();
    const file = this.inputArchivo.nativeElement.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileData.file_name = file.name;
      this.fileData.file_data = reader.result.split(',')[1];
      this.titulocarga = file.name;

      this.cajaChica.file = this.fileData.file_data;
    }
  }

  actualizarCajaChica(dato: any) {
    this.lista_caja_chica.forEach(element => {
      if (dato.value === element.id) {
        this.cajaChica.no_libro_caja = element.numero_libro;
      }
      // console.log(element);
    });

    this.cajaChica.id_caja_chica = dato.value;
  }

  actualizarContribuyente(dato: any) {
    this.cajaChica.contributente_identificador = dato.value;
  }
  actualizarSucursal(dato: any) {
    this.cajaChica.sucursal_identificador = dato.value;
  }
  actualizarMoneda(dato: any) {
    this.cajaChica.id_moneda = dato.value;
  }
  actualizarDepartamento(dato: any) {
    console.log(dato);
    this.cajaChica.identificador_departamento = dato.value;
  }
  actualizarCentroConsumo(dato: any) {
    console.log(dato);
    this.cajaChica.identificador_centro_consumo = dato.value;
  }
}
