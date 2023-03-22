import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NotifyService } from '../services/global/notify/notify.service';
import { AuthService } from '../services/global/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authSrv: AuthService,
    private notifySrv: NotifyService
  ) { }

  async canActivate() {
    this.authSrv.loadAuth();

    const user = this.authSrv.$user.getValue();

    if (!this.authSrv.$isLogged.getValue()) {
      await this.authSrv.logout();
      return false;
    }

    if (new Date() >= new Date(user.exp * 1000)) {
      await this.authSrv.logout();
      return false;
    }

    return true;
  }

}
