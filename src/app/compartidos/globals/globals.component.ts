import { IMyDpOptions } from 'mydatepicker';
import { Injectable } from '@angular/core';
import { CorporativoActivo } from 'src/app/entidades/Corporativo-activo';
import { environment } from 'src/environments/environment';

@Injectable()
export class GlobalsComponent {
  public CLAVE_FACTO = 'FRMED';

  //////////////////////////////////////  SSO Server  ///////////////////////////////////////
  hostSso = 'http://200.66.80.197:20001';
  // hostSso = 'http://10.10.5.37:20001';
  // host = 'http://10.10.5.38';
  //////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////  SSO QA  /////////////////////////////////////////
  host = 'http://qafe01.factocloud.com.mx';
  // hostSso = 'https://qa01.factocloud.com.mx/sso';
  ///////////////////////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////  Locales  /////////////////////////////////////////
  // host_corporativo = `http://10.10.5.162:80/api/v1/validm/corporativo`;
  // host_corporativo = `http://10.10.5.229:80/api/v1/validm/corporativo`;
  // host_documentos = `http://localhost/api/v1/validm/documento`;
  // host_documentos = `http://10.10.5.119:5006/api/v1/validm/documento`;
  // host_administracion = `http://10.10.5.162:5003/api/v1/validm/administracion`;
  // host_gastos_viaje = 'http://10.10.5.119:5005/api/v1/validm/gastos_viaje';
  // host_gastos_viaje = 'http://10.10.5.162:5005/api/v1/validm/gastos_viaje';
  /////////////////////////////////////////////////////////////////////////////////////////


  ////////////////////////////////////// QA /////////////////////////////////////////
  host_corporativo = `http://qa-rci.factorecepcion.com/api/v1/validm/corporativo`;
  host_administracion = `http://qa-rci.factorecepcion.com/api/v1/validm/administracion`;
  host_documentos = `http://qa-rci.factorecepcion.com/api/v1/validm/documento`;
  host_gastos_viaje = 'http://qa-rci.factorecepcion.com/api/v1/validm/gastos_viaje';
  host_republica_dominicana = 'http://qa-rci.factorecepcion.com/api/v1/validm/republica_dominicana';
  // ///////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////  QA Server  /////////////////////////////////////////
  // host_corporativo = `http://10.10.5.38:5008/api/v1/validm/corporativo`;
  // host_administracion = `http://10.10.5.38:5009/api/v1/validm/administracion`;
  // host_documentos = `http://10.10.5.38:5013/api/v1/validm/documento`;
  // host_gastos_viaje = 'http://10.10.5.38:5010/api/v1/validm/gastos_viaje';
  // host_republica_dominicana = 'http://10.10.5.38:5053/api/v1/validm/republica_dominicana';
  // /////////////////////////////////////////////////////////////////////////////////////////


  ////////////////////////////////////  Produccion  /////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////


