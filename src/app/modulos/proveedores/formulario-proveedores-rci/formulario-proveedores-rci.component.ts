import { Component, OnInit } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { FormGroup, FormControl } from '@angular/forms';
import { Proveedor, ProveedorMin } from 'src/app/entidades/proveedor';
import { ProveedoresService } from '../proveedores.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-proveedores-rci',
  templateUrl: './formulario-proveedores-rci.component.html',
  styleUrls: ['./formulario-proveedores-rci.component.css']
})
export class FormularioProveedoresRciComponent implements OnInit {

  corporativo_activo: CorporativoActivo;
  public id_proveedor: any;
  public titulo = 'Editar Proveedor';
  public txtBtnAgregar = 'Guardar';
  public formulario_proveedor_rci: FormGroup;
  public proveedor = new Proveedor();
  public proveedorMin = new ProveedorMin();
  public lista_estatus: any;
  public startValue_contribuyente = 0;

  constructor(
    public _globales: GlobalsComponent,
    private _activatedRoute: ActivatedRoute,
    private _servicio_proveedor: ProveedoresService,
    private _storageService: StorageService,
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
    this.formulario_proveedor_rci = new FormGroup({
      nombre: new FormControl(''),
      numero_proveedor: new FormControl(''),
      rfc: new FormControl(''),
      correo: new FormControl(''),
      sitio: new FormControl(''),
      moneda: new FormControl(''),
      estatus: new FormControl(''),
    });
  }

  actualizarProveedor() {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.proveedorMin.estatus = Number(this.proveedor.estatus);
    this.proveedorMin.correo_adjuntos = this.proveedor.correo_adjuntos;
    this.proveedorMin.identificador = this.proveedor.identificador;
    this.proveedorMin.id = this.proveedor.id;
    console.log(this.proveedorMin);
    this._servicio_proveedor.ActualizarProveedorById(this.proveedorMin).subscribe(
      (data) => {
        swal.fire('Éxito', 'Guardado Correctamente', 'success');
        this.txtBtnAgregar = 'Guardar';
        this.router.navigate(['/home/proveedores']);
      }
      , (error) => {
        if (error.status !== 404 && error.status !== 500) {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
          this.txtBtnAgregar = 'Guardar';
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
