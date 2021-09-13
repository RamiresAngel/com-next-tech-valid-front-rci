import { UsuarioService } from './../usuario.service';
import { PrestacionesService } from './../../prestaciones/prestaciones.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DatosIniciales, PrestacionSaldoUsuario, Usuario } from 'src/app/entidades';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-modal-prestacion-rci',
  templateUrl: './modal-prestacion-rci.component.html',
  styleUrls: ['./modal-prestacion-rci.component.css']
})
export class ModalPrestacionRciComponent implements OnChanges {

  public datos_iniciales: DatosIniciales;
  public lista_prestaciones = new Array<PrestacionSaldoUsuario>();
  @Input() usuario = new Usuario();
  public cargando = false;
  public logo_img = './assets/img/NEXT_5.png';

  constructor(
    private _servicePrestacion: PrestacionesService,
    private _storageService: StorageService,
    private _usuariosService: UsuarioService,
  ) {
    this.datos_iniciales = this._storageService.getDatosIniciales();
  }

  public cerrarModal() {
    $('#ModalPrestacion').modal('toggle');
  }

  ngOnChanges() {
    if (this.usuario) {
      this.cargarSaldos();
    }
  }

  actualizarXeditable() {
    let that = this;
    this.lista_prestaciones.forEach(prestacion => {
      $(`#${prestacion.id}_montoinicial`).editable({
        type: 'text',
        step: 'any',
        mode: 'inline',
        pk: JSON.stringify(prestacion),
        title: 'Actualizar el saldo',
        tpl: `<input maxlength='10' type="text" name='${prestacion.id}_montoinicial' id='${prestacion.id}_montoinicial' class="form-control zipiddemo input-sm dd" style="padding-right: 24px;">`,
        url: function (params) {
          return that.actualizarSaldos(params);
        },
        validate: function (value) {
          if ($.trim(value) === '') {
            return 'Este campo es requerido';
          }
        },
        params: function (params) {
          return params;
        },
        success: function (response, newValue) {
          return true;
        },
        error: function (errors) {
          let msg = '';
          if (errors && errors.responseText) { //ajax error, errors = xhr object
            msg = errors.responseText;
          } else { //validation error (client-side or server-side)
            $.each(errors, function (k, v) { msg += k + ": " + v + "<br>"; });
          }
          $('#msg').removeClass('alert-success').addClass('alert-error').html(msg).show();
        }
      }).on('shown', () => {
        $('.zipiddemo').maskMoney({ symbol: '$ ', thousands: '.', decimal: ',', symbolStay: true });
      });


      $(`#${prestacion.id}_montodisponible`).editable({
        type: 'text',
        step: 'any',
        mode: 'inline',
        pk: JSON.stringify(prestacion),
        title: 'Actualizar el saldo',
        tpl: `<input maxlength='10' type="text" name='${prestacion.id}_montoinicial' id='${prestacion.id}_montodisponible'  class="form-control zipiddemo input-sm dd" style="padding-right: 24px;">`,
        url: function (params) {
          return that.actualizarSaldos(params);
        },
        validate: function (value) {
          if ($.trim(value) === '') {
            return 'Este campo es requerido';
          }
        },
        params: function (params) {
          return params;
        },
        success: function (response, newValue) {
          return true;
        },
        error: function (errors) {
          let msg = '';
          if (errors && errors.responseText) { //ajax error, errors = xhr object
            msg = errors.responseText;
          } else { //validation error (client-side or server-side)
            $.each(errors, function (k, v) { msg += k + ": " + v + "<br>"; });
          }
          $('#msg').removeClass('alert-success').addClass('alert-error').html(msg).show();
        }
      }).on('shown', () => {
        $('.zipiddemo').maskMoney({ symbol: '$ ', thousands: '.', decimal: ',', symbolStay: true });
      });
    });


  }

  cargarPrestaciones() {
    return new Promise((resolve, reject) => {
      this._servicePrestacion.getListPrestaciones(this.datos_iniciales.usuario.identificador_corporativo).subscribe((data: Array<PrestacionSaldoUsuario>) => {
        this.lista_prestaciones = data;
        resolve();
      }, error => {
        console.log(error);
        reject();
      });
    });
  }

  cargarSaldos() {
    return new Promise((resolve, reject) => {
      this._usuariosService.getSaldosPrestacion(this.usuario.identificador_usuario).subscribe(
        (data: any) => {
          this.lista_prestaciones = data;
          resolve();
          setTimeout(() => {
            this.actualizarXeditable();
          }, 500);
        },
        (error) => {
          reject(error);
          console.log(error);
        }
      );
    });
  }

  actualizarSaldos(saldo: any) {
    // Agregarle el nuevo saldo al objeto que se va actualizar
    this.cargando = true;
    const saldo_editar: PrestacionSaldoUsuario = saldo.pk;
    const aux_tipo = saldo.name.split('_')[1];
    if (aux_tipo === 'montoinicial') {
      saldo_editar.monto_inicial = saldo.value.replace('.', '').replace(',', '.');
    } else {
      saldo_editar.monto_disponible = saldo.value.replace('.', '').replace(',', '.');
    }



    saldo_editar.identificador_usuario_creo = this.datos_iniciales.usuario.identificador_usuario;
    console.log(saldo_editar);
    return new Promise((resolve, reject) => {

      if (Number(saldo_editar.monto_disponible) > Number(saldo_editar.monto_inicial)) {
        this.cargando = false;
        swal.fire('Atención', 'El saldo disponible no puede ser mayor al saldo inicial.', 'error');
        reject();
      } else {
        this._usuariosService.addSaldoUsuario(saldo_editar).subscribe(
          (data: any) => {
            this.cargarSaldos().then(
              (data2) => {
                this.cargando = false;
                resolve();
              });
          },
          (error: any) => {
            console.log(error);
            if (error.error) {
              swal.fire('Atención', error.error.mensaje, 'error');
              reject();
            } else {
              swal.fire('Atención', 'Ocurrió un error inesperado.', 'error');
              reject();
            }
            this.cargando = false;
          }
        );
      }
    });
  }

  eliminarSaldo(event, prestacion) {
    if (!event.target.checked) {
      swal.fire({
        title: '¿Seguro que desea eliminar este saldo de la prestación?',
        text: '!Este proceso es irreversible!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No, ¡Cerrar!',
        confirmButtonText: 'Si, ¡Eliminar!'
      }).then((result) => {
        if (result.value) {
          // Eliminar saldo
          this.cargando = true;
          this._usuariosService.delSaldoUsuario(prestacion.id).subscribe(
            (data: any) => {
              swal.fire('Éxito', 'Saldo eliminado con éxito', 'success');
              this.cargarSaldos().then(
                (data2) => {
                  this.cargando = false;
                });
            },
            (error) => {
              event.target.checked = true;
              if (error.error) {
                swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
              } else {
                swal.fire('Atención', 'Ha ocurrido un error desconocido ', 'error');
              }
            });
        } else {
          event.target.checked = true;
        }
      });

    }
  }

}
