import { Component } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  movie: Movie | undefined;

  constructor(
    private movieServices: MovieService
  ) { }

  ngOnInit(): void{
    this.movieServices.getMovieById();
  }
}
