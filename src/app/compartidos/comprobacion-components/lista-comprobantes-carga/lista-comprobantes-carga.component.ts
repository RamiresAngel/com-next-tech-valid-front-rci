import { AprobacionParcial, AprobacionParcialConcepto } from './../../../entidades/AprobacionParcial';
import { Subscription } from 'rxjs';
import { BandejaAprobacionService } from './../../../modulos/bandeja-aprobacion/bandeja-aprobacion.service';
import { ModalConceptosComprobantesComponent } from './../../modal-conceptos-comprobantes/modal-conceptos-comprobantes.component';
import { LoadingService } from './../../servicios_compartidos/loading.service';
import { ConceptoComprobanteRCI } from './../../../entidades/ComprobanteNacional';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('modalConceptos') modalConceptos: ModalConceptosComprobantesComponent;
  @Input() totales: { total_gastado: number, monto_reembolsable: number }
  @Input() lista_comprobaciones: ComprobanteRCI[];
  @Input() comprobante: ComprobanteRCI = new ComprobanteRCI();
  @Input() numero_comprobacion: Array<any>;
  @Input() lista_cuentas = [];
  @Output() onEliminarComprobacion = new EventEmitter();
  @Output() onEnviarComprobacion = new EventEmitter();
  @Output() onEliminarComprobante = new EventEmitter();
  @Output() onActualizarConceptosSuccess = new EventEmitter();
  @Output() onComprobar = new EventEmitter();
  @Output() onCancelar = new EventEmitter();
  @Output() onAprobarComprobacion = new EventEmitter();


  lista_comprobados = [];

  aprobacion_data: { nivel_aproacion: number, is_aprobacion: boolean }
  dataAprobacionSubscription: Subscription;
  constructor(private _gastosViajeService: GastosViajeService,
    private _bandejaAprobacionService: BandejaAprobacionService,
    private loadingService: LoadingService
  ) { }
  ngOnInit() {
    this.aprobacion_data = this._bandejaAprobacionService.datos_aprobacion;
  }

  ngOnDestroy() { }

  enviarComprobacion(boton) {
    console.log(this.lista_comprobaciones.length);
    console.log(this.totales.total_gastado);
    if ((this.lista_comprobaciones.length === 0) && (this.totales.total_gastado === 0)) {
      Swal.fire({
        title: 'Error',
        text: "Error: La comprobación no cuenta con ningún documento de soporte",
        type: 'error',
      })
    } else {
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
  }

  eliminarComprobante(id_preliminar: number, id_documento: number, preliminar_detalle_id: number) {
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
        this.onEliminarComprobante.emit({ id_preliminar, id_documento, preliminar_detalle_id });
        // this.lista_comprobaciones.splice(indice, 1);
        // // this.eliminarComprobante.emit(indice);
      }
    })
  }

  onActualizarComprobantes(conceptos) {
    this.loadingService.showLoading();
    this._gastosViajeService.actualizarConceptos(conceptos).subscribe((data: any) => {
      this.loadingService.hideLoading()
      setTimeout(() => {
        this.modalConceptos.cerrarModalConceptos();
        Swal.fire('Exito!', data.mensaje || 'Datos Actualizados correctamente.', 'success');
        this.onActualizarConceptosSuccess.emit();
      }, 100);
    }, err => {
      console.log(err)
      Swal.fire('Error!', err.message || 'Error desconocido intentado procesar la solicitud.', 'error');
      this.loadingService.hideLoading()
    })
  }

  showModal(comprobante) {
    /* console.log(conceptos); */
    this.comprobante = { ...comprobante };
    $('#modal_conceptos').modal('toggle');
  }

  async rechazarComprobacion() {

    const resultado = await Swal.fire({
      title: '¿Realmente deseas rechazar esta solicitud?',
      input: 'text',
      type: 'info',
      html: `
      <p class='mt-2'> ¡Esta acción no se puede revertir! Debe introducir un comentario.  </p>
      `,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputAttributes: {
        autocapitalize: 'off',
        maxlength: '500',
      },
      showLoaderOnConfirm: true,
      preConfirm: (mensaje): Promise<void> => {
        return new Promise((resolve, reject) => {
          const aprobacion = new AprobacionParcial();
          this.lista_comprobaciones.forEach(comprobacion => {
            comprobacion.conceptos.forEach(concepto => {
              const doc = new AprobacionParcialConcepto();
              doc.preliminar_detalle_id = concepto.id;
              doc.comentario = mensaje;
              aprobacion.documentos.push(doc);
            })
          })
          this.onAprobarComprobacion.emit(aprobacion);
          resolve();
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
    console.log(resultado);
  }

  async aprobarComprobacion() {

    const resultado = await Swal.fire({
      title: '¿Realmente deseas aprobar esta solicitud?',
      input: 'text',
      type: 'info',
      html: `
      <p class='mt-2'> ¡Esta acción no se puede revertir! Debe introducir un comentario de aceptación  </p>
      `,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputAttributes: {
        autocapitalize: 'off',
        maxlength: '500',
      },
      showLoaderOnConfirm: true,
      preConfirm: (mensaje): Promise<void> => {
        return new Promise((resolve, reject) => {
          const aprobacion = new AprobacionParcial();
          this.lista_comprobaciones.forEach(comprobacion => {
            comprobacion.conceptos.forEach(concepto => {
              const doc = new AprobacionParcialConcepto();
              doc.preliminar_detalle_id = concepto.id;
              doc.aprobado = true;
              doc.comentario = mensaje;
              aprobacion.documentos.push(doc);
            })
          })
          this.onAprobarComprobacion.emit(aprobacion);
          resolve();
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
    console.log(resultado);
  }
}
