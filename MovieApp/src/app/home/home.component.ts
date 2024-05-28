import { Component } from '@angular/core';
import { MovieServiceService } from '../services/movie.service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  totalMovies: any;

  constructor(private movieService: MovieServiceService) {
    this.loadMovieData();
  }

  async loadMovieData() {
    try {
      // Await the promises and assign their results to properties
      this.totalMovies = await this.movieService.getTotalMovies();
    } catch (error) {
      console.error('Error loading movie data:', error);
    }
  }
}
