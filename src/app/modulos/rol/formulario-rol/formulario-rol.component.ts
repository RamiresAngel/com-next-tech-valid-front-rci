import { Component, OnInit } from '@angular/core';
import { RolService } from '../rol.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../entidades/usuario';
import { StorageService } from '../../../compartidos/login/storage.service';
import { Rol } from 'src/app/entidades/rol';
import { FuncionalidadService } from '../../funcionalidad/funcionalidad.service';
import swal from 'sweetalert2';
import { RolesFuncionalidadService } from '../../roles-funcionalidad/roles-funcionalidad.service';
import { RolFuncionalidad } from 'src/app/entidades/rol-funcionalidad';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { CorporativoService } from '../../corporativo/corporativo.service';
declare var $: any;

@Component({
  selector: 'app-formulario-rol',
  templateUrl: './formulario-rol.component.html',
  styleUrls: ['./formulario-rol.component.css']
})

export class FormularioRolComponent implements OnInit {
  public funcionalidades = [];
  public disponible_cc = false;
  public disponible_crop = false;
  public txtBtnAgregar = 'Guardar';
  public opcion_dispponible: string;
  selectedFuncionalidades: any[] = [];
  private relacionRF = new RolFuncionalidad();
  selectedToAdd: any[] = [];
  selectedToRemove: any[] = [];
  relacionRolFun: any[] = [];

  public rol = new Rol();
  public formulario_rol: FormGroup;
  idrol: any;
  usuario = new Usuario();
  public titulo = '';
  identificador_corporativo: string;
  identificador_sucursal: string;
  identificador_centro_costo: string;
  identificador_usuario: string;
  private datos_iniciales: DatosIniciales;

  constructor(
    private _servicioRoles: RolService,
    private router: Router,
    private _servicio_funcionalidad: FuncionalidadService,
    private _corporativoService: CorporativoService,
    private _activatedRoute: ActivatedRoute
    , private _storageService: StorageService
    , private _servicioRolesFuncionalidad: RolesFuncionalidadService
    , public globals: GlobalsComponent
  ) {
    this.createForm();
  }

  ngOnInit() {
    const corporativo_activo = this._storageService.getCorporativoActivo();
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.identificador_corporativo = corporativo_activo.corporativo_identificador;
    this.identificador_centro_costo = corporativo_activo.centro_costo_identificador;
    this.identificador_sucursal = corporativo_activo.sucursal_identificador;
    this.identificador_usuario = this.datos_iniciales.usuario.identificador_usuario;
    if (!this.globals.menuDinamico.admin_next) {
      this.obtenerFuncionalidades();
    }
    this._activatedRoute.params.subscribe((id) => {
      this.idrol = this._storageService.desencriptar_ids(id['id']);
    });
  }

  inicializarComponentes() {
    if (this.idrol) {
      this._servicioRoles.ObtenerRolMXByid(this.idrol).subscribe(
        (data) => {
          this.rol = data[0];
          this.rol.identificador_agrupador === this.identificador_corporativo ? this.opcion_dispponible = 'opc_corporativo' : this.opcion_dispponible = this.opcion_dispponible;
          this.rol.identificador_agrupador === this.identificador_sucursal ? this.opcion_dispponible = 'opc_sucursal' : this.opcion_dispponible = this.opcion_dispponible;
          this.rol.identificador_agrupador === this.identificador_centro_costo ? this.opcion_dispponible = 'opc_cc' : this.opcion_dispponible = this.opcion_dispponible;
          this.rol.identificador_agrupador === this.identificador_usuario ? this.opcion_dispponible = 'opc_usr' : this.opcion_dispponible = this.opcion_dispponible;

          if (data) {
            this._servicioRolesFuncionalidad.ObtenerRolFuncionalidadMXByidRol(this.idrol).subscribe(
              (dataRelacion: any) => {
                this.selectedToRemove = $.map(dataRelacion, function (obj: any) {
                  obj.id = obj.funcionalidad_id;
                  return obj;
                });
                this.compararFuncionalidades();
              }
              , (error) => {
                console.log(error);
              }
              , () => {

              }
            );
          }
        }
        , (error) => {
          console.log(error);
        }
        , () => {

        }
      );
      this.titulo = 'Editar Rol';
    } else {
      this.titulo = 'Agregar Nuevo Rol';
    }
  }

  obtenerFuncionalidades() {
    this._corporativoService.obtenerFuncionalidadesCorporativo(this.identificador_corporativo).subscribe((data: Array<any>) => {
      data = data.map(x => { x.id = x.funcionalidad_id; return x });
      this.funcionalidades = data;
      this.inicializarComponentes();
    });
  }

  private createForm() {
    this.formulario_rol = new FormGroup({
      nombre: new FormControl('', Validators.required),
      adminnext: new FormControl(),
      admin: new FormControl(),
      myselecttsms: new FormControl(''),
      myselecttsms2: new FormControl(),
      estatus: new FormControl(),
      opcion_dispponible: new FormControl('', Validators.required)
    });
  }

  chosenFuncionalidad(items) {
    this.selectedToAdd = items;
  }

  chosenFuncionalidadToRemove(items) {
    this.selectedToRemove = items;
  }

  assigne() {
    this.selectedFuncionalidades = this.selectedFuncionalidades.concat(
      this.selectedToAdd
    );
    this.funcionalidades = this.funcionalidades.filter(item => {
      return this.selectedFuncionalidades.indexOf(item) < 0;
    });

    this.selectedToAdd = [];
    this.ordenarArray();
  }

