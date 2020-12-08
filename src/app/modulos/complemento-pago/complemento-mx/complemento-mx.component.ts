import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUpload } from '../../documentos_add/clases/file-upload';
import { CargaDocumentoOC, CorporativoActivo, DatosIniciales } from 'src/app/entidades';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { ComplementoPagoService } from '../complemento-pago.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complemento-mx',
  templateUrl: './complemento-mx.component.html',
  styleUrls: ['./complemento-mx.component.css']
})
export class ComplementoMxComponent implements OnInit {
  @ViewChild('XML_input') xml_file: ElementRef;
  @ViewChild('PDF_input') pdf_file: ElementRef;

  documento_carga: CargaDocumentoOC;
  public fileData = new FileUpload();
  public formulario_validacion: FormGroup;

  public txtBtnValidar = 'Validar';

  // Variables Archivo XMl
  public nombre_archivo_xml = 'Seleccionar archivo...';
  public file_xml: any;

  // Variables Archivo PDF
  public nombre_archivo_pdf = 'Seleccionar archivo...';
  public file_pdf: any;
  corporativo_activo: CorporativoActivo;
  datos_inicales: DatosIniciales;
  constructor(
    private complementoPagoService: ComplementoPagoService,
    private storageService: StorageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.documento_carga = new CargaDocumentoOC();
    this.corporativo_activo = this.storageService.getCorporativoActivo();
    this.datos_inicales = this.storageService.getDatosIniciales();
    this.documento_carga.tipo_movimiento = 9;
    this.documento_carga.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.documento_carga.identificador_proveedor = this.datos_inicales.usuario.identificador_usuario;
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this.formulario_validacion = new FormGroup({
      xml: new FormControl('', Validators.required),
      pdf: new FormControl('')
    });
  }

  validar() {
    // console.log(JSON.stringify(this.documento_carga));
    this.txtBtnValidar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.complementoPagoService.cargarDocumento(this.documento_carga).subscribe((data: any) => {
      console.log(data);
      this.txtBtnValidar = 'Validar';
      Swal.fire('Éxito', 'Validado correctamente', 'success').then((result) => {
        if (result) {
          this.router.navigateByUrl('/home/consulta_cfdi');
        }
      });
    }, error => {
      console.log(error);
      this.txtBtnValidar = 'Validar';
      Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
    });
  }

  onSelectXMLFile() {
    const reader = new FileReader();
    const file = this.xml_file.nativeElement.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileData.file_name = file.name;
      this.fileData.file_data = reader.result.toString().split(',')[1];
      this.nombre_archivo_xml = file.name;
      this.file_xml = this.fileData.file_data;
      //  Agregar a la entidad
      this.documento_carga.xml = this.file_xml;
    };
  }
  onSelectPDFFile() {
    const reader = new FileReader();
    const file = this.pdf_file.nativeElement.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileData.file_name = file.name;
      this.fileData.file_data = reader.result.toString().split(',')[1];
      this.nombre_archivo_pdf = file.name;
      this.file_pdf = this.fileData.file_data;
      //  Agregar a la entidad
      this.documento_carga.pdf = this.file_pdf;
    };
  }
}
