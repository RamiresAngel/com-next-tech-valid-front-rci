
import { RolService } from './../rol.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { GlobalsComponent } from '../../../compartidos/globals/globals.component';
import { StorageService } from '../../../compartidos/login/storage.service';
declare var $: any;
import { CorporativoService } from '../../corporativo/corporativo.service';
import { Rol } from 'src/app/entidades/rol';
import { Router } from '@angular/router';
import { AgrupadorRoles } from 'src/app/entidades';
import { ReceptorService } from '../../receptor/receptor.service';
import { SucursalService } from '../../sucursal/sucursal.service';
import { Sucursal } from 'src/app/entidades/sucursal';
import { CentroCostosService } from '../../centro-costos/centro-costos.service';
import { CentroCostos } from 'src/app/entidades/centro-costos';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';

@Component({
  selector: 'app-list-rol',
  templateUrl: './list-rol.component.html'
})
export class ListRolComponent implements OnInit {
  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2, 3] },
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        orientation: 'landscape',
        exportOptions: { columns: [0, 1, 2, 3] },
      }
    ],
    oLanguage: {
      'sProcessing': '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>',
      'sLengthMenu': 'Mostrar _MENU_',
      'sZeroRecords': 'No se encontraron resultados',
      'sEmptyTable': 'Ningún dato disponible en esta tabla',
      'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
      'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
      'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
      'sInfoPostFix': '',
      'sSearch': 'Buscar:',
      'sUrl': '',
      'sInfoThousands': '',
      'sLoadingRecords': '<img src="assets/img/iconoCargando.gif" alt="">',
      'copy': 'Copiar',
      'oPaginate': {
        'sFirst': 'Primero',
        'sLast': 'Último',
        'sNext': 'Siguiente',
        'sPrevious': 'Anterior'
      },
      'oAria': {
        'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
        'sSortDescending': ': Activar para ordenar la columna de manera descendente'
      }
    }
  };

  datos_inciales: DatosIniciales;
  public roles: Rol[] = new Array<Rol>();
  public showCorporativos = false;
  public listaCorporativos: any;
  public identificador_corporativo = '';
  public centro_costo_selected = '';
  public sucursal_selected = '';
  public agrupador_selected = '';


  //#region Variables Agrupador
  public mostrar_corporativo = false;
  public mostrar_centro_consumo = false;
  public mostrar_emisor = false;
  public mostrar_sucursal = false;

  corporativo_activo: CorporativoActivo;
  DATOS_INCIALES: DatosIniciales;

  agrupador = new AgrupadorRoles;
  agrupador_seleccionado: string;

  public tipo_agrupador = [
    {
      id: 'corporativo'
      , text: 'Corporativo'
    }
    , {
      id: 'sucursal'
      , text: 'Sucursal'
    }
    , {
      id: 'cc'
      , text: 'C.C.'
    }, {
      id: 'usuario'
      , text: 'Usuario'
    }
  ];

  //#endregion

  //#region Listas
  public lista_sucursales: Sucursal[];
  public lista_centro_costos: CentroCostos[];
  //#endregion

  constructor(
    private _servicio: RolService
    , private router: Router
    , public globals: GlobalsComponent
    , private _storageService: StorageService,
    private _sucursalService: SucursalService,
    private _centroCostoService: CentroCostosService
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.DATOS_INCIALES = this._storageService.getDatosIniciales();
    // console.log(corporativo_activo);
  }

  ngOnInit() {
    if (true) {
      // this.obtenerRoles();
    } else {

    }

  }

  public obtenerRoles() {
    $('#tabla').DataTable().destroy();
    this._servicio.ObtenerListaRolesMXPorIdentificador([this.agrupador]).subscribe((data: any) => {
      this.roles = data;
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        $('#tabla').DataTable(this.opcionesDt);
      }, 500);
    }
    );
  }

  editarRol(id: any): void {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate(['/home/rol/edit/' + String(id)]);
  }

  actualizaCorporativo(obj: any) {
    this.identificador_corporativo = obj.value;
    this.obtenerRoles();
  }

  public actualizaAgrupador(obj: any) {
    this.agrupador_seleccionado = obj.value;
    console.log(obj);
    this.mostrar_corporativo = false;
    this.mostrar_centro_consumo = false;
    this.mostrar_emisor = false;
    this.mostrar_sucursal = false;

    switch (obj.value) {
      case 'corporativo':
        this.obtenerRolesCorporativo();
        break;
      case 'cc':
        this.obtenerRolesCentroCosto();
        // this.mostrar_centro_consumo = true;
        // this.cargarEmisor(this.corporativo_activo);
        break;
      case 'sucursal':
        this.obtenerRolesSucursal();
        // this.mostrar_sucursal = true;
        // this.mostrar_emisor = true;
        // this.cargarEmisor(this.corporativo_activo);
        break;
      case 'usuario':
        this.obtenerRolesUsuario();
        break;
      default:
        this.mostrar_centro_consumo = false;
        this.mostrar_corporativo = false;
        break;
    }
  }

  obtenerRolesCorporativo() {
    this.agrupador.tipo = 'corporativo';
    this.agrupador.identificador_agrupador = this.identificador_corporativo;
    this.obtenerRoles();
  }
  obtenerRolesUsuario() {
    this.agrupador.tipo = 'usuario';
    this.agrupador.identificador_agrupador = this.DATOS_INCIALES.usuario.identificador_usuario;
    this.obtenerRoles();
  }
  obtenerRolesSucursal() {
    this.agrupador.tipo = 'sucursal';
    this.agrupador.identificador_agrupador = this.corporativo_activo.sucursal_identificador;
    this.obtenerRoles();
  }
  obtenerRolesCentroCosto() {
    this.agrupador.tipo = 'cc';
    this.agrupador.identificador_agrupador = this.corporativo_activo.centro_costo_identificador;
    this.obtenerRoles();
  }

  obtenerSucursales() {
    this._sucursalService.ObtenerListaSucursalesMXPorCorporativo(this.identificador_corporativo
      , this.DATOS_INCIALES.usuario.identificador_usuario, Number(this.corporativo_activo.rol_identificador))
      .subscribe((data: any) => {
        this.lista_sucursales = data;
        this.lista_sucursales = this.globals.prepararSelect2(this.lista_sucursales, 'identificador', 'nombre');
      }, error => {

      }, () => {

      });
  }
  obtenerCentrosCosto() {
    this._centroCostoService.ObtenerListaCentroCostosMXPorCorporativo(
      this.identificador_corporativo
      , this.DATOS_INCIALES.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
    )
      .subscribe((data: any) => {
        this.lista_centro_costos = data;
        this.lista_centro_costos = this.globals.prepararSelect2(this.lista_centro_costos, 'identificador', 'nombre');
      }, error => {

      }, () => {

      });
  }
  onCambiarSucursal(obj: any) {
    this.agrupador.tipo = 'sucursal';
    this.agrupador.identificador_agrupador = this.corporativo_activo.sucursal_identificador;
    this.obtenerRoles();
  }
  onCambiarCentroCosto(obj: any) {
    console.log(obj);
    this.agrupador.tipo = 'cc';
    this.agrupador.identificador_agrupador = this.corporativo_activo.centro_costo_identificador;
    this.obtenerRoles();
  }

}
