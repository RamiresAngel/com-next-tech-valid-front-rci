import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoGastoService } from '../tipo-gasto.service';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { MontoTipoGasto } from 'src/app/entidades/Monto-Tipo-Gasto';
import { shallowEqualArrays } from '@angular/router/src/utils/collection';
import Swal from 'sweetalert2';
import { CuentaService } from '../../cuenta/cuenta.service';
import { ContribuyenteService } from '../../contribuyente/contribuyente.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { RelacionTipoGasto } from 'src/app/entidades/Relacion-Tipo-Gasto';

@Component({
  selector: 'app-formulario-tipo-gasto-mx',
  templateUrl: './formulario-tipo-gasto-mx.component.html',
  styleUrls: ['./formulario-tipo-gasto-mx.component.css']
})
export class FormularioTipoGastoMxComponent implements OnInit {

  public lista_relaciones = new Array<any>();
  public lista_relaciones_filtrar = new Array<any>();
  public lista_cuentas: any[];

  startValue_cuentas: any;
  public lista_contribuyentes: any;
  startValue_contribuyente: any;
  public guardado: any;
  public txtBtnAgregar = 'Finalizar';
  id_tipo_gasto: string;
  identificador_corporativo: string;
  datos_inciales: DatosIniciales;
  corporativo_activo: CorporativoActivo;
  public ver_relaciones: boolean;
  public montoPorTipoGasto = new MontoTipoGasto();
  public txtAgregarMonto = '<i class="fas fa-save"></i>';
  public txtAgregarRelacion = ' <i class="fas fa-save"></i>';
  relacion_tipo_cuenta = new RelacionTipoGasto();
  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _tipoGastoService: TipoGastoService,
    private _cuentaService: CuentaService,
    private _contribuyenteService: ContribuyenteService,
    private _storageService: StorageService,
    private _globals: GlobalsComponent,
  ) {
    this.datos_inciales = this._storageService.getDatosIniciales();
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    // this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(id => {
      this.id_tipo_gasto = this._storageService.desencriptar_ids(String(id['id']));
      this.identificador_corporativo = this._storageService.desencriptar_ids(String(id['identificador_corporativo']));
      console.log(this.identificador_corporativo);
      console.log(this.id_tipo_gasto);
    });
    this.montoPorTipoGasto.tipo_gasto_id = Number(this.id_tipo_gasto);
    this.cargarListas();
    this.obtenerMontoTipoGasto(this.id_tipo_gasto);
  }
  obtenerMontoTipoGasto(id_tipo_gasto) {
    this._tipoGastoService.obtenerMontoTipoGsatiCorporativo(this.identificador_corporativo, id_tipo_gasto).subscribe((data: any) => {
      if (data.length !== 0) {
        this.montoPorTipoGasto = data[0];
        this.ver_relaciones = true;
      }
    }, error => {

    });
  }

  actualizarCuenta(evento) {
    if (evento.value !== '0') {
      this.relacion_tipo_cuenta.identificador_cuenta = evento.value;
    } else {
      this.relacion_tipo_cuenta.identificador_cuenta = null;
    }

  }

  actualizarContribuyente(evento) {
    if (evento.value !== '0') {
      this.relacion_tipo_cuenta.identificador_contribuyente = evento.value;
    } else {
      this.relacion_tipo_cuenta.identificador_contribuyente = null;
    }
  }
  agregarRelacion() {
    this.txtAgregarRelacion = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this._tipoGastoService.agregarRelacionTipoGastoCorporativo(this.identificador_corporativo, this.id_tipo_gasto, this.relacion_tipo_cuenta).subscribe((data: any) => {
      Swal.fire(
        'Éxito',
        'Guardado Correctamente',
        'success'
      );
      this.reiniciarListas();
      this.obtenerRelaciones();
      this.txtAgregarRelacion = ' <i class="fas fa-save"></i>';
    }, error => {
      Swal.fire(
        'Atención',
        'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje,
        'error'
      );
      this.reiniciarListas();
      this.txtAgregarRelacion = ' <i class="fas fa-save"></i>';
    });

    this.relacion_tipo_cuenta = new RelacionTipoGasto();
    this.obtenerRelaciones();
  }

  eliminarRelacion(relacion) {
    Swal.fire({
      title: 'Eliminando Relación...',
      // html: 'I will close in <strong></strong> seconds.',
      showLoaderOnConfirm: true,
      onBeforeOpen: () => {
        Swal.showLoading();
        return this._tipoGastoService.eliminarRelacion(relacion).subscribe(
          (data: any) => {
            this.obtenerRelaciones();
            Swal.close();
          }
          , (error) => {
            console.log(error);
          }
          , () => {
          });
      },
      onClose: () => {
        // clearInterval(timerInterval)
      }
    }).then((result) => {
      console.log(result);
      if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.timer
      ) {
        console.log('I was closed by the timer');
      }
    });



    // Swal.fire({
    //   title: 'Submit your Github username',
    //   input: 'text',
    //   inputAttributes: {
    //     autocapitalize: 'off'
    //   },
    //   showCancelButton: true,
    //   confirmButtonText: 'Look up',
    //   showLoaderOnConfirm: true,
    //   preConfirm: (login) => {
    //     return this._tipoGastoService.eliminarRelacion(this.relacion_tipo_cuenta).subscribe(
    //       (data: any) => {
    //         this.obtenerRelaciones();
    //       }
    //       , (error) => {
    //         console.log(error);
    //       }
    //       , () => {
    //       }
    //     );
    //   },
    //   allowOutsideClick: () => !Swal.isLoading()
    // }).then((result) => {
    //   console.log(result);
    //   // if (result.value) {
    //   //   Swal.fire({
    //   //     title: `${result.value.login}'s avatar`,
    //   //     imageUrl: result.value.avatar_url
    //   //   });
    //   // }
    // });



    // this._tipoGastoService.eliminarRelacion(relacion).subscribe((data: any) => {
    //   this.obtenerRelaciones();
    // });
  }

  reiniciarListas() {
    const listaContr = this.lista_contribuyentes;
    this.lista_contribuyentes = [];
    const listCuent = this.lista_cuentas;
    this.lista_cuentas = [];

    setTimeout(() => {
      this.lista_contribuyentes = listaContr;
      this.lista_cuentas = listCuent;
    }, 100);
  }
  finalizarEdicion() {
    this.router.navigate(['/home/tipo_gasto']);
  }

  cargarListas() {
    this._contribuyenteService.obtenerContribuyentesMin(
      this.identificador_corporativo
      , this.datos_inciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
    ).subscribe((data: any) => {
      this.lista_contribuyentes = $.map(data, (obj) => {
        obj.id = obj.identificador;
        obj.text = `${obj.codigo} - ${obj.nombre}`;
        return obj;
      });
      this.lista_contribuyentes = this._globals.agregarSeleccione(this.lista_contribuyentes, 'Seleccione Contribuyente...');
    });

    this._cuentaService.obtenerCuentasMin(
      this.identificador_corporativo
      , this.datos_inciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
    ).subscribe((data: any) => {
      this.lista_cuentas = $.map(data, (obj) => {
        obj.id = obj.identificador;
        obj.text = `${obj.codigo_cuenta} - ${obj.cuenta}`;
        return obj;
      });
      this.lista_cuentas = this._globals.agregarSeleccione(this.lista_cuentas, 'Seleccione Cuenta...');
    });
    this.obtenerRelaciones();

  }

  obtenerRelaciones() {
    this.relacion_tipo_cuenta.tipo_gasto_id = Number(this.id_tipo_gasto);
    this._tipoGastoService.obtenerTipoGastoIdCorporativoIdentificador(this.identificador_corporativo, this.id_tipo_gasto).subscribe((data: any) => {
      this.lista_relaciones = data;
      this.lista_relaciones_filtrar = this.lista_relaciones;
    }, error => {
      console.log(error);
    });
  }

  agregarMonto() {
    this.txtAgregarMonto = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this._tipoGastoService.agregarMontoATipoGastoPorCorporativo(this.identificador_corporativo, this.montoPorTipoGasto).subscribe((data: any) => {
      Swal.fire(
        'Éxito',
        'Guardado Correctamente',
        'success'
      );
      this.ver_relaciones = true;
      this.txtAgregarMonto = '<i class="fas fa-save"></i>';
    }, (error) => {
      console.log(error);
      Swal.fire(
        'Atención',
        'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje,
        'error'
      );
      this.txtAgregarMonto = '<i class="fas fa-save"></i>';
    });
  }

  filtrar(text: string) {
    if (text.length > 2) {
      this.lista_relaciones = this.lista_relaciones_filtrar.filter(x =>
        String(this.omitirAcentos(x.contribuyente)).toLowerCase().includes(text.toLowerCase()) || String(this.omitirAcentos(x.cuenta)).toLowerCase().includes(text.toLowerCase())
      );
    } else {
      this.lista_relaciones = this.lista_relaciones_filtrar.filter(x =>
        String(this.omitirAcentos(x.contribuyente)).toLowerCase().includes('') || String(this.omitirAcentos(x.cuenta)).toLowerCase().includes('')
      );
    }
  }
  omitirAcentos(text: string): string {
    const acentos = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
    const original = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
    for (let i = 0; i < acentos.length; i++) {
      text = text.replace(acentos.charAt(i), original.charAt(i));
    }
    return text;
  }

}