  usuario: string;
  tipo_menu: 'empleado' | 'proveedor';
  listaRolSucursales: any;
  rolSucursales = {
    rolId: '',
    CC: Array()
  };

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    markCurrentDay: true,
    openSelectorOnInputClick: true
  };

  public dtOptions = {
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

  numero_lote: string;

  array_estados = [
    { id: 'Aguascalientes', text: 'Aguascalientes' },
    { id: 'Baja California', text: 'Baja California' },
    { id: 'Baja California Sur', text: 'Baja California Sur' },
    { id: 'Campeche', text: 'Campeche' },
    { id: 'Chiapas', text: 'Chiapas' },
    { id: 'Chihuahua', text: 'Chihuahua' },
    { id: 'Ciudad de México', text: 'Ciudad de México' },
    { id: 'Coahuila de Zaragoza', text: 'Coahuila de Zaragoza' },
    { id: 'Colima', text: 'Colima' },
    { id: 'Durango', text: 'Durango' },
    { id: 'Estado de México', text: 'Estado de México' },
    { id: 'Guanajuato', text: 'Guanajuato' },
    { id: 'Guerrero', text: 'Guerrero' },
    { id: 'Hidalgo', text: 'Hidalgo' },
    { id: 'Jalisco', text: 'Jalisco' },
    { id: 'Michoacán de Ocampo', text: 'Michoacán de Ocampo' },
    { id: 'Morelos', text: 'Morelos' },
    { id: 'Nayarit', text: 'Nayarit' },
    { id: 'Nuevo León', text: 'Nuevo León' },
    { id: 'Oaxaca', text: 'Oaxaca' },
    { id: 'Puebla', text: 'Puebla' },
    { id: 'Querétaro', text: 'Querétaro' },
    { id: 'Quintana Roo', text: 'Quintana Roo' },
    { id: 'San Luis Potosí', text: 'San Luis Potosí' },
    { id: 'Sinaloa', text: 'Sinaloa' },
    { id: 'Sonora', text: 'Sonora' },
    { id: 'Tabasco', text: 'Tabasco' },
    { id: 'Tamaulipas', text: 'Tamaulipas' },
    { id: 'Tlaxcala', text: 'Tlaxcala' },
    {
      id: 'Veracruz de Ignacio de la Llave',
      text: 'Veracruz de Ignacio de la Llave'
    },
    { id: 'Yucatán', text: 'Yucatán' },
    { id: 'Zacatecas', text: 'Zacatecas' }
  ];

  array_lista_pais = [
    {
      id: 'México',
      text: 'México'
    },
    {
      id: 'RD',
      text: 'República Dominicana'
    },
    {
      id: 'U.S.A',
      text: 'Estados Unidos'
    },
    {
      id: 'C.R',
      text: 'Costa Rica'
    }
  ];

  lista_paises_rd = [];

  array_tipos_movimieneto = {
    1: 'Entrada_Mercancia',
    2: 'Anticipo',
    3: 'Nota Crédito',
    4: 'Comprobación general',
    5: 'Comprobación de Viaje',
    6: 'Caja Chica',
    7: 'Acreedores Diversos',
    8: 'Amortización',
    9: 'Complemento Pago',
    10: '	No Identificado',
    11: '	Sustitución CFDI',
  };
  array_estado_sap = {
    1: 'Aceptado',
    2: 'Rechazado',
    3: 'Error Envio',
    4: 'Pediente de envio',
  };

  menuDinamico = {
    admin_next: false,  // Listar corporativos
    gestion_Corporativos: false,  // Listar corporativos
    gestion_Corporativos_Add: false,
    gestion_Corporativos_Edit: false,
    gestion_Sucursales: false,  // Listar sucursales
    gestion_Sucursales_Add: false,
    gestion_Sucursales_Edit: false,
    gestion_Sucursal_ConfigurarBuzon: false,  //  Muestra u oculta el boton de configurar buzon
    gestion_Contribuyente: false,  // Listar corporativos
    gestion_Contribuyente_Add: false,
    gestion_Contribuyente_Edit: false,
    gestion_Centro_Costos: false,  // Listar Costos
    gestion_Centro_Costos_Add: false,
    gestion_Centro_Costos_Edit: false,
    gestion_Departamentos: false,  // Listar Departamentos
    gestion_Departamentos_Add: false,
    gestion_Departamentos_Edit: false,
    gestion_Proveedores: false,  // Listar Proveedores
    gestion_Proveedores_Add: false,
    gestion_Proveedores_Edit: false,
    gestion_Cuenta: false,  // Listar Proveedores
    gestion_Cuenta_Add: false,
    // Muestra u Oculta la columna de Configuración de Buzon en Listar Sucursales


    // Administración
    administracion_Periodos_Validacion: false, // Configuración Periódos de Validación
    administracion_Cuenta_Agrupacion: false,  // Listar Cuenta Agrupación
    administracion_Cuenta_Agrupacion_Add: false,
    administracion_Cuenta_Agrupacion_Delete: false,
    administracion_Nivel_Gasto: false,  // Listar Nivel de Gasto
    administracion_Nivel_Gasto_Add: false,
    administracion_Nivel_Gasto_Edit: false,
    administracion_Tipo_Documento_SAP: false,  // Listar Tipo Documento SAP
    administracion_Tipo_Documento_SAP_Add: false,
    administracion_Tipo_Documento_SAP_Edit: false,
    administracion_Parametros_Sistema: false,  // Listar Parámetros Sistema
    administracion_Parametros_Sistema_Add: false,
    administracion_Parametros_Sistema_Edit: false,
    administracion_Libro_Caja_Chica: false,  // Listar Libro Caja Chica
    administracion_Libro_Caja_Chica_Add: false,
    administracion_Libro_Caja_Chica_Edit: false,
    administracion_Flujo_Aprobacion: false,  // Listar Flujo Aprobación
    administracion_Flujo_Aprobacion_Add: false,
    administracion_Flujo_Aprobacion_Edit: false,
    administracion_Configuracion_Buzon: false,  // Configuración Buzón
    administracion_prestaciones: false,  // Configuración Prestaciones
    // =========== Administrar Bolsa Flexible ======
    administracion_bolsa_flexible: false,  // Bolsa Flexible

    // Catalogo Tipos de Retencion
    administracion_catalogo_tipo_retencion: false,
    // Catalogo Impuestos
    administracion_catalogo_impuestos: false,

    roles_Aplicacion_Rol: false,  // Listar Roles
    roles_Aplicacion_Rol_Add: false,
    roles_Aplicacion_Rol_Edit: false,
    roles_Modulos: false,  // Listar Modulos
    roles_Modulos_Add: false,
    roles_Modulos_Edit: false,
    roles_Funcionalidad: false,  // Listar Funcionalidad
    roles_Funcionalidad_Add: false,
    roles_Funcionalidad_Edit: false,
    roles_Categoria: false,  // Listar Categorías
    roles_Categoria_Add: false,
    roles_Categoria_Edit: false,
    solicitud_Anticipo_General: false,
    solicitud_Anticipo_Caja_Chica: false,
    solicitud_Anticipo_Caja_Chica_Add: false,

    documentos_CargaMasiva: true, // false, //
    documentos_CargaMasiva_Add: false,
    documentos_CargaMasiva_Detalles: false,
    documentos_CargaMasiva_Facturas: false,

    documentos_ConslutarDocumentos_validarSAT: false,

    // Gasto de Viaje
    solicitud_Anticipo_Gastos_Viaje: false,
    solicitud_Anticipo_Gastos_Viaje_Add: false,
    comprobacion_Gastos_Viaje: false,

    solicitud_Anticipo_Gastos_Viaje_Adm: false,
    comprobacion_Gastos_Viaje_Adm: false,
    comprobacion_Gastos_Viaje_Add: false,

    comprobacion_General: false,
    comprobacion_General_Add: false,
    comprobacion_Caja_Chica: false,
    comprobacion_Caja_Chica_Add: false,


    // Modulos comprobacion de gastos

    gastos_comprobacion_caja_chica: false,
    gastos_comprobacion_caja_chica_add: false,
    gastos_comprobacion_prestacion: false,
    gastos_comprobacion_prestacion_add: false,
    gastos_comprobacion_otros_gastos: false,
    gastos_comprobacion_otros_gastos_add: false,
    gastos_comprobacion_gastos_viaje: false,
    gastos_comprobacion_gastos_viaje_add: false,

    // Tipos de Gastos
    gastos_Acreedores_Diversos: false,
    gastos_Acreedores_Diversos_Add: false,
    gastos_Amortizadores: false,
    gastos_Amortizadores_Add: false,
    gastos_viajeV2: false,
    gastos_Proveedor_Informal: false,
    gastos_Proveedor_Informal_Add: false,

    // Bandeja Aprobacion
    bandeja_aprobacion_amortizacion: false,
    bandeja_aprobacion_acreedores_diversos: false,
    bandeja_aprobacion_proveedor_informal: false,
    bandeja_aprobacion_factura_proveedor: false,
    bandeja_aprobacion_complemento_pago: false,
    bandeja_aprobacion_gastos_viaje: false,
    bandeja_aprobacion_comprobacion_gasto_viaje: false,

    // Documentos
    documentos_Factura_Finiquito: false,
    documentos_Factura_Parcial: false,
    documentos_Factura_Anticipo: false,
    documentos_Factura_Nota_Credito: false,
    documentos_Factura_CP: false,
    documentos_Factura_Sustitucion_CFDI: false,
    // documentos_Consulta_Saldos: false,
    usuarios_Usuario: false, // Listar usuarios
    usuarios_Usuario_Add: false,
    usuarios_Usuario_Edit: false,
    usuarios_Usuario_Proveedor: false, // Listar Usuarios Proveedor
    usuarios_Usuario_Proveedor_Add: false,
    usuarios_Usuario_Proveedor_Edit: false,
    usuarios_Usuario_Acreedor: false, // Listar Usuarios Acreedor
    usuarios_Usuario_Acreedor_Add: false,
    usuarios_Usuario_Acreedor_Edit: false,
    administracion_Receptor_Add: false, // false,
    documentos_Tipo_Gasto: false, // false,
    documentos_Tipo_Gasto_Edit: false, // false,
    administracion_Tipo_Producto_SAP: false, // false,
    administracion_Tipo_Producto_SAP_Add: false, // false,
    administracion_Tipo_Producto_SAP_Edit: false, // false,
    documentos_CargaDocumentos: false, // false, //
    // documentos_CargaDocumentos_Factura: false, // false,
    // documentos_CargaDocumentos_NotaCredito: false, // false,
    // documentos_CargaDocumentos_NotaDebito: false, // false,
    // documentos_CargaDocumentos_Finalizar_Transaccion: false, // false,
    documentos_Facturas: false, // false,
    documentos_Carga_Facturas_oc: false, // false,
    documentos_NotasCredito: false, // false,
    documentos_NotasDebito: false, // false,
    documentos_Tipo_Cuenta: false, // false,
    documentos_Tipo_Cuenta_Add: false, // false,
    documentos_Tipo_Cuenta_Edit: false, // false,
    documentos_Ordenes_Compra: false, // false,
    documentos_desc_pronto_pago: false,
    documentos_desc_pronto_pago_Edit: true,
    documentos_desc_pronto_pago_Delete: false,
    administracion_Estatus_Add: false, // false,
    administracion_Metodo_Pago_Add: false, // false,
    administracion_Metodo_Pago: false, // false,
    administracion_Tipo_Documento_Add: false,
    alta_acreedor: false, // Alta de Acreedores
    documentos_codigos_recepcion: false,
    notificaciones: false,
    consulta_cfdi: false,
    complemento_pago: false,
    bandeja_aprobacion: false,
    guardar_contabilizar: false,
    metodo_pago: false,
    administracion_Metodo_Pago_Del: false,
    solicitud_ComprobacionGeneral: false,
    notificar: false
  };

  menuProveedor = {
    documentos_CargaDocumentos: false,
    // documentos_Consulta_Saldos: false,
    documentos_Factura_Sustitucion_CFDI: false,
    documentos_Ordenes_Compra: false, // Consulta de ordenes de compra
    documentos_codigos_recepcion: false,
    documentos_NotasCredito: false, // false,
    consulta_cfdi: true,
    complemento_pago: true
  };

  menuProveerCS = {
    documentos_CargaDocumentos: false,
    // Carga Masiva
    documentos_CargaMasiva: true, // false, //
    documentos_CargaMasiva_Add: false,
    documentos_CargaMasiva_Detalles: false,
    documentos_CargaMasiva_Facturas: false,
    consulta_cfdi: true,
    nota_credito: true,
    documentos_ConslutarDocumentos_validarSAT: false,
    complemento_pago: true,
    documentos_Factura_Sustitucion_CFDI: false
  }

  menuAcreedor = {
    solicitud_Anticipo_General: false,
    solicitud_Anticipo_Caja_Chica: false,
    solicitud_Anticipo_Caja_Chica_Add: false,
    documentos_CargaDocumentos: false, // false, //
    comprobacion_General: false,
    comprobacion_General_Add: false,
    comprobacion_Caja_Chica: false,
    comprobacion_Caja_Chica_Add: false,
    /////// ======= Gasto de Viaje ========//////////
    // solicitud_Anticipo_Gastos_Viaje: false,
    // solicitud_Anticipo_Gastos_Viaje_Add: false,
    // comprobacion_Gastos_Viaje: false,
    // comprobacion_Gastos_Viaje_Add: false,
    // gastos_Acreedores_Diversos: false,
    // gastos_Acreedores_Diversos_Add: false,
    // gastos_Amortizadores: false,
    // gastos_Amortizadores_Add: false,
    consulta_cfdi: true,
    complemento_pago: true
  };

  menuEmpleado = {

    /////// ======= Gasto de Viaje ========//////////
    solicitud_Anticipo_Gastos_Viaje: false,
    solicitud_Anticipo_Gastos_Viaje_Add: false,
    comprobacion_Gastos_Viaje: false,
    comprobacion_Gastos_Viaje_Add: false,
  }

  corporativoActivo: CorporativoActivo = {
    centro_consumo_nombre: '',
    centro_costo_identificador: '',
    corporativo_identificador: '',
    corporativo_nombre: '',
    rol_identificador: '',
    rol_nombre: '',
    sucursal_identificador: '',
    sucursal_nombre: '',
    rol_seleccionado: null
  };

  lista_corporativos: any[];
  datos_inciales = null;

  agregarSeleccione(array: any, text = 'Seleccione...') {
    const auxObj: any = {};
    auxObj['id'] = 0;
    auxObj['text'] = text;
    array.reverse();
    array.push(auxObj);
    array.reverse();
    return array;
  }
  /**
   * Retorna un el mismo array con los campos necesarios para ser mostrados correctamente en un select2
   * @param array Lista de elementos que se quiere mostrar en el select2
   * @param id texto que se usara como value en el select2
   * @param text texto que se mostrara en la lista
   * @param clave (Opcional) Nombre del campo clave que se concatena al text
   */
  prepararSelect2(array: any, id: string, text: string, clave?: string, eliminar_repetidos?: boolean): Array<any> {
    if (array) {
      if (eliminar_repetidos === null || eliminar_repetidos === undefined) {
        eliminar_repetidos = true;
      }
      if (clave && clave !== '') {
        array.map(function (obj) {
          obj.id_id = obj.id;
          obj.text = `${obj[clave]} - ${obj[text]}`;
          obj.id = obj[id];
          return obj;
        });
      } else {
        array.map(function (obj) {
          obj.id_id = obj.id;
          obj.text = obj[text];
          obj.id = obj[id];
          return obj;
        });
      }
      return eliminar_repetidos ? this.eliminarRepetidos(array, id) : array;
    } else {
      return array;
    }
  }

  /** Retorna un array ordenado alfabeticamente
  * - Eduardo Castellanos Huicochea 19/03/2019
  * @param array Array a ordenar, este array debe contener el nodo 'text' que es por el cual se van a ordenar las filas.
  */
  ordernarArray(array: any): Array<any> {
    array.sort((a, b) => (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0));
    array.sort((a, b) => (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0));
    return array;
  }

  /**
   * Retorna un array con el orden necesario para mostrar en un select2 con agrupadores.
   * - Gadiel Guerrero Rojas - 03/04/2019
   * @param agrupador Array con los nombres e id de los agrupadores
   * @param lista Array que de los elementos a mostrar
   * @param id_agrupador Nombre de la propiedad identificador del agrupador, su valor debe coincidir con el nombre agrupador
   * @param nombre_agrupador Nombre de la propiedad que tiene el identificador del agrupador, su valor debe coincidir con el id_agrupador
   */
  prepararSelect2Groups(agrupador: any[], lista: any[], id_agrupador: string, nombre_agrupador: string) {
    // let hijos = new Array<any>()
    agrupador = agrupador.map(obj => {
      const children = lista.filter(data => data[nombre_agrupador] === obj[id_agrupador]);
      obj.children = children;
      return obj;
    });
    agrupador = agrupador.filter(obj => obj.children.length !== 0);

    return agrupador;
  }

  /**
   * Recibe un array con elementos repetidos y retorna un array con elementos unicos.
   * - Gadiel Guerrero Rojas
   * - 23/mayo/2019
   * @param arreglo El array de objetos que se desea limpiar.
   * @param comparador La propiedad del array que se usara para comparar ( identificador ).
   */
  eliminarRepetidos(arreglo: Array<any>, comparador: any): Array<any> {
    const array = new Array<any>();
    arreglo.forEach(elemento => {
      if (array.filter(obj => obj[comparador] === elemento[comparador]).length === 0) {
        array.push(elemento);
      }
    });
    return array;
  }

  ocultarMenu() {
    if (window.innerWidth < 768) {
      const btn = document.getElementById('btn-navbar');
      btn.click();
    }
  }

}
