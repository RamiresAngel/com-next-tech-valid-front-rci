import { AcreedoresDiversosService } from './../../acreedores-diversos/acreedores-diversos.service';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Renderer2 } from '@angular/core';
import { Cfdi, ComplementoDePago, DocumentoRelacionado } from 'src/app/entidades/cfdi';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CorporativoActivo, DatosIniciales, FiltroCFDI, FlujoAprobacion } from 'src/app/entidades';
import { ListarCfdiService } from '../listar-cfdi.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import formatDate from '@bitty/format-date';


declare var $: any;
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-listar-cfdi-mx',
  templateUrl: './listar-cfdi-mx.component.html',
  styleUrls: ['./listar-cfdi-mx.component.css']
})
export class ListarCfdiMxComponent implements AfterViewInit, OnInit, OnDestroy {
  listener: () => void;
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;

  complementos_pago = new ComplementoDePago();
  documentos_relacionados = new Array<DocumentoRelacionado>();
  documentos_anexos = new Array<any>();
  lista_comprobantes = new Array<any>();
  documento_seleccionado: Cfdi;
  public lista_detalle_aprobacion: FlujoAprobacion[];

  numero_pagina = 0;
  detalles_factura;

  lista_documentos_validar: Array<any> = [];
  public vista_carga: string;
  public array_sucursales: any;
  public lista_cfdis: Array<Cfdi>;
  public complementos: Array<Cfdi>;
  public showCorporativos = false;
  public identificador_corporativo = '';
  filtroConsulta = new FiltroCFDI();
  // @Input() filtroConsulta;
  dtOptions: any = {};
  persons: any;
  public url = '';
  private corporativo_activo: CorporativoActivo;
  private datos_iniciales: DatosIniciales;
  private lista_dcoumentos_anexos = new Array();

  constructor(
    public globals: GlobalsComponent,
    private _storage_service: StorageService,
    private _listarcfdiService: ListarCfdiService,
    private compartidosService: CompartidosService,
    private acreedoresService: AcreedoresDiversosService,
    private renderer: Renderer2,
    private router: Router,
    private http: HttpClient
  ) {
    this.corporativo_activo = this._storage_service.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.datos_iniciales = this._storage_service.getDatosIniciales();
    this.url = `${this.globals.host_documentos}/list`;
  }

