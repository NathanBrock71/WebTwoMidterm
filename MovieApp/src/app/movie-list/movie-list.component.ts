import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from '../services/movie.service.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit{
  movies: any[] = [];
  page: number = 1;
  pageSize: number = 8;

  constructor(private movieService: MovieServiceService) { }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies() {
    const newMovies = await this.movieService.getMoviesWithPagination(this.page, this.pageSize);
    this.movies = [...this.movies, ...newMovies];
    this.page++;
  }
}
