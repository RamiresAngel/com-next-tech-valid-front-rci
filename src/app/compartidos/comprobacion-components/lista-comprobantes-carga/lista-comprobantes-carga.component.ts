import { ConceptoComprobanteRCI } from './../../../entidades/ComprobanteNacional';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GastosViajeService } from 'src/app/modulos/gastos-viaje/gastos-viaje.service';
import { ConceptoCFDI, DefaultCFDI } from 'src/app/entidades/cfdi';
import { ComprobanteRCI } from 'src/app/entidades/ComprobanteNacional';
declare var $: any;
@Component({
  selector: 'app-lista-comprobantes-carga',
  templateUrl: './lista-comprobantes-carga.component.html',
  styleUrls: ['./lista-comprobantes-carga.component.css']
})
export class ListaComprobantesCargaComponent implements OnInit {
  @Input() totales: { total_gastado: number, monto_reembolsable: number }
  @Input() lista_comprobaciones: ComprobanteRCI[];
  @Input() numero_comprobacion: Array<any>;
  @Output() onEliminarComprobacion = new EventEmitter();
  @Output() onEnviarComprobacion = new EventEmitter();
  @Output() onEliminarComprobante = new EventEmitter();
  @Output() onComprobar = new EventEmitter();
  @Output() onCancelar = new EventEmitter();
  public comprobante: ComprobanteRCI = new ComprobanteRCI();


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

  eliminarComprobante(id_preliminar: number, id_documento: number) {
    Swal.fire({
      title: '',
      text: "¿Eliminar comprobante?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.value) {
        this.onEliminarComprobante.emit({ id_preliminar, id_documento });
        // this.lista_comprobaciones.splice(indice, 1);
        // // this.eliminarComprobante.emit(indice);
      }
    })
  }
  showModal(comprobante) {
    /* console.log(conceptos); */
    this.comprobante = comprobante;
    $('#modal_conceptos').modal('toggle');
  }

}
