import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  if (window) {
    // tslint:disable-next-line: only-arrow-functions
    window.console.log = function () { };
  }
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  // Comando para publicado sin tronar
  // node --max-old-space-size=4096 node_modules/@angular/cli/bin/ng build --prod
