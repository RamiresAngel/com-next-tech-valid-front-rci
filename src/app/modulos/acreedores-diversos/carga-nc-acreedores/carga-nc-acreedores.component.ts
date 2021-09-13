import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUpload } from '../../documentos_add/clases/file-upload';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { AcreedoresDiversosService } from '../acreedores-diversos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carga-nc-acreedores',
  templateUrl: './carga-nc-acreedores.component.html',
  styleUrls: ['./carga-nc-acreedores.component.css']
})
export class CargaNcAcreedoresComponent implements OnInit {

  public formulario: FormGroup;
  @ViewChild('XML') inputArchivo: ElementRef;
  @ViewChild('PDF') archivo_pdf: ElementRef;
  public fileData = new FileUpload();
  public file: any;

  nota_credito_acreedor = {
    xml: '',
    pdf: '',
    preliminar_id: ''
  };
  txt_xml = 'Cargar Archivo...';
  txt_pdf = 'Cargar Archivo...';
  txt_cargar = 'Cargar NC';
  constructor(
    private acticatedRoute: ActivatedRoute,
    private _storageService: StorageService,
    private _acreedorDiverso: AcreedoresDiversosService,
    private router: Router
  ) { }


  ngOnInit() {
    this.acticatedRoute.params.subscribe((id: any) => {
      const id_doc = this._storageService.desencriptar_ids(id['id_documento']);
      this.nota_credito_acreedor.preliminar_id = id_doc;
    });
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this.formulario = new FormGroup({
      xml: new FormControl('', Validators.required),
      pdf: new FormControl('', Validators.required)
    });
  }

  cargarXML() {
    const reader = new FileReader();
    const file = this.inputArchivo.nativeElement.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileData.file_name = file.name;
      this.fileData.file_data = reader.result.toString().split(',')[1];
      this.txt_xml = file.name;
      this.file = this.fileData.file_data;
      this.nota_credito_acreedor.xml = this.file;
    };
  }

  cargarPDF() {
    const reader = new FileReader();
    const file = this.archivo_pdf.nativeElement.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileData.file_name = file.name;
      this.fileData.file_data = reader.result.toString().split(',')[1];
      this.txt_pdf = file.name;
      this.file = this.fileData.file_data;
      this.nota_credito_acreedor.pdf = this.file;
    };
  }

  cargarNC() {
    this.txt_cargar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    console.log(this.nota_credito_acreedor);
    this._acreedorDiverso.cargarNotaCreditoAcreedor(this.nota_credito_acreedor).subscribe((data: any) => {
      Swal.fire('¡Éxito!', 'La Nota de Crédito a sido cargada correctamente.', 'success');
      this.txt_cargar = 'Cargar NC';
    }, error => {
      console.log(error);
      if (error.error.mensaje) {
        Swal.fire('¡Alerta!', 'Algo salio mal. <br> Detalle del error: .' + error.error.mensaje, 'error');
        this.txt_cargar = 'Cargar NC';
      }
      Swal.fire('¡Alerta!', ' Algo salio mal. <br> Por favor intentelo de nuevo mas tarde. ', 'error');
      this.txt_cargar = 'Cargar NC';
    });
  }
  cancelar() {
    this.router.navigateByUrl('home/acreedores_diversos');
  }
}
