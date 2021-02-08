import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GastosViajeService } from 'src/app/modulos/gastos-viaje/gastos-viaje.service';
import { ConceptoCFDI, DefaultCFDI } from 'src/app/entidades/cfdi';

@Component({
  selector: 'app-lista-comprobantes-carga',
  templateUrl: './lista-comprobantes-carga.component.html',
  styleUrls: ['./lista-comprobantes-carga.component.css']
})
export class ListaComprobantesCargaComponent implements OnInit {
  @Input() totales: { total_gastado: number, monto_reembolsable: number }
  @Input() lista_comprobaciones: DefaultCFDI[];
  @Input() numero_comprobacion: Array<any>;
  @Output() onEliminarComprobacion = new EventEmitter();
  @Output() onEnviarComprobacion = new EventEmitter();
  @Output() eliminarComprobante = new EventEmitter();
  @Output() onComprobar = new EventEmitter();
  @Output() onCancelar = new EventEmitter();


  lista_comprobados = [];
  constructor(private _gastosViajeService: GastosViajeService, private storageService: StorageService) { }
  ngOnInit() {
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
        this.onComprobar.emit(boton);
      }
    })
  }

  eliminarConcepto(indice) {
    Swal.fire({
      title: '',
      text: "Al eliminar un concepto se elimina el comprobante y todos sus conceptos.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.value) {
        this.lista_comprobaciones.splice(indice, 1);
        // this.eliminarComprobante.emit(indice);
      }
    })
  }
}
