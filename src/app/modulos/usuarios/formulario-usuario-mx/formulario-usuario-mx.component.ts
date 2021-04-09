import { Component, OnInit, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { UsuarioService } from '../usuario.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn,
  PatternValidator
} from '@angular/forms';
import swal from 'sweetalert2';
import { CentroCostosService } from '../../centro-costos/centro-costos.service';
import { RolService } from '../../rol/rol.service';
import { CentroCostos } from 'src/app/entidades/centro-costos';
import { Rol } from 'src/app/entidades/rol';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
declare var $: any;

@Component({
  selector: 'app-formulario-usuario-mx',
  templateUrl: './formulario-usuario-mx.component.html',
  styleUrls: ['./formulario-usuario-mx.component.css']
})
export class FormularioUsuarioMxComponent implements OnInit {
  saludar: EventEmitter<any> = new EventEmitter();
  mapearRelaciones: EventEmitter<any> = new EventEmitter();
  public txtBtnAgregar = 'Guardar';
  public error = false;
  accion_usuario: string;
  filtro_relaciones: string;
  lista_centro_costos: CentroCostos[];
  lista_centro_costos_filtrar: CentroCostos[];
  identificador_corporativo: string;
  lista_roles: Rol[];
  id_usuario: string;
  usuario = new Usuario();
  lista_relaciones = new Array<any>();
  lista_relaciones_filtrar = new Array<any>();
  formulario_usuarios: FormGroup;
  expressionContrasenia = new RegExp(
    /^(?=(?:.*d){2})(?=(?:.*[A-Z]){1})(?=(?:.*[!@"#$%&/()=?¡]){1})(?=(?:.*[a-z]){2})S{8,}$/
  );
  public formulario_roles_cc: FormGroup;
  public datos_inciales: DatosIniciales;
  public corporativo_activo: CorporativoActivo;

  CATEGORIA_AGRUPADOR = [
    { text: 'Corporativo', id: 'corporativo', },
    { text: 'Usuario', id: 'usuario' },
    { text: 'Sucursal', id: 'sucursal' },
    { text: 'Centro Costo', id: 'cc' },
  ];

  constructor(
    private _activatedRoute: ActivatedRoute,
    public globals: GlobalsComponent,
    private _usauriosService: UsuarioService,
    private _router: Router,
    private _storageService: StorageService,
    private _centroCostosService: CentroCostosService,
    private _rolesService: RolService
  ) { }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.usuario.identificador_corporativo = this.identificador_corporativo;
    this.cargarDatos(this.identificador_corporativo);

    this._activatedRoute.params.subscribe(id => {
      this.id_usuario = this._storageService.desencriptar_ids(id['id']);
    });

    if (this.id_usuario) {
      this.accion_usuario = 'Editar';
      this._usauriosService
        .obtnerUsuarioId(this.id_usuario)
        .subscribe((data: any) => {
          this.usuario = data;
          this.lista_relaciones = this.usuario.cc;
          this.lista_relaciones_filtrar = this.lista_relaciones;
          // this.mapearRelacionesEditar();
        });
      this.iniciarFormularioEditar();
    } else {
      this.accion_usuario = 'Agregar Nuevo ';
      this.iniciarFormularioCrear();
    }
  }

  iniciarFormularioEditar() {
    this.formulario_usuarios = new FormGroup({
      nombre: new FormControl(this.usuario.nombre, Validators.required),
      apellido_paterno: new FormControl(this.usuario.apellido_paterno, Validators.required),
      apellido_materno: new FormControl(this.usuario.apellido_materno, Validators.required),
      telefono: new FormControl(this.usuario.telefono, Validators.required),
      email: new FormControl(this.usuario.email, Validators.required),
      aprobador: new FormControl(this.usuario.aprobador),
      activo: new FormControl(this.usuario.activo),
      email_alterno: new FormControl(this.usuario.email_alterno)
    });
    // this.formulario_usuarios.disable();
    this.formulario_usuarios.get('email').disable();
    // this.formulario_usuarios.get('activo').enable();
    // this.formulario_usuarios.get('aprobador').enable();
    this.formulario_usuarios.updateValueAndValidity();
  }

  iniciarFormularioCrear() {
    this.formulario_usuarios = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido_paterno: new FormControl('', Validators.required),
      apellido_materno: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      email_alterno: new FormControl('', [Validators.required, Validators.email]),
      aprobador: new FormControl(this.usuario.aprobador),
      activo: new FormControl(this.usuario.activo),
      password: new FormControl(this.usuario.password, [
        Validators.required,
        this.patternValidator(
          /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
        )
      ]),
      password2: new FormControl('', [
        Validators.required,
        this.patternValidator(
          /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
        )
      ])
    });
  }
  onSubmit() {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.usuario.cc = this.lista_relaciones;
    // console.log(this.formulario_usuarios);
    debugger;
    if (this.formulario_usuarios.valid) {
      if (this.id_usuario) {
        this.actualizarUsuario();
      } else {
        this.crearUsuario();
      }
    } else {
      this.formulario_usuarios.markAsTouched();
      this.txtBtnAgregar = 'Guardar';
    }
  }

