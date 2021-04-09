import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CargaDocumentosService } from '../carga-documentos.service';
import { ValidacionFactura, Validacion } from 'src/app/entidades';
import Swal from 'sweetalert2';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalles-validacion-mx',
  templateUrl: './detalles-validacion-mx.component.html',
  styleUrls: ['./detalles-validacion-mx.component.css']
})
export class DetallesValidacionMxComponent implements OnInit {

  id_documento: string;
  public validado = null;
  public documento = new ValidacionFactura();
  public validacion_fiscal = new Array<Validacion>();
  public validacion_negocio: Validacion[];
  public validacion_asociacion: Validacion[];
  public validacion_sap: Validacion[];
  public validacion_lista_negra: any[];
  public detalle_validacion_lista_negra: any;
  public reprocesando = 'Reprocesar';

  constructor(
    private activatedRoute: ActivatedRoute,
    private cargaDocumentosService: CargaDocumentosService,
    public globals: GlobalsComponent,
    private _storage: StorageService,
    // private router: Router
    public _location: Location
  ) {
    this.activatedRoute.params.subscribe(
      id => {
        this.id_documento = this._storage.desencriptar_ids(id['id']);
      }
    );
  }

  ngOnInit() {
    this.validado = null;
    if (this.id_documento) {
      this.comprobarDocumento(this.id_documento);
    }
  }

  comprobarDocumento(id_documento: string) {
    this.cargaDocumentosService.validarDocumentoCFDI(id_documento).subscribe((data: any) => {
      this.validado = true;
      this.documento = data;
      this.obtnerValidaciones();
    }, error => {
      if (error.error.mensaje) {
        this.validado = false;
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      } else {
        this.validado = false;
        Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: Algo salió mal, por favor inténtalo nuevamente mas tarde.', 'error');
      }
    }
    );
  }
  obtnerValidaciones() {
    this.validacion_fiscal = this.documento.detalle_validaciones.filter(obj => obj.tipo_validacion === 'FISCAL');
    this.validacion_negocio = this.documento.detalle_validaciones.filter(obj => obj.tipo_validacion === 'NEGOCIO');
    this.validacion_asociacion = this.documento.detalle_validaciones.filter(obj => obj.tipo_validacion === 'ASOCIACION');
    this.validacion_sap = this.documento.detalle_validaciones.filter(obj => obj.tipo_validacion === 'SAP');
    this.validacion_lista_negra = this.documento.detalle_validaciones.filter(obj => obj.tipo_validacion === 'FISCAL_LISTA_NEGRA');
    if (this.validacion_lista_negra && this.validacion_lista_negra.length > 0) {
      const datro = this.validacion_lista_negra[0].detalle_validacion;
      try {
        if (this.validacion_lista_negra.length > 0 && JSON.parse(datro)) {
          this.detalle_validacion_lista_negra = JSON.parse(datro);
        }
      } catch (error) {
        this.detalle_validacion_lista_negra = datro;
      }
    }
  }

  reprocesar() {
    this.reprocesando = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    const bod = { cfdi_id: this.id_documento };
    this.cargaDocumentosService.reprocesar(bod).subscribe((data: any) => {
      this.reprocesando = 'Reprocesar';
      Swal.fire('Exito', 'El documento ha sido contabilizado correctamente.', 'success');
      this._location.back();
    }, error => {
      this.reprocesando = 'Reprocesar';
      window.location.reload();
    });
  }
}
