import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/global/auth/auth.service';
import { NotifyService } from 'src/app/services/global/notify/notify.service';
import { ImdbService } from 'src/app/services/imdb/imdb.service';
import { MoviesUserLikeService } from 'src/app/services/movies-user-like/movies-user-like.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(
    private imdbSrv: ImdbService,
    private moviesUserLikeSrv: MoviesUserLikeService,
    private authSrv: AuthService,
    private notifySrv: NotifyService
  ) { }

  movies: Array<any> = new Array<any>();
  moviesLiked: Array<any> = new Array<any>();

  ngOnInit(): void {
    this.load();
  }

  async load() {
    await this.loadFavoritesUser();

    const ret = await this.imdbSrv.getMovies();

    const { results } = ret;

    if (!!results && results instanceof Array) this.movies = results.slice(0, 10);

  }

  async loadFavoritesUser() {
    const resultMoviesUser = await this.moviesUserLikeSrv.findCustomMany({
      where: {
        usersId: this.authSrv.$user.getValue().id
      }
    })

    this.moviesLiked = resultMoviesUser.data;
  }

  async sendFavorite(movie: any) {
    await this.moviesUserLikeSrv.create({
      movieID: movie.id,
      usersId: this.authSrv.$user.getValue().id,
    });

    await this.notifySrv.basicNotify(`Filme adicionado aos favoritos`);
    await this.loadFavoritesUser();
  }

  canFavorite(movie: any) {
    const index = this.moviesLiked.findIndex(mov => mov.movieID == movie.id);

    if (index == -1) return true;

    return false;
  }

}