  crearUsuario() {
    this.usuario.activo = 1;
    // this.usuario.corporativo_id = this.datos_inciales.usuario.corporativo_id;
    this.usuario.pais = this.datos_inciales.usuario.pais;
    this.usuario.proveedor = 0;
    this.usuario.proveedor_id = 0;
    this.usuario.admin_basico = 0;
    this.usuario.administrador_next = 0;
    this.usuario.aprobador = this.usuario.aprobador ? 1 : 0;
    // console.log(this.formulario_usuarios);
    // console.log(this.usuario);
    // console.log(this.formulario_roles_cc);
    this._usauriosService.crearUsuario(this.usuario).subscribe(
      (data: any) => {
        // console.log(data);
        this._router.navigate(['/home/usuario']);
        swal.fire('Éxito', 'Guardado Correctamente', 'success');
      },
      error => {
        // console.log(error);
        this.txtBtnAgregar = 'Guardar';
        swal.fire(
          'Atención',
          'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje,
          'error'
        );
      }
    );
  }
  actualizarUsuario() {
    debugger;
    this.usuario.activo = this.usuario.activo ? 1 : 0;
    this.usuario.aprobador = this.usuario.aprobador ? 1 : 0;
    this._usauriosService.actualizarCCusuario(this.usuario).subscribe(
      (data: any) => {
        // console.log(data);
        this._router.navigate(['/home/usuario']);
        swal.fire(
          'Éxito',
          'Guardado Correctamente',
          'success'
        );
      },
      error => {
        this.txtBtnAgregar = 'Guardar';
        swal.fire(
          'Atención',
          'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje,
          'error'
        );
      }
    );
  }

  mapearRelacionesEditar() {
    // console.log(this.lista_relaciones);
    // console.log(this.lista_roles);
    for (let i = 0; i < this.lista_centro_costos.length; i++) {
      let aux = 0;
      this.lista_relaciones.forEach(relacion => {
        if (relacion.centro_consumo_identificador === this.lista_centro_costos[i].identificador) {
          this.lista_relaciones[aux] = {
            rol_id: relacion.rol_id,
            rol_nombre: relacion.rol_nombre,
            centro_consumo_nombre: this.lista_centro_costos[i].centro_consumo,
            centro_consumo_identificador: this.lista_centro_costos[i].identificador,
            cc: this.lista_centro_costos[i]
          };
          // Eliminar centro de consumo
          this.lista_centro_costos.splice(i, 1);
        }
        aux++;
      });
      this.lista_relaciones_filtrar = this.lista_relaciones;
    }
    this.lista_centro_costos_filtrar = this.lista_centro_costos;
    // console.log(this.lista_relaciones);
  }


