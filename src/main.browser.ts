import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

export function main(): Promise<any> {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

document.addEventListener('DOMContentLoaded', main);
