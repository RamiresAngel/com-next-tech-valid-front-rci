import { LoadingService } from './../../../compartidos/servicios_compartidos/loading.service';
import { CompartidosService } from './../../../compartidos/servicios_compartidos/compartidos.service';
import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-modal-detalle-factura-proveedor',
  templateUrl: './modal-detalle-factura-proveedor.component.html'
})
export class ModalDetalleFacturaProveedorComponent implements OnInit {
  @Input() data: any;
  @Input() id_Doc: string;
  @Input() identificador_corporativo: string;
  @Input() documentos_anexos = new Array<any>();
  public pestana_activa: 'detalle' | 'anexos';

  constructor(
    private compartidoService: CompartidosService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.setActivo('detalle');
  }

  setActivo(pestana: 'detalle' | 'anexos') {
    this.pestana_activa = pestana
  }

  cerrarModal() {
    this.pestana_activa = 'detalle';
    $('#modal-detalle-factura-proveedor').modal('hide');
  }

  mostrarModal() {
    $('#modalAnexos').modal('show');
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

  actualizarAnexos() {
    this.compartidoService.listarAnexos(this.id_Doc).subscribe((data: any) => {
      this.documentos_anexos = data;
    }, error => {
      this.documentos_anexos.length = 0;
    });
  }

}
