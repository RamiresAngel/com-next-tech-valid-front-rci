import { CompartidosService } from './../../../compartidos/servicios_compartidos/compartidos.service';
import { Component, OnInit, Input } from '@angular/core';
import { DocumentoRelacionado, ComplementoDePago } from 'src/app/entidades';
import Swal from 'sweetalert2';
import { LoadingService } from 'src/app/compartidos/servicios_compartidos/loading.service';

@Component({
  selector: 'app-detalle-complementos',
  templateUrl: './detalle-complementos.component.html',
  styleUrls: ['./detalle-complementos.component.css']
})
export class DetalleComplementosComponent implements OnInit {

  @Input() complementos_pago: any;
  @Input() documentos_relacionados: any[];
  @Input() documentos_anexos = new Array<any>();

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
        this.compartidoService.eliminarAnexos(id_anexo).subscribe((result) => {
          Swal.fire('Resultado', result as string, 'info');
        }, error => {
          Swal.fire('Error en la operación', 'La transaccion no se pudo realizar correctamente debido al siguiente error: ' + error, 'error');
        });
      } else {
        Swal.fire('Operación Cancelada', 'El archivo no fue eliminado', 'info');
      }
    }).catch(error => {
      Swal.fire('Error en la operación', 'La transaccion no se pudo realizar correctamente debido al siguiente error: ' + error, 'error');
    });
  }

  obtenerURl(documento) {
    this.loadingService.showLoading();
    this.compartidoService.descargarAnexo({ extension: documento.extension, identificador: documento.identificador }).subscribe((data) => {
      console.log(data)
      this.loadingService.hideLoading();
    }, err => {
      console.log(err);
      this.loadingService.hideLoading();
    })
  }



}
