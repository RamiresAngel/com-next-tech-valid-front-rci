import { Usuario } from './../../../entidades/usuario';
import { StorageService } from './../../../compartidos/login/storage.service';
import { ProveedoresService } from './../../proveedores/proveedores.service';
import { LoadingService } from './../../../compartidos/servicios_compartidos/loading.service';
import { CompartidosService } from './../../../compartidos/servicios_compartidos/compartidos.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { IMyDpOptions } from 'mydatepicker';
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
  @Output() onCerrar = new EventEmitter();
  public pestana_activa: 'detalle' | 'anexos';
  fecha_pago: any;
  fecha_pago_selected: string;
  usuario: Usuario;


  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true,
    disableUntil: this.obtnerDiaAnterior()
    // disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() }
  };

  constructor(
    private compartidoService: CompartidosService,
    private proveedorService: ProveedoresService,
    private storageService: StorageService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.usuario = this.storageService.getDatosIniciales().usuario;
    this.setActivo('detalle');
  }

  ngOnChanges(): void {
    if (this.data && this.data.fecha_pago) {
      const fecha = new Date(this.data.fecha_pago);
      this.fecha_pago = { date: { year: fecha.getFullYear(), month: fecha.getMonth() + 1, day: fecha.getDate() }, formatted: `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}` };
    }
  }

  setActivo(pestana: 'detalle' | 'anexos') {
    this.pestana_activa = pestana
  }

  cerrarModal() {
    this.pestana_activa = 'detalle';
    if (this.data.numero_nivel == 2) {
      this.onCerrar.emit();
    }
    this.data = null;
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
    }, () => {
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
    }, () => {
      this.documentos_anexos.length = 0;
    });
  }

  onFechaPagoSelected(fecha) {
    this.fecha_pago_selected = fecha.formatted
  }

  onActualizar() {
    Swal.fire({
      title: '',
      text: "¿Está seguro de querer actualizar la fecha programada de pago para esta factura?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.value) {
        this.loadingService.showLoading();
        const obj = {
          fecha_emision: this.data.fecha_emision,
          fecha_pago: this.fecha_pago.formatted,
          ordenes_compra: this.data.ordenes_compra,
          id: this.data.id,

        }
        this.proveedorService.actualizarfechaPago(obj).subscribe((data: any) => {
          this.loadingService.hideLoading();
          Swal.fire('¡Éxito!', data.mensaje ? data.mensaje : 'Dato actualizado correctamente.', 'success');
          this.cerrarModal();
        }, err => {
          this.loadingService.hideLoading();
          Swal.fire('¡Error!', err.error.message ? err.error.message : 'No se pudo actualizar la informacion', 'error');
        });
      }
    })
  }

  obtnerDiaAnterior() {
    const ayer = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    return { year: ayer.getFullYear(), month: ayer.getMonth() + 1, day: ayer.getDate() }
  }

}
