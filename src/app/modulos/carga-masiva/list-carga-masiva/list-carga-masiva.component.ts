import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { FiltroCargaMasiva } from 'src/app/entidades';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CargaMasivaService } from '../carga-masiva.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';

@Component({
  selector: 'app-list-carga-masiva',
  templateUrl: './list-carga-masiva.component.html',
  styleUrls: ['./list-carga-masiva.component.css']
})
export class ListCargaMasivaComponent implements OnInit {
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;
  listener: () => void;
  filtroConsulta = new FiltroCargaMasiva();

  lista_lotes = new Array<any>();

  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2, 3] }
      }
    ],
    oLanguage: {
      sProcessing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>',
      sLengthMenu: 'Mostrar _MENU_',
      sZeroRecords: 'No se encontraron resultados',
      sEmptyTable: 'Ningún dato disponible en esta tabla',
      sInfo:
        'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
      sInfoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
      sInfoFiltered: '(filtrado de un total de _MAX_ registros)',
      sInfoPostFix: '',
      sSearch: 'Buscar:',
      sUrl: '',
      sInfoThousands: '',
      sLoadingRecords: '<img src="assets/img/iconoCargando.gif" alt="">',
      copy: 'Copiar',
      oPaginate: {
        sFirst: 'Primero',
        sLast: 'Último',
        sNext: 'Siguiente',
        sPrevious: 'Anterior'
      },
      oAria: {
        sSortAscending:
          ': Activar para ordenar la columna de manera ascendente',
        sSortDescending:
          ': Activar para ordenar la columna de manera descendente'
      }
    }
  };


  constructor(
    private router: Router,
    private storageService: StorageService,
    public globals: GlobalsComponent,
    private cargaMasivaService: CargaMasivaService
  ) { }

  ngOnInit() {
  }

  actualizaTabla() {
    $('#tabla_lotes').DataTable().destroy();
    this.cargaMasivaService.listarLotes(this.filtroConsulta).subscribe((data: any) => {
      this.lista_lotes = data.data;
      setTimeout(() => {
        $('#tabla_lotes').DataTable(this.opcionesDt);
      }, 500);
    }, error => {
      console.log('aqui el error linea 81', error);
      this.lista_lotes = [];
      setTimeout(() => {
        $('#tabla_lotes').DataTable(this.opcionesDt);
      }, 500);
    },
      () => {
      });
  }

  meterFiltros(obj: any) {
    obj.filt = this.filtroConsulta;
    obj.esAdmin = true;
    obj.order = [{
      'dir': 'asc'
    }],
      obj.columns = [{
        dir: 'asc'
      }];
    return obj;
  }

  filtrar(filtro: FiltroCargaMasiva) {
    this.filtroConsulta = filtro;
    this.filtroConsulta.usuario_identificador = this.storageService.getDatosIniciales().usuario.identificador_usuario;
    this.actualizaTabla();
  }
  verDetalles(numero_lote: string) {
    this.router.navigate(['home', 'carga_masiva', 'detalle', this.storageService.encriptar_ids(numero_lote)]);
  }
  verFacturas(numero_lote: string) {
    this.globals.numero_lote = numero_lote;
    this.router.navigate(['home', 'consulta_cfdi']);
  }

}
