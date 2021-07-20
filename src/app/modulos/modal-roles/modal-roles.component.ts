import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
declare var $: any;
import { Router } from '@angular/router';
import { stringify, dashCaseToCamelCase } from '../../../../node_modules/@angular/compiler/src/util';
import { GlobalsComponent } from '../../compartidos/globals/globals.component';
import { ModalRolesService } from './modal-roles.service';
import { StorageService } from '../../compartidos/login/storage.service';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CorporativoService } from '../corporativo/corporativo.service';
@Component({
  selector: 'app-modal-roles',
  templateUrl: './modal-roles.component.html',
  styleUrls: ['./modal-roles.component.css']
})
export class ModalRolesComponent implements OnInit {
  @Input() listaRolSucursales;
  @Input() listaCC: any;
  @Input() relacion_rol_centro_consumo;
  @Input() iniciarCargaDocumentos: EventEmitter<any>;
  @Output() limpiar_mensaje = new EventEmitter();
  @Output() actualizarMenu = new EventEmitter();
  public selectedDevice = '';
  public selectCC: any;
  public lista_centro_consumo = new Array<any>();
  public btnContinuar = true;
  datos_iniciales: DatosIniciales;
  corporativo_activo = new CorporativoActivo();
  rol_seleccionado: any;
  centro_costo_seleccionado: any;
  formulario_roles: FormGroup;
  txtBtnAgregar: string;
  public cargando = true;
  constructor(
    private router: Router
    , private _globales: GlobalsComponent
    , private _ServiceModal: ModalRolesService
    , private _corporativoService: CorporativoService
    , private _StorageService: StorageService
  ) { }

  ngOnInit() {
    this.txtBtnAgregar = 'Continuar';
    if (this.iniciarCargaDocumentos) {
      this.iniciarCargaDocumentos.subscribe((data) => {
        // console.log(data);
        this.cargarDatos();
      });
      // this.cargarDatos();
      // console.log(' Evento click en cambiar cc');
    }
    this.iniciarFormulario();
    // console.log(this._StorageService.getDatosIniciales());
    const centro_costo = this._StorageService.getDatosIniciales();
    // console.log(centro_costo);
    if (centro_costo) {
      // console.log(centro_costo);
      this.relacion_rol_centro_consumo = centro_costo.roles_acceso;
    }
    const menuDinamico = this._StorageService.getMenuDinamico();
    const corporativos = this._StorageService.getCorporativos();
    if (corporativos) {
      this._globales.lista_corporativos = corporativos;
    }
    if (menuDinamico) {
      this._globales.menuDinamico = menuDinamico;
    }
    const datosIniciales = this._StorageService.getDatosIniciales();
    if (datosIniciales) {
      this._globales.datos_inciales = datosIniciales;
    }

    setTimeout(() => {
      this.cargando = false;
    }, 1000);
  }

  iniciarFormulario() {
    this.formulario_roles = new FormGroup({
      rol: new FormControl('', Validators.required),
      centro_consumo: new FormControl(''),
      // centro_consumo: new FormControl('', Validators.required),
    });
  }

  async cargarDatos() {
    // this.datos_iniciales = this._globales.datos_inciales;  // await this._StorageService.getDatosIniciales();
    this.corporativo_activo = this._StorageService.getCorporativoActivo();
    // this.relacion_rol_centro_consumo = this.datos_iniciales.roles_acceso;
    // console.log(this.relacion_rol_centro_consumo);
    this.rol_seleccionado = Number(this.corporativo_activo.rol_identificador);
    this.lista_centro_consumo = this.corporativo_activo.rol_seleccionado.centro_costo_acceso;
    this.centro_costo_seleccionado = this.corporativo_activo.centro_costo_identificador;
    // console.log(this._StorageService.getCorporativoActivo());
    // console.log(this.lista_centro_consumo);
  }

  ModalClose() {
    this.lista_centro_consumo = [];
    this.centro_costo_seleccionado = '';
    this.rol_seleccionado = '';
    this.limpiar_mensaje.emit();
    $('#ModalRolCC').modal('toggle');
  }

  ContinuarMain() {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    //  Validar Campos
    if (this.rol_seleccionado) {
      // if (this.centro_costo_seleccionado && this.rol_seleccionado) {
      // this._globales.rol_activo = this.rol_seleccionado;
      this.datos_iniciales = this._StorageService.getDatosIniciales();
      this.corporativo_activo.corporativo_identificador = this.datos_iniciales.usuario.identificador_corporativo;
      // this.corporativo_activo.corporativo_nombre = this.datos_iniciales.corporativos[0].nombre;
      // console.log(this.datos_iniciales.corporativos[0].identificador);
      this._StorageService.setCorporativoActivo(this.corporativo_activo);
      // console.log(this._StorageService.getCorporativoActivo());

      this._ServiceModal.getAcciones(this.rol_seleccionado, this.datos_iniciales.usuario.identificador_usuario).subscribe((data: any) => {
        if (this.datos_iniciales.usuario.administrador_next === 1) {
          this.mapearAccionesAdminNext();
          this.obtenerCorporativos();

        } else {
          this.MapearAcciones(data);
        }
        this._StorageService.setMenuDinamico(this._globales.menuDinamico);
        this.actualizarMenu.emit();
        // console.log(this._globales.menuDinamico);
        // console.log(this._StorageService.getMenuDinamico());
        this.txtBtnAgregar = 'Guardar';
        this.ModalClose();
        this.router.navigate(['/home/inicio']);
      }, error => {
        console.log(error);
      });
    }
    setTimeout(() => {
      $('.modal-backdrop').hide();
    }, 500);
    setTimeout(() => {
      $('.modal-backdrop').hide();
    }, 1500);
    setTimeout(() => {
      $('.modal-backdrop').hide();
    }, 5500);
  }

