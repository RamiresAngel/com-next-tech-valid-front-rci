import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { CargaDocumentosService } from '../carga-documentos.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import Swal from 'sweetalert2';
import { FileUpload } from '../../documentos_add/clases/file-upload';
import { CargaDocumentoOC, DatosIniciales, CorporativoActivo, OrdenCompra } from 'src/app/entidades';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HighlightSpanKind } from 'typescript';

@Component({
  selector: 'app-carga-multiple',
  templateUrl: './carga-multiple.component.html',
  styleUrls: ['./carga-multiple.component.css']
})
export class CargaMultipleComponent implements OnInit {
  @ViewChild('input_oc') input_oc: ElementRef;
  @Input() carga_multiple;
  @Output() cambiarMultiple = new EventEmitter();
  @ViewChild('otrosInput') inputArchivo: ElementRef;
  @ViewChild('NC_input') XML_nc: ElementRef;
  public formulario: FormGroup;
  public fileData = new FileUpload();
  public file: any;
  public carga_documento = new CargaDocumentoOC();


  public titulocarga = 'Selecciona archivo...';
  public titulocargaNC = 'Selecciona archivo...';
  public titulo_label = 'Factura';
  public txtFinalizar = 'Finalizar Transacción';

  public txtBtnAgregar = '<i class="fas fa-check"></i>';
  public array_oc = [];
  public lista_oc_header = new Array<any>();
  public lista_cr = new Array<any>();
  public datos_iniciales: DatosIniciales;
  public identificador_corporativo: string;
  public corporativo_activo: CorporativoActivo;
  public documento = new CargaDocumentoOC();

  public loading = false;
  public oc_valida = false;
  constructor(
    private cargaDocService: CargaDocumentosService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.corporativo_activo = this.storageService.getCorporativoActivo();
    this.identificador_corporativo = this.storageService.getCorporativoActivo().corporativo_identificador;
    this.datos_iniciales = this.storageService.getDatosIniciales();
    this.documento.orden_compra = new OrdenCompra();
    this.iniciarForm();
  }
  iniciarForm() {
    this.formulario = new FormGroup({
      documento: new FormControl('', Validators.required),
      xml_nc: new FormControl('')
    });
  }
  validarOC() {
    if (this.array_oc.length > 0) {
      this.loading = true;
      this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
      console.log(this.array_oc);
      let array_aux = this.array_oc;
      array_aux = array_aux.map(da => {
        const obj = {
          numero_orden: da,
          identificador_corporativo: this.identificador_corporativo
        };
        return obj;
      });
      this.cargaDocService.obtenerOrdenCompraMultipleMX(array_aux).subscribe((data: any) => {
        this.lista_oc_header = data.ordenes_compra;
        this.lista_cr = data.codigos_recepcion;
        this.oc_valida = true;
        this.documento = data;
      }, error => {
        this.loading = false;
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
      }, () => {
        this.loading = false;
        this.txtBtnAgregar = '<i class="fas fa-check"></i>';
      });
    }
  }
  validarKey(tecla: any) {
    if (tecla.code === 'Enter' || tecla.code === 'Space') {
      const valor = this.input_oc.nativeElement.value.trim();
      if (valor !== '') {
        const filtrado = this.array_oc.filter(x => x === valor);
        if (filtrado.length === 0) {
          this.array_oc.push(valor);
        }
        this.input_oc.nativeElement.value = '';
      }
    }
  }

  finalizarTransaccion() {
    this.txtFinalizar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.carga_documento.identificador_proveedor = this.datos_iniciales.usuario.identificador_usuario;
    this.carga_documento.identificador_corporativo = this.datos_iniciales.usuario.identificador_corporativo;
    this.carga_documento.identificador_sucursal = this.corporativo_activo.sucursal_identificador;
    this.carga_documento.lista_negra = this.datos_iniciales.usuario.lista_negra;
    // this.carga_documento.numero_orden = this.array_oc;
    this.carga_documento.saldos = null;
    this.carga_documento.orden_compra = null;
    this.carga_documento.documentos_relacionados = null;

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

  cargarDocumento() {
    this.cargaDocService.cargarDocumentoMultiple(this.carga_documento).subscribe((data: any) => {
      // Llamar a validacion y observar si la validacion sap viene en 1
      this.cargaDocService.validarDocumentoCFDI(data.documento_cfdi_id).subscribe((obj: any) => {
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
                  this.router.navigate(['home', 'validacion', this.storageService.encriptar_ids(String(data.documento_cfdi_id))]);
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
                console.log(result);
                if (result.value) {
                  this.router.navigate(['home', 'validacion', this.storageService.encriptar_ids(String(data.documento_cfdi_id))]);
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
              this.router.navigate(['home', 'validacion', this.storageService.encriptar_ids(String(data.documento_cfdi_id))]);
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
      // this.router.navigate(['home', 'validacion', this.storageService.encriptar(String(data.documento_cfdi_id))]);
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

  eliminarOC(index) {
    this.array_oc.splice(index, 1);
    // if ( this.array_oc.length] === 0) {
    this.oc_valida = false;
    // }
    // this.lista_oc_header = this.array_oc;
    // this.lista_oc_header = this.array_oc.map(obj => {
    //   const data = { text: '', checked: true };
    //   data.text = obj;
    //   data.checked = true;
    //   return data;
    // });
  }

  mostrarSaldos(check, item) {
    console.log(check);
    console.log(item);
    item.checked = check;
  }
  enviarCambio() {
    this.cambiarMultiple.emit();
  }

  addCodigoRecepcion(data) {
    this.carga_documento.codigos_recepcion.push(data);
  }
  removeCodigoRecepcion(data: any) {
    this.carga_documento.codigos_recepcion = this.carga_documento.codigos_recepcion.filter((obj) => obj.codigo_recepcion !== data.codigo_recepcion);
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
}
