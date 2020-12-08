import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargaMasivaService } from '../carga-masiva.service';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CorporativoActivo, DatosIniciales, CargaMasiva } from 'src/app/entidades';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-carga-masiva',
  templateUrl: './formulario-carga-masiva.component.html',
  styleUrls: ['./formulario-carga-masiva.component.css']
})
export class FormularioCargaMasivaComponent implements OnInit {
  @ViewChild('zip_file') zip_file: ElementRef;
  @ViewChild('btn_guardar') btn_guardar: ElementRef;

  lista_contribuyentes: Array<any> = [];
  lista_sucursales: Array<any> = [];
  lista_proveedores: Array<any> = [];

  titulo_input = 'Archivo';
  nombre_archivo = 'Seleccionar Archivo.';

  cargando: boolean = false;
  lote_carga_form: FormGroup;
  submitted = false;

  carga_masiva = new CargaMasiva();

  corporativo_activo: CorporativoActivo;
  datos_iniciales: DatosIniciales;

  constructor(
    private formBuilder: FormBuilder,
    private _compartidosService: CompartidosService,
    private _cargaMasivaService: CargaMasivaService,
    public _globals: GlobalsComponent,
    private storageService: StorageService,
    private router: Router
  ) {
    this.corporativo_activo = this.storageService.getCorporativoActivo();
    this.datos_iniciales = this.storageService.getDatosIniciales();
  }

  ngOnInit() {
    this.lote_carga_form = this.formBuilder.group({
      identificador_contribuyente: ['', Validators.required],
      identificador_sucursal: ['', Validators.required],
      identificador_proveedor: ['', this.datos_iniciales.usuario.proveedor !== 1 ? Validators.required : null],
      zip: ['', [Validators.required, Validators.required]]
    });
    const usr = this.datos_iniciales.usuario;
    if (usr.acreedor === 1 || usr.proveedor === 1) {
      this.cargarEmpresaSAP();
    } else {
      this.cargarEmpresaPortal();
    }
  }

  onSubmit() {
    this.submitted = true;
    this.lote_carga_form.disable();
    this.btn_guardar.nativeElement.innerHTML = ' <i class="fas fa-spinner fa-spin"></i>';
    this.carga_masiva.identificador_contribuyente = this.controles.identificador_contribuyente.value;
    this.carga_masiva.identificador_sucursal = this.controles.identificador_sucursal.value;
    this.carga_masiva.identificador_proveedor = this.controles.identificador_proveedor.value;
    this.carga_masiva.identificador_usuario = this.storageService.getDatosIniciales().usuario.identificador_usuario;
    this.carga_masiva.nombre_zip = this.nombre_archivo;
    this.carga_masiva.zip = this.controles.zip.value;
    this._cargaMasivaService.cargarLote(this.carga_masiva).subscribe((data: any) => {
      this.btn_guardar.nativeElement.innerHTML = 'Guardar';
      this.submitted = false;
      Swal.fire('Exito.', 'Lote Cargado.', 'success');
      this.router.navigate(['home', 'carga_masiva']);
    }, error => {
      this.btn_guardar.nativeElement.innerHTML = 'Guardar';
      this.lote_carga_form.enable();
      this.submitted = false;
      Swal.fire('Error', error.error.mensaje, 'error');
    });
  }

  cargarEmpresaPortal() {
    this._compartidosService.obtenerEmpresasIdCorporativoIdUsuario(this.corporativo_activo.corporativo_identificador, this.datos_iniciales.usuario.identificador_usuario)
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
  cargarEmpresaSAP() {
    this._compartidosService.obtenerContribuyentesProveedorId(this.datos_iniciales.usuario.identificador_usuario)
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

  cargarHoteles(identificador_contribuyente) {
    this._compartidosService.obtenerSucursalesXCorporativoXContribuyente(this.corporativo_activo.corporativo_identificador, identificador_contribuyente)
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
    this._compartidosService.obtenerAcreedoresContribuyente(identificador_contribuyente)
      // this._compartidosService.obtenerAcreedoresTipoGastoIdContribuyente(5, this.acreedor_diverso.identificador_proveedor)
      .subscribe((data: any) => {
        this.lista_proveedores = this._globals.prepararSelect2(data, 'identificador_proveedor', 'proveedor');
        this.lista_proveedores = this._globals.agregarSeleccione(this.lista_proveedores, 'Seleccione Proveedor...');
      },
        error => {
          console.log(error);
        }
      );
  }


  onContribuyenteSelected(data: any) {
    console.log(data);
    const identificador_contribuyente = data.value;
    this.controles.identificador_contribuyente.setValue(identificador_contribuyente);

    this.cargarHoteles(identificador_contribuyente);
    if (this.datos_iniciales.usuario.proveedor !== 1) {
      this.cargarAcreedores(identificador_contribuyente);
    } else {
      this.controles.identificador_proveedor.setValue(this.datos_iniciales.usuario.identificador_proveedor);
    }
  }
  onSucursalSelected(data: any) {
    console.log(data);
    this.controles.identificador_sucursal.setValue(data.value);
  }
  onProveedorSelected(data: any) {
    console.log(data);
    this.controles.identificador_proveedor.setValue(data.value);
  }

  cargarArchivo() {
    this.cargando = true;
    const reader1 = new FileReader();
    const file1 = this.zip_file.nativeElement.files[0];
    if (file1 !== undefined && file1.name !== '') {
      reader1.readAsDataURL(file1);
      reader1.onload = () => {
        // console.log(file1);
        this.nombre_archivo = file1.name;
        // console.log(String(reader1.result).split(',')[1]);
        this.controles.zip.setValue(String(reader1.result).split(',')[1]);
        // this.gasto.xml = String(reader1.result).split(',')[1];
        // this.acreedor_diverso.xml = String(reader1.result).split(',')[1];
        // this.subirArchivos(false);
      };
    }
  }
  get controles() { return this.lote_carga_form.controls; }
}
