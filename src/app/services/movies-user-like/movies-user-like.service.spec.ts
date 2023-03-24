import { TestBed } from '@angular/core/testing';

import { MoviesUserLikeService } from './movies-user-like.service';

describe('MoviesUserLikeService', () => {
  let service: MoviesUserLikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesUserLikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
