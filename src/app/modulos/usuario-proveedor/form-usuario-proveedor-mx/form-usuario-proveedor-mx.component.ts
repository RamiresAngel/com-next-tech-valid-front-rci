import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { UsuarioProveedorService } from '../usuario-proveedor.service';
// import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ProveedoresService } from '../../proveedores/proveedores.service';
import { Proveedor } from 'src/app/entidades';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-form-usuario-proveedor-mx',
  templateUrl: './form-usuario-proveedor-mx.component.html',
  styleUrls: ['./form-usuario-proveedor-mx.component.css']
})
export class FormUsuarioProveedorMxComponent implements OnInit {
  formularioProveedor: FormGroup;
  proveedor_id;
  submitted = false;
  public proveedor = new Proveedor();

  spinner = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
  txtBtnGuardar = 'Guardar';

  public titulo = 'Nuevo Proveedor';

  public es_edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private storage: StorageService,
    private usuarioService: UsuarioProveedorService,
    private proveedoresService: ProveedoresService,
    private router: Router,
    private actived_route: ActivatedRoute
  ) {
    this.actived_route.params.subscribe((params) => {
      this.proveedor_id = this.storage.desencriptar_ids(params['identificador']);
    });
    this.formularioProveedor = this.formBuilder.group({
      nombre: ['', Validators.required],
      numero_proveedor: [''],
      rfc: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(13), this.validarRFC]],
      correo: ['', [Validators.required, Validators.email]],
      extranjero: ['', Validators.required],
      estatus: [1],
      correo_adjuntos: ['', [Validators.email]],
      // persona_fisica: ['', Validators.required],
      acreedor: ['1'],
      reset_password: [0],
      grupo_cuenta: ['Z003'],
      identificador_corporativo: [this.storage.getCorporativoActivo().corporativo_identificador]
    });
    if (this.proveedor_id) {
      this.es_edicion = true;
      this.obtenerProveedor();
    }
  }

  ngOnInit() {

  }

  obtenerProveedor() {
    this.proveedoresService.ObtenerProveedorMXByid(this.proveedor_id).subscribe((data: any) => {
      this.proveedor = data;
      console.log(this.proveedor);
    });
  }

  get controles() { return this.formularioProveedor.controls; }


  onSubmit() {
    this.controles.extranjero.setValue(this.controles.extranjero.value ? 1 : 0);
    this.controles.reset_password.setValue(this.controles.reset_password.value ? 1 : 0);
    this.controles.estatus.setValue(this.controles.estatus.value ? 1 : 0);
    if (this.proveedor_id) {
      this.actualizarProveedor();
    } else {
      this.crearProveedor();
    }
  }

  crearProveedor() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formularioProveedor.invalid) {
      this.submitted = false;
      return;
    }
    this.txtBtnGuardar = this.spinner;
    this.formularioProveedor.disable();
    this.usuarioService.crearProveedorCS(this.formularioProveedor.value).subscribe((data: any) => {
      this.formularioProveedor.enable();
      this.submitted = false;
      this.txtBtnGuardar = 'Guardar';
      Swal.fire('Exito', 'El proveedor ha sido creado correctamente.', 'success');
      this.router.navigate(['home', 'proveedores']);
    }, error => {
      this.formularioProveedor.enable();
      this.txtBtnGuardar = 'Guardar';
      this.submitted = false;
      const msj_error = (error && error.error && error.error.mensaje) ? error.error.mensaje : 'Error desconocido.';
      Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + msj_error, 'error');
    }, () => {
      this.txtBtnGuardar = 'Guardar';
      this.submitted = false;
    });
  }

  actualizarProveedor() {
    console.log('actualizar');
    this.submitted = true;
    // stop here if form is invalid
    if (this.formularioProveedor.invalid) {
      this.submitted = false;
      return;
    }

    this.txtBtnGuardar = this.spinner;
    this.formularioProveedor.disable();
    this.usuarioService.actualizarProveedorCS(this.proveedor).subscribe((data: any) => {
      this.formularioProveedor.enable();
      this.submitted = false;
      this.txtBtnGuardar = 'Guardar';
      Swal.fire('Exito', 'El proveedor se ha actualizado correctamente.', 'success');
      this.router.navigate(['home', 'proveedores']);
    }, error => {
      this.formularioProveedor.enable();
      this.txtBtnGuardar = 'Guardar';
      this.submitted = false;
      const msj_error = (error && error.error && error.error.mensaje) ? error.error.mensaje : 'Error desconocido.';
      Swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + msj_error, 'error');
    }, () => {
      this.txtBtnGuardar = 'Guardar';
      this.submitted = false;
    });
  }

  onReset() {
    this.submitted = false;
    this.formularioProveedor.reset();
    this.router.navigate(['home', 'proveedores']);
  }

  validarRFC(rfc: FormControl) {
    const re = /^[a-zA-Z]{3,4}(\d{6})((\D|\d){2,3})?$/;
    return re.test(rfc.value) ? true : false;
  }

  cambiarPassAlert(event: any) {
    event.preventDefault();
    Swal.fire({
      title: 'Alerta',
      text: "¿Está seguro de reiniciar la contraseña?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Regresar'
    } as SweetAlertOptions).then((result) => {
      if (!result.value) {
        event.target.checked = !event.target.checked
      }
    })
  }

}
