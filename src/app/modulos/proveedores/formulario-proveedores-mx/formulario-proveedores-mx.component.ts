import { Component, OnInit } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SucursalService } from '../../sucursal/sucursal.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { FormGroup, FormControl } from '@angular/forms';
import { Proveedor, ProveedorMin } from 'src/app/entidades/proveedor';
import { ProveedoresService } from '../proveedores.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-formulario-proveedores-mx',
  templateUrl: './formulario-proveedores-mx.component.html',
  styleUrls: ['./formulario-proveedores-mx.component.css']
})
export class FormularioProveedoresMxComponent implements OnInit {

  corporativo_activo: CorporativoActivo;
  public id_proveedor: any;
  public titulo = 'Editar Proveedor';
  public txtBtnAgregar = 'Guardar';
  public formulario_proveedor: FormGroup;
  public proveedor = new Proveedor();
  public password2 = '';
  public password = '';
  public proveedorMin = new ProveedorMin();
  public lista_estatus: any;
  public startValue_contribuyente = 0;

  constructor(
    public _globales: GlobalsComponent,
    private _activatedRoute: ActivatedRoute
    , private _servicio_proveedor: ProveedoresService
    , private _storageService: StorageService,
    private router: Router
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this._activatedRoute.params.subscribe((id) => {
      this.id_proveedor = this._storageService.desencriptar_ids(id['id']);
    });
    this.inicializarFormulario();
    this.cargarEstatus();
  }

  ngOnInit() {

  }

  cargarUsuarioById() {
    if (this.id_proveedor) {
      this._servicio_proveedor.ObtenerProveedorMXByid(this.id_proveedor).subscribe(
        (data: any) => {
          this.proveedor = data;
        }
        , (error) => {
          console.log(error);
        }
        , () => {
          this.startValue_contribuyente = this.proveedor.estatus;
        }
      );
    }
  }

  inicializarFormulario() {
    this.formulario_proveedor = new FormGroup({
      numero_proveedor: new FormControl('')
      , nombre: new FormControl('')
      , rfc: new FormControl('')
      , correo: new FormControl('')
      , correo_adjuntos: new FormControl('')
      , persona_fisica: new FormControl('')
      , estatus: new FormControl('')
      , password: new FormControl('')
      , password2: new FormControl('')
    });
  }

  actualizarProveedor() {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.proveedorMin.estatus = Number(this.proveedor.estatus);
    this.proveedorMin.correo_adjuntos = this.proveedor.correo_adjuntos;
    this.proveedor.persona_fisica ? this.proveedorMin.persona_fisica = 1 : this.proveedorMin.persona_fisica = 0;
    this.proveedorMin.identificador = this.proveedor.identificador;
    this.proveedorMin.id = this.proveedor.id;

    if ((this.password.trim() !== '') && (this.password2.trim() !== '')) {
      this.proveedorMin.password = this.password;

    }

    this._servicio_proveedor.ActualizarProveedorById(this.proveedorMin).subscribe(
      (data) => {
        console.log(data);
        swal.fire('Éxito', 'Guardado Correctamente', 'success');
        this.txtBtnAgregar = 'Guardar';
        this.router.navigate(['/home/proveedores']);
      }
      , (error) => {
        if (error.status !== 404 && error.status !== 500) {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        } else {
          console.log(error);
        }
      }
      , () => {
        this.txtBtnAgregar = 'Guardar';
      }
    );

  }

  cargarEstatus() {
    this._servicio_proveedor.getListaEstatusProveedores().subscribe(
      (data) => {
        this.lista_estatus = $.map(data, function (obj: any) {
          obj.id = obj.id;
          obj.text = obj.descripcion;
          return obj;
        });
        this.cargarUsuarioById();
      }
      , (error) => {
        console.log(error);
      }
      , () => {
        // this.startValue_contribuyente = null;
      }
    );
  }

  setearEstatusContribuyente(obj: any) {
    this.proveedor.estatus = obj.value;
  }

}
