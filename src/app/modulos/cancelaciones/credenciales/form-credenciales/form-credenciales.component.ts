import { Component } from '@angular/core';
import { Credenciales, Usuario } from 'src/app/entidades';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-credenciales',
  templateUrl: './form-credenciales.component.html',
  styleUrls: ['./form-credenciales.component.css']
})
export class FormCredencialesComponent {
  public lista_contribuyentes = new Array<any>();
  public credencial = new Credenciales();
  formulario: FormGroup;
  usuario: Usuario;
  identificador_credencial: string;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
    private _compartidosService: CompartidosService,
    public globals: GlobalsComponent
  ) {
    this.identificador_credencial = this.activatedRoute.snapshot.paramMap.get('identificador');
    this.usuario = this.storageService.getDatosIniciales().usuario;
    if (this.identificador_credencial) {
      this.obtenerCredencial();
    }
    this.formulario = this.formBuilder.group({
      contribuyente_identificador: [this.credencial.contribuyente_identificador, Validators.required],
      archivo_cer: [this.credencial.archivo_cer, Validators.required],
      archivo_key: [this.credencial.archivo_key, Validators.required],
      password: [this.credencial.password, Validators.required],
      politicas: [false, Validators.required]
    });
    this.cargarEmpresas();
  }

  submitFormulario(controles: Credenciales) {
    this.credencial = controles;
    console.log(this.credencial);
  }
  obtenerCredencial() {
    console.log(this.identificador_credencial);
  }
  actualizarContribuyente(seleccion: any) {
    console.log(seleccion.value);
    this.controles.contribuyente_identificador.setValue(seleccion.value);
  }

  cargarArchivo(input_archivo, input_nombre, tipo) {
    const reader = new FileReader();
    const archivo = input_archivo.files[0];
    console.log(archivo);
    input_nombre.value = archivo.name;
    if (archivo !== undefined && archivo.name !== '') {
      reader.readAsDataURL(archivo);
      reader.onload = () => {
        const base64 = String(reader.result).split(',')[1];
        switch (tipo) {
          case 'cer':
            this.controles.archivo_cer.setValue(base64);
            break;
          case 'key':
            this.controles.archivo_key.setValue(base64);
            break;
          default:
            console.log(String(reader.result).split(',')[1]);
            break;
        }
      };
    }
  }

  cargarEmpresas() {
    if (this.usuario.acreedor === 1 || this.usuario.proveedor === 1) {
      this.cargarEmpresaSAP();
    } else {
      this.cargarEmpresaPortal();
    }
  }

  cargarEmpresaSAP() {
    this._compartidosService.obtenerContribuyentesProveedorId(this.usuario.identificador_usuario)
      .subscribe(
        (data: any) => {
          this.lista_contribuyentes = this.globals.prepararSelect2(data, 'identificador_contribuyente', 'contribuyente');
        },
        (error) => {
          console.log(error);
        }
      );
  }

  cargarEmpresaPortal() {
    this._compartidosService.obtenerEmpresasIdCorporativoIdUsuario(this.usuario.identificador_corporativo, this.usuario.identificador_usuario)
      .subscribe(
        (data: any) => {
          this.lista_contribuyentes = this.globals.prepararSelect2(data, 'identificador', 'nombre', 'codigo_sociedad');
        },
        (error) => {
          console.log(error);
        });
  }

  public get controles(): { [key: string]: AbstractControl; } {
    return this.formulario.controls;
  }


}
