import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { UsuarioService } from '../usuario.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Router } from '@angular/router';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
declare var $: any;

@Component({
  selector: 'app-list-usuario-mx',
  templateUrl: './list-usuario-mx.component.html',
  styleUrls: ['./list-usuario-mx.component.css']
})
export class ListUsuarioMxComponent implements OnInit {
  lista_usuarios: Usuario[];
  identificador_corporativo: string;
  public opcionesDt = {
    ordering: false,
    dom: 'lBfrtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2, 3] }
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
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

  public datos_inciales: DatosIniciales;
  constructor(
    public globals: GlobalsComponent,
    private _usuariosService: UsuarioService,
    private _storageService: StorageService,
    private _router: Router
  ) { }

  ngOnInit() {
    const corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = corporativo_activo.corporativo_identificador;
    // this.actualizarTabla(this.identificador_corporativo);
    this.datos_inciales = this._storageService.getDatosIniciales();
    if (this.datos_inciales.usuario.administrador_next === 1) {
      this.LimpiarTabla();
    } else {
      this.actualizarTabla(this.identificador_corporativo);
    }
  }

  actualizarTabla(identificador_corporativo) {
    $('#tabla_usuarios').DataTable().destroy();
    this._usuariosService.obtenerUsuariosCorporativo(identificador_corporativo)
      .subscribe(
        (data: any) => {
          // console.log(data);
          this.lista_usuarios = data;
        },
        error => {
          console.log(error);
        },
        () => {
          setTimeout(() => {
            $('#tabla_usuarios').DataTable(this.opcionesDt);
          }, 1500);
        }
      );
  }

  editarUsuario(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this._router.navigate(['/home/usuario/edit/', id]);
  }
  ActualizaCorporativo(data) {
    console.log(data.value);
    if (data.value !== '0') {
      this.actualizarTabla(data.value);
    } else {
      // this.actualizarTablaCuenta(this.identificador_corporativo);
      this.LimpiarTabla();
    }
  }

  LimpiarTabla() {
    $('#tabla_usuarios').DataTable().destroy();
    this.lista_usuarios = [];
    setTimeout(() => {
      $('#tabla_usuarios').DataTable(this.opcionesDt);
    }, 1000);
  }
}
