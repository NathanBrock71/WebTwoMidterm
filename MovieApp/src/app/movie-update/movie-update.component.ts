import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from '../services/movie.service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css']
})
export class MovieUpdateComponent implements OnInit {
  Movie: any;

  constructor(private route: ActivatedRoute, private movieService: MovieServiceService) {
  }

  ngOnInit() {
    this.getMovie();
  }

  async getMovie() {
    const id = this.route.snapshot.paramMap.get('_id');
    if (id != null) {
      this.Movie = await this.movieService.getMovieById(id);
    }
  }

  updateMovie() {
    // Check if genres is an array or a string
    let genresArray: string[] = [];
    if (Array.isArray(this.Movie.genres)) {
      // If genres is already an array, assign it directly
      genresArray = this.Movie.genres;
    } else if (typeof this.Movie.genres === 'string') {
      // If genres is a string, split it by spaces, commas, or slashes
      genresArray = this.Movie.genres.split(/[\s,\/]+/).filter((genre: string) => genre);
    } else {
      // Handle other cases (e.g., undefined or unexpected type)
      console.error('Genres field has an unexpected type or is undefined.');
      // You can choose to return or handle this error differently based on your requirements
      return;
    }

    const updatedMovie = {
      ...this.Movie,
      genres: genresArray
    };

    console.log('Updated Movie:', updatedMovie);

    this.movieService.updateMovie(this.Movie.id, updatedMovie);
  }
}
