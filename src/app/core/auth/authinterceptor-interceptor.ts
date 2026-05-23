import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import Keycloak from 'keycloak-js';

export const authinterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloak = inject(Keycloak);
  const token = keycloak.token;

  if (!token) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  );
};
