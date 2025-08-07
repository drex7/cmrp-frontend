import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './cmrp.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import Aura from '@primeuix/themes/aura';
import {providePrimeNG} from 'primeng/config';


export const cmrpConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
          cssLayer: {
            name: "primeng",
            order: "theme, base, primeng"
          }
        }
      }
    })
  ]
};