  ngOnInit() {
    this.actualizaTabla();
    this.vista_carga = this._storage_service.getDatosIniciales().funcionalidades.find(o => o.clave === 'VISTA_CARGADOC').valor;
  }
  ngAfterViewInit(): void {
    const that = this;
    this.listener = this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('cfdi_id')) {
        const id = event.target.getAttribute('cfdi_id');
        const json = event.target.getAttribute('btn_actualizarPDF');
        this.documento_seleccionado = JSON.parse(json);
        that.mostrarComplemento(id, event.target)
      }
      else if (event.target.hasAttribute('btn_reprocesar')) {
        const id = event.target.getAttribute('btn_reprocesar');
        that.reprocesar(id);
      }
      else if (event.target.hasAttribute('btn_interprete')) {
        const uuid = event.target.getAttribute('btn_interprete');
        this.mostrarInterprete(event.target, uuid);
      }
      else if (event.target.hasAttribute('btn_actualizarPDF')) {
        const json = event.target.getAttribute('btn_actualizarPDF');
        this.documento_seleccionado = JSON.parse(json);
        setTimeout(() => {
          this.mostrarModal();
        }, 100);
      }
      else if (event.target.hasAttribute('btn_eliminar_folio_fiscal') && event.target.hasAttribute('btn_eliminar_id')) {
        const folio_fiscal = event.target.getAttribute('btn_eliminar_folio_fiscal');
        const id = event.target.getAttribute('btn_eliminar_id');
        that.eliminarDocumento(folio_fiscal, id);
      }
      else if (event.target.hasAttribute('enviar_documento')) {
        const cfdi = event.target.getAttribute('enviar_documento');
        // that.eliminarDocumento(folio_fiscal, cfdi);
        // console.log(cfdi);
        // console.log(JSON.parse(cfdi));
        const documento = JSON.parse(cfdi);
        that.prepararValidacionSAT(documento, event.target.checked);
      }
      else if (event.target.hasAttribute('input_check_todos')) {
        that.seleccionarTodo(event.target.checked);
      }
      else if (event.target.hasAttribute('btn_actualizar_estatus')) {
        const txt = '<i class="far fa-check-circle"></i> Validar';
        const button = event.target;
        if (that.lista_documentos_validar.length > 0) {
          button.disabled = true;
          button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        }
        that.validarCFDIs().then(() => {
          button.innerHTML = txt;
          button.disabled = false;
        }).catch(() => {
          button.innerHTML = txt;
          button.disabled = false;
        });
      }
      else if (event.target.hasAttribute('verDetallesAprobacion')) {
        const data = event.target.getAttribute('verDetallesAprobacion');
        that.verDetallesAprobacion(event, data);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.listener) {
      this.listener();
    }
  }

  actualizaTabla() {
    const that = this;
    let headers = new HttpHeaders();
    this.datos_iniciales = this._storage_service.getDatosIniciales();
    this.filtroConsulta.identificador_corporativo = this.datos_iniciales.usuario.identificador_corporativo;
    const token = this.datos_iniciales.usuario.token;
    headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    this.dtOptions = {
      pageLength: 10,
      stateSave: true,
      lengthChange: true,
      lengthMenu: [[10, 25, 50, 100, 2000], [10, 25, 50, 100, '2000 (max)']],
      'createdRow'(row, data: any, index) {
        if (data.total_factura) {
          $('td', row).eq(20).addClass('text-right').html('$' + (data.total_factura).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
        }
      },
      serverSide: true,
      searching: false,
      processing: true,
      scrollY: '40vh',
      scrollX: true,
      scrollCollapse: true,
      autoWidth: true,
      ordering: false,
      language: {
        emptyTable: 'Ningún dato disponible en esta tabla',
        info: 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
        infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
        infoFiltered: '(filtrado de un total de _MAX_ registros)',
        infoPostFix: '',
        thousands: '',
        lengthMenu: 'Mostrar _MENU_',
        search: 'Buscar',
        zeroRecords: 'No se encontraron resultados',
        paginate: {
          first: 'Primero',
          last: 'Último',
          next: 'Siguiente',
          previous: 'Anterior',
        }
      },
      columns: [
        { title: 'Contribuyente', data: 'receptor_nombre' },
        { title: 'Sucursal', data: 'sucursal' },
        { title: 'Nombre Proveedor', data: 'nombre_proveedor' },
        { title: 'RFC Proveedor', data: 'rfc_proveedor' },
        {
          title: 'Fecha Factura', render(data: any, type: any, cfdi: any) {
            const texto = `<div class="no-wraptext">${cfdi.fecha_factura ? formatDate(new Date(cfdi.fecha_factura), 'YYYY-MM-DD') : ''}</div>`;
            return texto;
          }
        },
        {
          title: 'Fecha Recepción', render(data: any, type: any, cfdi: any) {
            const texto = `<div class="no-wraptext">${cfdi.fecha_recepcion ? formatDate(new Date(cfdi.fecha_recepcion), 'YYYY-MM-DD') : ''}</div>`;
            return texto;
          }
        },
        {
          title: 'Fecha programada de Pago', render(data: any, type: any, cfdi: any) {
            const texto = `<div class="no-wraptext">${cfdi.fecha_pago ? formatDate(new Date(cfdi.fecha_pago), 'YYYY-MM-DD') : ''}</div>`;
            return texto;
          }
        },
        {
          title: 'Fecha contabilizacion', render(data: any, type: any, cfdi: any) {
            const texto = `<div class="no-wraptext">${cfdi.fecha_contabilizacion && cfdi.fecha_contabilizacion !== '0001-01-01T00:00:00' ? formatDate(new Date(cfdi.fecha_contabilizacion), 'YYYY-MM-DD') : ''}</div>`;
            return texto;
          }
        },
        { title: 'Tipo de Comprobante', data: 'tipo_comprobante' },
        { title: 'Versión', data: 'version' },
        { title: 'Folio', data: 'folio' },
        { title: 'Folio Fiscal', data: 'folio_fiscal' },
        { title: 'Estatus Recepción', data: 'estado_recepcion_descripcion' },
        { title: 'Estatus Oracle', data: 'estado_sap_descripcion' },
        {
          title: 'Estatus Aprobación', render(data: any, type: any, cfdi: any) {
            const texto = ` <div>
            ${cfdi.estatus_ca}
            </div>`;
            return texto;
          }
        },

        {
          title: () => {
            return `
          <div style="white-space: nowrap;"> Estatus Fiscal </div>
          <div> <button btn_actualizar_estatus='true'  class="btn btn-primary" style="padding: 0px;padding-left: 5px;padding-right: 5px;"><i class="far fa-check-circle"></i> Validar </button> </div>`
          }, data: 'estatus_fiscal'
        },
        {
          title: (data) => {
            const texto = `<label for='todos_check'> Todos</label> <input name='todos_check' id="check_todos" input_check_todos='${JSON.stringify(data)}'  type="checkbox" '/>`;
            return texto
          }, render(data: any, type: any, cfdi: any) {
            const texto = `<div> <input type="checkbox"  ${(that.lista_documentos_validar.filter(x => x.id === cfdi.id)).length > 0 ? 'checked' : ''} enviar_documento ='${JSON.stringify(cfdi)}' > </div>`;
            return texto;
          }
        },

        {
          title: 'Comentario Aprobación', render(data: any, type: any, cfdi: any) {
            const texto = ` <div>
            ${cfdi.comentario}
            </div>`;
            return texto;
          }
        },
        // { title: 'Estatus SAT', data: 'estado_sat' },
        {
          title: () => {
            return ` <div style="white-space: nowrap;"> Estatus Fiscal </div>`
          }, data: 'estatus_fiscal'
        },
        { title: 'Serie', data: 'serie' },
        { title: 'Total', data: 'total_factura' },
        {
          title: 'Documentos Relacionados', render(data: any, type: any, cfdi: any) {
            const texto = `<button *ngIf="cfdi.relacionados" class="btn ml-2" btn_actualizarPDF='${JSON.stringify(cfdi)}' cfdi_id =${cfdi.id}> <i class="fas fa-file mr-1"></i> Ver </button>`;
            return texto;
          }
        },
        // const texto = cfdi.relacionados ? `<button *ngIf="cfdi.relacionados" class="btn ml-2" cfdi_id =${cfdi.id}> <i class="fas fa-file mr-1"></i> Ver </button>` : '';
        {
          title: 'Documentos', render(data: any, type: any, cfdi: any) {
            let texto = '<div style="white-space: nowrap">';
            texto += cfdi.pdf !== '' ? `<a target="_blank" href=${cfdi.pdf} class="btn"> <i class="far fa-file-pdf"></i> </a>` : '';
            texto += cfdi.xml !== '' ? `<a target="_blank" href=${cfdi.xml} class="btn ml-2"> <i class="far fa-file-code"></i> </a>` : '';
            texto += cfdi.xml !== '' ? `<button class="btn ml-2" btn_interprete=${cfdi.folio_fiscal}> <i class="fas fa-eye mr-1"></i>  </button>` : '';
            texto += `<button class="btn ml-2" btn_actualizarPDF='${JSON.stringify(cfdi)}'> <i class="fas fa-file mr-1"></i> Actualizar PDF </button>`;
            texto += `<button class="btn ml-2" btn_reprocesar=${cfdi.id}> <i class="fas fa-file mr-1"></i> validación </button>`;
            texto += cfdi.estado_sap !== 1 ? `<button class="btn ml-1 warning" btn_eliminar_folio_fiscal = ${cfdi.folio_fiscal} btn_eliminar_id= ${cfdi.id}> <i class="fas fa-trash"></i> eliminar </button>` : '';
            texto += '</div>';
            return (texto);
          }
        }
      ],
      dom: 'lBfrtip',
      buttons: [
        {
          extend: 'excel',
          text: 'Exportar Excel',
          className: 'btn-sm btn-primary',
          exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17] },
        },
        // { extend: 'csv', text: 'Exportar CSV', charset: 'utf-8' }
      ],
      ajax: (dataTablesParameters: any, callback) => {
        if (this.filtroConsulta.sucursal_identificador && this.filtroConsulta.sucursal_identificador !== '0' && this.filtroConsulta.sucursal_identificador !== '') {
          that.http
            .post<DataTablesResponse>(
              this.url,
              this.meterFiltros(dataTablesParameters), { headers }
            ).subscribe(resp => {
              // if (true) {
              that.lista_cfdis = resp.data;
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: resp.data
              });
            }, error => {
              callback({
                recordsTotal: 0,
                recordsFiltered: 0,
                data: []
              });
            });
        } else {
          callback({
            recordsTotal: 0,
            recordsFiltered: 0,
            data: []
          });
        }
      }
    };

  }

  meterFiltros(obj: any) {
    if (this.filtroConsulta.rfc_proveedor === '') {
      const usr = this.datos_iniciales.usuario;
      this.filtroConsulta.rfc_proveedor = usr.rfc;
    }
    // if (this.globals.numero_lote) {
    //   this.filtroConsulta.identificador_lote = this.globals.numero_lote; // Contiene el numero de lote guardado al momento de dar click en carga masiva
    //   this.filtroConsulta.tipo_movimiento_doc = 13; // Es el numero para filtrar por lotes
    //   this.globals.numero_lote = null;
    // }
    this.filtroConsulta.identificador_corporativo = this.identificador_corporativo;
    this.filtroConsulta.tipo_movimiento_doc = this.filtroConsulta.tipo_movimiento_doc as number;

    obj.filt = this.filtroConsulta;
    obj.esAdmin = true;
    obj.order = [{
      'dir': 'asc'
    }],
      obj.columns = [{
        dir: 'asc'
      }];
    return obj;
  }

  actualizarTabla(filtro?) {
    if (filtro) {
      this.filtroConsulta = filtro;
    }
    $('#tabla_documentos').DataTable().ajax.reload(null, false);
  }

  reprocesar(id) {
    id = this._storage_service.encriptar_ids(String(id));
    this.router.navigate(['home', 'validacion', id]);
  }

  eliminarDocumento(uuid, id?) {
    Swal.fire({
      title: '<strong>Eliminar Documento</strong>',
      type: 'warning',
      html:
        'Estas seleccionando eliminar un documento<b> esta operacion en irreversible</b>,  ' +
        ' y afectara el documento y las relaciones con  órdenes de compra, preliminares  y números de recepción ' +
        '</br> Desea continuar con la operación? ',
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
        this._listarcfdiService.eliminarDocumento(uuid, this.datos_iniciales.usuario.identificador_usuario, id)
          .subscribe((result) => {
            Swal.fire('Resultado', result as string, 'info');
            this.actualizarTabla(this.filtroConsulta);
          }, error => {
            Swal.fire('Error en la operación', 'La transaccion no se pudo realizar correctamente debido al siguiente error: ' + error, 'error');
          });
      } else {
        this.actualizaTabla();
        Swal.fire('Operación Cancelada', 'El documento no fue eliminado', 'info');
      }
    }).catch(error => {
      Swal.fire('Error en la operación', 'La transaccion no se pudo realizar correctamente debido al siguiente error: ' + error, 'error');
    });
  }

  mostrarComplemento(id_cfdi: string, btn: any) {
    btn.innerHTML = '<i class="fa fa-spinner fa-spin fa-fw"></i>';
    this._listarcfdiService.obtenerComplementos(id_cfdi)
      .subscribe((data: any) => {
        this.complementos_pago = data;
        this._listarcfdiService.obtenerRelacionados(id_cfdi)
          .subscribe(async (data2: any) => {
            this.documentos_relacionados = data2;
            btn.innerHTML = '<i class="fas fa-file mr-1"></i> Ver';
            try {
              await this.obtenerComprobantes(id_cfdi);
            } catch (error) {
              console.log(error);
            }
            $('#complementeto_detalle').modal('show');
          }, err => {
            btn.innerHTML = '<i class="fas fa-file mr-1"></i> Ver';
          });
      }, error => {
        btn.innerHTML = '<i class="fas fa-file mr-1"></i> Ver';
      });
    this.mostrarAnexos(id_cfdi);
  }

  obtenerComprobantes(id_documento): Promise<any> {
    return new Promise((resolve, reject) => {
      this.compartidosService.obtenerComprobantes(id_documento).subscribe((data: any) => {
        this.lista_comprobantes = data;
        resolve(data);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }


  prepararValidacionSAT(documento: any, agregar: boolean) {
    if (agregar) {
      this.lista_documentos_validar.push(documento);
    } else {
      this.lista_documentos_validar = this.lista_documentos_validar.filter(x => x.id !== documento.id);
      this.toggleCheckTodos();
    }
  }

  seleccionarTodo(checked: boolean) {
    if (checked) {
      this.lista_cfdis.forEach(x => {
        if ((this.lista_documentos_validar.filter(y => x.id === y.id)).length === 0) {
          this.lista_documentos_validar.push(x);
        }
      });
      this.actualizarTabla(this.filtroConsulta);
    } else {
      this.lista_cfdis.forEach(x => {
        this.lista_documentos_validar = this.lista_documentos_validar.filter(y => x.id !== y.id);
      });
      this.actualizarTabla(this.filtroConsulta);
    }
  }

  validarCFDIs() {
    const promise = new Promise((resolve, reject) => {
      if (this.lista_documentos_validar.length === 0) {
        Swal.fire('Atención', 'Seleccione al menos un documento.', 'warning');
        return 0;
      }
      this._listarcfdiService.validarEstatusSAT(this.lista_documentos_validar).subscribe(data => {
        Swal.fire('Correcto', 'El estatus de los documentos han sido actualizados.', 'success');
        this.lista_documentos_validar = [];
        this.toggleCheckTodos();
        this.actualizarTabla(this.filtroConsulta);
        resolve(true);
      }, error => {
        Swal.fire('Error', error && error.error.mensaje ? error.error.mensaje : 'Algo Salio mal. Por favor inténtelo de nuevo más tarde.', 'error');
        reject('error');
      });
    });
    return promise;
  }

  mostrarAnexos(id_doc: string) {
    this.compartidosService.listarAnexos(id_doc).subscribe((data: any) => {
      this.documentos_anexos = data;
    })
  }

  toggleCheckTodos() {
    (document.getElementById('check_todos') as any).checked = false;
  }

  mostrarModal() {
    $('#id_modal').modal('show');
  }

  verDetallesAprobacion(btn, id: string) {
    // console.log(btn);
    btn.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>';
    // console.log(id);
    this.acreedoresService.obtenerDetallesAprobacion(id, '9').subscribe((data: any) => {
      this.lista_detalle_aprobacion = data;
      btn.innerHTML = 'Detalles';
      setTimeout(() => {
        $('#modal-detalles-aprobacion').modal('show');
      }, 100);
    }, error => {
      btn.innerHTML = 'Detalles';
      Swal.fire('Alerta', 'Algo salio mal, por favor inténtalo de nuevo más tarde.', 'error');
    });
  }

  mostrarInterprete(event: HTMLButtonElement, uuid: string) {
    const txt_btn = event.innerHTML;
    event.disabled = true;
    event.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>'
    this._listarcfdiService.obtenerDetalleXML(uuid).subscribe((data: any) => {
      this.detalles_factura = data;
      setTimeout(() => {
        $('#modalVisorFactura').modal('show');
        event.innerHTML = txt_btn;
        event.disabled = false;
      }, 0);
    }, err => { event.innerHTML = txt_btn; event.disabled = false; });

  }

}
