import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideKeycloak } from 'keycloak-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    provideKeycloak({
      config: {
        url: 'http://localhost:8085',
        realm: 'banking-system-users-realm',
        clientId: 'banking-system-users-client'
      },
      initOptions: {
        // onLoad: 'check-sso',
        checkLoginIframe: false,
        pkceMethod: 'S256'
      }
    })
  ]
};