  mapearAccionesAdminNext() {
    // this.obtenerCorporativos();
    for (const accion in this._globales.menuDinamico) {
      if (accion) {
        this._globales.menuDinamico[accion] = true;
      }
    }
  }
  obtenerCorporativos() {
    this._corporativoService.obtenerCorporativos().subscribe((data: any) => {
      // const corporativos = data;
      this._globales.lista_corporativos = $.map(data, obj => {
        obj.id = obj.identificador;
        obj.text = obj.nombre;
        return obj;
      });
      this._globales.lista_corporativos = this._globales.agregarSeleccione(this._globales.lista_corporativos, 'Seleccione Corporativo...');
    }, error => {
    }, () => {
      this._StorageService.setCorporativos(this._globales.lista_corporativos);
    }
    );
  }

  ValidaCheckCC(obj) {
    this.selectCC = obj;
  }

  filter_array(test_array) {
    let index = -1;
    const arr_length = test_array ? test_array.length : 0;
    let resIndex = -1;
    const result = [];
    while (++index < arr_length) {
      const value = test_array[index];
      if (value) {
        result[++resIndex] = value;
      }
    }
    return result;
  }

  // Funciona para hacer el  mapeop de lo que regresa la api y el json del menu dinamico
  MapearAcciones(data: any) {
    this.bloqueasAcciones();
    data.forEach(element => {
      this._globales.menuDinamico[element.action] = true;
    });
    // Guardamos en local storage
    // localStorage.removeItem('menuDinamico');
    this._StorageService.setMenuDinamico(this._globales.menuDinamico);
  }

  bloqueasAcciones() {
    // tslint:disable-next-line:forin
    for (const aux in this._globales.menuDinamico) {
      this._globales.menuDinamico[aux] = false;
    }
  }

  errorAcciones(data: any) {
  }

  onRolSeleccionado(evento, esLogin?: boolean) {
    // console.log(evento);
    if (evento && evento !== '') {
      // console.log(evento);
      this.btnContinuar = true;
      if (evento !== '') {
        evento = Number(evento);
        // Obtner cc
        const filtro = this.relacion_rol_centro_consumo.find(c => {
          return c.rol_id === evento;
        });
        this.rol_seleccionado = evento;
        // console.log(filtro);
        this.corporativo_activo.rol_seleccionado = filtro;
        this.corporativo_activo.rol_identificador = filtro.rol_id;
        this.corporativo_activo.rol_nombre = filtro.nombre_rol;
        this.lista_centro_consumo = filtro.centro_costo_acceso;
        this.formulario_roles.get('centro_consumo').reset();
        if (esLogin) {
          this.centro_costo_seleccionado = this.corporativo_activo.centro_costo_identificador;
        }

      } else {
        this.lista_centro_consumo = [];
        // this.centro_costo_seleccionado = '';
        // this.formulario_roles.get('centro_consumo').reset();
      }
    } else {
      this.lista_centro_consumo = [];
      if (this._StorageService.getCorporativoActivo()) {
        // this.corporativo_activo = this._StorageService.getCorporativoActivo();
        // console.log(this._StorageService.getCorporativoActivo());
        // this.centro_costo_seleccionado = this.corporativo_activo.centro_costo_identificador;
        // this.lista_centro_consumo = this.corporativo_activo.rol_seleccionado.centro_costo_acceso;
      }
    }
  }

  onCCSeleccionado(evento) {
    if (evento) {
      // console.log(evento);
      const filtro = this.lista_centro_consumo.find(c => {
        return c.centro_consumo_identificador === evento;
      });
      this.centro_costo_seleccionado = evento;
      // console.log(filtro);
      if (filtro) {
        this.corporativo_activo.centro_consumo_nombre = filtro.centro_consumo;
        this.corporativo_activo.centro_costo_identificador = filtro.centro_consumo_identificador;
        this.corporativo_activo.sucursal_identificador = filtro.sucursal_identificador;
        this.corporativo_activo.sucursal_nombre = filtro.sucursal;
        this.btnContinuar = false;
      }
    } else {
      this.btnContinuar = true;
    }
  }
}
