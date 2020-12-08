import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { TipoDocumentoSapService } from '../../tipo-documento-sap.service';
import { TipoDocumentoSAP } from 'src/app/entidades/Tipo-Documento-SAP';
import { HttpResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';

@Component({
  selector: 'app-formulario-tipo-documento-sap-mx',
  templateUrl: './formulario-tipo-documento-sap-mx.component.html',
  styleUrls: ['./formulario-tipo-documento-sap-mx.component.css']
})
export class FormularioTipoDocumentoSapMxComponent implements OnInit {

  txtBtnAgregar: string;
  formulario_tipo_documento_sap: FormGroup;
  id_tipo_documento: string;
  tipo_documento_sap = new TipoDocumentoSAP();
  accion_tipo_documento: string;
  excedio_porcentaje = false;
  public accionTipoDocumento: string;
  corporativo_activo: CorporativoActivo;


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _stroageService: StorageService,
    private _tipoDocumentoService: TipoDocumentoSapService
  ) { }

  ngOnInit() {
    this.corporativo_activo = this._stroageService.getCorporativoActivo();
    this.txtBtnAgregar = 'Guardar';
    this._activatedRoute.params.subscribe((id) => {
      this.id_tipo_documento = this._stroageService.desencriptar_ids(id['id_tipo_documento']);
    });
    if (this.id_tipo_documento !== null && this.id_tipo_documento !== undefined && this.id_tipo_documento !== '') {
      this.accion_tipo_documento = 'Editar';
      this._tipoDocumentoService.obtenerTipoDocumentoSAPId(this.id_tipo_documento).subscribe((data: HttpResponse<TipoDocumentoSAP>) => {
        this.tipo_documento_sap = data[0];
      }, error => {
        console.log(error);
      });
      this.iniciarFormularioEditar();
    } else {
      this.accion_tipo_documento = 'Agregar Nuevo';
      this.tipo_documento_sap.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
      this.iniciarFormularioCrear();
    }
  }

  iniciarFormularioCrear() {
    this.formulario_tipo_documento_sap = new FormGroup({
      tipo_documento: new FormControl('', Validators.required),
      descripcion_documento: new FormControl('', Validators.required),
      validar_items: new FormControl(''),
      total_max_porcentaje: new FormControl('', Validators.required),
      total_min_porcentaje: new FormControl('', Validators.required),
      total_max_monto: new FormControl('', Validators.required)
    });
  }

  iniciarFormularioEditar() {
    this.formulario_tipo_documento_sap = new FormGroup({
      tipo_documento: new FormControl(this.tipo_documento_sap.tipo_documento, Validators.required),
      descripcion_documento: new FormControl(this.tipo_documento_sap.descripcion_documento, Validators.required),
      validar_items: new FormControl(this.tipo_documento_sap.validar_items),
      total_max_porcentaje: new FormControl(this.tipo_documento_sap.total_max_porcentaje, Validators.required),
      total_min_porcentaje: new FormControl(this.tipo_documento_sap.total_min_porcentaje, Validators.required),
      total_max_monto: new FormControl(this.tipo_documento_sap.total_max_monto, Validators.required)
    });
  }

  onSubmit() {
    if (this.formulario_tipo_documento_sap.valid) {
      this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
      this.tipo_documento_sap.validar_items = this.formulario_tipo_documento_sap.get('validar_items').value ? 1 : 0;
      this.tipo_documento_sap.total_min_porcentaje = Number(this.tipo_documento_sap.total_min_porcentaje);
      this.tipo_documento_sap.total_max_porcentaje = Number(this.tipo_documento_sap.total_max_porcentaje);
      if (this.id_tipo_documento !== null && this.id_tipo_documento !== undefined && this.id_tipo_documento !== '') {
        this.actualizarTipoDocumentoSAP();
      } else {
        this.crearTipoDocumentoSAP();
      }
    }
  }

  actualizarTipoDocumentoSAP() {
    this._tipoDocumentoService.actualizarTipoDocumentoSAP(this.tipo_documento_sap)
      .subscribe((data: HttpResponse<any>) => {
        this._router.navigate(['home/documento_sap']);
        swal.fire('Éxito', 'Guardado Correctamente', 'success');
      }, error => {
        this.txtBtnAgregar = 'Guardar';
        swal.fire('Oops', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      });
  }
  crearTipoDocumentoSAP() {
    this._tipoDocumentoService.crearTipoDocumentoSAP(this.tipo_documento_sap).subscribe((data: HttpResponse<any>) => {
      this._router.navigate(['home/documento_sap']);
      swal.fire('Éxito', 'Guardado Correctamente', 'success');
    }, error => {
      this.txtBtnAgregar = 'Guardar';
      swal.fire('Oops', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
    });
  }



  validarPorciento(valor: any) {
    console.log(valor.value);
    if (Number(valor.value) < 0) {
      valor.value = 0;
    }
    if (Number(valor.value > 100)) {
      valor.value = 100;
    }
  }


}
