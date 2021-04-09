import { PrestacionesService } from './../../prestaciones/prestaciones.service';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { BolsaFlexible, CorporativoActivo, Prestaciones } from 'src/app/entidades';
import { FormularioDinamicoBase, InputItemFD, InputItemFDN, SelectItemFD } from 'src/app/entidades/FormularioGenerico';
import { DatosIniciales } from 'src/app/entidades';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { BolsaFlexibleService } from '../bolsa-flexible-.service';
import { event } from 'jquery';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-bolsa-flexible-list-rci',
  templateUrl: './bolsa-flexible-list-rci.component.html',
  styleUrls: ['./bolsa-flexible-list-rci.component.css']
})
export class BolsaFlexibleListRciComponent implements OnInit {

  public dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    serverSide: false,
    processing: false,
    ordering: false,
    searching: true,
    dom: 'Bfrtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        exportOptions: {
          modifier: {
            page: 'current'
          }
        }
      },
      {
        extend: 'pdf',
        text: 'Exportar PDF',
        exportOptions: {
          modifier: {
            page: 'current'
          }
        }
      }
    ],
    language: {
      emptyTable: 'Ningún dato disponible en esta tabla',
      info: 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
      infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
      infoFiltered: '(filtrado de un total de _MAX_ registros)',
      infoPostFix: '',
      thousands: '',
      processing: 'Procesando...',
      lengthMenu: 'Mostrar _MENU_',
      search: 'Buscar',
      zeroRecords: 'No se encontraron resultados',
      paginate: {
        first: 'Primero',
        last: 'Último',
        next: 'Siguiente',
        previous: 'Anterior',
      },
      'oAria': {
        'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
        'sSortDescending': ': Activar para ordenar la columna de manera descendente'
      }
    },
  };

  questions$: any;

  table_headers = [
    'Razón Social',
    'RFC',
    'Nombre',
    'Número Empleado',
    'Bolsa Disponible',
    'Prestación',
  ];

  filtro_event = {
    nombre: '',
    numero_empleado: '',
    id_prestacion: '',
    identificador_corporativo: ''
  };
  lista_bolsa_flexible = new Array<BolsaFlexible>();
  public datos_iniciales: DatosIniciales;
  public filtroConsulta = new BolsaFlexible();
  corporativo_activo: CorporativoActivo;
  identificador_corporativo: string;
  public lista_prestacion = new Array<Prestaciones>();
  obj_prestaciones = new Array<Prestaciones>();


  constructor(
    private _storageService: StorageService,
    public bolsa_sevice: BolsaFlexibleService,
    public _servicePrestacion: PrestacionesService
  ) {
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
  }

  async ngOnInit() {
    await this.getListPrestaciones();
    // console.log(this.lista_prestacion);
    this.obj_prestaciones = this.lista_prestacion;
    await this.funcionAsync();
    await this.filtrar(event);
  }

  funcionAsync() {
    return new Promise((resolve, reject) => {
      this.questions$ = this.getQuestions();
      resolve(this.questions$);
    });
  }

  iniciarTabla(): Promise<any> {
    return new Promise((resolve) => {
      let aux_filtro = '';
      this.filtro_event.identificador_corporativo = this.datos_iniciales.usuario.identificador_corporativo;
      aux_filtro += '?';
      if (this.filtro_event.identificador_corporativo !== '' && this.filtro_event.identificador_corporativo !== undefined) {
        aux_filtro += 'identificador_corporativo=' + this.filtro_event.identificador_corporativo;
      }
      if (this.filtro_event.id_prestacion !== '' && this.filtro_event.id_prestacion !== undefined) {
        aux_filtro += '&id_prestacion=' + this.filtro_event.id_prestacion;
      }
      if (this.filtro_event.nombre !== '' && this.filtro_event.nombre !== undefined) {
        aux_filtro += '&nombre=' + this.filtro_event.nombre;
      }
      if (this.filtro_event.numero_empleado !== '' && this.filtro_event.numero_empleado !== undefined) {
        aux_filtro += '&numero_empleado=' + this.filtro_event.numero_empleado;
      }
      $('#tabla_bolsa_flexible').DataTable().destroy();
      this.bolsa_sevice.getListBolsaFlexible(aux_filtro)
        .subscribe((data: any) => {
          this.lista_bolsa_flexible = data;
          setTimeout(() => {
            $('#tabla_bolsa_flexible').DataTable(this.dtOptions);
            resolve();
          }, 100);
        }, error => {
          console.log(error);
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error, 'error');
          this.LimpiarTabla();
        });
      aux_filtro = null;
    });
  }

  LimpiarTabla() {
    $('#tabla_bolsa_flexible').DataTable().destroy();
    this.lista_bolsa_flexible = [];
    setTimeout(() => {
      $('#tabla_bolsa_flexible').DataTable(this.dtOptions);
    }, 1000);
  }

  getListPrestaciones(): Promise<any> {
    return new Promise((resolve) => {
      this._servicePrestacion.getListPrestaciones(this.identificador_corporativo)
        .subscribe((data: any) => {
          this.lista_prestacion = data;
          resolve(this.lista_prestacion);
        }, error => {
          console.log(error);
        });
    });
  }

  // TODO: get from a remote source of question metadata
  getQuestions() {
    const lista = this.lista_prestacion.map(x => {
      const y: { key: string, value: string } = {
        key: x.id.toString(),
        value: x.nombre
      };
      return y;
    });

    const questions: FormularioDinamicoBase<string>[] = [

      new SelectItemFD({
        key: 'prestacion',
        label: 'Prestación',
        options: lista,
        order: 3
      }),

      new InputItemFD({
        key: 'nombre_empleado',
        label: 'Nombre Empleado',
        value: '',
        type: 'text',
        order: 1
      }),

      new InputItemFDN({
        key: 'numero_empleado',
        label: 'Número Empleado',
        value: '',
        type: 'text',
        order: 2
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

  filtrar(event) {
    // console.log(event);
    this.filtro_event.numero_empleado = event.numero_empleado;
    this.filtro_event.nombre = event.nombre_empleado;
    this.filtro_event.id_prestacion = event.prestacion;
    this.iniciarTabla();
  }
}
