import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

export function main(): Promise<any> {
  let config: any = undefined;
  if (APP_LOCALE_ID) {
    config = {
      providers: [
        { provide: TRANSLATIONS, useValue: require('messages.xlf') },
        { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
        { provide: LOCALE_ID, useValue: APP_LOCALE_ID }
      ]
    };
  }
  return platformBrowserDynamic()
    .bootstrapModule(AppModule, config);
}

document.addEventListener('DOMContentLoaded', main);
