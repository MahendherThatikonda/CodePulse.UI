import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService= inject(AuthService);
  const router = inject(Router)

  const user = authService.user();

  if(!user){
  //navigate back to login
   router.navigate(['./login']);
   return false
  }

  //User is logged in

  //check role of user
  const isWriter=user.roles.includes("Writer");
  if(!isWriter){
    authService.logout();
    return false;
  }

  //we know that the user is logged in and writer role
  return true;
};
