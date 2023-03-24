import { Injectable } from '@angular/core';
import { BaseService } from '../global/base/base.service';
import { MoviesUserLikeModel } from 'src/app/models/movies-user-like/movies-user-like.model';
import { HttpService } from '../global/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesUserLikeService extends BaseService<MoviesUserLikeModel> {

  constructor(http: HttpService) { 
    super('movies-user-like', http);
  }
}
