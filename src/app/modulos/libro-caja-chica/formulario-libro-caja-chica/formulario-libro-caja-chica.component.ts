import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Libro } from '../../../entidades/libro-caja-chica';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { LibroCajaChicaService } from '../libro-caja-chica.service';
import swal from 'sweetalert2';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { ContribuyenteService } from '../../contribuyente/contribuyente.service';
import { UsuarioService } from '../../usuarios/usuario.service';

@Component({
  selector: 'app-formulario-libro-caja-chica',
  templateUrl: './formulario-libro-caja-chica.component.html',
  styleUrls: ['./formulario-libro-caja-chica.component.css']
})
export class FormularioLibroCajaChicaComponent implements OnInit {

  public titulo = '';
  public libro = new Libro();
  public txtBtnAgregar = 'Guardar';
  public formulario_libro: FormGroup;
  public startValue_contribuyente = null;
  public startValue_sucursal = null;
  public startValue_responsable = null;
  public lista_sucursal = new Array<any>();
  public lista_contribuyente = new Array<any>();
  public array_contribuyentes: any;
  public array_sucursales: any;
  public id_libro: any;
  public accionLibro: string;
  corporativo_activo: CorporativoActivo;
  datos_iniciales: DatosIniciales;
  public array_responsables: any;

  constructor(
    public _globales: GlobalsComponent
    , private _activatedRoute: ActivatedRoute
    , private _servicio_contribuyente: ContribuyenteService
    , private _storageService: StorageService
    , private _servicios_compartidos: CompartidosService
    , private _servicioLibro: LibroCajaChicaService
    , private _servicio_usuario: UsuarioService
    , private router: Router
  ) {
    this.iniciarFormulario();
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this._activatedRoute.params.subscribe((id) => {
      this.id_libro = this._storageService.desencriptar_ids(id['id']);
    });
  }

  ngOnInit() {
    this.inicializaComponentes();
  }

  inicializaComponentes() {
    if (this.id_libro !== null && this.id_libro !== undefined && this.id_libro !== '') {
      this.titulo = 'Editar Libro Caja Chica';
      this.cargarEmpresasEdit();
    } else {
      this.cargarEmpresas();
      this.titulo = 'Agregar Nuevo Libro Caja Chica';
      this.iniciarFormulario();
    }
  }

  iniciarFormularioEditar() {
    this.formulario_libro = new FormGroup({
      numero_libro: new FormControl(this.libro.numero_libro, Validators.required),
      identificador_contribuyente: new FormControl(this.libro.identificador_contribuyente),
      identificador_usuario: new FormControl(this.libro.identificador_usuario),
      // saldo: new FormControl(this.libro.saldo, Validators.required),
      saldo_limite: new FormControl(this.libro.saldo_limite, Validators.required),
      numero_libro_sap: new FormControl(this.libro.numero_libro_sap, Validators.required),
      estatus: new FormControl(this.libro.estatus),
      identificador_sucursal: new FormControl(this.libro.identificador_sucursal),
      identificador_corporativo: new FormControl(this.libro.identificador_corporativo),
      solicitud: new FormControl(this.libro.numero_libro)
    });
  }

  iniciarFormulario() {
    this.formulario_libro = new FormGroup({
      numero_libro: new FormControl('', Validators.required),
      identificador_contribuyente: new FormControl(''),
      identificador_usuario: new FormControl(''),
      saldo_limite: new FormControl('', Validators.required),
      numero_libro_sap: new FormControl('', Validators.required),
      estatus: new FormControl(),
      identificador_sucursal: new FormControl(''),
      identificador_corporativo: new FormControl(''),
      solicitud: new FormControl('')
    });
  }

  guardarLibro() {
    this.libro.saldo = this.libro.saldo_limite;
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.libro.identificador_usuario = this.datos_iniciales.usuario.identificador_usuario;  // '32323232-5555-1111-8888-4444';
    this.libro.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    if (this.libro.id) {
      this.libro.estatus ? this.libro.estatus = 1 : this.libro.estatus = 0;
      this._servicioLibro.ActualizarLibroCajaChica(this.libro).subscribe(
        (data) => {
          swal.fire('Éxito', 'Guardado Correctamente', 'success');
          this.txtBtnAgregar = 'Guardar';
          this.router.navigate(['/home/libro']);
        }
        , (error) => {
          this.txtBtnAgregar = 'Guardar';
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        }
      );
    } else {
      this.libro.estatus ? this.libro.estatus = 1 : this.libro.estatus = 0;
      this._servicioLibro.GuardarLibroCajaChica(this.libro).subscribe(
        (data) => {
          swal.fire('Éxito', 'Guardado Correctamente', 'success');
          this.txtBtnAgregar = 'Guardar';
          this.router.navigate(['/home/libro']);
        }
        , (error) => {
          this.txtBtnAgregar = 'Guardar';
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        }
      );
    }

  }

