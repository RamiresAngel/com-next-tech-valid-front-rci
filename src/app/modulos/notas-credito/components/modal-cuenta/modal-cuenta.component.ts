import { NotasCreditoService } from './../../notas-credito.service';
import { NotasCredito } from './../../../../entidades/Notas_credito';
import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/compartidos/servicios_compartidos/loading.service';
import Swal from 'sweetalert2';

declare var $: any;


@Component({
  selector: 'app-modal-cuenta',
  templateUrl: './modal-cuenta.component.html',
  styleUrls: ['./modal-cuenta.component.css']
})
export class ModalCuentaComponent implements OnInit {

  @Input() nota_credito = new NotasCredito();

  constructor(
    private loadingService: LoadingService,
    private notasCreditoService: NotasCreditoService

  ) { }

  ngOnInit() {
  }

  guardarDatos() {
    this.loadingService.showLoading();

    console.log(this.nota_credito);
    this.notasCreditoService.actualizarCuentaSite(this.nota_credito).subscribe((data: any) => {
      this.loadingService.hideLoading();
      this.cerrarModal();
      setTimeout(() => {
        this.mostrarMensaje(data.mensaje, 'success');
      }, 100);
    }, error => {
      this.loadingService.hideLoading();
      this.mostrarMensaje(error.mensaje, 'error');
    });
  }

  cerrarModal() {
    $('#exampleModal').modal('hide');
  }

  mostrarMensaje(message: string, tipo: 'error' | 'success') {
    Swal.fire(tipo == 'error' ? 'Error' : 'Exito', message, tipo);
  }

}
