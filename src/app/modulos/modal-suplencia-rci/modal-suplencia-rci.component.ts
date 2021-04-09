import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { UsuarioService } from './../usuarios/usuario.service';
import { Usuario } from './../../entidades/usuario';
import { StorageService } from './../../compartidos/login/storage.service';
import { ModalSuplenciaService } from './modal-suplencia.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IMyDateRangeModel, IMyDrpOptions } from 'mydaterangepicker';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-modal-suplencia-rci',
  templateUrl: './modal-suplencia-rci.component.html',
  styleUrls: ['./modal-suplencia-rci.component.css']
})
export class ModalSuplenciaRciComponent implements OnInit {
  fecha: string;
  private today = new Date();
  public myDateRangePickerOptions: IMyDrpOptions = {
    disableUntil: {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate() - 1,
    },
    dateFormat: 'yyyy-mm-dd',
    minYear: new Date().getFullYear(),
    editableDateRangeField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };
  /* elementos para la tabla */
  lista_suplencia = [];
  public opcionesDt = {
    ordering: false,
    dom: 'Sfrtip',
    pageLength: 3,
    searching: false,
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

  /* Elementos compartidos  */
  txtBtnAgregar: string;
  txtBtnEditar: string;
  formulario_modal_rci: FormGroup;
  lista_empleado_suplente = new Array<Usuario>();
  identificador_corporativo: string;
  corporativo_activo: CorporativoActivo;
  public bandera: string;
  public rol_acceso: string;
  public suplencia = new Usuario();
  public datos_iniciales: DatosIniciales;
  public edit_suplente = {
    fecha_suplencia: '',
    identificador_usuario_creo: '',
    usuario_registrado: '',
    usuario_suplente: '',
    nombre_usuario_suplente: '',
    comentario: '',
    activo: '',
    id: '',
    fecha_desde: '',
    fecha_hasta: ''
  };

  constructor(
    private _storageService: StorageService,
    private _modalSuplenciaService: ModalSuplenciaService,
    private _usuarioservice: UsuarioService,
    private _globals: GlobalsComponent,
  ) {
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.getUsuarioCorporativo(this.identificador_corporativo);
    this.txtBtnAgregar = 'Continuar';
    this.txtBtnEditar = '<i class="fas fa-user-edit"></i>';
    this.bandera = 'nuevo';
    this.iniciarFormularioCrear();
  }

  ngOnInit() {
  }

  getUsuarioCorporativo(id_corporativo): Promise<any> {
    return new Promise((resolve) => {
      this._usuarioservice.obtenerUsuariosCorporativo(id_corporativo)
        .subscribe((data: Array<Usuario>) => {
          this.lista_empleado_suplente = data.map((x: any) => {
            x.text = x.nombre + x.apellido_paterno;
            x.id = x.identificador_usuario;
            return x;
          });
          this.lista_empleado_suplente = this._globals.agregarSeleccione(this.lista_empleado_suplente, 'Seleccione uno...');
          resolve(setTimeout(() => {
            this.suplencia.identificador_usuario = this.datos_iniciales.usuario.identificador_usuario;
          }, 800));
        });
    });
  }

  actualizarTablaSuplencia(identificador_usuario: string): Promise<any> {
    return new Promise((resolve) => {
      $('#tabla_suplencia').DataTable().destroy();
      this._modalSuplenciaService.getListaHisSupl(identificador_usuario)
        .subscribe((data: any) => {
          this.lista_suplencia = data;
        }, error => {
          console.log(error);
        }, () => {
          resolve(setTimeout(() => {
            $('#tabla_suplencia').DataTable(this.opcionesDt);
          }, 1000));
        });
    });
  }

  iniciarFormularioCrear() {
    this.formulario_modal_rci = new FormGroup({
      nombre: new FormControl(this.suplencia.identificador_usuario),
      usuario_suplente: new FormControl(''),
      fecha: new FormControl('', Validators.required),
      comentarios: new FormControl('', Validators.required),
    });
  }

  iniciarFormularioEdicion(suplencia) {
    this.formulario_modal_rci = new FormGroup({
      nombre: new FormControl(suplencia.identificador_usuario_creo),
      usuario_suplente: new FormControl(suplencia.usuario_suplente),
      fecha: new FormControl(suplencia.fecha_desde + ' - ' + suplencia.fecha_hasta),
      comentarios: new FormControl(suplencia.comentario),
    });
  }

  setDateRange(fechaInicio, fechafin) {
    let aux_inicio = fechaInicio.split('-');
    const date_inicio = new Date(aux_inicio);
    let aux_fin = fechafin.split('-');
    const date_fin = new Date(aux_fin);
    this.formulario_modal_rci.patchValue({
      fecha: {
        beginDate: {
          year: date_inicio.getFullYear(),
          month: date_inicio.getMonth() + 1,
          day: date_inicio.getDate()
        },
        endDate: {
          year: date_fin.getFullYear(),
          month: date_fin.getMonth() + 1,
          day: date_fin.getDate()
        }
      }
    });
  }

  GuardarSuplencia() {
    if (this.formulario_modal_rci.valid) {
      if (this.bandera === 'Editar') {
        this.editarSuplenteEnvio();
      } else {
        this.crearSuplencia();
      }
    }
  }

  crearSuplencia() {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    const lista_fecha = this.suplencia.fecha_suplencia.split(' ');
    const aux_suplencia = {
      usuario_registrado: this.edit_suplente.usuario_registrado,
      usuario_suplente: this.suplencia.usuario_suplente,
      fecha_desde: lista_fecha[0],
      fecha_hasta: lista_fecha[2],
      comentario: this.suplencia.comentario,
      identificador_usuario_creo: this.datos_iniciales.usuario.identificador_usuario,
    };
    // console.log(aux_suplencia);
    this._modalSuplenciaService.crearSuplencia(aux_suplencia)
      .subscribe((data: any) => {
        this.txtBtnAgregar = 'Guardar';
        swal.fire('Éxito', 'Guardado Correctamente', 'success');
        this.actualizarTablaSuplencia(this.edit_suplente.usuario_registrado);
      }, error => {
        console.log(error);
        this.txtBtnAgregar = 'Guardar';
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      });
  }

  obtenerSuplenciaId(id: string) {
    this.bandera = 'Editar';
    this.txtBtnEditar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.txtBtnAgregar = 'Editar';
    this._modalSuplenciaService.getSuplenciaId(id)
      .subscribe((data: any) => {
        this.setDateRange(data.fecha_desde, data.fecha_hasta);
        this.edit_suplente = data;
        // console.log(data);
        this.iniciarFormularioEdicion(data);
        this.txtBtnEditar = '<i class="fas fa-user-edit"></i>';
      }, (error) => {
        console.log(error);
        this.txtBtnEditar = '<i class="fas fa-user-edit"></i>';
      });
  }

  editarSuplenteEnvio() {
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    if (this.formulario_modal_rci.value.usuario_suplente === this.edit_suplente.usuario_suplente) {
      this.suplencia.usuario_suplente = this.formulario_modal_rci.value.usuario_suplente;
    } else {
      this.suplencia.usuario_suplente = this.edit_suplente.usuario_suplente;
    }

    if (this.formulario_modal_rci.value.fecha.formatted) {
      this.suplencia.fecha_suplencia = this.formulario_modal_rci.value.fecha.formatted;
    } else {
      this.suplencia.fecha_suplencia = this.formulario_modal_rci.value.fecha;
    }
    const lista_fecha = this.suplencia.fecha_suplencia.split(' ');
    const aux_suplencia = {
      usuario_registrado: this.edit_suplente.usuario_registrado,
      usuario_suplente: this.suplencia.usuario_suplente,
      fecha_desde: lista_fecha[0],
      fecha_hasta: lista_fecha[2],
      comentario: this.formulario_modal_rci.value.comentarios,
      identificador_usuario_creo: this.edit_suplente.identificador_usuario_creo,
      activo: this.edit_suplente.activo,
      id: this.edit_suplente.id
    };
    // console.log(aux_suplencia);
    this._modalSuplenciaService.editaSuplencia(aux_suplencia)
      .subscribe((data) => {
        this.actualizarTablaSuplencia(this.edit_suplente.usuario_registrado);
        this.txtBtnAgregar = 'Guardar';
        swal.fire('Éxito', 'Guardado Correctamente', 'success');
      }, error => {
        console.log(error);
        this.txtBtnAgregar = 'Guardar';
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      });
  }

  eliminar(suplencia) {
    swal.fire({
      title: '¿Está seguro?',
      text: `Esta seguro que desea borrar la suplencia de ${suplencia.nombre_usuario_suplente}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this._modalSuplenciaService.eliminaSuplencia(suplencia)
          .subscribe((data: any) => {
            console.log(data.mensaje);
            swal.fire('Éxito', `${data.mensaje}`, 'success');
            this.actualizarTablaSuplencia(this.datos_iniciales.usuario.identificador_usuario);
          },
            (error) => {
              console.log(error);
              swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
            });
      }
    });
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    this.suplencia.fecha_suplencia = event.formatted;
  }

  ModalClose() {
    $('#ModalSuplencia').modal('toggle');
  }

  closeModal() {
    this.bandera = 'nuevo';
    this.edit_suplente.usuario_suplente = '0';
    this.iniciarFormularioCrear();
    this.txtBtnAgregar = 'Guardar';
    this.ModalClose();
  }

  identificadorSuplente(identificador) {
    this.suplencia.usuario_suplente = identificador.value;
    this.edit_suplente.usuario_suplente = identificador.value;
  }

  async identificadorNombre(identificador) {
    // console.log(identificador);
    if (identificador.value !== '0') {
      this.bandera = 'nuevo';
      this.txtBtnAgregar = 'Continuar';
      this.edit_suplente.usuario_suplente = '0';
      this.iniciarFormularioCrear();
      this.edit_suplente.usuario_registrado = identificador.value;
      await this.actualizarTablaSuplencia(identificador.value);
    }
  }

}
