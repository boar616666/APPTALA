import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (sessionStorage.getItem('email')) {
      return true;
    } else {
      // Si no hay sesión, redirige a la página de inicio de sesión
      return this.router.createUrlTree(['/login']);
    }
  }
}
