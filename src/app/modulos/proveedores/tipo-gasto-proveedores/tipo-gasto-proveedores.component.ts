import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoGasto } from 'src/app/entidades/Tipo-Gasto';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { isNgTemplate } from '@angular/compiler';
import { ProveedoresService } from '../proveedores.service';
import Swal from 'sweetalert2';
import { Proveedor } from 'src/app/entidades/proveedor';
import { Usuario } from 'src/app/entidades';

@Component({
  selector: 'app-tipo-gasto-proveedores',
  templateUrl: './tipo-gasto-proveedores.component.html',
  styleUrls: ['./tipo-gasto-proveedores.component.css']
})
export class TipoGastoProveedoresComponent implements OnInit {

  public id_proveedor: string;
  public list_tipo_gasto: TipoGasto[] = [];
  public lista_tipos_gastos_seleccionados: TipoGasto[] = [];
  seleccionado_agregar: any[] = [];
  seleccionados_quitar: any[] = [];
  relacion_proveedor_tipo_gasto: any[] = [];
  public formulario_tipo_gasto_proveedores: FormGroup;
  public proveedor = new Proveedor();
  public txtBtnAgregar = 'Guardar';
  usuario: Usuario;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService,
    private _compratidosService: CompartidosService,
    private _proveedoresService: ProveedoresService,
    private router: Router
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
    this.usuario = this._storageService.getDatosIniciales().usuario;
    this.id_proveedor = this._storageService.desencriptar_ids(this._activatedRoute.snapshot.params['id']);
    console.log(this.id_proveedor);
    this._compratidosService.obtenerTipoGasto(this.usuario.identificador_corporativo).subscribe((data: any) => {
      this.list_tipo_gasto = data;
    },
      error => {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }, () => {
        // this.obtenerListaTipoGastoProveedor();
        this.cargarUsuarioById();
      });

  }
  cargarUsuarioById() {
    if (this.id_proveedor) {
      this._proveedoresService.ObtenerProveedorMXByid(this.id_proveedor).subscribe(
        (data: any) => {
          this.proveedor = data;
        }
        , (error) => {
          console.log(error);
          Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + error.error.mensaje, 'error');
        }
        , () => {
          this.obtenerListaTipoGastoProveedor();
        }
      );
    }
  }

  public obtenerListaTipoGastoProveedor() {
    this._proveedoresService.getListaTipoGastoProveedores(this.proveedor.identificador).subscribe(
      (dataRelacion: any) => {
        // this.seleccionados_quitar = $.map(dataRelacion, function (obj: any) {
        //   obj.id = obj.identificador_proveedor;
        //   obj.text = obj.proveedor;
        //   return obj;
        // });
        this.relacion_proveedor_tipo_gasto = dataRelacion;
        this.compararFuncionalidades();
      }
      , (error) => {
        console.log(error);
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + error.error.mensaje, 'error');
      }
      , () => {

      }
    );
  }

  compararFuncionalidades() {
    // this.lista_tipos_gastos_seleccionados = this.seleccionados_quitar;
    this.relacion_proveedor_tipo_gasto.forEach(item => {
      for (let index = 0; index < this.list_tipo_gasto.length; index++) {
        if (item.tipo_gasto_id === this.list_tipo_gasto[index].id) {
          this.lista_tipos_gastos_seleccionados.push(this.list_tipo_gasto[index]);
          this.list_tipo_gasto.splice(index, 1);
        }
      }
    });
    this.ordenarArray();
  }

  iniciarFormulario() {
    this.formulario_tipo_gasto_proveedores = new FormGroup({
      tipos_gasto: new FormControl(''),
      tipo_gasto_seleccionado: new FormControl('', Validators.required)
    });
  }

  eliminarTodo() {
    if (this.lista_tipos_gastos_seleccionados.length > 0) {
      this.list_tipo_gasto = this.list_tipo_gasto.concat(
        this.lista_tipos_gastos_seleccionados
      );
    }
    this.lista_tipos_gastos_seleccionados = [];
    this.seleccionado_agregar = [];
    this.ordenarArray();
  }
  agregarTodo() {
    if (this.list_tipo_gasto.length > 0) {
      this.lista_tipos_gastos_seleccionados = this.lista_tipos_gastos_seleccionados.concat(
        this.list_tipo_gasto
      );
      this.list_tipo_gasto = this.list_tipo_gasto.filter(selected => {
        return this.lista_tipos_gastos_seleccionados.indexOf(selected);
      });
    }
    this.list_tipo_gasto = [];
    this.seleccionado_agregar = [];
    this.ordenarArray();
  }
  eliminar() {
    this.list_tipo_gasto = this.list_tipo_gasto.concat(this.seleccionados_quitar);
    this.lista_tipos_gastos_seleccionados = this.lista_tipos_gastos_seleccionados.filter(
      selected => {
        return this.list_tipo_gasto.indexOf(selected) < 0;
      }
    );
    this.seleccionados_quitar = [];
    this.ordenarArray();
  }

  // selectedFuncionalidades  = lista_tipos_gastos_seleccionados
  // selectedToAdd  = seleccionado_agregar
  // selectedToRemove  = seleccionado_agregar
  // funcionalidades  = list_tipo_gasto
  agregar() {
    this.lista_tipos_gastos_seleccionados = this.lista_tipos_gastos_seleccionados.concat(
      this.seleccionado_agregar
    );
    this.list_tipo_gasto = this.list_tipo_gasto.filter(item => {
      return this.lista_tipos_gastos_seleccionados.indexOf(item) < 0;
    });

    this.seleccionado_agregar = [];
    this.ordenarArray();
  }

  seleccionarParaEliminar(item) {
    this.seleccionados_quitar = item;
  }

  seleccionarParaAgregar(item: any) {
    // console.log(item);
    this.seleccionado_agregar = item;
  }
  guardarDatos() {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.relacion_proveedor_tipo_gasto = null;
    this.relacion_proveedor_tipo_gasto = new Array<any>();
    this.lista_tipos_gastos_seleccionados.forEach(obj => {
      this.relacion_proveedor_tipo_gasto.push({
        identificador_proveedor: this.proveedor.identificador,
        tipo_gasto_id: obj.id,
      });
    });
    this._proveedoresService.guardarTipoGastoProveedor(this.relacion_proveedor_tipo_gasto).subscribe((data: any) => {
      Swal.fire('Éxito', 'Guardado Correctamente', 'success');
      this.txtBtnAgregar = 'Guardar';
      this.router.navigate(['/home/proveedores']);
    },
      (error) => {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        this.txtBtnAgregar = 'Guardar';
      },
      () => {
        this.txtBtnAgregar = 'Guardar';
      }
    );
    console.log(this.relacion_proveedor_tipo_gasto);
  }

  ordenarArray() {
    this.list_tipo_gasto.sort((a, b) => (a.descripcion > b.clave) ? 1 : ((b.clave > a.clave) ? -1 : 0));
    this.lista_tipos_gastos_seleccionados.sort((a, b) => (a.clave > b.clave) ? 1 : ((b.clave > a.clave) ? -1 : 0));
  }
}
