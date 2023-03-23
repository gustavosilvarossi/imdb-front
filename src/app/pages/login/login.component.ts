import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/global/auth/auth.service';
import { NotifyService } from 'src/app/services/global/notify/notify.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isRegister: boolean = false;
  email: string = '';
  senha: string = '';
  nome_user: string = '';

  create_email: string = '';
  create_senha: string = '';
  create_nome_user: string = '';

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private userSrv: UsersService,
    private notifySrv: NotifyService
  ) { }

  ngOnInit(): void {
  }

  async send() {
    await this.authSrv.login({ email: this.email, password: this.senha });

    await this.router.navigate(['']);
  }

  async registerNewUser() {

    const result = await this.userSrv.createUser(this.create_email, this.create_senha, this.create_nome_user);

    console.log(result)

    if (!result?.success) return await this.notifySrv.basicNotify('Erro ao criar o usuário', 'error');

    return await this.notifySrv.basicNotify('Usuário criado com sucesso');

  }

}