  cargarRelaciones(event) {
    // console.log(event);
    event.centro_consumo.forEach(element => {
      this.lista_relaciones.push({
        rol_nombre: event.rol_nombre,
        rol_id: event.rol_id,
        centro_consumo_nombre: element.centro_consumo,
        centro_consumo_identificador: element.centro_consumo_identificador,
        cc: element
      });
    });
    this.lista_relaciones_filtrar = this.lista_relaciones;
    // console.log(this.lista_relaciones);
    // console.log(this.lista_relaciones);
  }
  cargarDatos(identificador_corporativo) {
    // console.log(identificador_corporativo);
    const agrupador = [
      {
        tipo: 'corporativo',
        identificador_agrupador: identificador_corporativo
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
        // console.log('Roles carnal');
        // console.log(data);
        // this.lista_roles = this.globals.prepararSelect2(this.lista_roles, 'id', 'nombre');
        // this.lista_roles = this.globals.prepararSelect2Groups(this.CATEGORIA_AGRUPADOR, this.lista_roles, 'id', 'tipo');
        // console.log(this.lista_roles);
      },
      error => {
        this.error = true;
      }
    );

    this._centroCostosService
      .ObtenerListaCentroCostosMXPorCorporativoAdmin(identificador_corporativo)
      .subscribe(
        (data: any) => {
          this.lista_centro_costos = data;
        },
        error => {
          this.error = true;
        }
      );
  }

  borrarRelacion(id, index) {
    this.mapearRelacionesEditar();
    const objeto = this.lista_relaciones[index].cc;
    this.saludar.emit(objeto);
    this.lista_relaciones.splice(index, 1);
    this.lista_relaciones_filtrar = this.lista_relaciones;
    this.filtro_relaciones = '';
    this.filtrarRelaciones('');
  }

  public Modal() {
    // console.log(this.lista_roles);
    this.mapearRelacionesEditar();
    $('#Modal').modal('show');
  }

  // METODO PARA EXPRESIONES REGULARES
  private patternValidator(regexp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const value = control.value;
      if (value === '') {
        return null;
      }
      return !regexp.test(value) ? { patternInvalid: { regexp } } : null;
    };
  }

  ActualizaCorporativo(data) {
    // console.log(data.value);
    if (data.value !== '0') {
      this.identificador_corporativo = data.value;
      this.usuario.identificador_corporativo = data.value;
      this.cargarDatos(data.value);
    }
    //  else {
    //   this.usuario.identificador_corporativo = this.identificador_corporativo;
    // }
  }

  filtrar(text: string) {
    if (text.length > 2) {
      if (this.lista_centro_costos.length !== this.lista_centro_costos_filtrar.length) {

      }
      this.lista_centro_costos = this.lista_centro_costos_filtrar.filter(x =>
        String(this.omitirAcentos(x.centro_consumo)).toLowerCase().includes(text.toLowerCase()) ||
        String(this.omitirAcentos(x.ceco)).toLowerCase().includes(text.toLowerCase())
      );
    } else {
      this.lista_centro_costos = this.lista_centro_costos_filtrar.filter(x =>
        String(this.omitirAcentos(x.centro_consumo)).toLowerCase().includes(text.toLowerCase()) ||
        String(this.omitirAcentos(x.ceco)).toLowerCase().includes(text.toLowerCase())
      );
    }
  }
  filtrarRelaciones(text: string) {
    if (text.length > 2) {
      this.lista_relaciones = this.lista_relaciones_filtrar.filter(x =>
        String(this.omitirAcentos(x.centro_consumo_nombre)).toLowerCase().includes(text.toLowerCase()) ||
        String(this.omitirAcentos(x.rol_nombre)).toLowerCase().includes(text.toLowerCase()));
    } else {
      this.lista_relaciones = this.lista_relaciones_filtrar.filter(x =>
        String(this.omitirAcentos(x.centro_consumo_nombre)).toLowerCase().includes(''));
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
