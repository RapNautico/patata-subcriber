import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private jwtHelper: JwtHelperService, private router: Router, private authService: AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.isAuthenticated()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem('token');
      if (!token || this.jwtHelper.isTokenExpired(token)) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
  }
}