  unassigne() {
    this.funcionalidades = this.funcionalidades.concat(this.selectedToRemove);
    this.selectedFuncionalidades = this.selectedFuncionalidades.filter(
      selected => {
        return this.funcionalidades.indexOf(selected) < 0;
      }
    );
    this.selectedToRemove = [];
    this.ordenarArray();
  }
  assigneAll() {
    if (this.funcionalidades.length > 0) {
      this.selectedFuncionalidades = this.selectedFuncionalidades.concat(
        this.funcionalidades
      );
      this.funcionalidades = this.funcionalidades.filter(selected => {
        return this.selectedFuncionalidades.indexOf(selected);
      });
    }
    this.funcionalidades = [];
    this.selectedToAdd = [];
    this.ordenarArray();
  }

  unassigneAll() {
    if (this.selectedFuncionalidades.length > 0) {
      this.funcionalidades = this.funcionalidades.concat(
        this.selectedFuncionalidades
      );
    }
    this.selectedFuncionalidades = [];
    this.selectedToRemove = [];
    this.ordenarArray();
  }

  compararFuncionalidades() {
    this.selectedFuncionalidades = this.selectedToRemove;
    this.selectedFuncionalidades.forEach(item => {
      for (let index = 0; index < this.funcionalidades.length; index++) {
        if (item.id === this.funcionalidades[index].id) {
          this.funcionalidades.splice(index, 1);
        }
      }
    });
    this.ordenarArray();
  }

  public add() {
    if (this.formulario_rol.valid) {
      this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
      switch (this.opcion_dispponible) {
        case 'opc_corporativo':
          this.rol.tipo = 'corporativo';
          this.rol.identificador_agrupador = this.identificador_corporativo; // Agrupador de su corporativo
          break;
        case 'opc_sucursal':
          this.rol.tipo = 'sucursal';
          this.rol.identificador_agrupador = this.identificador_sucursal; // Agrupador de su sucursal
          break;
        case 'opc_cc':
          this.rol.tipo = 'cc';
          this.rol.identificador_agrupador = this.identificador_centro_costo; // Agrupador de su centro de costos
          break;
        case 'opc_usr':
          this.rol.tipo = 'usuario';
          this.rol.identificador_agrupador = this.identificador_usuario; // Agrupador de su corporativo
          break;
      }
      this.rol.clave_facto = this.globals.CLAVE_FACTO;
      this.rol.activo ? this.rol.activo = 1 : this.rol.activo = 0;
      this.rol.administrador_next = 0;
      this.rol.administrador = 0;
      this.rol.identificador_corporativo = this.identificador_corporativo;
      this.rol.corporativo_id = this.identificador_corporativo;
      if (this.idrol) {
        this.rol.identificador_usuario_actualizo = this.datos_iniciales.usuario.identificador_usuario;
        this._servicioRoles.ActualizarRolMX(this.rol).subscribe((data: any) => {
          this._servicioRolesFuncionalidad.deleteRol_Funcionalidad(this.idrol)
            .subscribe(async (del) => {
              await this.selectedFuncionalidades.forEach(item => {
                this.relacionRF.rol_id = this.idrol;
                this.relacionRF.usuario_creo_id = 0;
                this.relacionRF.funcionalidad_id = item.id;
                this._servicioRolesFuncionalidad.GuardarRolFuncionalidadMX(this.relacionRF).subscribe((data2) => { }
                  , (error) => {
                    console.log(error);
                  });
              });
              swal.fire('Éxito', 'Guardado Correctamente', 'success');
              this.router.navigate(['/home/rol']);
              this.txtBtnAgregar = 'Guardar';
            }
            );
        },
          error => {
            swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + error.error.mensaje, 'error');
            this.txtBtnAgregar = 'Guardar';
          });
      } else {
        this.rol.identificador_usuario = this.datos_iniciales.usuario.identificador_usuario;
        this.rol.identificador_usuario_actualizo = this.datos_iniciales.usuario.identificador_usuario;
        this._servicioRoles.GuardarRolMX(this.rol).subscribe((data: any) => {
          this.selectedFuncionalidades.forEach(item => {
            this.relacionRF.rol_id = data;
            this.relacionRF.usuario_creo_id = 0;
            this.relacionRF.funcionalidad_id = item.id;
            this._servicioRolesFuncionalidad.GuardarRolFuncionalidadMX(this.relacionRF).subscribe((data2) => { }
              , (error) => {
                console.log(error);
              });
          });
          swal.fire('Éxito', 'Guardado Correctamente', 'success');
          this.router.navigate(['/home/rol']);
          this.txtBtnAgregar = 'Guardar';
        },
          error => {
            swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + error.error.mensaje, 'error');
            this.txtBtnAgregar = 'Guardar';
          });
      }
    } else {
      swal.fire('Atención', 'Ha ocurrido un error. <br> por favor intentalo denuevo más tarde ', 'error');
      this.txtBtnAgregar = 'Guardar';
    }
  }

  ordenarArray() {
    this.funcionalidades.sort((a, b) => (a.target > b.target) ? 1 : ((b.target > a.target) ? -1 : 0));
    this.selectedFuncionalidades.sort((a, b) => (a.target > b.target) ? 1 : ((b.target > a.target) ? -1 : 0));
  }

  actualizaCorporativo(obj: any) {
    this.identificador_corporativo = obj.value;
    this.obtenerFuncionalidades();
  }

}
