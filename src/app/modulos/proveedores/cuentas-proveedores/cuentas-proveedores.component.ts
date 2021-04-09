import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../proveedores.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Proveedor } from 'src/app/entidades/proveedor';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import swal from 'sweetalert2';
import { CuentaService } from '../../cuenta/cuenta.service';



@Component({
  selector: 'app-cuentas-proveedores',
  templateUrl: './cuentas-proveedores.component.html',
  styleUrls: ['./cuentas-proveedores.component.css']
})
export class CuentasProveedoresComponent implements OnInit {
  corporativo_activo: CorporativoActivo;
  private id_proveedor: any;
  public lista_cuentas: any;
  public lista_cuentas_filtrar: any;
  public nombre_proveedor = 'Alguien';
  public startValue_contribuyente: any;
  public txtBtnAgregar = 'Guardar';
  public texto_filtro = '';
  public options: Select2Options;
  public proveedor = new Proveedor();
  public identificadores_guardar = new Array<any>();

  selectedToAdd: any[] = [];
  selectedToRemove: any[] = [];
  selectedCuentas: any[] = [];
  relacionRolFun: any[] = [];

  constructor(
    public _globales: GlobalsComponent,
    private _activatedRoute: ActivatedRoute,
    private _servicio_proveedor: ProveedoresService,
    private _storageService: StorageService,
    private _cuentaService: CuentaService,
    private router: Router

  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this._activatedRoute.params.subscribe((id) => {
      this.id_proveedor = this._storageService.desencriptar_ids(id['id']);
    });
    this.cargarCuentas();
  }

  ngOnInit() {
    this.options = {
      multiple: true,
      placeholder: 'Seleccione una Cuenta'
    };
  }

  cargarCuentas() {
    this._cuentaService.obtenerCuentaCorporativo(this.corporativo_activo.corporativo_identificador).subscribe(
      (data) => {
        this.lista_cuentas = $.map(data, function (obj: any) {
          obj.id = obj.identificador;
          obj.text = obj.codigo + ' - ' + (obj.cuenta_descripcion ? obj.cuenta_descripcion : obj.descripcion_cuenta);
          return obj;
        });
        this.lista_cuentas_filtrar = this.lista_cuentas;
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + error.error.mensaje, 'error');
      }
      , () => {
        this.cargarUsuarioById();
      }
    );
  }

  public obtenerListCuentaProveedor() {
    this._servicio_proveedor.getListaRelacionCuentaProveedor(this.proveedor.identificador).subscribe(
      (dataRelacion: any) => {
        this.selectedToRemove = $.map(dataRelacion, function (obj: any) {
          obj.id = obj.identificador_cuenta;
          obj.text = `${obj.codigo} - ${obj.cuenta_descripcion ? obj.cuenta_descripcion : obj.descripcion_cuenta}`;
          return obj;
        });
        this.compararCuentas();
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
          this.obtenerListCuentaProveedor();
        }
      );
    }
  }

  choosenCuentas(items) {
    this.selectedToAdd = items;
  }

  choosenCuentasToRemove(items) {
    this.selectedToRemove = items;
  }

  assigne() {
    this.selectedCuentas = this.selectedCuentas.concat(
      this.selectedToAdd
    );
    this.lista_cuentas = this.lista_cuentas.filter(item => {
      return this.selectedCuentas.indexOf(item) < 0;
    });
    this.lista_cuentas_filtrar = this.lista_cuentas;
    this.texto_filtro = '';

    this.selectedToAdd = [];
    this.orderArray();
  }

  unassigne() {
    this.lista_cuentas = this.lista_cuentas.concat
      (this.selectedToRemove);
    this.selectedCuentas = this.selectedCuentas.filter(
      selected => {
        return this.lista_cuentas.indexOf(selected) < 0;
      }
    );
    this.lista_cuentas_filtrar = this.lista_cuentas;
    this.texto_filtro = '';
    this.selectedToRemove = [];
    this.orderArray();
  }

  assigneAll() {
    if (this.lista_cuentas.length > 0) {
      this.selectedCuentas = this.selectedCuentas.concat(
        this.lista_cuentas
      );
      this.lista_cuentas = this.lista_cuentas.filter(selected => {
        return this.selectedCuentas.indexOf(selected);
      });
      this.lista_cuentas_filtrar = this.lista_cuentas;
      this.texto_filtro = '';
    }
    this.lista_cuentas = [];
    this.selectedToAdd = [];
    this.orderArray();
  }

  unassigneAll() {
    if (this.selectedCuentas.length > 0) {
      this.lista_cuentas = this.lista_cuentas.concat(
        this.selectedCuentas
      );
    }
    this.lista_cuentas_filtrar = this.lista_cuentas;
    this.texto_filtro = '';
    this.selectedCuentas = [];
    this.selectedToRemove = [];
    this.orderArray();
  }

  orderArray() {
    this.lista_cuentas.sort((a, b) => (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0));
    this.selectedCuentas.sort((a, b) => (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0));
  }

  compararCuentas() {
    this.selectedCuentas = this.selectedToRemove;
    this.selectedCuentas.forEach(item => {
      for (let index = 0; index < this.lista_cuentas.length; index++) {
        if (item.id === this.lista_cuentas[index].id) {
          this.lista_cuentas.splice(index, 1);
        }
      }
      this.orderArray();
    });
    this.lista_cuentas_filtrar = this.lista_cuentas;
    this.texto_filtro = '';
  }

  public agregarCuentas() {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.selectedCuentas.forEach(item => {
      const aux = {
        identificador_proveedor: this.proveedor.identificador,
        identificador_cuenta: item.id
      };
      this.identificadores_guardar.push(aux);
    });
    console.log(this.identificadores_guardar);
    this._servicio_proveedor.guardarProveedorCuentas
      (this.identificadores_guardar).subscribe(
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
      this.lista_cuentas_filtrar = this.lista_cuentas.filter(x =>
        String(this.omitirAcentos(x.text)).toLowerCase().includes(text.toLowerCase()));
    } else {
      this.lista_cuentas_filtrar = this.lista_cuentas.filter(x =>
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










