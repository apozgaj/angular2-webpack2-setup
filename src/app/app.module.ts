import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { LocaleModule, LocalizationModule } from 'angular2localization';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    LocaleModule.forRoot(),
    LocalizationModule.forRoot()
  ],
  bootstrap: [AppComponent],
  declarations: [
    AppComponent
  ]
})
export class AppModule { }
