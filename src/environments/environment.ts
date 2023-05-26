// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  host_corporativo: `https://valid-rci-corporativo.suite-nt.com/api/v1/validm/corporativo`,
  host_administracion: `https://valid-rci-admin.suite-nt.com/api/v1/validm/administracion`,
  host_documentos: `https://valid-rci-documentos.suite-nt.com/api/v1/validm/documento`,
  host_gastos_viaje: 'https://valid-rci-gastos-viaje.suite-nt.com/api/v1/validm/gastos_viaje',

  hostSso: 'https://sso.next-technologies.com.mx',                                         // Login
  host_login_rci: 'http://pruebas1.mytrialprogram.com/RCIAuthentication/api'               // RCI (sus usuarios) <<Active Directory>>
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


// node --max-old-space-size=8192 node_modules/@angular/cli/bin/ng build --prod
// Where X = (2048 or 4096 or 8192 o..) is the value of memory

