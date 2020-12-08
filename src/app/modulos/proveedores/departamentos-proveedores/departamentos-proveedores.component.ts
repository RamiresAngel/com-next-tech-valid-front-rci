import { Component, OnInit } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from '../proveedores.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { DepartamentoService } from '../../departamento/departamento.service';
import { Proveedor } from 'src/app/entidades/proveedor';
import swal from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DatosIniciales } from 'src/app/entidades';

@Component({
  selector: 'app-departamentos-proveedores',
  templateUrl: './departamentos-proveedores.component.html',
  styleUrls: ['./departamentos-proveedores.component.css']
})
export class DepartamentosProveedoresComponent implements OnInit {

  corporativo_activo: CorporativoActivo;
  private id_proveedor: any;
  public lista_despartamentos: any;
  public lista_despartamentos_filtrar: any;
  public nombre_proveedor = 'Fulanito';
  public startValue_contribuyente: any;
  public txtBtnAgregar = 'Guardar';
  public texto_filtro = '';
  public options: Select2Options;
  public proveedor = new Proveedor();
  public identificadores_guardar = new Array<any>();


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
    , private _servicio_departamentos: DepartamentoService
    , private router: Router
  ) {
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this._activatedRoute.params.subscribe((id) => {
      this.id_proveedor = this._storageService.desencriptar_ids(id['id']);
    });
    this.cargarDepartamentos();
  }

  ngOnInit() {
    this.options = {
      multiple: true,
      placeholder: 'Seleccione un departamento'
    };
  }

  cargarDepartamentos() {
    this._servicio_departamentos.obtenerDepartamentoPorCorporativo(
      this.corporativo_activo.corporativo_identificador
      , this.datos_inciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
      ).subscribe(
      (data) => {
        this.lista_despartamentos = $.map(data, function (obj: any) {
          obj.id = obj.identificador;
          obj.text = `${obj.clave_departamento} - ${obj.descripcion}`;
          return obj;
        });
        this.lista_despartamentos_filtrar = this.lista_despartamentos;
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + error.error.mensaje, 'error');
      }
      , () => {
        this.cargarUsuarioById();
      }
    );
  }

  public obtenerListdaDepartamentosProveedor() {
    this._servicio_proveedor.getListaDepartamentosProveedores(this.proveedor.identificador).subscribe(
      (dataRelacion: any) => {
        this.selectedToRemove = $.map(dataRelacion, function (obj: any) {
          obj.id = obj.identificador_departamento;
          obj.text = `${obj.codigo_departamento} - ${obj.departamento}`;
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

  cargarUsuarioById() {
    if (this.id_proveedor) {
      this._servicio_proveedor.ObtenerProveedorMXByid(this.id_proveedor).subscribe(
        (data: any) => {
          this.proveedor = data;
        }
        , (error) => {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + error.error.mensaje, 'error');
        }
        , () => {
          this.obtenerListdaDepartamentosProveedor();
        }
      );
    }
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
    this.lista_despartamentos = this.lista_despartamentos.filter(item => {
      return this.selectedDepartamentos.indexOf(item) < 0;
    });
    this.lista_despartamentos_filtrar = this.lista_despartamentos;
    this.texto_filtro = '';
    this.selectedToAdd = [];
    this.ordenarArray();
  }

  unassigne() {
    this.lista_despartamentos = this.lista_despartamentos.concat(this.selectedToRemove);
    this.selectedDepartamentos = this.selectedDepartamentos.filter(
      selected => {
        return this.lista_despartamentos.indexOf(selected) < 0;
      }
    );
    this.lista_despartamentos_filtrar = this.lista_despartamentos;
    this.selectedToRemove = [];
    this.ordenarArray();
  }

  assigneAll() {
    if (this.lista_despartamentos.length > 0) {
      this.selectedDepartamentos = this.selectedDepartamentos.concat(
        this.lista_despartamentos
      );
      this.lista_despartamentos = this.lista_despartamentos.filter(selected => {
        return this.selectedDepartamentos.indexOf(selected);
      });
      this.lista_despartamentos_filtrar = this.lista_despartamentos;
      this.texto_filtro = '';
    }
    this.lista_despartamentos = [];
    this.selectedToAdd = [];
    this.ordenarArray();
  }

  unassigneAll() {
    if (this.selectedDepartamentos.length > 0) {
      this.lista_despartamentos = this.lista_despartamentos.concat(
        this.selectedDepartamentos
      );
      this.lista_despartamentos_filtrar = this.lista_despartamentos;
      this.texto_filtro = '';
    }
    this.selectedDepartamentos = [];
    this.selectedToRemove = [];
    this.ordenarArray();
  }

  ordenarArray() {
    this.lista_despartamentos.sort((a, b) => (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0));
    this.selectedDepartamentos.sort((a, b) => (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0));
  }

  compararFuncionalidades() {
    this.selectedDepartamentos = this.selectedToRemove;
    this.selectedDepartamentos.forEach(item => {
      for (let index = 0; index < this.lista_despartamentos.length; index++) {
        if (item.id === this.lista_despartamentos[index].id) {
          this.lista_despartamentos.splice(index, 1);
        }
      }
    });
    this.lista_despartamentos_filtrar = this.lista_despartamentos;
    this.texto_filtro = '';
    this.ordenarArray();
  }


  public add() {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.selectedDepartamentos.forEach(element => {
      const aux = {
        identificador_proveedor: this.proveedor.identificador,
        identificador_departamento: element.id
      };
      this.identificadores_guardar.push(aux);
    });
    console.log(this.identificadores_guardar);
    this._servicio_proveedor.GuardarProveedorDepartamento(this.identificadores_guardar).subscribe(
      (data) => {
        if (data === 'ok') {
          swal.fire('Éxito', 'Guardado Correctamente', 'success');
          this.router.navigate(['/home/proveedores']);
          this.txtBtnAgregar = 'Guardar';
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

  filtrar(text: string) {
    if (text.length > 2) {
      this.lista_despartamentos_filtrar = this.lista_despartamentos.filter(x =>
        String(this.omitirAcentos(x.text)).toLowerCase().includes(text.toLowerCase()));
    } else {
      this.lista_despartamentos_filtrar = this.lista_despartamentos.filter(x =>
        String(this.omitirAcentos(x.text)).toLowerCase().includes(''));
    }
  }
  omitirAcentos(text: string): string {
    const acentos = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
    const original = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
    for (let i = 0; i < acentos.length; i++) {
      text = text.replace(acentos.charAt(i), original.charAt(i));
    }
    return text;
  }

}
