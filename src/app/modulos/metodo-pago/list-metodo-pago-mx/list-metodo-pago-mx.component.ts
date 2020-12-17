import { Component, OnInit } from '@angular/core';
import { GlobalsComponent } from './../../../compartidos/globals/globals.component';
import { Corporativo } from 'src/app/entidades/corporativo';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { MetodoPagoService } from '../metodo-pago.service';
declare var $: any;

@Component({
  selector: 'app-list-metodo-pago-mx',
  templateUrl: './list-metodo-pago-mx.component.html',
  styleUrls: ['./list-metodo-pago-mx.component.css']
})
export class ListMetodoPagoMxComponent implements OnInit {

  public lista_metodos_pago: Corporativo[];
  identificador_corporativo: string;
  public metodo_pago = new Corporativo();
  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2] },
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2] },
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
    private _metodoPagoSevice: MetodoPagoService,
    public globals: GlobalsComponent,
    private _storageService: StorageService,
    private router: Router,
  ) { }

  async ngOnInit() {
    const corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = corporativo_activo.corporativo_identificador;
    this.updateCorporativos();
  }

  public updateCorporativos() {
    $('#tabla_metodo_pago').DataTable().destroy();
    this._metodoPagoSevice.obtnerMetodosPago(this.identificador_corporativo).subscribe((data: HttpResponse<Corporativo[]>) => {
      this.obtnerMetodoPago(data);
    }, error => {
    }, () => {
      setTimeout(() => {
        $('#tabla_metodo_pago').DataTable(this.opcionesDt);
      }, 1000);
    });
  }

  obtnerMetodoPago(data: any) {
    this.lista_metodos_pago = data;
  }
  editarMetodoPago(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this.router.navigate(['/home/metodo_pago/edit/' + String(id)]);
  }
  eliminarMetodoPago(id: any) {
    this._metodoPagoSevice.eliminarMetodoPago(String(id)).subscribe((data: HttpResponse<any>) => {
      this.updateCorporativos();
    }, error => {
      console.log(error);
    });
  }

}
