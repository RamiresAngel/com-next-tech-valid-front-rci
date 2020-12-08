import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfiguracionBuzzon } from 'src/app/entidades';
import { SucursalService } from '../sucursal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion-buzon',
  templateUrl: './configuracion-buzon.component.html',
  styleUrls: ['./configuracion-buzon.component.css']
})
export class ConfiguracionBuzonComponent {

  public formulario_buzon: FormGroup;
  identificador_sucursal: string = '';
  public es_actualizacion: boolean;
  public showCorporativos = true;
  public identificador_corporativo = '';
  public txt_guradar = 'Guardar';
  configuracion_buzon = new ConfiguracionBuzzon();

  constructor(
    private activatedRoute: ActivatedRoute,
    private sucursalService: SucursalService,
    private storageService: StorageService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.identificador_sucursal = this.storageService.desencriptar_ids(params['identificador'])
    });
    this.inicializarFormulario();
    this.buscaBuzon();
  }
  buscaBuzon() {
    this.sucursalService.obtenerConfiguracionBuzon(this.identificador_sucursal).subscribe((data: any) => {
      if (data) {
        this.configuracion_buzon = data;
        this.es_actualizacion = true;
      }
    });
  }
  inicializarFormulario() {
    this.formulario_buzon = new FormGroup({
      correo: new FormControl(this.configuracion_buzon.correo, [Validators.required, Validators.email])
      , host: new FormControl(this.configuracion_buzon.host, Validators.required)
      , puerto: new FormControl(this.configuracion_buzon.puerto, Validators.required)
      , ssl: new FormControl(this.configuracion_buzon.ssl)
      , usuario: new FormControl(this.configuracion_buzon.usuario, Validators.required)
      , password: new FormControl(this.configuracion_buzon.password, Validators.required)
      , carpeta: new FormControl(this.configuracion_buzon.password, Validators.required)
      , activo: new FormControl(this.configuracion_buzon.ssl)
    });
  }

  submitFormulario() {
    this.txt_guradar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.configuracion_buzon.ssl ? this.configuracion_buzon.ssl = 1 : this.configuracion_buzon.ssl = 0;
    this.configuracion_buzon.activo = this.configuracion_buzon.activo ? 1 : 0;
    this.configuracion_buzon.identificador_sucursal = this.identificador_sucursal;
    if (this.es_actualizacion) {
      this.actualizarConfiguracion();
    } else {
      this.guardarConfiguracion();
    }
  }

  guardarConfiguracion() {
    this.sucursalService.guardarConfiguracionBuzon(this.configuracion_buzon).subscribe((data: any) => {
      
      Swal.fire('Éxito', 'Configuración guardada con éxito.', 'success');
      this.txt_guradar = 'Guardar';
    }, error => {
      console.log(error);
      const mensaje = error.error.mensaje;  
      if( error.status === 201) {
        Swal.fire('Éxito', 'Configuración guardada correctamente.', 'success');
      } else {
        Swal.fire('Error', mensaje ? mensaje : 'Ocurrio un error desconocido. Por favor inténtelo de nuevo más tarde.', 'error');
      }
      this.txt_guradar = 'Guardar';
    });
  }

  actualizarConfiguracion() {
    this.sucursalService.actualizarConfiguracionBuzon(this.configuracion_buzon).subscribe((data: any) => {
      this.txt_guradar = 'Guardar';
      Swal.fire('Éxito', data.mensaje, 'success');
    }, error => {
      const mensaje = error.error.mensaje;
    
      Swal.fire('Error', mensaje ? mensaje : 'Ocurrio un error desconocido. Por favor inténtelo de nuevo más tarde.', 'error');
      this.txt_guradar = 'Guardar';
    });
  }
}
