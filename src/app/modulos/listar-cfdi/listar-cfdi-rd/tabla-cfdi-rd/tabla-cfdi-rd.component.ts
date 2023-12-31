import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Cfdi, ComplementoDePago, DocumentoRelacionado } from 'src/app/entidades/cfdi';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CorporativoActivo, DatosIniciales, FiltroCFDI, FiltroCfdiRD } from 'src/app/entidades';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { ListarCfdiService } from '../../listar-cfdi.service';

declare var $: any;
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-tabla-cfdi-rd',
  templateUrl: './tabla-cfdi-rd.component.html',
  styleUrls: ['./tabla-cfdi-rd.component.css']
})
export class TablaCfdiRdComponent implements OnInit {
  listener: () => void;
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;

  complementos_pago = new ComplementoDePago();
  documentos_relacionados = new Array<DocumentoRelacionado>();

  numero_pagina = 0;

  lista_documentos_validar: Array<any> = [];
  public vista_carga: string;
  public array_sucursales: any;
  public lista_cfdis: Array<Cfdi>;
  public complementos: Array<Cfdi>;
  public showCorporativos = false;
  public identificador_corporativo = '';
  filtroConsulta = new FiltroCfdiRD();
  // @Input() filtroConsulta;
  dtOptions: any = {};
  persons: any;
  public url = '';
  private corporativo_activo: CorporativoActivo;
  private datos_iniciales: DatosIniciales;

  constructor(
    public globals: GlobalsComponent,
    private _storage_service: StorageService,
    private _listarcfdiService: ListarCfdiService,
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
        console.log(event.target);
        const id = event.target.getAttribute('cfdi_id');
        that.mostrarComplemento(id, event.target)
      }
      if (event.target.hasAttribute('btn_reprocesar')) {
        const id = event.target.getAttribute('btn_reprocesar');
        that.reprocesar(id);
      }
      if (event.target.hasAttribute('btn_eliminar_folio_fiscal') && event.target.hasAttribute('btn_eliminar_id')) {
        const folio_fiscal = event.target.getAttribute('btn_eliminar_folio_fiscal');
        const id = event.target.getAttribute('btn_eliminar_id');
        that.eliminarDocumento(folio_fiscal, id);
      }
      if (event.target.hasAttribute('enviar_documento')) {
        const cfdi = event.target.getAttribute('enviar_documento');
        // that.eliminarDocumento(folio_fiscal, cfdi);
        // console.log(cfdi);
        // console.log(JSON.parse(cfdi));
        const documento = JSON.parse(cfdi);
        that.prepararValidacionSAT(documento, event.target.checked);
      }
      if (event.target.hasAttribute('input_check_todos')) {
        that.seleccionarTodo(event.target.checked);
      }
      if (event.target.hasAttribute('btn_actualizar_estatus')) {
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
    });
  }

  ngOnDestroy(): void {
    if (this.listener) {
      this.listener();
    }
  }

  obtenerColumnas() {
    return [
      { title: 'Contribuyente', data: 'receptor_nombre' },
      { title: 'Sucursal', data: 'sucursal' },
      { title: 'Nombre Proveedor', data: 'nombre_proveedor' },
      { title: 'RNC Proveedor', data: 'rfc_proveedor' },
      { title: 'Fecha Factura', data: 'fecha_factura' },
      { title: 'Fecha Recepción', data: 'fecha_recepcion' },
      { title: 'Tipo de Comprobante', data: 'tipo_comprobante' },
      { title: 'NCF', data: 'folio_fiscal' },
      { title: 'Estatus Recepción', data: 'estado_recepcion_descripcion' },
      { title: 'Estatus SAP', data: 'estado_sap_descripcion' },
      { title: 'Estatus DGII', data: 'estado_sat' },
      { title: 'Total', data: 'total_factura' },
      {
        title: 'Documentos Relacionados', render(data: any, type: any, cfdi: any) {
          const texto = cfdi.relacionados ? `<button *ngIf="cfdi.relacionados" class="btn ml-2" cfdi_id =${cfdi.id}> <i class="fas fa-file mr-1"></i> Ver </button>` : '';
          return texto;
        }
      },
      {
        title: 'Documentos', render(data: any, type: any, cfdi: any) {
          let texto = '<div style="white-space: nowrap">';
          texto += cfdi.pdf !== '' ? `<a target="_blank" href=${cfdi.pdf} class="btn"> <i class="far fa-file-pdf"></i> </a>` : '';
          texto += cfdi.xml !== '' ? `<a target="_blank" href=${cfdi.xml} class="btn ml-2"> <i class="far fa-file-code"></i> </a>` : '';
          texto += `<button class="btn ml-2" btn_reprocesar=${cfdi.id}> <i class="fas fa-file mr-1"></i> validación </button>`;
          texto += cfdi.estado_sap !== 1 ? `<button class="btn ml-1 warning" btn_eliminar_folio_fiscal = ${cfdi.folio_fiscal} btn_eliminar_id= ${cfdi.id}> <i class="fas fa-trash"></i> eliminar </button>` : '';
          texto += '</div>';
          return (texto);
        }
      }
    ]
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
      lengthChange: true,
      lengthMenu: [[10, 25, 50, 100, 2000], [10, 25, 50, 100, '2000 (max)']],
      serverSide: true,
      searching: false,
      processing: true,
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
      columns: this.obtenerColumnas(),
      dom: 'lBfrtip',
      buttons: [
        { extend: 'csv', text: 'Exportar CSV' }
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
    if (this.filtroConsulta.ncf === '') {
      const usr = this.datos_iniciales.usuario;
      // this.filtroConsulta.ncf = usr.rfc;
    }
    // if (this.globals.numero_lote) {
    //   this.filtroConsulta.identificador_lote = this.globals.numero_lote; // Contiene el numero de lote guardado al momento de dar click en carga masiva
    //   this.filtroConsulta.tipo_movimiento_doc = 13; // Es el numero para filtrar por lotes
    //   this.globals.numero_lote = null;
    // }
    this.filtroConsulta.identificador_corporativo = this.identificador_corporativo;
    // this.filtroConsulta.tipo_documento = this.filtroConsulta.tipo_documento;

    obj.filt = this.filtroConsulta;
    obj.esAdmin = true;
    obj.order = [{
      dir: 'asc'
    }];
    obj.columns = [{
      dir: 'asc'
    }];
    return obj;
  }

  actualizarTabla(filtro) {
    this.filtroConsulta = filtro;
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
          .subscribe((data2: any) => {
            this.documentos_relacionados = data2;
            btn.innerHTML = '<i class="fas fa-file mr-1"></i> Ver';
            $('#complementeto_detalle').modal('show');
          }, err => {
            btn.innerHTML = '<i class="fas fa-file mr-1"></i> Ver';
          });
      }, error => {
        btn.innerHTML = '<i class="fas fa-file mr-1"></i> Ver';
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
        Swal.fire('¡Error!', error && error.error.mensaje ? error.error.mensaje : 'Algo Salio mal. Por favor inténtelo de nuevo más tarde.', 'error');
        reject('error');
      });
    });
    return promise;
  }

  toggleCheckTodos() {
    (document.getElementById('check_todos') as any).checked = false;
  }
}
