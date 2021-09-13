import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { UsuarioService } from '../usuario.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Router } from '@angular/router';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-list-usuario-rci',
  templateUrl: './list-usuario-rci.component.html',
  styleUrls: ['./list-usuario-rci.component.css']
})
export class ListUsuarioRciComponent implements OnInit {
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
        exportOptions: { columns: [0, 1, 2, 3, 4] }
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        exportOptions: { columns: [0, 1, 2, 3, 4] }
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
  public usuario_edit = new Usuario();

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
    this._usuariosService.obtenerUsuariosCorporativo_extra_info(identificador_corporativo)
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
          }, 500);
        }
      );
  }

  editarUsuario(id: any) {
    id = this._storageService.encriptar_ids(String(id));
    this._router.navigate(['/home/usuario/edit/' + String(id)]);
  }

  LimpiarTabla() {
    $('#tabla_usuarios').DataTable().destroy();
    this.lista_usuarios = [];
    setTimeout(() => {
      $('#tabla_usuarios').DataTable(this.opcionesDt);
    }, 1000);
  }

  public Modal(modalBandera: string, obj: any) {
    this.usuario_edit = obj;
    if (modalBandera === 'sitio') {
      $('#ModalSitio').modal('show');
    } else {
      $('#ModalPrestacion').modal('show');
    }
  }

  SwellartReiniciar() {
    Swal.fire({
      title: 'Saldos',
      type: 'info',
      text: 'Esta acción reiniciara los saldos de los empleados a su configuración inicial.',
      cancelButtonColor: '#FFD700',
      confirmButtonColor: '#3085d6',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Reiniciar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => { }
    }).then((result) => {
      console.log(result);
      if (result.value) {
        this._usuariosService.resetearSaldos().subscribe(
          (data: any) => {
            this.actualizarTabla(this.identificador_corporativo);
            Swal.fire('¡Éxito!', 'Saldos actualizados con éxito', 'success');
          },
          (error: any) => {
            console.log(error);
          }
        )
      }
    });
  }

}
