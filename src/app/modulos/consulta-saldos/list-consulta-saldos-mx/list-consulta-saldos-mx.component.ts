import { Component, OnInit, Input } from '@angular/core';
import { ConsultaSaldosService } from '../consulta-saldos.service';
import { FiltroSaldos } from 'src/app/entidades/filtro';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { DatosIniciales } from 'src/app/entidades';
declare var $: any;
import swal from 'sweetalert2';
@Component({
  selector: 'app-list-consulta-saldos-mx',
  templateUrl: './list-consulta-saldos-mx.component.html',
  styleUrls: ['./list-consulta-saldos-mx.component.css']
})
export class ListConsultaSaldosMxComponent implements OnInit {

  @Input() filtro_saldos: FiltroSaldos;
  lista_saldos: any[];
  public numero_proveedor: string;
  public id_proveedor: string;
  public datos_inicailes: DatosIniciales;

  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
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

  constructor(
    private saldosService: ConsultaSaldosService,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute
  ) {
  }


  ngOnInit() {
    this.datos_inicailes = this.storageService.getDatosIniciales();
    this.activatedRoute.params.subscribe(url => {
      this.id_proveedor = url['id_proveedor'];
      this.numero_proveedor = url['numero_proveedor'];
      if (this.numero_proveedor) {
        this.numero_proveedor = this.storageService.desencriptar_ids(this.numero_proveedor);
        this.id_proveedor = this.storageService.desencriptar_ids(this.id_proveedor);
      }
    });
    this.obtenerSaldos();
  }

  obtenerSaldos() {
    if (this.numero_proveedor) {
      this.filtro_saldos.No_Proveedor = this.numero_proveedor;
    }
    $('#tabla_saldos').DataTable(this.opcionesDt);

    this.saldosService.consultarSaldo(this.filtro_saldos).subscribe((data: any) => {
    }, error => {
      this.filtro_saldos.buscando = false;
    }, () => {
      this.filtro_saldos.buscando = false;
      setTimeout(() => {
        $('#tabla_saldos').DataTable(this.opcionesDt);
      }, 200);
    });

  }

  actualizarTabla() {
    $('#tabla_saldos').DataTable().destroy();
    this.saldosService.consultarSaldo(this.filtro_saldos)
      .subscribe((data: any) => {
        this.lista_saldos = data.listaSaldo;
        this.filtro_saldos.buscando = false;
      }, error => {
        if (error.error) {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        } else {
          swal.fire('Atención', 'Ha ocurrido inesperado. <br> Por favor intentalo nuevamente más tarde: ', 'error');
        }
        this.filtro_saldos.buscando = false;
        console.log(error);
      }, () => {
        this.filtro_saldos.buscando = false;
        setTimeout(() => {
          $('#tabla_saldos').DataTable(this.opcionesDt);
        }, 200);
      });

  }

}
