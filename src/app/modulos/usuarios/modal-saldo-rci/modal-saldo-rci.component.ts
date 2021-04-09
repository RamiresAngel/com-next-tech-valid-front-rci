import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { DatosIniciales, Prestaciones, PrestacionSaldoUsuario } from 'src/app/entidades';
import { PrestacionesService } from '../../prestaciones/prestaciones.service';
import { UsuarioService } from '../usuario.service';
import swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-modal-saldo-rci',
  templateUrl: './modal-saldo-rci.component.html',
  styleUrls: ['./modal-saldo-rci.component.css']
})
export class ModalSaldoRciComponent implements OnChanges {

  public formularioSaldo: FormGroup;
  public datos_inciales: DatosIniciales;
  public lista_prestaciones_original = new Array<Prestaciones>();
  public lista_prestaciones = new Array<Prestaciones>();
  @Input() identificador_usuario: string;
  @Input() saldo_prestacion_edit = new PrestacionSaldoUsuario();
  @Input() saldos_actuales = new Array<PrestacionSaldoUsuario>();
  @Output() guardado = new EventEmitter();
  public saldo_prestacion_edit_aux = new PrestacionSaldoUsuario();
  public saldo = new PrestacionSaldoUsuario();
  public cargando = false;
  public logo_img = './assets/img/NEXT_5.png';
  public titulo = 'Agregar';


  constructor(
    public _servicePrestacion: PrestacionesService,
    private _storageService: StorageService,
    private _usuarioService: UsuarioService
  ) {
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.iniciarFormulario();
    this.cargarPrestaciones();
  }

  iniciarFormulario() {
    this.formularioSaldo = new FormGroup({
      id_prestacion: new FormControl(this.saldo_prestacion_edit_aux ? this.saldo_prestacion_edit_aux.id : '', Validators.required),
      saldo_inic: new FormControl(this.saldo_prestacion_edit_aux ? this.saldo_prestacion_edit_aux.monto_inicial : '', Validators.required),
      saldo_dispo: new FormControl(this.saldo_prestacion_edit_aux ? this.saldo_prestacion_edit_aux.monto_disponible : '', Validators.required)
    });
  }

  ngOnChanges(): void {
    this.lista_prestaciones = [...this.lista_prestaciones_original] ;
    this.saldo_prestacion_edit_aux = { ...this.saldo_prestacion_edit };
    if (this.saldo_prestacion_edit_aux.id) {
      this.titulo = 'Editar';
      this.saldo_prestacion_edit_aux.monto_disponible = Number(this.saldo_prestacion_edit_aux.monto_disponible);
      this.saldo_prestacion_edit_aux.monto_inicial = Number(this.saldo_prestacion_edit_aux.monto_inicial);
      this.formularioSaldo.get('id_prestacion').disable();
    } else {
      this.titulo = 'Agregar';
      this.formularioSaldo.get('id_prestacion').enable();
      this.eliminarPrestaciones();
    }
  }

  eliminarPrestaciones() {
    // Quitar las prestaciones del select que ya tengo asignadas
    if ((this.saldos_actuales) && (this.saldos_actuales.length > 0)) {
        this.saldos_actuales.forEach(saldo_actual => {
        this.lista_prestaciones = this.removeFuncionalidad(this.lista_prestaciones, saldo_actual.id_prestacion);
      });
    }
  }


  removeFuncionalidad(arr, value) {
    if (arr) {
      for (let index2 = 0; index2 < arr.length; index2++) {
        if (Number(arr[index2].id) === Number(value)) {
          arr.splice(index2, 1);
        }
      }
      return arr;
    }
  }

  cargarPrestaciones() {
    return new Promise((resolve, reject) => {
      this._servicePrestacion.getListPrestaciones(this.datos_inciales.usuario.identificador_corporativo).subscribe((data: Array<Prestaciones>) => {
        this.lista_prestaciones = [...data];
        this.lista_prestaciones_original =  [...data];
        resolve();
      }, error => {
        console.log(error);
        reject();
      });
    });
  }

  public cerrarModal() {
    $('#Modal').modal('toggle');
  }

  agregarSaldo() {
    this.cargando = true;
    this.saldo_prestacion_edit_aux.identificador_usuario_creo = this.datos_inciales.usuario.identificador_usuario;
    this.saldo_prestacion_edit_aux.identificador_usuario = this.identificador_usuario;
    if (this.saldo_prestacion_edit_aux.id) {
      this._usuarioService.addSaldoUsuario(this.saldo_prestacion_edit_aux).subscribe(
        (data: any) => {
          swal.fire('Éxito', 'Actualizado Correctamente', 'success');
          this.guardado.emit();
          this.cerrarModal();
          this.cargando = false;
        },
        (error: any) => {
          this.cargando = false;
          if (error.error) {
            swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
          } else {
            swal.fire('Atención', 'Ha ocurrido un error desconocido ', 'error');
          }
        }
      );
    } else { // Agregar Saldo
      this._usuarioService.addSaldoUsuario(this.saldo_prestacion_edit_aux).subscribe(
        (data: any) => {
          swal.fire('Éxito', 'Guardado Correctamente', 'success');
          this.guardado.emit();
          this.cerrarModal();
          this.cargando = false;
        },
        (error: any) => {
          this.cargando = false;
          if (error.error) {
            swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
          } else {
            swal.fire('Atención', 'Ha ocurrido un error desconocido ', 'error');
          }
        }
      );
    }
  }

}
