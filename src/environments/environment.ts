// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  host_corporativo: `http://54.177.224.47:5008/api/v1/validm/corporativo`,
  host_administracion: `http://54.177.224.47:5009/api/v1/validm/administracion`,
  host_documentos: `http://54.177.224.47:5013/api/v1/validm/documento`,
  host_gastos_viaje: 'http://54.177.224.47:5010/api/v1/validm/gastos_viaje',
  host_republica_dominicana: 'http://54.177.224.47:5053/api/v1/validm/republica_dominicana',
  hostSso: 'http://ec2-54-177-224-47.us-west-1.compute.amazonaws.com:20001',
  host: 'http://qafe01.factocloud.com.mx'
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

