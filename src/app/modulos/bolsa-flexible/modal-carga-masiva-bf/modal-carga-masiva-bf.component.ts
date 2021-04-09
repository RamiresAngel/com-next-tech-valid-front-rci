import { BolsaFlexibleService } from './../bolsa-flexible-.service';
import { FileUpload } from './../../documentos_add/clases/file-upload';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnChanges, Input } from '@angular/core';
import { PrestacionesService } from './../../prestaciones/prestaciones.service';
import { CorporativoActivo, Prestaciones, DatosIniciales } from 'src/app/entidades';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-modal-carga-masiva-bf',
  templateUrl: './modal-carga-masiva-bf.component.html',
  styleUrls: ['./modal-carga-masiva-bf.component.css']
})
export class ModalCargaMasivaBfComponent implements OnInit, OnChanges {
  @ViewChild('NC_input') XML_nc: ElementRef;
  @Output() onGuardar = new EventEmitter();
  @Input() obj_prestaciones = new Array<Prestaciones>();


  public titulo = 'Selecciona archivo...';
  public fileData = new FileUpload();
  public file: any;
  public listaPrestacion = new Array<Prestaciones>();
  public datos_iniciales: DatosIniciales;
  identificador_corporativo: string;
  corporativo_activo: CorporativoActivo;
  id_prestacion: string;


  constructor(
    public _servicePrestacion: PrestacionesService,
    private _storageService: StorageService,
    public bolsa_sevice: BolsaFlexibleService,
  ) {
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    // this.getListPrestaciones();
  }

  ngOnInit() {
  }
  ngOnChanges() {
    // console.log(this.obj_prestaciones);
    this.listaPrestacion = this.obj_prestaciones.map((obj: any) => {
      obj.text = obj.nombre;
      obj.id = obj.id;
      return obj;
    });
  }

  actualizarArchivoBtnNC() {
    const reader = new FileReader();
    const file = this.XML_nc.nativeElement.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileData.file_name = file.name;
      this.fileData.file_data = reader.result.toString().split(',')[1];
      this.titulo = file.name;
      this.file = this.fileData.file_data;
      // this.carga_documento.pdf = this.file;
      // console.log(this.file);
    };
  }

  guardar() {
    const body_excel = {
      identificador_usuario_creo: this.datos_iniciales.usuario.identificador_usuario,
      id_prestacion: this.id_prestacion,
      file: this.file
    };
    // console.log(body_excel);
    this.bolsa_sevice.cargaExcelBolsaFlexible(body_excel)
      .subscribe((data: any) => {
        // console.log(data);
        Swal.fire('Éxito', data.mensaje, 'success');
        setTimeout(() => {
          this.refrescarTabla();
        }, 500);
        this.cerrarModal();
      }, (error) => {
        console.log(error);
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      });
  }

  /*  getListPrestaciones() {
     this._servicePrestacion.getListPrestaciones(this.identificador_corporativo)
       .subscribe((data: any) => {
         this.listaPrestacion = data.map((obj: any) => {
           obj.text = obj.nombre;
           obj.id = obj.id;
           return obj;
         });
         // console.log(this.listaPrestacion);
       }, error => {
         console.log(error);
       });
   } */

  identificaprestaciones(id) {
    // console.log(id);
    this.id_prestacion = id.value;
  }

  refrescarTabla(): void {
    this.onGuardar.emit();
  }

  public cerrarModal() {
    $('#modal-cargar-excel').modal('toggle');
    this.file = undefined;
  }

}
