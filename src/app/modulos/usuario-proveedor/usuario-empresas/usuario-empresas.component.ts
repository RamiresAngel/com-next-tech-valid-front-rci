import { Component, OnInit } from '@angular/core';
import { Proveedor, CorporativoActivo, DatosIniciales } from 'src/app/entidades';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from '../../proveedores/proveedores.service';
import { DepartamentoService } from '../../departamento/departamento.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import swal from 'sweetalert2';
import { ContribuyenteService } from '../../contribuyente/contribuyente.service';

@Component({
  selector: 'app-usuario-empresas',
  templateUrl: './usuario-empresas.component.html',
  styleUrls: ['./usuario-empresas.component.css']
})
export class UsuarioEmpresasComponent implements OnInit {

  corporativo_activo: CorporativoActivo;
  private id_proveedor: any;
  public llista_despartamentos: any;
  public nombre_proveedor = 'Fulanito';
  public startValue_contribuyente: any;
  public txtBtnAgregar = 'Guardar';
  public options: Select2Options;
  public proveedor = new Proveedor();
  public identificadores_guardar = new Array<any>();

  public tipo_erp: string;
  selectedDepartamentos: any[] = [];
  selectedToAdd: any[] = [];
  selectedToRemove: any[] = [];
  relacionRolFun: any[] = [];
  datos_inciales: DatosIniciales;

  constructor(
    public _globales: GlobalsComponent,
    private _activatedRoute: ActivatedRoute
    , private _servicio_proveedor: ProveedoresService
    , private _storageService: StorageService
    , private _servicio_contribuyentes: ContribuyenteService
    , private router: Router
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this._activatedRoute.params.subscribe((id) => {
      this.id_proveedor = this._storageService.desencriptar_ids(id['id']);
      this.proveedor.identificador = this._storageService.desencriptar_ids(id['id']);
    });
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.tipo_erp = this.datos_inciales.funcionalidades.find(o => o.clave === 'VISTA_CARGADOC').valor;
    this.cargarContribuyentes();
  }
  ngOnInit() {

  }

  cancelar() {
    if (this.tipo_erp === 'carga_doc_no_erp') {
      this.router.navigateByUrl('/home/proveedores');
    } else {
      this.router.navigate(['/home/usuario_proveedor']);
    }
  }
  cargarContribuyentes() {
    this._servicio_contribuyentes.ObtenerListaContribuyentesMXPorCorporativo(
      this.corporativo_activo.corporativo_identificador
      , this.datos_inciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
    ).subscribe(
      (data) => {
        this.llista_despartamentos = $.map(data, function (obj: any) {
          obj.id = obj.identificador;
          obj.text = obj.razon_social;
          return obj;
        });
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + error.error.mensaje, 'error');
      }
      , () => {

        if (this.tipo_erp === 'carga_doc_no_erp') {
          this.obtenerListdaDepartamentosProveedorNoERP();
        } else {
          this.obtenerListdaDepartamentosProveedor();
        }
      }
    );
  }
  obtenerListdaDepartamentosProveedorNoERP() {
    this._servicio_contribuyentes.ObtenerContribuyentesProveedorNoERP(this.proveedor.identificador).subscribe(
      (data) => {
        this.selectedToRemove = $.map(data, function (obj: any) {
          obj.id = obj.identificador_contribuyente;
          obj.text = obj.contribuyente;
          return obj;
        });
        this.compararFuncionalidades();
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + error.error.mensaje, 'error');
      }
    );
  }

  cargarUsuarioById() {
    this.obtenerListdaDepartamentosProveedor();
  }

  public obtenerListdaDepartamentosProveedor() {
    this._servicio_proveedor.ObtenerRelAcreedorEmpresas(this.proveedor.identificador).subscribe(
      (dataRelacion: any) => {
        this.selectedToRemove = $.map(dataRelacion, function (obj: any) {
          obj.id = obj.identificador_contribuyente;
          obj.text = obj.contribuyente;
          return obj;
        });
        this.compararFuncionalidades();
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + error.error.mensaje, 'error');
      }
      , () => {

      }
    );
  }

  compararFuncionalidades() {
    this.selectedDepartamentos = this.selectedToRemove;
    this.selectedDepartamentos.forEach(item => {
      for (let index = 0; index < this.llista_despartamentos.length; index++) {
        if (item.id === this.llista_despartamentos[index].id) {
          this.llista_despartamentos.splice(index, 1);
        }
      }
    });
    this.ordenarArray();
  }

  ordenarArray() {
    this.llista_despartamentos.sort((a, b) => (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0));
    this.selectedDepartamentos.sort((a, b) => (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0));
  }

  chosenFuncionalidad(items) {
    this.selectedToAdd = items;
  }

  chosenFuncionalidadToRemove(items) {
    this.selectedToRemove = items;
  }
  assigne() {
    this.selectedDepartamentos = this.selectedDepartamentos.concat(
      this.selectedToAdd
    );
    this.llista_despartamentos = this.llista_despartamentos.filter(item => {
      return this.selectedDepartamentos.indexOf(item) < 0;
    });

    this.selectedToAdd = [];
    this.ordenarArray();
  }

  unassigne() {
    this.llista_despartamentos = this.llista_despartamentos.concat(this.selectedToRemove);
    this.selectedDepartamentos = this.selectedDepartamentos.filter(
      selected => {
        return this.llista_despartamentos.indexOf(selected) < 0;
      }
    );
    this.selectedToRemove = [];
    this.ordenarArray();
  }

  assigneAll() {
    if (this.llista_despartamentos.length > 0) {
      this.selectedDepartamentos = this.selectedDepartamentos.concat(
        this.llista_despartamentos
      );
      this.llista_despartamentos = this.llista_despartamentos.filter(selected => {
        return this.selectedDepartamentos.indexOf(selected);
      });
    }
    this.llista_despartamentos = [];
    this.selectedToAdd = [];
    this.ordenarArray();
  }

  unassigneAll() {
    if (this.selectedDepartamentos.length > 0) {
      this.llista_despartamentos = this.llista_despartamentos.concat(
        this.selectedDepartamentos
      );
    }
    this.selectedDepartamentos = [];
    this.selectedToRemove = [];
    this.ordenarArray();
  }

  public add() {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.selectedDepartamentos.forEach(element => {
      const aux = {
        identificador_proveedor: this.proveedor.identificador,
        identificador_contribuyente: element.id
      };
      this.identificadores_guardar.push(aux);
    });
    this._servicio_proveedor.GuardarContribuyenteEmpresa(this.identificadores_guardar).subscribe(
      (data) => {
        if (data === 'ok') {
          swal.fire('Éxito', 'Guardado Correctamente', 'success');
          // this.router.navigate(['/home/usuario_proveedor']);
          this.txtBtnAgregar = 'Guardar';
          this.cancelar();
        } else {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + data, 'error');
        }
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + error.error.mensaje, 'error');
        this.txtBtnAgregar = 'Guardar';
      }
      , () => {
        this.txtBtnAgregar = 'Guardar';
      }
    );
  }

}
