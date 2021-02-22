import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-modal-impuestos',
  templateUrl: './modal-impuestos.component.html',
  styleUrls: ['./modal-impuestos.component.css']
})
export class ModalImpuestosComponent implements OnInit {

  /* tabla Lista de impuestos */
  public opcionesDt = {
    ordering: false,
    dom: 'lfrtip',
    scrollX: true,
    oLanguage: {
      'sProcessing': '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>',
      'sLengthMenu': 'Mostrar _MENU_',
      'sZeroRecords': 'No se encontraron resultados',
      'sEmptyTable': 'Ningún dato disponible en esta tabla',
      'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
      'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
      'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
      'sInfoPostFix': '',
      'sSearch': 'Buscar:',
      'sUrl': '',
      'sInfoThousands': '',
      'sLoadingRecords': '<img src="assets/img/iconoCargando.gif" alt="">',
      'copy': 'Copiar',
      'oPaginate': {
        'sFirst': 'Primero',
        'sLast': 'Último',
        'sNext': 'Siguiente',
        'sPrevious': 'Anterior'
      },
      'oAria': {
        'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
        'sSortDescending': ': Activar para ordenar la columna de manera descendente'
      }
    }
  };
  public list_impuesto: [
    {
      linea: number,
      id_impuesto: number,
      tipo: string,
      tasa: number,
      importe_original: number,
      retencion: string,
      local: string
      /* importe_asignado: string */
      total_restante: number
      asignar_tipo: string
    }
  ];

  /* elementos compartidos */
  main_formulario: FormGroup
  public conceptos = new Array<any>();

  constructor() {
    this.tablaListImpuesto();
    this.iniciarFormulario();
  }

  ngOnInit() {

  }

  ngOnChanges(): void {
    this.tablaListImpuesto();
  }

  tablaListImpuesto() {
    this.conceptos = [
      {
        id: 1,
        linea: 1.00,
        id_impuesto: 1,
        tipo: '16.00',
        tasa: '157.65',
        importe_original: 100,
        retencion: 'null',
        local: 'local',
        importe_asignado: 0.00,
        total_restante: 20,
        asignar: 5,
        asignar_tipo: 'null',
      }
    ];
    setTimeout(() => {
      $('#tabla_impuestos').DataTable(this.opcionesDt);
    }, 1000);
  }

  cerrarModalDetalle() {
    $('#modal_impuestos').modal('hide');
  }

  iniciarFormulario() {
    this.main_formulario = new FormGroup({
      conceptos: new FormArray([])
    });
  }

  addConceptosToForm() {
    this.conceptos.forEach(concepto => {
      this.addFormRow(concepto);
    });
  }

  addFormRow(concepto: conceptoAux) {
    this.controlsMain.conceptos.push(
      new FormGroup({
        id: new FormControl(concepto.id),
        linea: new FormControl(concepto.linea),
        id_impuesto: new FormControl(concepto.id_impuesto),
        tipo: new FormControl(concepto.tipo),
        tasa: new FormControl(concepto.tasa),
        importe_original: new FormControl(concepto.importe_original),
        retencion: new FormControl(concepto.retencion),
        local: new FormControl(concepto.local),
        importe_asignado: new FormControl(concepto.importe_asignado),
        total_restante: new FormControl(concepto.total_restante),
        asignar: new FormControl(concepto.asignar),
        asignar_tipo: new FormControl(concepto.asignar_tipo),
      })
    )
  }

  public get controlsMain(): any {
    return this.main_formulario.controls;
  }

}
class conceptoAux {
  id: number;
  linea: number;
  id_impuesto: number;
  tipo: string;
  tasa: string;
  importe_original: number;
  retencion: string;
  local: string;
  importe_asignado: number
  total_restante: number;
  asignar: number
  asignar_tipo: string;
}
