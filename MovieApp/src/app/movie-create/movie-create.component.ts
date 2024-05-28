import { Component } from '@angular/core';
import { MovieServiceService } from '../services/movie.service.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent {
  movie: any = {
    title: '',
    directors: '',
    runtime: '',
    rating: '',
    date: '',
    genres: '',
    url: '',
    plot: '',
    fullPlot: ''
  };

  constructor(private movieService: MovieServiceService){

  }

  add() {
    // Split genres by spaces, commas, or slashes
    const genresArray = this.movie.genres.split(/[\s,\/]+/).filter((genre: string) => genre);

    const newMovie = {
      ...this.movie,
      genres: genresArray
    };

    this.movieService.createMovie(this.movie);

    console.log('New Movie:', newMovie);
    // Here, add your logic to handle the form submission.
    // For example, send the data to your backend API.
  }
}
