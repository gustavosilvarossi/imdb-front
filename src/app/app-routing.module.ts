import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './pages/movies/movies.component';
import { AuthGuard } from './auth/auth.guard';
import { MyMoviesComponent } from './pages/my-movies/my-movies.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MoviesComponent },
      { path: 'my-movies', component: MyMoviesComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
