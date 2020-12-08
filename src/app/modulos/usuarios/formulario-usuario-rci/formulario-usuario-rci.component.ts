import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { UsuarioService } from '../usuario.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Usuario } from 'src/app/entidades/usuario';
import { FormGroup, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { RolService } from '../../rol/rol.service';
import { CentroCostos } from 'src/app/entidades/centro-costos';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { Rol } from 'src/app/entidades/rol';
import { DepartamentoService } from '../../departamento/departamento.service';
import { ContribuyenteService } from '../../contribuyente/contribuyente.service';
import { CentroCostosService } from '../../centro-costos/centro-costos.service';
import { resolve } from 'url';
import { Prestaciones, PrestacionSaldoUsuario } from 'src/app/entidades';
import { PrestacionesService } from '../../prestaciones/prestaciones.service';
declare var $: any;

@Component({
  selector: 'app-formulario-usuario-rci',
  templateUrl: './formulario-usuario-rci.component.html',
  styleUrls: ['./formulario-usuario-rci.component.css']
})
export class FormularioUsuarioRciComponent {
  public txtBtnAgregar = 'Guardar';
  public error = false;
  accion_usuario: string;
  id_usuario: string;
  usuario = new Usuario();
  identificador_corporativo: string;
  formulario_usuario_rci: FormGroup;
  public datos_inciales: DatosIniciales;
  public corporativo_activo: CorporativoActivo;
  lista_roles: Rol[];
  CATEGORIA_AGRUPADOR = [
    { text: 'Corporativo', id: 'corporativo', },
    { text: 'Usuario', id: 'usuario' },
    { text: 'Sucursal', id: 'sucursal' },
    { text: 'Centro Costo', id: 'cc' },
  ];
  lista_usuarios: Usuario[];
  lista_usuarios_asistentes: Usuario[];
  lista_departamentos: any;
  lista_contribuyentes: any;
  public cargando = true;
  public logo_img = './assets/img/NEXT_5.png';
  public array_centro_costos: CentroCostos[];
  public aux_cc_selected = null;
  public aux_jefe_selected = null;
  public lista_relaciones = [{
    id: 0,
    usuario_id: 0,
    centro_consumo_identificador: '',
    fecha_creacion: '',
    rol_id: 0,
    rol_nombre: '',
    centro_consumo_nombre: ''
  }];
  public lista_prestaciones = new Array<Prestaciones>();
  public lista_saldos: Array<PrestacionSaldoUsuario>;
  public saldo_prestacion_edit = new PrestacionSaldoUsuario();

  constructor(
    private _activatedRoute: ActivatedRoute,
    public globals: GlobalsComponent,
    private _usauriosService: UsuarioService,
    private _router: Router,
    private _storageService: StorageService,
    private _rolesService: RolService,
    private _departamentoService: DepartamentoService,
    private _servicioContribuyentes: ContribuyenteService,
    private _servicio_centro_costos: CentroCostosService,
    public _servicePrestacion: PrestacionesService
  ) {
    this.iniciarFormulario();
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this._activatedRoute.params.subscribe(id => {
      this.id_usuario = this._storageService.desencriptar_ids(id['id']);
      this.cargarDatos();
    });
  }

  async cargarDatos() {
    await this.cargarUsuarios();
    await this.cargarDepartamentos();
    await this.cargarCompanias();
    await this.cargarRoles();
    await this.cargarCentrosCosto();
    if (this.id_usuario) {
      this.accion_usuario = 'Editar';
      this._usauriosService.obtnerUsuarioId(this.id_usuario).subscribe((data: any) => {
        this.usuario = data;
        if (this.usuario.cc.length > 0) {
          let aux: any;
          aux = this.usuario.cc;
          this.lista_relaciones = aux;
        }
        if (this.usuario.cuenta_distribucion) {
          this.aux_cc_selected = this.usuario.cuenta_distribucion.split('-')[2];
        } else {
          this.aux_cc_selected = '';
        }
        if (this.usuario.identificador_usuario) {
          this.cargarSaldos();
        }
        this.iniciarFormulario();
        this.cargando = false;

      });
    } else {
      this.iniciarFormulario();
      this.cargando = false;
      this.accion_usuario = 'Agregar Nuevo ';
      this.cargando = false;
    }
  }

  iniciarFormulario() {
    this.formulario_usuario_rci = new FormGroup({
      nombre: new FormControl(this.usuario.nombre ? this.usuario.nombre : ''),
      correo: new FormControl(this.usuario.email ? this.usuario.email : ''),
      rfc: new FormControl(this.usuario.rfc ? this.usuario.rfc : ''),
      numero_empleado: new FormControl(this.usuario.numero_empleado ? this.usuario.numero_empleado : ''),
      cuenta_distribucion: new FormControl(this.usuario.cuenta_distribucion ? this.usuario.cuenta_distribucion : ''),
      centro_costo: new FormControl(this.usuario.centro_costo ? this.usuario.centro_costo : ''),
      estatus: new FormControl(this.usuario.estatus ? this.usuario.estatus : 0),
      aprobador: new FormControl(this.usuario.aprobador ? this.usuario.aprobador : 0),
      rol: new FormControl(this.usuario.rol ? this.usuario.rol : ''),
      jefe_inmediato: new FormControl(this.usuario.identificador_jefe_inmediato ? this.usuario.identificador_jefe_inmediato : ''),
      asistente: new FormControl(this.usuario.identificador_asistente ? this.usuario.identificador_asistente : ''),
      telefono: new FormControl(this.usuario.telefono ? this.usuario.telefono : ''),
      departamento: new FormControl(this.usuario.identificador_departamento ? this.usuario.identificador_departamento : ''),
      compania: new FormControl(this.usuario.identificador_compania ? this.usuario.identificador_compania : ''),
      activo: new FormControl(this.usuario.estatus ? this.usuario.estatus : '')
    });
  }

  agrgarSaldo() {
    this.saldo_prestacion_edit = new PrestacionSaldoUsuario();
    this.modal();
  }

  modal() {
    $('#Modal').modal('show');
  }

  borrarRelacion(id_relacion_saldo_prestacion: number) {
    console.log(id_relacion_saldo_prestacion);
    swal.fire({
      title: '¿Seguro que desea eliminar este saldo de la prestación?',
      text: '!Este proceso es irreversible!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, ¡Cerrar!',
      confirmButtonText: 'Si, ¡Eliminar!'
    }).then((result) => {
      if (result.value) {
        // Eliminar saldo
        this._usauriosService.delSaldoUsuario(id_relacion_saldo_prestacion).subscribe(
          (data: any) => {
            console.log(data);
            swal.fire('Éxito', 'Saldo eliminado con éxito', 'success');
            this.cargarSaldos();
          },
          (error) => {
            if (error.error) {
              swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
            } else {
              swal.fire('Atención', 'Ha ocurrido un error desconocido ', 'error');
            }
          });
      }
    });
  }

  editarRelacion(saldo_prestacion: PrestacionSaldoUsuario) {
    this.saldo_prestacion_edit = saldo_prestacion;
    this.modal();
  }


  async cargarRoles() {
    const agrupador = [
      {
        tipo: 'corporativo',
        identificador_agrupador: this.datos_inciales.usuario.identificador_corporativo
      },
      {
        tipo: 'sucursal',
        identificador_agrupador: this.corporativo_activo.sucursal_identificador
      },
      {
        tipo: 'cc',
        identificador_agrupador: this.corporativo_activo.centro_costo_identificador
      },
      {
        tipo: 'usuario',
        identificador_agrupador: this.datos_inciales.usuario.identificador_usuario
      }
    ];
    this._rolesService.ObtenerListaRolesMXMinPorAgrupador(agrupador).subscribe(
      (data: any) => {
        this.lista_roles = data;
        this.lista_roles = this.globals.prepararSelect2(this.lista_roles, 'id', 'nombre');
      },
      error => {
        this.error = true;
      }
    );
  }

  cargarUsuarios() {
    return new Promise((resolve, reject) => {
      this._usauriosService.obtenerUsuariosCorporativo(this.datos_inciales.usuario.identificador_corporativo)
        .subscribe(
          (data: any) => {
            this.lista_usuarios = $.map(data, (obj) => {
              obj.identificador_usuario = obj.identificador_usuario;
              obj.nombre = `${obj.nombre} ${obj.apellido_paterno}`;
              return obj;
            });
            this.lista_usuarios_asistentes = data;
            this.lista_usuarios = this.globals.prepararSelect2(this.lista_usuarios, 'identificador_usuario', 'nombre');
            this.lista_usuarios_asistentes = this.globals.prepararSelect2(this.lista_usuarios_asistentes, 'identificador_usuario', 'nombre');
            resolve();
          },
          error => {
            console.log(error);
          },
          () => { }
        );
    });
  }

  cargarDepartamentos() {
    return new Promise((resolve, reject) => {
      this._departamentoService.obtenerDepartamentoPorCorporativo(this.datos_inciales.usuario.identificador_corporativo, this.datos_inciales.usuario.identificador_usuario, Number(this.corporativo_activo.rol_identificador)).subscribe((data: any) => {
        this.lista_departamentos = data;
        this.lista_departamentos = this.globals.prepararSelect2(this.lista_departamentos, 'identificador', 'descripcion');
        resolve();
      }, error => {
        console.log(error);
      }, () => { });
    });
  }

  cargarCompanias() {
    return new Promise((resolve, reject) => {
      this._servicioContribuyentes.ObtenerListaContribuyentesMXPorCorporativo(this.datos_inciales.usuario.identificador_corporativo, this.datos_inciales.usuario.identificador_usuario, Number(this.corporativo_activo.rol_identificador)).subscribe(
        (data: any) => {
          this.lista_contribuyentes = data;
          this.lista_contribuyentes = this.globals.prepararSelect2(this.lista_contribuyentes, 'identificador', 'nombre');
          resolve();
        }
        , (error) => {
          console.log(error);
        }
        , () => { }
      );
    });
  }

  cargarCentrosCosto() {
    return new Promise((resolve, reject) => {
      this._servicio_centro_costos.ObtenerListaCentroCostosMXPorCorporativo(this.datos_inciales.usuario.identificador_corporativo, this.datos_inciales.usuario.identificador_usuario, Number(this.corporativo_activo.rol_identificador)).subscribe(
        (data: any) => {
          this.array_centro_costos = data;
          this.array_centro_costos = this.globals.prepararSelect2(this.array_centro_costos, 'codigo', 'nombre');
          resolve();
        }
        , (error) => {
          console.log(error);
        }
        , () => { }
      );
    });
  }

  cargarSaldos() {
    this._usauriosService.getSaldosPrestacion(this.usuario.identificador_usuario).subscribe(
      (data: any) => {
        console.log(data);
        this.lista_saldos = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  actualizarCC(centro_costo) {
    this.lista_relaciones[0].centro_consumo_identificador = centro_costo.data[0].centro_consumo_identificador;
    this.lista_relaciones[0].centro_consumo_nombre = centro_costo.data[0].nombre;
    this.lista_relaciones[0].usuario_id = this.usuario.id;
  }

  actualizarCompania(compania) {
    if (compania.value !== '') {
      this.usuario.identificador_compania = compania.value;
    }
  }

  actualizaRol(rol) {
    if (rol.data.length > 0) {
      this.lista_relaciones[0].rol_id = Number(rol.value);
      this.lista_relaciones[0].rol_nombre = rol.data[0].nombre;
      this.lista_relaciones[0].usuario_id = this.usuario.id;
    }
  }

  actualizarJefe(jefe) {
    if (jefe.value !== '') {
      this.usuario.identificador_jefe_inmediato = jefe.value;
    }
  }

  actualizarAsistente(asistente) {
    if (asistente.value !== '') {
      this.usuario.identificador_asistente = asistente.value;
    }
  }

  actualizarDepartamento(departamento) {
    if (departamento.value !== '') {
      this.usuario.identificador_departamento = departamento.value;
    }
  }

  onSubmit() {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.usuario.estatus = this.formulario_usuario_rci.get('estatus').value ? 1 : 0;
    this.usuario.aprobador = this.formulario_usuario_rci.get('aprobador').value ? 1 : 0;
    let aux: any = this.lista_relaciones;
    this.usuario.cc[0] = aux[0];
    if (this.formulario_usuario_rci.valid) {
      this.actualizarUsuario();
      this.txtBtnAgregar = 'Guardar';
    }
  }

  actualizarUsuario() {
    this.cargando = true;
    this.usuario.activo = this.usuario.activo ? 1 : 0;
    this.usuario.aprobador = this.usuario.aprobador ? 1 : 0;
    this._usauriosService.actualizarCCusuario(this.usuario).subscribe(
      (data: any) => {
        // Guardar los datos complementarios del empleado
        this._usauriosService.actualizarUsuarioExtraInfo(this.usuario).subscribe(
          (resp: any) => {
            console.log(resp);
            this._router.navigate(['/home/usuario']);
            swal.fire(
              'Éxito',
              'Guardado Correctamente',
              'success'
            );
          },
          (error) => {
            this.cargando = false;
            this.txtBtnAgregar = 'Guardar';
            swal.fire(
              'Atención',
              'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje,
              'error'
            );
          },
          () => { }
        );

      },
      error => {
        this.cargando = false;
        this.txtBtnAgregar = 'Guardar';
        swal.fire(
          'Atención',
          'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje,
          'error'
        );
      }
    );
  }

}
