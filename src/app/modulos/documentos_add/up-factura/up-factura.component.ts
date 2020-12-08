import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { DocumentoAddService } from '../documento-add.service';
import { FileUpload } from '../clases/file-upload';
import { RespDGT } from '../clases/resp-dgt';
import { OtrosDocumentos } from '../clases/file-upload';
import { CancelarDocumentoService} from './../cancelar-documento.service';
import { GlobalsComponent} from './../../../compartidos/globals/globals.component';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-up-factura',
  templateUrl: './up-factura.component.html',
  styleUrls: ['./up-factura.component.css']
})
export class UpFacturaComponent implements OnInit, OnDestroy {

  public file: any;
  public fileData = new FileUpload();
  public fileDataOtros = new OtrosDocumentos();
  public filePdf =  {
    name: ''
  };
  public fileOtros =  {
    name: ''
  };
  public respuestaDgt = new RespDGT();
  @ViewChild('xmlInput') xmlInput: ElementRef;
  @ViewChild('pdfInput') pdfInput: ElementRef;
  @ViewChild('otrosInput') otrosInput: ElementRef;
  @Output() abilitar = new EventEmitter<string>();
  @Output() habilitarSelects = new EventEmitter<string>();
  @Input() idTransaccion;
  public disablefactura = true;
  public disableValida = true;
  public adjuntarDocumentos = false;
  public txtvalidaDGT = '';
  public txtGuarda = 'Guarda documentos';
  public motrarValida = true;
  public motrarGuardar = false;
  public disableGuardaArch = true;
  public disableGuardaArchvos = false;
  public id_factura: any;

  // tslint:disable-next-line:max-line-length
  constructor(private _service: DocumentoAddService, private _cancelarService: CancelarDocumentoService, public globals: GlobalsComponent) { }

  ngOnInit() {
    this.txtvalidaDGT = 'Validar';
  }

  ngOnDestroy() {
    this.abilitar.emit();
  }

  destroy(data: any) {
    if (data !== undefined && data !== null && data !== 0) {
      this._cancelarService.cancelarDocumento(data).subscribe((respuesta: any) => {
        alert(respuesta.mensaje);
      },
        error => {
          alert(JSON.stringify(error));
        }
      );
      this.habilitarSelects.emit();
    } else {
      this.habilitarSelects.emit();
    }
  }

  goToDestroy() {
  }

  validaDGT() {
    this.txtvalidaDGT = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    const reader = new FileReader();
    const file = this.xmlInput.nativeElement.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileData.file_name = file.name;
      this.fileData.file_data = reader.result.split(',')[1];
      this.fileData.lote_carga = this.idTransaccion;
      this.fileData.provedor_id = localStorage.getItem('idProveedorCar');
      this.fileData.centro_consumo_id = localStorage.getItem('centroConsumoCar');

      this._service.loadXml(this.fileData)
        .subscribe((data: HttpResponse<any>) => {
          this.respuestaDgt = data.body.request.resp;
          this.id_factura = data.body.data.id_factura;
          this.adjuntarDocumentos = true;
          this.abilitarBtn();
          this.motrarValida = false;
          this.motrarGuardar = true;
          this.abilitar.emit();
          localStorage.setItem('flujo', 'facturas');
        },
          error => {
            this.respuestaDgt.descStatus = error.error.data.mensaje;
            this.txtvalidaDGT = 'Validar';
          }
        );
    };
  }

  loadInvoice() {

  }

  actualizaBtn() {
    const reader = new FileReader();
    const file = this.xmlInput.nativeElement.files[0];
    if (file.name !== '') {
      this.fileData.file_name = file.name;
      this.abilitarValida();
    }
  }


  actualizaBtnGuardar() {

    if ( this.pdfInput.nativeElement.files[0] !== undefined ) {
      this.filePdf = this.pdfInput.nativeElement.files[0];
    }

    if ( this.otrosInput.nativeElement.files[0] !== undefined ) {
      this.fileOtros = this.otrosInput.nativeElement.files[0];
    }

    if ((this.filePdf !== undefined && this.filePdf.name !== '') || (this.fileOtros !== undefined && this.fileOtros.name !== '')) {
      this.disableGuardaArch = false;
    } else {
      this.disableGuardaArch = true;
    }
  }

  abilitarBtn() {
    this.disablefactura = false;
  }

  deshabilitarBtn() {
    this.disablefactura = true;
  }

  abilitarValida() {
    this.disableValida = false;
  }

  deshabilitarValida() {
    this.disableValida = true;
  }

  guardaArchivos() {
    this.txtGuarda = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    const reader = new FileReader();
    const reader2 = new FileReader();
    const file = this.pdfInput.nativeElement.files[0];
    const fileOtros = this.otrosInput.nativeElement.files[0];

    if (file !== undefined && file.name !== '') {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileDataOtros.id_documento = this.id_factura;
        this.fileDataOtros.data = reader.result.split(',')[1];
        this.fileDataOtros.extencion = file.name.split('.').pop();
        this._service.loadArchivos(this.fileDataOtros, 'pdf', 'Factura')
          .subscribe((data: any) => {
            this.txtGuarda = 'Documento Guardado';
            this.disableGuardaArchvos = true;
            this.disableGuardaArch = true;
          },
            error => {
              this.respuestaDgt.descStatus = error.error.data.mensaje;
            }
          );
      };
    }

    if (fileOtros !== undefined && fileOtros.name !== '') {
      reader2.readAsDataURL(fileOtros);
      reader2.onload = () => {
        this.fileDataOtros.id_documento = this.id_factura;
        this.fileDataOtros.data = reader2.result.split(',')[1];
        this.fileDataOtros.extencion = fileOtros.name.split('.').pop();
        this._service.loadArchivos(this.fileDataOtros, 'otro', 'Factura')
          .subscribe((data: any) => {
            this.txtGuarda = 'Documento Guardado';
            this.disableGuardaArchvos = true;
            this.disableGuardaArch = true;
          },
            error => {
              this.respuestaDgt.descStatus = error.error.data.mensaje;
            }
          );
      };
    }



  }

  guardarDocumentos() {

  }


}


