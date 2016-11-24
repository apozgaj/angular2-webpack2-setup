import { Component } from '@angular/core';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent extends Locale {
    today: number;
    pi: number;
    value: number;

    constructor(public locale: LocaleService, public localization: LocalizationService) {
        super(locale, localization);

        // Adds the languages (ISO 639 two-letter or three-letter code).
        this.locale.addLanguages(['en', 'hr']);

        // Required: default language, country (ISO 3166 two-letter, uppercase code) and expiry (No days). 
        // If the expiry is omitted, the cookie becomes a session cookie.
        // Selects the default language and country, regardless of the browser language, to avoid inconsistencies between the language and country.
        this.locale.definePreferredLocale('en', 'US', 30);

        // Optional: default currency (ISO 4217 three-letter code).
        this.locale.definePreferredCurrency('USD');

        // Initializes LocalizationService: asynchronous loading.
        this.localization.translationProvider('./locale.'); // Required: initializes the translation provider with the given path prefix.
        this.localization.updateTranslation(); // Need to update the translation.

        this.locale.setCurrentLocale('en', 'US');
        this.locale.setCurrentCurrency('USD');
        this.defaultLocale = 'en';
        this.currency = 'USD';

        // Values that will be localized using value specific localizations 
        this.today = Date.now();
        this.pi = 3.14159;
        this.value = Math.round(Math.random() * 1000000) / 100;
    }

    // Sets a new locale & currency.
    selectLocale(language: string, country: string, currency: string): void {

        this.locale.setCurrentLocale(language, country);
        this.locale.setCurrentCurrency(currency);

    }
}