  onContribuyenteSelected(dato: any) {
    // console.log(dato);
    this.libro.identificador_contribuyente = dato.value;
    if (dato.value !== 0) {
      this.cargarHoteles(dato.value);
    } else {
      this.libro.identificador_contribuyente = null;
      this.array_sucursales = [];
    }
  }

  cargarHoteles(identificador_contribuyente) {
    this._servicios_compartidos.obtenerHotelIdContribuyenteIdUsuario(identificador_contribuyente, this.datos_iniciales.usuario.identificador_usuario)
      .subscribe((data: any) => {
        this.array_sucursales = $.map(data, (obj) => {
          obj.id = obj.identificador;
          obj.text = obj.nombre;
          return obj;
        });
        this.array_sucursales = this._globales.agregarSeleccione(this.array_sucursales, 'Seleccione una Hotel...');
      }, error => {
        console.log(error);
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      },
        () => {
          if (this.libro.id && this.array_sucursales.length > 1) {
            this.startValue_sucursal = this.libro.identificador_sucursal;
            const obj = {
              value: this.startValue_sucursal
            };
            this.setearSucursal(obj);
          }
        }
      );
  }

  setearSucursal(obj: any) {
    if (obj.value !== '0') {
      this.libro.identificador_sucursal = obj.value;
      // Consulta usuarios por sucursal
      this._servicio_usuario.obtnerUsuarioByIdentificadorSucursal(obj.value).subscribe(
        (data: any) => {
          this.array_responsables = $.map(data, (objdata) => {
            objdata.id = objdata.identificador_usuario;
            objdata.text = objdata.nombre;
            return objdata;
          });
          // this.array_responsables = this._globales.prepararSelect2(this.array_responsables, 'identificador_usuario', 'nombre');
          this.array_responsables = this._globales.agregarSeleccione(this.array_responsables, 'Seleccione un Usuario...');
        }
        , (error) => {
          console.log(error);
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        },
        () => {
          if (this.libro.id) {
            this.startValue_responsable = this.libro.identificador_responsable;
          }
        }
      );
    }

  }

  setearResponsable(obj: any) {
    this.libro.identificador_responsable = obj.value;
  }

  cargarEmpresas() {
    this._servicio_contribuyente.ObtenerListaContribuyentesMXPorCorporativo(
      this.corporativo_activo.corporativo_identificador
      , this.datos_iniciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
      )
      .subscribe((data: any) => {
        this.lista_contribuyente = $.map(data, (obj) => {
          obj.id = obj.identificador;
          obj.text = obj.nombre;
          return obj;
        });
        this.lista_contribuyente = this._globales.agregarSeleccione(this.lista_contribuyente, 'Seleccione una Empresa...');
        if (this.libro.id) {
          const obj = {
            value: this.libro.identificador_contribuyente
          };
          this.onContribuyenteSelected(obj);
        }
      },
        error => {
          console.log(error);
        }
      );
  }

  cargarEmpresasEdit() {
    this._servicio_contribuyente.ObtenerListaContribuyentesMXPorCorporativo(
      this.corporativo_activo.corporativo_identificador
      , this.datos_iniciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
      )
      .subscribe((data: any) => {
        this.lista_contribuyente = $.map(data, (obj) => {
          obj.id = obj.identificador;
          obj.text = obj.nombre;
          return obj;
        });
        this.lista_contribuyente = this._globales.agregarSeleccione(this.lista_contribuyente, 'Seleccione una Empresa...');
        this._servicioLibro.ObtenerLibroById(this.id_libro).subscribe(
          (dataLibro) => {
            this.libro = dataLibro[0];
          },
          (error) => {
            swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
          },
          () => {
            if (this.libro.id) {
              this.startValue_contribuyente = this.libro.identificador_contribuyente;
              this.cargarHoteles(this.startValue_contribuyente);
            }
          }
        );
      },
        error => {
          console.log(error);
        }
      );
  }

}

