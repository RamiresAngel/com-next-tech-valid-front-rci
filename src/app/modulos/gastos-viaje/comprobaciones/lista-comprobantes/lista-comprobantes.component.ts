import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { GastosViajeService } from '../../gastos-viaje.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';

@Component({
  selector: 'app-lista-comprobantes',
  templateUrl: './lista-comprobantes.component.html',
  styleUrls: ['./lista-comprobantes.component.css']
})
export class ListaComprobantesComponent implements OnInit {
  @Input() lista_comprobaciones: Array<any>;
  @Input() id_solicitud: number;
  @Input() total_comprobado: number = 0;
  @Input() tipo_cambio: number;
  @Input() anticipo: number;
  @Output() comprobar = new EventEmitter();
  @Output() cancelar = new EventEmitter();
  @Output() eliminarComprobacion = new EventEmitter();

  total_gastado: number;
  url_politicas = '';

  totales = {
    monto_solicitud: 0,
    total_gastado: 0,
    monto_reembolsable: 0,
    monto_devolucion: 0,
  }
  lista_comprobados = [];
  constructor(private _gastosViajeService: GastosViajeService, private storageService: StorageService) { }
  ngOnInit() {
    this.obtenerMontosComprobados();
    this.obtenerURLPoliticas();
  }
  ngOnChanges() {
    this.calcularComprobado();
  }

  obtenerMontosComprobados() {
    if (this.id_solicitud) {
      this._gastosViajeService.getTotalComprobados(this.id_solicitud).subscribe((data: any) => {
        this.totales = data;
        this.total_gastado = data.total_gastado;
      }, error => {
        console.log(error);
      });
    }
  }

  cancelarComprobacion() {
    this.cancelar.emit()
  }
  enviarComprobacion(boton) {
    Swal.fire({
      title: '',
      text: "¿Está seguro de querer terminar la comprobación y enviar los datos a aprobación?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Comprobar'
    }).then((result) => {
      if (result.value) {
        this.comprobar.emit(boton);
      }
    })
  }

  eliminarConcepto(indice) {
    Swal.fire({
      title: '',
      text: "Al eliminar un concepto de una factura, todos los demás conceptos se eliminarán también.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'

    }).then((result) => {
      if (result.value) {
        this.lista_comprobaciones.splice(indice, 1);
        this.eliminarComprobacion.emit(indice);
        this.calcularComprobado();
      }
    })
  }

  calcularComprobado() {
    if (this.anticipo) {
      this.calcularComprobadoAnticipo();
    } else {
      this.calcularComprobadoSinAnticipo();
    }
  }

  calcularComprobadoAnticipo() {
    this.totales.total_gastado = this.total_gastado;
    let suma_pagado_usuario = 0;
    let suma_pagado_compania = 0;
    let suma_gastado = 0;
    // debugger;
    this.lista_comprobaciones.forEach(x => {
      x.forEach(y => {
        suma_gastado += (y.importe * (y.tipo_cambio ? y.tipo_cambio : this.tipo_cambio));
        if (y.pagado_compania) {
          suma_pagado_compania += (y.importe * (y.tipo_cambio ? y.tipo_cambio : this.tipo_cambio))
        } else {
          suma_pagado_usuario += y.importe * (y.tipo_cambio ? y.tipo_cambio : this.tipo_cambio);
        }
      })
    });
    this.totales.total_gastado += suma_gastado;
    const devolver = this.totales.monto_solicitud - suma_pagado_usuario;
    this.totales.monto_devolucion = devolver <= 0 ? 0 : devolver;
    // const rembolsable = this.totales.total_gastado - this.totales.monto_solicitud;
    const rembolsable = suma_pagado_usuario - this.totales.monto_solicitud;
    this.totales.monto_reembolsable = rembolsable <= 0 ? 0 : rembolsable;
  }

  calcularComprobadoSinAnticipo() {
    this.totales.total_gastado = this.total_gastado;
    let total_gastado = 0;
    let reembolsable = 0;

    // debugger;
    this.lista_comprobaciones.forEach(x => {
      x.forEach(y => {
        total_gastado += y.importe * (y.tipo_cambio ? y.tipo_cambio : this.tipo_cambio);
        if (!y.pagado_compania) {
          reembolsable += y.importe * (y.tipo_cambio ? y.tipo_cambio : this.tipo_cambio);
        }
      })
    });

    this.totales.total_gastado += total_gastado;
    // const rembolsable = reembolsable - this.totales.monto_solicitud;
    // const devolver = this.totales.monto_solicitud - this.totales.total_gastado;
    this.totales.monto_devolucion = 0;
    this.totales.monto_reembolsable = reembolsable;
  }


  obtenerURLPoliticas() {
    // this._gastosViajeService.obtenerPoliticasViaje(this.storageService.getCorporativoActivo().corporativo_identificador).subscribe((data: any) => {
    //   this.url_politicas = data;
    // }, error => {
    //   console.log(error);
    // });

  }

}
