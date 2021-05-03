import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { UsuarioService } from '../../usuarios/usuario.service';
import { CabeceraFlujoAp, Moneda, NivelAprobacion } from 'src/app/entidades/flujo-aprobacion';
import swal from 'sweetalert2';
import { FlujoAprobacionService } from '../flujo-aprobacion.service';
import { forEach } from '@angular/router/src/utils/collection';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { ActivatedRoute } from '@angular/router';
// HWH
@Component({
  selector: 'app-carga-monedas',
  templateUrl: './carga-monedas.component.html',
  styleUrls: ['./carga-monedas.component.css']
})
export class CargaMonedasComponent implements OnInit {

  public lista_monedas: any;
  public lista_aprobadores: any;
  public lista_aprobadores_aux2: any;
  public txtBtnAgregar = 'Guardar';
  public startValue_ap = null;
  public id_aprovador_seleccionado = null;
  public id_flujo: any;
  public datos_aprovador_seleccionado: any; // Datos del aprobador seleccionado
  @Input('contadorAuxiliar') contadorAuxiliar; // Contador de flujos
  @Input('id_cabecera') id_cabecera; // Contador de flujos
  @Input('flujo_edit') flujo_edit; // Contador de flujos
  // public flujo_edit: any; // El flujo a editar
  @Output() habilitarOtroFlujo = new EventEmitter();
  @Output() restarNivel = new EventEmitter();
  public contador = 1;
  public lista_detalle_aprovadores = new Array<any>(); // array auxiliar para mostrar en pantalla los aprobadores de flujo
  public lista_aprobadores_seleccionados = new Array<{ // array de usuarios que aprobaran el flujo
    identificador_usuario: string
  }>();
  public lista_monedas_valor = new Array<Moneda>(); // lista de monedas a mostrara en el formulario
  public nivel_aprobacion = new NivelAprobacion(); // Obj a enviar cuando se crea un flujo
  public lista_monedas_enviar = new Array<Moneda>(); // lista de las minedas con los montos a enviar
  public aux = '';
  public guardado = false;
  public contadoFlujosEdit_aux = 1;
  public identificador_corporativo: string;
  // @Input('array_monedas_cargadas') array_monedas_cargadas;
  @Output() agrgarMoneda = new EventEmitter();
  @Input() array_monedas_cargadas;
  @Input() contadoFlujosEdit;



  constructor(
    private _servicio_compartido: CompartidosService
    , private _servicio_usuarios: UsuarioService
    , private _storageService: StorageService
    , private _activatedRoute: ActivatedRoute
    , private _servicio_nivel_aprobacion: FlujoAprobacionService
  ) {
    const corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = corporativo_activo.corporativo_identificador;
    this.obtenerMonedas();
    this.obtenerUsuarios();
  }

  ngOnInit() {
    console.log(this.array_monedas_cargadas);
    this.contadoFlujosEdit_aux = this.contadoFlujosEdit;
    this.contador = this.contadorAuxiliar;
    this.nivel_aprobacion.id_flujo_aprobacion = 1;
    this.nivel_aprobacion.numero_nivel = this.contador;
    if (this.flujo_edit) {
      if (this.flujo_edit.id_flujo_aprobacion) {
        this.guardado = true;
        this.id_flujo = this.flujo_edit.id;
      }
    }
  }

