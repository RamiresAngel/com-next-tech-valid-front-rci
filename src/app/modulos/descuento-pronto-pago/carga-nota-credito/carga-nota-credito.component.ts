import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUpload } from '../../documentos_add/clases/file-upload';
import Swal from 'sweetalert2';
import { DescuentoProntoPagoService } from '../descuento-pronto-pago.service';
import { LoginComponent } from 'src/app/paginas/login/login.component';
import { DatosIniciales, CorporativoActivo } from 'src/app/entidades';

@Component({
  selector: 'app-carga-nota-credito',
  templateUrl: './carga-nota-credito.component.html',
  styleUrls: ['./carga-nota-credito.component.css']
})
export class CargaNotaCreditoComponent implements OnInit {

  public formulario: FormGroup;
  public codigo: string;
  public fileData = new FileUpload();
  public block_input: boolean;
  public valicacion_ok: boolean;
  public file_xml: any;
  public file_pdf: any;

  public cargaNC = new CargaNC();
  datos_inciales: DatosIniciales;
  corporativo_activo: CorporativoActivo;

  public txt_btn_validar = '<i class="fas fa-check"></i>';
  public txt_btn_guardar = 'Guardar';
  public nombre_xml = 'Seleccione Archivo';
  public nombre_pdf = 'Seleccione Archivo';
  public identificador_sucursal = '';

  @ViewChild('XML_archivo') xml_archivo: ElementRef;
  // @ViewChild('PDF_archivo') pdf_archivo: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _descuentoProntoPagoService: DescuentoProntoPagoService,
    private _storageService: StorageService
  ) {
    this.activatedRoute.params.subscribe(url => {
      if (this._storageService.desencriptar_ids(url['numero_codigo'])) {
        this.codigo = this._storageService.desencriptar_ids(url['numero_codigo']);
        // this.identificador_sucursal = this._storageService.desencriptar_ids(url['identificador_sucursal']);
        this.validarOC();
      }
      this.datos_inciales = this._storageService.getDatosIniciales();
      this.corporativo_activo = this._storageService.getCorporativoActivo();
    });
  }

  ngOnInit() {
    this.iniciarFromulario();
    this.cargaNC.dpp_id = Number(this.codigo);
    this.cargaNC.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.cargaNC.identificador_sucursal = this.corporativo_activo.sucursal_identificador;
    this.cargaNC.identificador_proveedor = this.datos_inciales.usuario.identificador_proveedor;
    this.cargaNC.tipo_movimiento = 3;
  }

  iniciarFromulario() {
    this.formulario = new FormGroup({
      xml: new FormControl('', Validators.required),
      // pdf: new FormControl('', Validators.required),
    });
  }

  validarOC() {
    this.txt_btn_validar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    setTimeout(() => {
      this.txt_btn_validar = '<i class="fas fa-check"></i>';
      this.valicacion_ok = true;
    }, 1500);
  }

  actualizarXML() {
    const reader = new FileReader();
    const file = this.xml_archivo.nativeElement.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileData.file_name = file.name;
      this.fileData.file_data = reader.result.toString().split(',')[1];
      this.nombre_xml = file.name;
      this.file_xml = this.fileData.file_data;
      // console.log(this.file_xml);
    };
  }
  actualizarPDF() {
    const reader = new FileReader();
    const file = this.xml_archivo.nativeElement.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileData.file_name = file.name;
      this.fileData.file_data = reader.result.toString().split(',')[1];
      this.nombre_pdf = file.name;
      this.file_pdf = this.fileData.file_data;
      // console.log(this.file_pdf);
    };
  }
  guardar() {
    this.cargaNC.xml = this.file_xml;
    this.txt_btn_guardar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this._descuentoProntoPagoService.cargaNotaCredito(this.cargaNC).subscribe((data: any) => {

      Swal.fire('Exito', 'El documento se cargo correctamente.', 'success');
    }, error => {
      if (error.error) {
        Swal.fire('Atención', 'Algo salio mal, intenálo nuevamente. Detalle del error: ' + error.error.mensaje, 'error');
      } else {
        Swal.fire('Atención', 'Algo salio mal, intenálo nuevamente.', 'error');
      }
    });
    // setTimeout(() => {
    //   this.txt_btn_guardar = 'Guardar';
    //   Swal.fire('Exito', 'El documento se cargo correctamente.', 'success');
    // }, 1500);
  }
}

class CargaNC {
  dpp_id: number;
  identificador_proveedor: string;
  xml: string;
  identificador_corporativo: string;
  tipo_movimiento: number;
  identificador_sucursal: string;
}
