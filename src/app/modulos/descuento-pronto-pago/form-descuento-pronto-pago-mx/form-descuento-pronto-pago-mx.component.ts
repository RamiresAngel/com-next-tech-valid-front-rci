import { Proveedores } from './../../../entidades/proveedores';
import { CentroCostosService } from './../../centro-costos/centro-costos.service';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { DescuentoProntoPago, DatosIniciales, CorporativoActivo } from 'src/app/entidades';
import { IMyDpOptions } from 'mydatepicker';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DescuentoProntoPagoService } from '../descuento-pronto-pago.service';
import { UsuarioProveedorService } from '../../usuario-proveedor/usuario-proveedor.service';
import swal from 'sweetalert2';
import { SucursalService } from '../../sucursal/sucursal.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { Moneda } from 'src/app/entidades/flujo-aprobacion';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-form-descuento-pronto-pago-mx',
  templateUrl: './form-descuento-pronto-pago-mx.component.html',
  styleUrls: ['./form-descuento-pronto-pago-mx.component.css']
})
export class FormDescuentoProntoPagoMxComponent implements OnInit {
  public contribuyenteSel: any;
  public hotelSel: any;
  public lista_monedas: any;
  public agregarTodosbool = false;
  public myTable;
  selectedToAdd: any[] = [];
  selectedToRemove: any[] = [];
  relacionRolFun: any[] = [];
  proveedores: any;
  proveedorSeleccioandos: any[] = [];
  identificador_corporativo: string;
  identificador_contribuyente: string;
  monedas = new Moneda();
  public txtBtnAgregar = 'Guardar';
  public array_sucursales: any;
  public array_controbuyentes: any;
  public formulario: FormGroup;
  public descuento_pp = new DescuentoProntoPago();
  public edit = false;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };
  datos_iniciales: DatosIniciales;
  corporativo_activo: CorporativoActivo;
  identificador_descuento_PP: string;
  public dtOptions = {
    ordering: false,
    dom: 'lBfrtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Exportar Excel',
        className: 'btn-sm',
        exportOptions: { columns: [1, 2, 3] }
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar PDF',
        className: 'btn-sm',
        exportOptions: { columns: [1, 2, 3] }
      }
    ],
    oLanguage: {
      sProcessing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>',
      sLengthMenu: 'Mostrar _MENU_',
      sZeroRecords: 'No se encontraron resultados',
      sEmptyTable: 'Ningún dato disponible en esta tabla',
      sInfo:
        'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
      sInfoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
      sInfoFiltered: '(filtrado de un total de _MAX_ registros)',
      sInfoPostFix: '',
      sSearch: 'Buscar:',
      sUrl: '',
      sInfoThousands: '',
      sLoadingRecords: '<img src="assets/img/iconoCargando.gif" alt="">',
      copy: 'Copiar',
      oPaginate: {
        sFirst: 'Primero',
        sLast: 'Último',
        sNext: 'Siguiente',
        sPrevious: 'Anterior'
      },
      oAria: {
        sSortAscending:
          ': Activar para ordenar la columna de manera ascendente',
        sSortDescending:
          ': Activar para ordenar la columna de manera descendente'
      }
    }
  };

  constructor(
    private _storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private usrProveedoresService: UsuarioProveedorService,
    private descPPService: DescuentoProntoPagoService,
    private router: Router,
    private _servicio_sucursal: SucursalService,
    private _servicio_compartido: CompartidosService,
    private _servicio_centro_costos: CentroCostosService,
    private globas: GlobalsComponent,
    private _descuentoPPService: DescuentoProntoPagoService
  ) {
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.iniciarFromulario();
    this.descuento_pp.dpp_moneda = new Array<Moneda>();
    const d = new Date();
    this.myDatePickerOptions.disableUntil = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() - 1 };
  }

  ngOnInit() {
    this.obtenerMonedas();
    this.activatedRoute.params.subscribe(data => {
      this.identificador_descuento_PP = this._storageService.desencriptar_ids(data['id']);
      if (this.identificador_descuento_PP) {
        this.edit = true;
        this.iniciarFromularioEditar();
      } else {
        this.iniciarFromulario();
      }
    });
    this.datos_iniciales = this._storageService.getDatosIniciales();
    this.corporativo_activo = this._storageService.getCorporativoActivo();
    this.obtenerSucursales();
  }

  // ngAfterViewChecked() {
  //   try {
  //     if (this.identificador_descuento_PP) {
  //       this.formulario.get('moneda').disable();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  iniciarFromulario() {
    this.formulario = new FormGroup({
      fecha_inicio: new FormControl('', Validators.required),
      fecha_fin: new FormControl('', Validators.required),
      moneda: new FormControl('', Validators.required),
      // monto_disponible_usd: new FormControl('', Validators.required),
      // monto_disponible_eur: new FormControl('', Validators.required),
      // monto_disponible_gbp: new FormControl('', Validators.required),
      contribuyente: new FormControl('', Validators.required),
      sucursal: new FormControl('', Validators.required),
      myselecttsms2: new FormControl(''),
      myselecttsms: new FormControl(''),
      agregarTodos: new FormControl(''),
      porcentaje_descuento: new FormControl('', [Validators.required, this.patternValidator(/^((100(\.0{1,2})?)|(\d{1,2}(\.\d{1,2})?))$/)]),
    });
  }
  iniciarFromularioEditar() {
    this.formulario = new FormGroup({
      moneda: new FormControl(this.monedas, [Validators.required]),
      fecha_inicio: new FormControl(this.descuento_pp.fecha_inicio, Validators.required),
      fecha_fin: new FormControl(this.descuento_pp.fecha_fin, Validators.required),
      estatus: new FormControl(this.descuento_pp.estatus, Validators.required),
      agregarTodos: new FormControl(this.agregarTodos),
      contribuyente: new FormControl(this.descuento_pp.contribuyente),
      sucursal: new FormControl(this.descuento_pp.sucursal),
      porcentaje_descuento: new FormControl(this.descuento_pp.porcentaje_dpp, [Validators.required, this.patternValidator(/^((100(\.0{1,2})?)|(\d{1,2}(\.\d{1,2})?))$/)]),
    });
    this.formulario.disable();
  }

  obtenerDescPP() {
    this.edit = true;
    this.descPPService.obtenerDecPPId(this.identificador_descuento_PP).subscribe((data: any) => {
      this.descuento_pp = data;
      this.obtenerFechas();
    }, error => {
      console.log(error);
    }, () => {
      this.contribuyenteSel = this.descuento_pp.identificador_contribuyente;
      this.hotelSel = this.descuento_pp.identificador_sucursal;
      this.obtenerMonedas();
    });
  }

  obtenerProveedoresMin() {

    this.myTable = $('#tabla_proveedores').DataTable().destroy();
    this.usrProveedoresService.ObtenerProveedorMXContribuyenteIDMin(this.identificador_corporativo, this.identificador_contribuyente)
      .subscribe(
        (data: any) => {
          this.proveedores = this.globas.ordernarArray(data);
        },
        (error) => {
          console.log(error);
        },
        () => {
          setTimeout(() => {
            this.myTable = $('#tabla_proveedores').DataTable(this.dtOptions);

          }, 1500);
        }
      );
  }

  crearDPP() {
    console.log(this.monedas);
    this.txtBtnAgregar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';
    this.descuento_pp.dpp_proveedores = this.proveedorSeleccioandos.map(obj => {
      obj.identificador_proveedor = obj.identificador;
      return obj;
    });
    this.descuento_pp.estatus = 1;
    this.descuento_pp.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.descuento_pp.identificador_usuario = this.datos_iniciales.usuario.identificador_usuario;
    this.descuento_pp.monto_restante_mxn = this.descuento_pp.monto_disponible_mxn;
    this.descuento_pp.monto_restante_usd = this.descuento_pp.monto_disponible_usd;
    this.descuento_pp.fecha_inicio = this.descuento_pp.fecha_inicio ? this.descuento_pp.fecha_inicio.formatted : '';
    this.descuento_pp.fecha_finalizacion = this.descuento_pp.fecha_inicio;
    this.descuento_pp.fecha_fin = this.descuento_pp.fecha_fin ? this.descuento_pp.fecha_fin.formatted : '';
    if (
      !this.descuento_pp.fecha_inicio || this.descuento_pp.fecha_inicio === '' ||
      !this.descuento_pp.fecha_fin || this.descuento_pp.fecha_fin === ''
    ) {
      this.txtBtnAgregar = 'Guardar';
      return 0;
    }
    if (this.descuento_pp.id) {
      this.descuento_pp.fecha_inicio = new Date();
      this.descuento_pp.fecha_finalizacion = new Date();
      this.descuento_pp.fecha_fin = new Date();
      this.prepararDatosMonedas();
      this._descuentoPPService.actualizarDescuentoPP(this.descuento_pp).subscribe(
        (data) => {
          swal.fire('Éxito', 'Guardado Correctamente', 'success');
          this.router.navigate(['/home/desc_pronto_pago']);
          this.txtBtnAgregar = 'Guardar';
        },
        (error) => {
          console.log(error);
          if (error.error.mensaje) {
            swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + error.error.mensaje, 'error');
          } else {
            swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: Por favor vuelve a intentarlo. ', 'error');
          }
          this.txtBtnAgregar = 'Guardar';
        }
        , () => {
        }
      );
    } else {
      console.log(this.formulario);
      if (this.formulario.valid) {
        // this.prepararDatosMonedas();
        this.monedas.id_moneda = Number(this.monedas.id_moneda);
        this.descuento_pp.dpp_moneda = [];
        this.descuento_pp.dpp_moneda.push(this.monedas);
        this.prepararDatosProveedores();
        this.descPPService.CrearDescuentoPP(this.identificador_corporativo, this.descuento_pp).subscribe(
          (data: any) => {
            swal.fire('Éxito', 'Guardado Correctamente', 'success');
            this.router.navigate(['/home/desc_pronto_pago']);
            this.txtBtnAgregar = 'Guardar';
          }, error => {
            console.log(error);
            if (error.error.mensaje) {
              swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error: ' + error.error.mensaje, 'error');
            } else {
              swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle del error:Por favor vuelve a intentarlo.', 'error');
            }
            this.txtBtnAgregar = 'Guardar';
          }, () => {
          }
        );
      } else {
        this.formulario.get('fecha');
        this.formulario.get('moneda');
        this.formulario.get('fecha_inicio');
        this.formulario.get('fecha_fin');
        this.formulario.get('estatus');
        this.formulario.get('agregarTodos');
        this.formulario.get('contribuyente');
        this.formulario.get('sucursal');
        this.formulario.get('porcentaje_descuent');
        this.txtBtnAgregar = 'Guardar';
      }
    }
  }

  obtenerFechas() {
    const inicio = new Date(this.descuento_pp.fecha_inicio);
    this.formulario.patchValue({
      fecha_inicio: {
        date: {
          year: inicio.getFullYear(),
          month: inicio.getMonth() + 1,
          day: inicio.getDate()
        }
      }
    });
    const fin = new Date(this.descuento_pp.fecha_fin);
    this.formulario.patchValue({
      fecha_fin: {
        date: {
          year: fin.getFullYear(),
          month: fin.getMonth() + 1,
          day: fin.getDate()
        }
      }
    });
    const finalizacion = new Date(this.descuento_pp.fecha_finalizacion);
    this.formulario.patchValue({
      fecha_finalizacion: {
        date: {
          year: finalizacion.getFullYear(),
          month: finalizacion.getMonth() + 1,
          day: finalizacion.getDate()
        }
      }
    });
  }

  // METODO PARA EXPRESIONES REGULARES
  private patternValidator(regexp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const value = control.value;
      if (value === '') {
        return null;
      }
      return !regexp.test(value) ? { patternInvalid: { regexp } } : null;
    };
  }

  seleccionProveedores(items) {
    this.selectedToAdd = items;
  }
  seleccionProveedorRemove(items) {
    this.selectedToRemove = items;
  }
  assigne() {
    this.proveedorSeleccioandos = this.proveedorSeleccioandos.concat(
      this.selectedToAdd
    );
    this.proveedores = this.proveedores.filter(item => {
      return this.proveedorSeleccioandos.indexOf(item) < 0;
    });

    this.selectedToAdd = [];
    this.ordenarArray();
  }

  unassigne() {
    this.proveedores = this.proveedores.concat(this.selectedToRemove);
    this.proveedorSeleccioandos = this.proveedorSeleccioandos.filter(
      selected => {
        return this.proveedores.indexOf(selected) < 0;
      }
    );
    this.selectedToRemove = [];
    this.ordenarArray();
  }
  assigneAll() {
    if (this.proveedores.length > 0) {
      this.proveedorSeleccioandos = this.proveedorSeleccioandos.concat(
        this.proveedores
      );
      this.proveedores = this.proveedores.filter(selected => {
        return this.proveedorSeleccioandos.indexOf(selected);
      });
    }
    this.proveedores = [];
    this.selectedToAdd = [];
    this.ordenarArray();
  }

  unassigneAll() {
    if (this.proveedorSeleccioandos.length > 0) {
      this.proveedores = this.proveedores.concat(
        this.proveedorSeleccioandos
      );
    }
    this.proveedorSeleccioandos = [];
    this.selectedToRemove = [];
    this.ordenarArray();
  }
  ordenarArray() {
    this.proveedores.sort((a, b) => (a.target > b.target) ? 1 : ((b.target > a.target) ? -1 : 0));
    this.proveedorSeleccioandos.sort((a, b) => (a.target > b.target) ? 1 : ((b.target > a.target) ? -1 : 0));
  }


  obtenerSucursales() {
    this._servicio_centro_costos.ObtenerListaCentroCostosMXPorCorporativo(
      this.identificador_corporativo
      , this.datos_iniciales.usuario.identificador_usuario
      , Number(this.corporativo_activo.rol_identificador)
    ).subscribe(
      (data: any) => {
        this.array_sucursales = $.map(data, function (obj: any) {
          const suc = {
            sucursal_identificador: obj.sucursal_identificador
            , nombre: obj.nombre_sucursal
          };
          return suc;
        });
        this.array_sucursales = this.globas.prepararSelect2(this.array_sucursales, 'sucursal_identificador', 'nombre');
        this.array_sucursales = this.globas.agregarSeleccione(this.array_sucursales, 'Seleccione un hotel...');
        this.array_sucursales = this.globas.eliminarRepetidos(this.array_sucursales, 'sucursal_identificador');

        this.array_controbuyentes = $.map(data, function (obj: any) {
          obj.emisor_identificador = obj.emisor_identificador;
          obj.nombre = obj.emisor;
          return obj;
        });
        this.array_controbuyentes = this.globas.prepararSelect2(this.array_controbuyentes, 'emisor_identificador', 'nombre');
        // this.array_controbuyentes = this.globas.agregarSeleccione(this.array_controbuyentes, 'Seleccione un contribuyente...');
        this.array_controbuyentes = this.globas.eliminarRepetidos(this.array_controbuyentes, 'emisor_identificador');
      }
      , (error) => {

      }
      , () => {
        if (this.identificador_descuento_PP) {
          this.obtenerDescPP();
        } else {
          this.iniciarFromulario();
          // this.obtenerProveedoresMin();
        }
      }
    );

  }

  seleccionarSucursal(identificador: any) {
    if (identificador !== '0' && identificador !== '') {
      this.descuento_pp.identificador_sucursal = identificador;
      this.formulario.get('sucursal').setValue(identificador);
    } else {
      this.formulario.get('sucursal').setValue(null);
    }
  }

  seleccionarContribuyente(identificador: any) {
    if (identificador !== '0' && identificador !== '') {
      this.descuento_pp.identificador_contribuyente = identificador;
      this.identificador_contribuyente = identificador;
      this.obtenerProveedoresMin();
      this.formulario.get('contribuyente').setValue(identificador);
    } else {
      this.formulario.get('contribuyente').setValue(null);
    }
  }

  agregarProveedor(check: any) {
    (check) ? check = false : check = true;
  }

  agregarTodos(obj: any) {
    if (this.agregarTodosbool) {
      this.proveedores.forEach(proveedor => {
        proveedor.check = false;
      });
    } else {
      this.proveedores.forEach(proveedor => {
        proveedor.check = true;
      });
    }
  }

  obtenerMonedas() {
    this._servicio_compartido.obtenerMonedasCorporativo(this.corporativo_activo.corporativo_identificador).subscribe(
      (data: any) => {
        this.lista_monedas = data.map(obj => {
          obj.id_moneda = obj.id;
          return obj;
        });
        if (this.descuento_pp.id) {
          // this.lista_monedas.forEach(monedacat => {
          //   this.descuento_pp.dpp_moneda.forEach(monedasel => {
          //     if (monedacat.id_moneda === monedasel.id_moneda) {
          //       monedacat.monto = monedasel.monto_disponible;
          //       monedacat.id = monedasel.id;
          //     }
          //   });
          // });
          this.monedas = this.descuento_pp.dpp_moneda[0];
          this.monedas.monto = this.monedas.monto_disponible;
          this.descuento_pp.dpp_moneda.push(this.monedas);
          this.formulario.get('moneda').disable();
        }
      }
      , (error) => {
        swal.fire('Atención', 'Ha ocurrido un error. <br> Detalle error: ' + error.error.mensaje, 'error');
      }
      , () => {
      }
    );
  }

  actualizarValorMoneda(obj: any, auxMoneda: Moneda) {
  }

  prepararDatosProveedores() {
    this.descuento_pp.dpp_proveedores = [];
    this.proveedores.forEach(proveedor => {
      if (proveedor.check) {
        const auxpp: any = {
          identificador_proveedor: proveedor.identificador
        };
        this.descuento_pp.dpp_proveedores.push(auxpp);
      }
    });

  }

  prepararDatosMonedas() {
    if (!this.descuento_pp.id) {
      this.descuento_pp.dpp_moneda = [];
    }
    this.lista_monedas.forEach(aux_moneda => {
      const aux = new Moneda();
      aux.id_moneda = aux_moneda.id_moneda;
      if (this.descuento_pp.id) {
        aux.id = aux_moneda.id;
      } else {
        aux.id = 0;
      }
      aux.monto_disponible = aux_moneda.monto;
      this.descuento_pp.dpp_moneda.push(aux);
    });
  }

  seleccionarMoneda(data) {
    const moneda = data.target.selectedOptions;
    this.monedas.id_moneda = moneda;
  }
}
