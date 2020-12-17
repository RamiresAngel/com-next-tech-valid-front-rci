import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CorporativoService } from '../corporativo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../entidades/usuario';
import { StorageService } from '../../../compartidos/login/storage.service';
import { Corporativo } from 'src/app/entidades/corporativo';
import { HttpResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
declare var $: any;


@Component({
  selector: 'app-formulario-corporativo',
  templateUrl: './formulario-corporativo.component.html'

})
export class FormularioCorporativoComponent implements OnInit {
  public corporativo = new Corporativo();
  public formulario_corporativo: FormGroup;
  public usuarioDato: Usuario;
  public txtBtnAgregar: string;
  private id_corporativo: any;               // id del corporativo que se va a editar
  public accion_corporativo: string;            // define el texto que se mostrara dependiendo si es editar o crear
  public flag = true;
  datos_inciales: DatosIniciales;
  public color = '#fff';
  @ViewChild('imgInput') imgInput: ElementRef;
  @ViewChild('imgInputlogo') imgInputlogo: ElementRef;
  public cargado_img = true;


  public titulo_img_corp = 'No se eligió archivo';
  public titulo_logo_corp = 'No se eligió archivo';

  constructor(private _servicioCorporativo: CorporativoService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private sessionStr: StorageService,
    private _storageService: StorageService,
    private globals: GlobalsComponent
  ) {
  }

  ngOnInit() {
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.iniciarFormualarioCrear();
    this.txtBtnAgregar = 'Guardar';
    this.usuarioDato = this.sessionStr.loadSessionData();
    this._activatedRoute.params.subscribe((id) => {
      this.id_corporativo = this._storageService.desencriptar_ids(id['id_corporativo']);
    });
    if (this.id_corporativo !== null && this.id_corporativo !== undefined && this.id_corporativo !== '') {
      this._servicioCorporativo.obtnerCorporativo(this.id_corporativo).subscribe((data: HttpResponse<any>) => {
        this.corporativo = data[0];
        if (this.corporativo.ruta_logo !== null && this.corporativo.ruta_logo !== '') {
          this.titulo_img_corp = 'Ya se cargo un archivo.';
          this.titulo_logo_corp = 'Ya se cargo un archivo.';
        }
        if (this.corporativo.ruta_fondo_logo !== null && this.corporativo.ruta_fondo_logo !== '') {
          this.titulo_logo_corp = 'Ya se cargo un archivo.';
        }
      }, error => {
        console.log(error);
      });
      this.accion_corporativo = 'Editar';
      this.iniciarFormualarioEditar();
    } else {
      this.accion_corporativo = 'Agregar Nuevo';
      this.corporativo.estatus = 1;
      this.flag = false;
      this.iniciarFormualarioCrear();
    }
  }

  // Inicializa formularios dependiendo si es edicion o creacion
  iniciarFormualarioCrear(): void {
    this.formulario_corporativo = new FormGroup({
      estatus: new FormControl(1),
      nombre: new FormControl('', Validators.required),
      clave_facto: new FormControl('', Validators.required),
      color_corporativo: new FormControl('', Validators.required),
      imagen_corporativa: new FormControl('', Validators.required),
      logo_corporativo: new FormControl('', Validators.required),
    });
  }
  iniciarFormualarioEditar(): void {
    this.formulario_corporativo = new FormGroup({
      estatus: new FormControl(this.corporativo.estatus),
      nombre: new FormControl(this.corporativo.nombre),
      clave_facto: new FormControl(this.corporativo.clave_facto),
      color_corporativo: new FormControl(this.corporativo.color),
      imagen_corporativa: new FormControl(this.corporativo.fondo_logo),
      logo_corporativo: new FormControl(this.corporativo.logo)
    });
  }


  async onSubmit() {
    this.corporativo.estatus = this.formulario_corporativo.get('estatus').value ? 1 : 0;
    this.corporativo.usuario_creo = this.datos_inciales.usuario.identificador_usuario; // 'correo@gmail.com';
    // this.corporativo.usuario_modifico = this.datos_inciales.usuario.identificador_usuario;
    if (this.formulario_corporativo.valid) {
      this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
      if (this.id_corporativo !== null && this.id_corporativo !== undefined && this.id_corporativo !== '') {
        // this.corporativo.usuario_modifico = 1;
        await this.actualizarCorporativo();
      } else {
        await this.crearCorporativo();
      }
    }
  }

  private async crearCorporativo() {
    await this.validarCorporativo();
    this._servicioCorporativo.agregarCorporativo(this.corporativo).subscribe((data: HttpResponse<any>) => {
      this.router.navigate(['/home/corporativo']);
      swal.fire('Éxito', 'Guardado Correctamente', 'success').then((result) => {
        if (result) {
        }
      });
    }, error => {
      console.log(error);
      if (error.error.mensaje !== undefined) {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      } else {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: Clave Facto Invalida', 'error');
      }
      this.txtBtnAgregar = 'Guardar';
    });
  }

  private actualizarCorporativo() {
    this.corporativo.usuario_modifico = this.usuarioDato.identificador_usuario;
    this._servicioCorporativo.actualizarCorporativo(this.corporativo)
      .subscribe((data: HttpResponse<any>) => {
        this.router.navigate(['/home/corporativo']);
        swal.fire('Éxito', 'Guardado Correctamente', 'success').then((result) => {
          console.log(result);
          if (result) {
          }
        });
      },
        error => {
          console.log(error);
          swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
          this.txtBtnAgregar = 'Guardar';
        });
  }

  validarCorporativo() {
    // HARDCODE
    this._servicioCorporativo.validarCorporativo(this.globals.CLAVE_FACTO)
      .subscribe((data: HttpResponse<any>) => {
      }, error => {
        console.log(error);
      });
  }

  guardarColor(color: string) {
    console.log(color);
    this.corporativo.color = color;
  }


  cargarImagen() {

    this.cargado_img = true;

    const reader1 = new FileReader();
    const file1 = this.imgInput.nativeElement.files[0];
    if (file1 !== undefined && file1.name !== '') {
      reader1.readAsDataURL(file1);
      reader1.onload = () => {
        this.corporativo.fondo_logo = String(reader1.result).split(',')[1];
        this.formulario_corporativo.get('imagen_corporativa').setValue(this.corporativo.fondo_logo);
        // console.log(this.corporativo.ruta_fondo_logo);
        // console.log(file.name.split('.').pop());
        this.titulo_img_corp = file1.name;
        this.corporativo.ext_fondo_logo = file1.name.split('.').pop();
      };
    }
  }

  cargarLog() {
    this.cargado_img = true;
    const reader = new FileReader();
    const file = this.imgInputlogo.nativeElement.files[0];
    if (file !== undefined && file.name !== '') {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.corporativo.logo = String(reader.result).split(',')[1];
        this.formulario_corporativo.get('logo_corporativo').setValue(this.corporativo.logo);
        // console.log(this.corporativo.ruta_fondo_logo);
        // console.log(file.name.split('.').pop());
        this.titulo_logo_corp = file.name;
        this.corporativo.ext_logo = file.name.split('.').pop();
      };
    }
  }


}
