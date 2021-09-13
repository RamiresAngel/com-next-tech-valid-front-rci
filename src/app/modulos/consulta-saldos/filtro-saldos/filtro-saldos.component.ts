import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { Contribuyente, DatosIniciales, CorporativoActivo } from 'src/app/entidades';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { IMyDpOptions } from 'mydatepicker';
import { FormGroup, FormControl } from '@angular/forms';
import { FiltroSaldos } from 'src/app/entidades/filtro';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-saldos',
  templateUrl: './filtro-saldos.component.html',
  styleUrls: ['./filtro-saldos.component.css']
})
export class FiltroSaldosComponent implements OnInit {

  @Input() filtro_saldos: FiltroSaldos;
  @Output() enviarFiltro = new EventEmitter();
  public numero_proveedor;
  public id_proveedor;

  identificador_usuario: string;
  identificador_corporativo: string;
  corporativo_activo: CorporativoActivo;
  lista_contribuyentes = new Array<Contribuyente>();
  fecha_ini_doc: any;
  fecha_fin_doc: any;
  formulario: FormGroup;
  primera_vez = true;
  public txtguardar = '<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>';

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };

  datos_inciales: DatosIniciales;
  constructor(
    private compartidosService: CompartidosService,
    private _globals: GlobalsComponent,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.filtro_saldos.buscando = false;
    const hoy = new Date();
    this.fecha_ini_doc = { date: { year: hoy.getFullYear(), month: hoy.getMonth() + 1, day: 1 } };
    this.fecha_fin_doc = { date: { year: hoy.getFullYear(), month: hoy.getMonth() + 1, day: hoy.getDate() } };
    this.datos_inciales = this.storageService.getDatosIniciales();
    this.activatedRoute.params.subscribe((url) => {
      this.id_proveedor = this.storageService.desencriptar_ids(url['id_proveedor']);
      this.numero_proveedor = this.storageService.desencriptar_ids(url['numero_proveedor']);
    });
    if (this.id_proveedor) {
      this.filtro_saldos.No_Proveedor = this.numero_proveedor;
    } else {
      this.filtro_saldos.No_Proveedor = this.datos_inciales.usuario.numero_proveedor;
      this.identificador_usuario = this.datos_inciales.usuario.identificador_usuario;
    }
    this.corporativo_activo = this.storageService.getCorporativoActivo();
    this.filtro_saldos.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.identificador_corporativo = this.corporativo_activo.corporativo_identificador;
    this.iniciarFormulario();
    this.cargarEmpresas();
    const mes = this.fecha_fin_doc.date.month < 10 ? `0${this.fecha_fin_doc.date.month}` : this.fecha_fin_doc.date.month;
    const dia_inicio = this.fecha_ini_doc.date.day < 10 ? `0${this.fecha_ini_doc.date.day}` : this.fecha_ini_doc.date.day;
    const dia_fin = this.fecha_fin_doc.date.day < 10 ? `0${this.fecha_fin_doc.date.day}` : this.fecha_fin_doc.date.day;
    this.filtro_saldos.Fecha_Fin = `${this.fecha_fin_doc.date.year}-${mes}-${dia_fin}`;
    this.filtro_saldos.Fecha_Inicio = `${this.fecha_ini_doc.date.year}-${mes}-${dia_inicio}`;
  }

  iniciarFormulario() {
    this.formulario = new FormGroup({
      fecha_documento_inicio: new FormControl(''),
      fecha_documento_fin: new FormControl('')
    });
  }


  cargarEmpresas() {
    const usr = this.datos_inciales.usuario;
    if (usr.acreedor === 1 || usr.proveedor === 1) {
      this.cargarEmpresasSAP();
    } else {
      this.cargarEmpresasPortal();
    }
  }

  cargarEmpresasSAP() {
    this.compartidosService.obtenerContribuyentesProveedorId(this.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_contribuyentes = this._globals.prepararSelect2(data, 'sociedad', 'contribuyente');
      },
        error => {

        },
      );
  }


  cargarEmpresasPortal() {
    if (this.id_proveedor) {
      this.identificador_usuario = this.id_proveedor;
    }

    this.compartidosService.obtenerEmpresasIdCorporativoIdUsuario(this.identificador_corporativo, this.datos_inciales.usuario.identificador_usuario)
      .subscribe((data: any) => {
        this.lista_contribuyentes = this._globals.prepararSelect2(data, 'codigo_sociedad', 'nombre');
        if (this.lista_contribuyentes.length !== 0) {
        }
      },
        error => {

        },
      );
  }

  selectEmpresa(data: any) {
    if (data.value !== '' && data.value !== '0') {
      this.filtro_saldos.Sociedad = data.value;
      if (this.primera_vez) {
        this.actualizarTabla();
        this.primera_vez = false;
      }
    } else {
      this.filtro_saldos.Sociedad = '';
      if (this.primera_vez) {
        this.actualizarTabla();
        this.primera_vez = false;
      }
    }
  }

  selectFechaDocuIni(obj) {
    this.filtro_saldos.Fecha_Inicio = obj.formatted;
  }
  selectFechaDocuFin(obj) {
    this.filtro_saldos.Fecha_Fin = obj.formatted;
  }

  limpiarCampos() {
    this.filtro_saldos = new FiltroSaldos();
    this.filtro_saldos.buscando = false;
    this.filtro_saldos.No_Proveedor = this.numero_proveedor;
    const contri = this.lista_contribuyentes;
    this.lista_contribuyentes = [];
    this.formulario.patchValue({ fecha_documento_inicio: null });
    this.formulario.patchValue({ fecha_documento_fin: null });

    setTimeout(() => {
      this.lista_contribuyentes = contri;
    }, 200);
  }
  actualizarTabla() {
    if (this.id_proveedor) {
      this.identificador_usuario = this.datos_inciales.usuario.identificador_usuario;
      this.filtro_saldos.No_Proveedor = this.numero_proveedor;
    } else {
      this.filtro_saldos.No_Proveedor = this.datos_inciales.usuario.numero_proveedor;
      this.identificador_usuario = this.datos_inciales.usuario.identificador_usuario;
    }
    this.filtro_saldos.buscando = true;
    this.enviarFiltro.emit();
    setTimeout(() => {
      this.filtro_saldos.buscando = false;
    }, 2000);
  }
}
