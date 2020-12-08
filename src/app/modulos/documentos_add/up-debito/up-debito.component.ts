import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ViewChild, ElementRef, } from '@angular/core';
import { FileUpload } from '../clases/file-upload';
import { DocumentoAddService } from '../documento-add.service';
import { RespDGT } from '../clases/resp-dgt';
import { OtrosDocumentos } from '../clases/file-upload';
import { CancelarDocumentoService } from './../cancelar-documento.service';
@Component({
  selector: 'app-up-debito',
  templateUrl: './up-debito.component.html',
  styleUrls: ['./up-debito.component.css']
})
export class UpDebitoComponent implements OnInit, OnDestroy {
  public respuestaDgt = new RespDGT();
  @ViewChild('xmlInput') xmlInput: ElementRef;
  @ViewChild('pdfInput') pdfInput: ElementRef;
  @ViewChild('otrosInput') otrosInput: ElementRef;
  @Output() abilitar = new EventEmitter<string>();
  @Input() idTransaccion;
  public fileData = new FileUpload();
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
  public file: any;
  public fileDataOtros = new OtrosDocumentos();
  public filePdf = {
    name: ''
  };
  public fileOtros = {
    name: ''
  };

  constructor(private _service: DocumentoAddService, private _cancelarService: CancelarDocumentoService) { }

  ngOnInit() {
    this.txtvalidaDGT = 'Validar';
  }

  ngOnDestroy() {
    this.abilitar.emit();
  }

  destroy(data: any) {
    if (data !== undefined && data !== null && data !== 0) {

      this._cancelarService.cancelarDocumento(data).subscribe((respuesta: any) => {
      },
        error => {
          alert(JSON.stringify(error));
        }
      );
    }
    this.abilitar.emit();
  }

  actualizaBtnGuardar() {

    if (this.pdfInput.nativeElement.files[0] !== undefined) {
      this.filePdf = this.pdfInput.nativeElement.files[0];
    }

    if (this.otrosInput.nativeElement.files[0] !== undefined) {
      this.fileOtros = this.otrosInput.nativeElement.files[0];
    }

    if ((this.filePdf !== undefined && this.filePdf.name !== '') || (this.fileOtros !== undefined && this.fileOtros.name !== '')) {
      this.disableGuardaArch = false;
    } else {
      this.disableGuardaArch = true;
    }
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
        this._service.loadArchivos(this.fileDataOtros, 'pdf', 'Nota_Debito')
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
        this._service.loadArchivos(this.fileDataOtros, 'otro', 'Nota_Debito')
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

  actualizaBtn() {
    const reader = new FileReader();
    const file = this.xmlInput.nativeElement.files[0];
    if (file.name !== '') {
      this.fileData.file_name = file.name;
      this.abilitarValida();
    }
  }


  abilitarValida() {
    this.disableValida = false;
  }

  deshabilitarValida() {
    this.disableValida = true;
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

      this._service.loadXmlDebito(this.fileData)
        .subscribe((data: any) => {
          this.respuestaDgt = data.body.request.resp as RespDGT;
          this.id_factura = data.body.data.id_factura;
          this.adjuntarDocumentos = true;
          this.abilitarBtn();
          this.motrarValida = false;
          this.motrarGuardar = true;
          this.abilitar.emit();
          localStorage.setItem('flujo', 'debito');
        },
          error => {
            this.respuestaDgt.descStatus = error.error.data.mensaje;
            this.txtvalidaDGT = 'Validar';
          }
        );
    };
  }

  abilitarBtn() {
    this.disablefactura = false;
  }

  deshabilitarBtn() {
    this.disablefactura = true;
  }


}
