import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, CanLoadFn, Route, UrlSegment, Router } from '@angular/router';

export const authGuard: CanActivateFn & CanActivateChildFn & CanLoadFn = (routeOrSegment?: any, state?: any) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  }
  // redirect to login and preserve attempted url if available
  const attempted = state?.url || (routeOrSegment?.path || '/');
  router.navigate(['/login'], { queryParams: { returnUrl: attempted } });
  return false;
};
