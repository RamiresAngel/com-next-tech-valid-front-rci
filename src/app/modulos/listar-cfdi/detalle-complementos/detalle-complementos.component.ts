import { CompartidosService } from './../../../compartidos/servicios_compartidos/compartidos.service';
import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { LoadingService } from 'src/app/compartidos/servicios_compartidos/loading.service';
import { Cfdi } from 'src/app/entidades/cfdi';
declare var $: any;

@Component({
  selector: 'app-detalle-complementos',
  templateUrl: './detalle-complementos.component.html',
  styleUrls: ['./detalle-complementos.component.css']
})
export class DetalleComplementosComponent implements OnInit {

  @Input() complementos_pago: any;
  @Input() documentos_relacionados: any[];
  @Input() documentos_anexos = new Array<any>();
  @Input() documento_cfdi: Cfdi;
  @Input() identificador_corporativo: string;

  constructor(
    private compartidoService: CompartidosService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() { }

  eliminarAnexo(id_anexo) {

    Swal.fire({
      title: '<strong>Eliminar Documento</strong>',
      type: 'warning',
      html:
        'Esta acción es irreversible.' +
        '</br> Esta seguro que desea continuar con la operación? ',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fas fa-check"></i>',
      confirmButtonAriaLabel: 'Ok',
      cancelButtonText:
        '<i class="far fa-times-circle"></i>',
      cancelButtonAriaLabel: 'Cancelar'
    }).then(resp => {
      if (resp.value === true) {
        this.loadingService.showLoading();
        this.compartidoService.eliminarAnexos(id_anexo).subscribe((result: any) => {
          Swal.fire('Resultado', result.mensaje as string, 'success');
          this.actualizarAnexos();
          this.loadingService.hideLoading();
        }, error => {
          this.loadingService.hideLoading();
          Swal.fire('Error en la operación', 'La transaccion no se pudo realizar correctamente debido al siguiente error: ' + error, 'error');
        });
      } else {
        Swal.fire('Operación Cancelada', 'El archivo no fue eliminado', 'info');
      }
    }).catch(error => {
      Swal.fire('Error en la operación', 'La transacción no se pudo realizar correctamente debido al siguiente error: ' + error, 'error');
    });
  }

  obtenerURl(documento) {
    this.loadingService.showLoading();
    this.compartidoService.descargarAnexo({ extension: documento.extension, identificador: documento.identificador }).subscribe((data: any) => {
      const enlace = document.createElement('a');
      enlace.setAttribute('href', data)
      enlace.setAttribute('target', '_blank')
      enlace.style.display = 'none';
      enlace.click();
      this.loadingService.hideLoading();
    }, err => {
      console.log(err);
      this.loadingService.hideLoading();
    })
  }

  mostrarModal() {
    $('#modalAnexos').modal('show');
  }

  actualizarAnexos() {
    this.compartidoService.listarAnexos(this.documento_cfdi.id).subscribe((data: any) => {
      this.documentos_anexos = data;
    }, error => {
      this.documentos_anexos.length = 0;
    });
  }

}
