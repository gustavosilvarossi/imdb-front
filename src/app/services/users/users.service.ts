import { Injectable } from '@angular/core';
import { UsersModel } from 'src/app/models/users/Users.model';
import { BaseService } from '../global/base/base.service';
import { HttpService } from '../global/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<UsersModel> {

  constructor(private http: HttpService) {
    super('user', http)
  }

  async createUser(email: string, senha: string, name_user: string) {
    return await this.http.post(`${this.URL_BASE}/new-user`, {
      email,
      password: senha,
      name_user
    })
  }
}
