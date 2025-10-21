import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, CanLoadFn, Router } from '@angular/router';

export const adminAuthGuard: CanActivateFn & CanActivateChildFn & CanLoadFn = (routeOrSegment?: any, state?: any) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const role = (localStorage.getItem('role') || '').toLowerCase();

  if (token && role === 'admin') {
    return true;
  }

  // Not authorized — redirect to login (can include returnUrl)
  const attempted = state?.url || (routeOrSegment?.path || '/');
  router.navigate(['/login'], { queryParams: { returnUrl: attempted } });
  return false;
};
