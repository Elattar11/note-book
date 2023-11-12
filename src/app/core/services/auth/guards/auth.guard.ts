import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let _AuthService =  inject(AuthService);
  let _Router = inject(Router);
  let isLogin = _AuthService.userData.getValue() !== null;
  if(isLogin)
  {
    return true;
  }
  else
  {
    _Router.navigate(['/login']);
    return false;

  }

};
