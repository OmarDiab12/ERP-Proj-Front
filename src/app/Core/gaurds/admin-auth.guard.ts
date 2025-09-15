import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';
// import { UserDataService } from '../Services/user-data.service';

export const adminAuthGuard: CanActivateFn & CanActivateChildFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  if (token && role === 'admin') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
