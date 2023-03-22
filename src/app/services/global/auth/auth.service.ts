import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NotifyService } from '../../global/notify/notify.service';
import { IUserLogin } from 'src/app/interfaces/global/IUserLogin';
import { HttpService } from '../http/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpService,
    private router: Router,
    private notifySrv: NotifyService
  ) { }

  $user = new BehaviorSubject<IUserLogin>({} as IUserLogin);
  $isLogged = new BehaviorSubject<boolean>(false);

  loadAuth() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.$user.next({} as IUserLogin);
      this.$isLogged.next(false);
      return;
    }

    const user = this.parseJwt(token);

    this.$user.next(user);
    this.$isLogged.next(true);
  }

  getUser() {
    this.loadAuth();

    return this.$user.getValue();
  }

  getIsLogged() {
    this.loadAuth();

    return this.$isLogged.getValue();
  }

  async login(data: { email: string; password: string }) {
    const result = await this.http.post(`${environment.url_api}/login`, {
      ...data,
    });

    if (!result.success) return await this.notifySrv.basicNotify('Erro ao realizar login!', 'error');

    const { access_token } = result.data;

    localStorage.setItem('token', access_token);

    this.loadAuth();

    return await this.notifySrv.basicNotify(result.error.message, 'error');
  }

  async logout() {
    localStorage.removeItem('token');

    this.loadAuth();

    await this.router.navigate(['login']);

  }

  async isLogged() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['login']);
      return false;
    }

    this.router.navigate(['login']);
    return false;
  }

  parseJwt(token: string) {
    if (!token) {
      return;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

}
