import { Component, OnInit } from '@angular/core';
import { Buzon } from 'src/app/entidades/buzon';
import { ConfiguracionBuzonService } from '../configuracion-buzon.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import swal from 'sweetalert2';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';

@Component({
  selector: 'app-formualrio-configuracion-buzon-mx',
  templateUrl: './formualrio-configuracion-buzon-mx.component.html',
  styleUrls: ['./formualrio-configuracion-buzon-mx.component.css']
})
export class FormualrioConfiguracionBuzonMxComponent implements OnInit {

  public buzon = new Buzon();
  public txtBtnAgregar = 'Guardar';
  public showCorporativos = true;
  public formulario_buzon: FormGroup;
  corporativo_activo: CorporativoActivo;
  public identificador_corporativo = '';

  constructor(
    private _servicio_buzon: ConfiguracionBuzonService
    , public globals: GlobalsComponent
    , private _activatedRoute: ActivatedRoute
    , private _storageService: StorageService
    , private router: Router
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
  }


  ngOnInit() {
    this.inicializarFormulario();
    this.buscaBuzon();
  }

  buscaBuzon() {
    this._servicio_buzon.ObtenerListaBuzonesMXPorCorporativo(this.identificador_corporativo).subscribe(
      (data: any) => {
        this.buzon = new Buzon();
        if ( data.length > 0 ) {
          this.buzon = data[0];
        }
        if (this.buzon.id) { // Si traemos Id, inicializa el formulario para editar
          this.inicializarFormularioEdit();
        } else {
          this.inicializarFormulario();
        }
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
      , () => {

      }
    );
  }

  actualizaCorporativo( obj: any ) {
    this.identificador_corporativo =  obj.value;
    this.buscaBuzon();
  }

  inicializarFormularioEdit() {
    this.formulario_buzon = new FormGroup({
      correo: new FormControl(this.buzon.correo, Validators.required)
      , usuario: new FormControl(this.buzon.usuario, Validators.required)
      , contrasena: new FormControl(this.buzon.contrasena, Validators.required)
      , port: new FormControl(this.buzon.port, Validators.required)
      , host_name: new FormControl(this.buzon.host_name, Validators.required)
      , isssl: new FormControl(this.buzon.isssl, Validators.required)
      , smpt_host: new FormControl(this.buzon.smpt_host, Validators.required)
      , smpt_port: new FormControl(this.buzon.smpt_port, Validators.required)
      , is_smtp_ssl: new FormControl(this.buzon.is_smtp_ssl, Validators.required)
      , mail_notificaciones: new FormControl(this.buzon.mail_notificaciones)
      , cco: new FormControl(this.buzon.cco)
    });
  }

  inicializarFormulario() {
    this.formulario_buzon = new FormGroup({
      correo: new FormControl('', Validators.required)
      , usuario: new FormControl('', Validators.required)
      , contrasena: new FormControl('', Validators.required)
      , port: new FormControl('', Validators.required)
      , host_name: new FormControl('', Validators.required)
      , isssl: new FormControl('')
      , smpt_host: new FormControl('', Validators.required)
      , smpt_port: new FormControl('', Validators.required)
      , is_smtp_ssl: new FormControl('')
      , mail_notificaciones: new FormControl('')
      , cco: new FormControl('')
    });
  }

  obtenertDatosBuzon() {

  }

  actualizarBuzon() {
    this.buzon.identificador_corporativo = this.identificador_corporativo;
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.buzon.isssl ? this.buzon.isssl = 1 : this.buzon.isssl = 0;
    this.buzon.is_smtp_ssl ? this.buzon.is_smtp_ssl = 1 : this.buzon.is_smtp_ssl = 0;
    this._servicio_buzon.GuardarBuzonlMX(this.buzon).subscribe(
      (data) => {
        this.txtBtnAgregar = 'Guardar';
        swal.fire('Éxito', 'Guardado Correctamente', 'success');
      }
      , (error) => {
        this.txtBtnAgregar = 'Guardar';
        if (error.status) {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.status, 'error');
        } else {
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
        }
      }
      , () => {

      }
    );

  }


}
