import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate() {
    const token = localStorage.getItem('token');
    const jwtService = new JwtHelperService();

    if (
      localStorage.getItem('token') &&
      localStorage.getItem('user') &&
      !jwtService.isTokenExpired(token)
    ) {
      return true;
    }

    if (
      localStorage.getItem('token') &&
      localStorage.getItem('user') &&
      jwtService.isTokenExpired(token)
    ) {
      this.authService.logout();
      this.router.navigate(['auth/sign-in']);
      return false;
    }

    this.router.navigate(['auth/sign-in']);
    return false;
  }
}
