import { CodigoRecepcion, OrdenCompra, DatosIniciales, CargaDocumentoOC, Saldos } from './../../../entidades/index';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FileUpload } from '../../documentos_add/clases/file-upload';
import { TarjetaCodigoRecepcion } from 'src/app/entidades/tarjeta-codigo-recepcion';
import { CargaDocumentosService } from '../carga-documentos.service';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-carga-documentos-mx',
  templateUrl: './carga-documentos-mx.component.html',
  styleUrls: ['./carga-documentos-mx.component.css']
})
export class CargaDocumentosMxComponent implements OnInit {
  @Input() numero_orden;
  @Input() uuid;

  public reasignacion = false;
  public carga_multiple = false;
  public txtBtnAgregar = '<i class="fas fa-check"></i>';
  public oc_valida = false;
  public startValue_oc: any;
  public itemsCR: any;
  public selec2Disabled = false;
  public orden_oc = '';
  public titulocarga = 'Selecciona archivo...';
  public titulocargaNC = 'Selecciona archivo...';
  @ViewChild('otrosInput') inputArchivo: ElementRef;
  @ViewChild('NC_input') XML_nc: ElementRef;
  public fileData = new FileUpload();
  public file: any;
  public Lista_tarjetaCodigoRecepcion: Array<TarjetaCodigoRecepcion>;
  public corporativo_activo: CorporativoActivo;
  public datos_iniciales: DatosIniciales;
  public formulario: FormGroup;
  public mostrarMensaje = false;
  public incluir_nc = false;
  public titulo_label = 'Factura';
  public txtFinalizar = 'Finalizar Transacción';
  saldos = new Saldos();
  public documento = new CargaDocumentoOC();

  public carga_documento = new CargaDocumentoOC();
  constructor(
    private _cargaDocumentosService: CargaDocumentosService,
    private _storageService: StorageService,
    private router: Router
  ) {
    this.Lista_tarjetaCodigoRecepcion = new Array<TarjetaCodigoRecepcion>();
    this.carga_documento = new CargaDocumentoOC();
    this.carga_documento.orden_compra = new OrdenCompra();
    this.carga_documento.codigos_recepcion = new Array<CodigoRecepcion>();
    this.carga_documento.saldos = new Saldos();
  }

  ngOnInit() {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.documento.orden_compra = new OrdenCompra();
    this.datos_iniciales = this._storageService.getDatosIniciales();
    console.log(this.datos_iniciales.usuario.fecha_cierre);
    this.iniciarForm();
    console.log("num orden= " + this.numero_orden);
    if (this.numero_orden !== null && this.numero_orden !== undefined && this.numero_orden !== '') {
      this.orden_oc = this.numero_orden;
      this.validarOC();
    }
  }

  actualizarOcSelected(obj: any) {
    console.log(obj);
  }
  iniciarForm() {
    this.formulario = new FormGroup({
      documento: new FormControl('', Validators.required),
      xml_nc: new FormControl('')
    });
  }

  validarOC() {
    this.carga_documento = new CargaDocumentoOC();
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this._cargaDocumentosService.validarOrdenCompraMX(this.orden_oc, this.corporativo_activo.corporativo_identificador).subscribe(
      (data: any) => {
        this.documento = data;
        this.documento.codigos_recepcion = this.documento.codigos_recepcion.sort();
        // this.ordenarCodigosRecepcion();
        // this.documento.orden_compra.saldos = this.saldos;
        if (data.orden_compra.id) {
          this.oc_valida = true;
          console.log(this.documento);
          // this._cargaDocumentosService.obtenerSaldos(data.orden_compra.id, this.corporativo_activo.corporativo_identificador).subscribe(((saldos: any) => {
          // this.saldos = saldos;
          // }));
        }

      }, error => {
        console.log(error);
        this.txtBtnAgregar = '<i class="fas fa-check"></i>';

        if (error.error.mensaje) {
          Swal.fire({
            type: 'error',
            title: 'Atención...',
            text: error.error.mensaje
          });
        } else {
          Swal.fire({
            type: 'error',
            title: 'Atención...',
            text: 'Ocurrio un error inesperado, por favor intentalo nuevamente más tarde'
          });
        }

      },
      () => {
        this.txtBtnAgregar = '<i class="far fa-thumbs-up"></i>';
      }
    );
  }

