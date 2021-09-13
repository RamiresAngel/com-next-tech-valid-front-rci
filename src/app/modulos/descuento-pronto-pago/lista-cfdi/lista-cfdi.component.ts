import { CompartidosService } from './../../../compartidos/servicios_compartidos/compartidos.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { DatosIniciales, FiltroDpp } from 'src/app/entidades';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { DescuentoProntoPagoService } from '../descuento-pronto-pago.service';
import { FacturaDPP } from 'src/app/entidades/factura-dpp';
import { Moneda } from 'src/app/entidades/flujo-aprobacion';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { FacturaSelDpp } from 'src/app/entidades/factura-sel-dpp';

@Component({
  selector: 'app-lista-cfdi',
  templateUrl: './lista-cfdi.component.html',
  styleUrls: ['./lista-cfdi.component.css']
})
export class ListaCfdiComponent implements OnInit {
  public dtOptions = {
    ordering: false,
    dom: 'lBfrtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [1, 2, 3] }
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        exportOptions: { columns: [1, 2, 3] }
      }
    ],
    oLanguage: {
      sProcessing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>',
      sLengthMenu: 'Mostrar _MENU_',
      sZeroRecords: 'No se encontraron resultados',
      sEmptyTable: 'Ningún dato disponible en esta tabla',
      sInfo:
        'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
      sInfoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
      sInfoFiltered: '(filtrado de un total de _MAX_ registros)',
      sInfoPostFix: '',
      sSearch: 'Buscar:',
      sUrl: '',
      sInfoThousands: '',
      sLoadingRecords: '<img src="assets/img/iconoCargando.gif" alt="">',
      copy: 'Copiar',
      oPaginate: {
        sFirst: 'Primero',
        sLast: 'Último',
        sNext: 'Siguiente',
        sPrevious: 'Anterior'
      },
      oAria: {
        sSortAscending:
          ': Activar para ordenar la columna de manera ascendente',
        sSortDescending:
          ': Activar para ordenar la columna de manera descendente'
      }
    }
  };
  public filtro = new FiltroDpp();
  private datos_iniciales: DatosIniciales;
  public convocatoria: any;
  public monto_descuento_acumulado = 0;
  public procentaje = 0;
  public facturappd = new FacturaDPP();
  public lista_monedas: Moneda;
  public mostrar_boton = false;
  public subtotal_anterior = 0;
  public contador = 0;
  public lista_enviar = new Array<FacturaSelDpp>();
  constructor(
    private _storageService: StorageService,
    private _servicioDpp: DescuentoProntoPagoService,
    private _servicio_compartido: CompartidosService,
    private globals: GlobalsComponent,
    private _desceuntoPPService: DescuentoProntoPagoService
  ) { }

  ngOnInit() {
    this.obtenerMonedas();
    // this.consultaFacturasDPP();
  }

  abrirModalConfirmacion() {
    swal.fire({
      title: '¿Realmente deseas enviar estas facturas?',
      type: 'question',
      text: `¡Esta acción no se puede revertir!, El total de las facturas seleccionadas es: ${this.subtotal_anterior},` +
        ` el total con descuento pronto pago es: $${this.subtotal_anterior - this.monto_descuento_acumulado}`,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Enviar!',
      cancelButtonText: 'Cerrar ventana',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        this.datos_iniciales = this._storageService.getDatosIniciales();
        const token = this.datos_iniciales.usuario.token;
        // return fetch(`http://172.17.33.4:6006/api/v1/validm/documento/dpp/facturas/${this.datos_iniciales.usuario.identificador_usuario}`, {
        return fetch(`${this.globals.host_documentos}/dpp/facturas/${this.datos_iniciales.usuario.identificador_usuario}`, {
          method: 'POST',
          body: JSON.stringify(this.lista_enviar),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }
        ).then(response => {
          console.log(response);
          return response.json();
        }).then(obj => {
          console.log(obj);
          if (obj.error_code === 409) {
            throw new Error(obj.mensaje);
          }
          if (obj.error_code === 500) {
            throw new Error(obj.mensaje);
          }
          swal.fire('Éxito', obj.mensaje, 'success');
        })
          .catch(error => {
            swal.showValidationMessage(
              `Ocurrio un error inesperado: ${error}`
            );
          });
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
    });
  }


  obtenerMonedas() {
    this._servicio_compartido.obtenerMonedasCorporativo(this.datos_iniciales.usuario.identificador_corporativo).subscribe(
      (data: any) => {
        this.lista_monedas = data.map(obj => {
          obj.id_moneda = obj.id;
          return obj;
        });
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
      , () => {
      }
    );
  }

  calcularDescuento(factura: any, obj: any) {
    let descuento_factura = 0;

    const auxFac = new FacturaSelDpp();
    if (obj.target.checked) {
      this.subtotal_anterior += factura.subtotal;
      this.contador += 1;
      descuento_factura = ((this.procentaje * factura.subtotal) / 100);
      auxFac.id = 0;
      auxFac.descuento_pronto_pago_id = this.facturappd.convocatoria.id;
      auxFac.moneda = 'MXN';
      auxFac.monto = (factura.subtotal - descuento_factura);
      auxFac.documento_cfdi_id = factura.id;
      auxFac.estatus = 0;
      auxFac.dpp_lote_identificador = '';
      this.lista_enviar.push(auxFac);
    } else {
      this.contador -= 1;
      this.subtotal_anterior += factura.subtotal;
      descuento_factura = (((this.procentaje * factura.subtotal) / 100) * -1);
      auxFac.id = 0;
      auxFac.descuento_pronto_pago_id = this.facturappd.convocatoria.id;
      auxFac.moneda = 'MXN';
      auxFac.monto = (factura.subtotal - descuento_factura);
      auxFac.documento_cfdi_id = factura.id;
      auxFac.estatus = 0;
      auxFac.dpp_lote_identificador = '';
      this.lista_enviar = this.globals.eliminarRepetidos(this.lista_enviar, 'documento_cfdi_id');
      this.lista_enviar = this.lista_enviar.filter(obj2 => obj2.documento_cfdi_id !== factura.id);
    }
    this.monto_descuento_acumulado += descuento_factura;
    if (this.monto_descuento_acumulado > 0) {
      this.mostrar_boton = true;
    } else {
      this.mostrar_boton = false;
    }
  }

  filtrar() {
    console.log(this.filtro);
    this._desceuntoPPService.consultaCfdiDpp(this.filtro).subscribe(
      (data: any) => {
        this.facturappd = data;
        this.procentaje = this.facturappd.convocatoria.porcentaje_dpp;
        if (this.facturappd.facturas.length < 1) {
          swal.fire('Atención', 'No hay facturas disponibles para mostrar, intente ampliando el rango de fechas en el filtro.', 'info');
        }

      }
      , (error) => {
        this.filtro.buscando = false;
        if (error.error) {
          error.error.mensaje.forEach(errormsj => {
            if (!errormsj.resultado) {
              swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + errormsj.mensaje, 'warning');
              return false;
            }
          });
          if (error.mensaje.resultado) {
            swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.mensaje.mensaje, 'warning');
          }
        } else {
          swal.fire('Atención', 'Ha ocurrido un error inesperado. Por favor intentalo nuevamente más tarde', 'error');
        }
      }
      , () => {
        this.filtro.buscando = false;
      }
    );
  }

}
