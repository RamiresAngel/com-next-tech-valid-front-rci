import { Usuario } from './../../../entidades/usuario';
import { Receptor } from './../clases/receptor';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input  } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ReceptorService } from '../receptor.service';
import { ReceptorToken, TipoIdentificacion } from '../clases/receptor';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajustes-dgt-receptor',
  templateUrl: './ajustes-dgt-receptor.component.html'
})
export class AjustesDgtReceptorComponent implements OnInit {

  // DECLARACION DE METODOS Y VARIABLES
  id: number;
  private sub: any;
  public receptores: Receptor[];
  public receptor_token = new ReceptorToken();
  public tipos: TipoIdentificacion[];
  alerta = 'hide';
  exito = 'hide';
  error = 'hide';
  messageerror = '';
  certificado_exist = 'Carga el Certificado .p12';
  @ViewChild('txtInput') txtInput: ElementRef;


  constructor(private _ServicioReceptor: ReceptorService,
    private route: ActivatedRoute,
    private router: Router) { }

  // CREACION DE METODO PARA NOMBRA AL FORM
  public form: FormGroup;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getReceptorId(this.id);
    });
    this.updateForm();
  }
  // METODO PARA OBTENER DATOS POR ID
  public getReceptorId(id) {
    this._ServicioReceptor.getReceptoresId(id)
      .subscribe((data: HttpResponse<any>) => {
        this.receptores = data.body;
        if (this.receptores[0].password !== null) {
          this.certificado_exist = 'Ya se cargo un certificado.';
        } else {
          this.certificado_exist = 'Carga el Certificado .p12';
        }
      });
    this._ServicioReceptor.getTipoIdentificacion()
      .subscribe((data: HttpResponse<any>) => {
        this.tipos = data.body;
      });
  }
  // METODO PARA VALIDAR EL FORM
  private updateForm() {
    this.form = new FormGroup({
      usuario_dgt: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      identificador_fiscal: new FormControl('', Validators.required),
      password_dgt: new FormControl('', Validators.required),
      tipo_identificacion: new FormControl('', Validators.required),
    });
  }


  actualizaBtn() {
      const reader = new FileReader();
      const file = this.txtInput.nativeElement.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.receptor_token.file_name = file.name;
        this.receptor_token.file_data = reader.result.split(',')[1];
      };
  }

  // METODO PARA CREAR
  public updateReceptor() {

    this.receptor_token.id = this.receptores[0].id;
    this.receptor_token.password = this.receptores[0].password;
    this.receptor_token.identificacion_numero = this.receptores[0].rfc;
    this.receptor_token.tipo_identificacion = this.receptores[0].tipo_identificador;
    this.receptor_token.usuario_dgt = this.receptores[0].usuario_dgt_prod;
    this.receptor_token.password_dgt  = this.receptores[0].contrasena_gdt_prod;
    this.receptor_token.identificador = this.receptor_token.identificacion_numero;

    if (this.receptor_token.file_name !== undefined) {
      if (this.form.valid && this.receptor_token.file_data != null) {
        this._ServicioReceptor.updateAjustesDGTReceptor(this.receptor_token)
          .subscribe(
            result => {
              if (result.ok) {
                this.exito = 'show';
                setTimeout(() => {
                  this.exito = 'hide';
                }, 1000);
                setTimeout(() => {
                  this.router.navigate(['/home/receptor']);
                  this.form.reset();
                }, 1500);
              }
            },
            err => {
              this.messageerror = err.error;
              this.error = 'show';
              setTimeout(() => {
                this.error = 'hide';
              }, 4000);
            },
            );
      } else {
        this.alerta = 'show';
        setTimeout(() => {
          this.alerta = 'hide';
        }, 1500);
      }
    } else {
      this.messageerror = 'No ha seleccionado un certificado.';
      this.error = 'show';
      setTimeout(() => {
        this.error = 'hide';
      }, 4000);

    }
 }
}
