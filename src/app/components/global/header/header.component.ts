import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/global/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authSrv: AuthService) { }

  ngOnInit(): void {

  }

}
