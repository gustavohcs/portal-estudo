import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const allowedRoles = route.data['roles'] as string[] | undefined;
    if (allowedRoles && !allowedRoles.includes(role ?? '')) {
      this.router.navigate(['/']); // ou página de acesso negado
      return false;
    }

    return true;
  }
}