  obtenerMonedas() {
    this._servicio_compartido.obtenerMonedasCorporativo(this.identificador_corporativo).subscribe(
      (data) => {
        this.lista_monedas = data;
        this.lista_monedas.forEach(element => {
          const aux = new Moneda();
          aux.id_moneda = element.id;
          aux.monto = 0;
          this.lista_monedas_valor.push(aux);
        });
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
      , () => {
        if (this.flujo_edit && this.flujo_edit.id_flujo_aprobacion) {
          this.setearValoresMonedas(this.flujo_edit);
        }
      }
    );
  }

  actualizarValorMoneda(obj: any, moneda: any) {
    const aux_moneda = new Moneda();
    aux_moneda.id_moneda = moneda.id;
    aux_moneda.monto = moneda.record_date; // parseFloat(obj.srcElement.value.substring(1, obj.srcElement.value.length));
    for (let index2 = 0; index2 < this.lista_monedas_enviar.length; index2++) {
      if (this.lista_monedas_enviar[index2].id_moneda === aux_moneda.id_moneda) {
        this.lista_monedas_enviar.splice(index2, 1);
      }
    }
    this.lista_monedas_enviar.push(aux_moneda);
  }

  obtenerUsuarios() {
    this.lista_aprobadores = null;
    this.startValue_ap = null;
    // this._activatedRoute.params.subscribe((id) => {
    //   if ( this._storageService.desencriptar_ids(id['id']) ) {
    //     this.id_cabecera = this._storageService.desencriptar_ids(id['id']);
    //   }
    // });
    // console.log(this.flujo_edit);

    setTimeout(() => {
      // this._servicio_usuarios.obtnerUsuariosMinCorporativo(this.identificador_corporativo).subscribe(
      this._servicio_usuarios.obtnerUsuariosParaAprobar(this.identificador_corporativo, this.id_cabecera).subscribe(
        (data) => {
          this.lista_aprobadores = $.map(data, function (obj: any) {
            obj.id = obj.identificador_usuario;
            obj.text = obj.nombre + ' ' + obj.apellido_paterno;
            return obj;
          });
          console.log(this.lista_aprobadores);
        }
        , (error) => {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        }
        , () => {
          // this.startValue_ap = '';
          // if (this.flujo_edit && this.flujo_edit.id_flujo_aprobacion) {
          //   this.setearValoresAprobadores(this.flujo_edit);
          // }
        }
      );
    }, 1000);

    this._servicio_usuarios.obtnerUsuariosMinCorporativo(this.identificador_corporativo).subscribe(
      (data) => {
        this.lista_aprobadores_aux2 = $.map(data, function (obj: any) {
          obj.id = obj.identificador_usuario;
          obj.text = obj.nombre + ' ' + obj.apellido_paterno;
          return obj;
        });
      }
      , (error) => {
        // swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
      , () => {
        this.startValue_ap = '';
        if (this.flujo_edit && this.flujo_edit.id_flujo_aprobacion) {
          this.setearValoresAprobadores(this.flujo_edit);
        }
      }
    );

  }

  actualizarAP(obj: any) {
    this.id_aprovador_seleccionado = obj.value;
    this.datos_aprovador_seleccionado = obj;
  }

  agregarAprobador() {

    for (let index = 0; index < this.lista_aprobadores_seleccionados.length; index++) {
      if (this.lista_aprobadores_seleccionados[index].identificador_usuario === this.id_aprovador_seleccionado) {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: Aprobador duplicado.', 'error');
        return false;
      }
    }

    this.lista_aprobadores_seleccionados.push({
      'identificador_usuario': this.id_aprovador_seleccionado
    });
    this.lista_detalle_aprovadores.push({
      nombre: this.datos_aprovador_seleccionado.data[0].nombre + ' ' + this.datos_aprovador_seleccionado.data[0].apellido_paterno
      , id: this.id_aprovador_seleccionado
    });
    this.id_aprovador_seleccionado = null;
    this.datos_aprovador_seleccionado = null;
    this.obtenerUsuarios();

  }

  verAprobadores() {
    // console.log(this.lista_aprobadores_seleccionados);
  }

  eliminarAprobador(obj: any): void {
    const index = this.lista_detalle_aprovadores.indexOf(obj);
    this.lista_detalle_aprovadores.splice(index, 1);
    const objEliminar = { 'identificador_usuario': String(obj.id) };
    for (let index2 = 0; index2 < this.lista_aprobadores_seleccionados.length; index2++) {
      if (this.lista_aprobadores_seleccionados[index2].identificador_usuario === objEliminar.identificador_usuario) {
        this.lista_aprobadores_seleccionados.splice(index2, 1);
      }
    }
  }

  guardarNivelAprobacion() {
    if (this.verificarMontos()) {
      const aux = this.array_monedas_cargadas.length; // this.contador - 1;
      this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
      this.nivel_aprobacion.id_flujo_aprobacion = this.id_cabecera;
      this.nivel_aprobacion.monedas = this.lista_monedas_enviar;
      this.nivel_aprobacion.usuarios = this.lista_aprobadores_seleccionados;
      if (this.lista_monedas_enviar.length === this.lista_monedas.length) {
        this.lista_monedas_enviar.forEach(element => {
          if (!element.monto) {
            swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: Debes de indicar una cantidad de aprobación para todas la monedas', 'error');
            this.txtBtnAgregar = 'Guardar';
            return false;
          }
        });
      } else {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: Debes de indicar una cantidad de aprobación para todas la monedas', 'error');
        this.txtBtnAgregar = 'Guardar';
        return false;
      }
      this._servicio_nivel_aprobacion.GuardarNivelAprobacionMX(this.nivel_aprobacion).subscribe(
        (data) => {
          if (!data) {
            this.txtBtnAgregar = 'Guardar';
            swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle: ' + data, 'error');
          } else {
            setTimeout(function () {
              $('.btn-warning')[aux].click();
            }, 1000);
            this.id_flujo = data;
            this.array_monedas_cargadas.push(this.nivel_aprobacion.monedas);
            this.habilitarOtroFlujo.emit();
            this.guardado = true;
            this.txtBtnAgregar = 'Guardado';
          }
        }
        , (error) => {
          this.txtBtnAgregar = 'Guardar';
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        }
        , () => {
        }
      );
    } else {
      swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: los montos del nuevo flujo deben ser mayores al flujo anterior.', 'error');
    }
  }

  verificarMontos(): boolean {
    let flag = true;
    if (this.array_monedas_cargadas.length > 0) {
      this.array_monedas_cargadas[this.array_monedas_cargadas.length - 1].forEach(element => {
        this.lista_monedas_enviar.forEach(moneda => {
          if (element.id_moneda === moneda.id_moneda) {
            if (moneda.monto > element.monto) {
            } else {
              flag = false;
            }
          }
        });
      });

    }
    return flag;
  }

  eliminarFlujo(obj: any) {
    swal.fire({
      title: '¿Estas seguro?',
      text: '¡Esta acción no podra revertirse!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) => {
      console.log(result);
      if (result.value) {
        if (this.array_monedas_cargadas.length > 0) {
          if (this.guardado) {
            if (this.contador === this.array_monedas_cargadas.length) {
              this.array_monedas_cargadas.pop();
              this.habilitarOtroFlujo.emit();
              this.restarNivel.emit();
              $(obj.path[4]).remove();
              this._servicio_nivel_aprobacion.EliminarNivelAprobacionMX(this.id_flujo).subscribe(
                (data) => {
                  if (result.value) {
                    swal.fire(
                      '¡Eliminado!',
                      'El nivel ha sido eliminado.',
                      'success'
                    );
                  }
                }
                , (error) => {
                  swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error:' + error.mensaje, 'error');
                }
                , () => {
                }
              );
            } else {
              swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: debes eliminar el flujo numero ' + this.array_monedas_cargadas.length + ' para poder continuar.', 'error');
            }
          } else {
            if (this.contador === (this.array_monedas_cargadas.length + 1)) {
              this.array_monedas_cargadas.pop();
              this.restarNivel.emit();
              $(obj.path[4]).remove();
            } else {
              swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: debes eliminar el flujo numero ' + this.array_monedas_cargadas.length + ' para poder continuar.', 'error');
            }
          }
        } else {
          this.habilitarOtroFlujo.emit();
          this.restarNivel.emit();
          $(obj.path[4]).remove();
        }
      }
    });

  }

  setearValoresMonedas(obj: any) {
    this.lista_monedas.forEach(moneda => {
      obj.monedas.forEach(moneda_edit => {
        if (moneda.id === moneda_edit.id_moneda) {
          moneda.record_date = moneda_edit.monto;
        }
      });
    });
  }

  setearValoresAprobadores(obj: any) {
    console.log(this.lista_aprobadores_aux2);
    this.lista_aprobadores_aux2.forEach(aprobadores => {
      obj.usuarios.forEach(aprobadores_edit => {
        if (aprobadores.id === aprobadores_edit.identificador_usuario) {
          this.lista_detalle_aprovadores.push({
            nombre: aprobadores.nombre + ' ' + aprobadores.apellido_paterno
            , id: aprobadores.identificador_usuario
          });
        }
      });
    });
  }


}
