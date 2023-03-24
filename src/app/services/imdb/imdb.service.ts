import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImdbService {

  constructor() { }

  async getMovies() {
    return await fetch('https://imdb-api.com/API/AdvancedSearch/k_ab4t68c0?title_type=tv_movie&countries=br&sort=release_date,desc', {
      headers: {
        'Accept': 'application/json',
      },
      method: 'GET',
      mode: 'cors',
      cache: 'default',

    }).then(response => response.json())
  }
}