  actualizarArchivoBtn() {
    const reader = new FileReader();
    const file = this.inputArchivo.nativeElement.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileData.file_name = file.name;
      this.fileData.file_data = reader.result.toString().split(',')[1];
      this.titulocarga = file.name;
      this.file = this.fileData.file_data;
      this.carga_documento.xml = this.file;
    };
  }

  ordenarCodigosRecepcion() {
    this.documento.codigos_recepcion = this.documento.codigos_recepcion.sort();
  }


  actualizarArchivoBtnNC() {
    const reader = new FileReader();
    const file = this.XML_nc.nativeElement.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileData.file_name = file.name;
      this.fileData.file_data = reader.result.toString().split(',')[1];
      this.titulocargaNC = file.name;
      this.file = this.fileData.file_data;
      this.carga_documento.pdf = this.file;
    };
  }

  finalizarTransaccion() {
    this.txtFinalizar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.carga_documento.identificador_proveedor = this.datos_iniciales.usuario.identificador_usuario;
    this.carga_documento.identificador_corporativo = this.datos_iniciales.usuario.identificador_corporativo;
    this.carga_documento.identificador_sucursal = this.corporativo_activo.sucursal_identificador;
    this.carga_documento.lista_negra = this.datos_iniciales.usuario.lista_negra;
    this.carga_documento.numero_orden = this.orden_oc;
    this.carga_documento.saldos = null;
    this.carga_documento.orden_compra = null;
    this.carga_documento.documentos_relacionados = null;
    if (this.incluir_nc || this.documento.orden_compra.devolucion) {
      this.carga_documento.tipo_movimiento = 3;
      console.log('Es nota crédito');
      this.cargarDocumento();
      console.log(this.carga_documento);
    } else {
      if (this.documento.codigos_recepcion.length === 0 && this.documento.orden_compra.indicador_anticipo !== '') {
        this.carga_documento.tipo_movimiento = 2;
        this.cargarDocumento();
        console.log('Es anticipo');
        console.log(this.carga_documento);
      } else {
        if (this.carga_documento.codigos_recepcion.length > 0 && this.documento.codigos_recepcion.length !== 0) {
          this.carga_documento.tipo_movimiento = 1;
          console.log('Es factura');
          this.cargarDocumento();
          console.log(this.carga_documento);
        } else {
          console.log('Mostrar Mensaje Seleccionar Códigos de Recepción');
          Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: Es necesario seleccionar al menos un código de recepción ', 'error');
          this.txtFinalizar = 'Finalizar Transacción';
        }
      }
    }
  }

  cargarDocumento() {
    this._cargaDocumentosService.cargarDocumento(this.carga_documento).subscribe((data: any) => {
      // Llamar a validacion y observar si la validacion sap viene en 1
      this._cargaDocumentosService.validarDocumentoCFDI(data.documento_cfdi_id).subscribe((obj: any) => {
        const validacion_sap = obj.detalle_validaciones.filter(x => x.tipo_validacion === 'SAP');
        if (validacion_sap.length > 0 && validacion_sap[0].valido === 1) {
          validacion_sap.forEach(element => {
            if (element.valido === 1) {
              Swal.queue([{
                title: 'Exito',
                confirmButtonText: 'Aceptar',
                text: 'El documento ha sido guardado y contabilizado correctamente.',
                type: 'success',
                showLoaderOnConfirm: true,
                preConfirm: () => {
                  this.router.navigate(['home', 'validacion', this._storageService.encriptar_ids(String(data.documento_cfdi_id))]);
                }
                // si validacion sap = 1 -> el documento se cargo y contabilizo correctamente
                // Swal.fire('Exito', 'El documento ha sido guardado y contabilizado correctamente.');
              }]);
            } else {
              // si validacion sap = 0 -> el documento se cargo pero no pudo contabilizarse
              // Swal.fire('Alerta', 'El documento ha sido cargado pero no se pudo contabilizar en SAP.', 'info');
              Swal.fire({
                title: 'Alerta',
                text: 'El documento ha sido cargado pero no se pudo contabilizar en SAP.',
                type: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ver Validación',
                cancelButtonText: 'Aceptar'
              }).then((result) => {
                if (result.value) {
                  this.router.navigate(['home', 'validacion', this._storageService.encriptar_ids(String(data.documento_cfdi_id))]);
                } else {
                  this.router.navigate(['home', 'consulta_cfdi']);
                }
              });
            }
          });
        } else {
          // si validacion sap = 0 -> el documento se cargo pero no pudo contabilizarse
          // Swal.fire('Alerta', 'El documento ha sido cargado pero no se pudo contabilizar en SAP.', 'info');
          Swal.fire({
            title: 'Alerta',
            text: 'El documento ha sido cargado pero no se pudo contabilizar en SAP.',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ver Validación',
            cancelButtonText: 'Aceptar'
          }).then((result) => {
            console.log(result);
            if (result.value) {
              this.router.navigate(['home', 'validacion', this._storageService.encriptar_ids(String(data.documento_cfdi_id))]);
            } else {
              this.router.navigate(['home', 'consulta_cfdi']);
            }
          });
        }
      }, error => {
        console.log(error);
        if (error.error.mensaje) {
          // this.validado = false;
          Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        } else {
          Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: Algo ha salido mal, por favor inténtalo de nuevo más tarde.', 'error');
        }
      }, () => {
      }
      );
      this.txtFinalizar = 'Finalizar Transacción';
      // this.router.navigate(['home', 'validacion', this._storageService.encriptar(String(data.documento_cfdi_id))]);
      // Swal.fire('Éxito', 'Guardado Correctamente', 'success');
    }, error => {
      console.log(error);
      if (error.error.mensaje) {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      } else {
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: Algo salio mal, por favor inténtalo de nuevo más tarde.', 'error');
      }
      this.txtFinalizar = 'Finalizar Transacción';
    });
  }
  addCodigoRecepcion(data) {
    this.mostrarMensaje = false;
    this.carga_documento.codigos_recepcion.push(data);
    console.log(this.carga_documento.codigos_recepcion);
  }
  removeCodigoRecepcion(data: CodigoRecepcion) {
    this.carga_documento.codigos_recepcion = this.carga_documento.codigos_recepcion.filter((obj) => obj.codigo_recepcion !== data.codigo_recepcion);
    console.log(this.carga_documento.codigos_recepcion);
  }
  requerirXMLNC(obj) {
    console.log((obj));
    if (obj) {
      this.titulo_label = 'Nota de Crédito';
      this.incluir_nc = true;
      this.carga_documento.tipo_movimiento = 3;
    } else {
      this.titulo_label = 'Factura';
      this.incluir_nc = false;
      this.carga_documento.pdf = '';
      this.titulocargaNC = 'Selecciona archivo...';
      console.log(this.formulario);
    }
  }
  cambiarMultiple() {
    this.carga_multiple = false;
  }
  mostrarDetallesCR(items) {
    this.itemsCR = items;
    $('#modal-detalle-cr').modal('toggle');
  }

}
