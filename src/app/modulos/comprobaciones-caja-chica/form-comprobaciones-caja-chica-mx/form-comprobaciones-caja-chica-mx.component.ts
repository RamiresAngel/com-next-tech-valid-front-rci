import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { ContribuyenteService } from '../../contribuyente/contribuyente.service';
import { Contribuyente, DatosIniciales } from 'src/app/entidades';
import swal from 'sweetalert2';
@Component({
  selector: 'app-form-comprobaciones-caja-chica-mx',
  templateUrl: './form-comprobaciones-caja-chica-mx.component.html',
  styleUrls: ['./form-comprobaciones-caja-chica-mx.component.css']
})
export class FormComprobacionesCajaChicaMxComponent implements OnInit {

  formulario_busqueda: FormGroup;
  txtBtn = 'Buscar';
  public corporativo_activo;
  public identificador_corproativo = '';
  public array_emisores = new Array<Contribuyente>();
  public numero_solicitud = '';
  public identificador_contribuyente = '0';
  datos_inciales: DatosIniciales;
  constructor(
    private _servicioContribuyentes: ContribuyenteService
    , private _storageService: StorageService
    , private globas: GlobalsComponent
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corproativo = this.corporativo_activo.corporativo_identificador;
    this.iniciarFormulario();
  }

  ngOnInit() {
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.obtenerEmisores();
  }
  iniciarFormulario() {
    this.formulario_busqueda = new FormGroup({
      sociedad: new FormControl(''),
      solicitud: new FormControl('', Validators.required)
    });
  }
  buscar() {
    this.txtBtn = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    console.log(this.formulario_busqueda);
    // Aqui consume la api
    setTimeout(() => {
      this.txtBtn = 'Buscar';
    }, 1500);
  }

  obtenerEmisores(): void {
    $('#tabla_contribuyentes').DataTable().destroy();
    this._servicioContribuyentes.ObtenerListaContribuyentesMXPorCorporativo(
      this.identificador_corproativo
      , this.datos_inciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
      ).subscribe(
      (data: any) => {
        this.array_emisores = this.globas.prepararSelect2(data, 'identificador', 'nombre');
        this.array_emisores = this.globas.agregarSeleccione(this.array_emisores);
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
    );
  }

  ActualizarEmisor( obj: any ) {
    console.log( obj );
    this.identificador_contribuyente = obj.value;
  }
}
