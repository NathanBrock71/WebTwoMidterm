import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieServiceService } from '../services/movie.service.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
  Movie: any;

  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieServiceService) {
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

  async deleteMovie() {
    try {
      const id = this.route.snapshot.paramMap.get('_id');
      if (id != null) {
        await this.movieService.deleteMovie(id);
        // Redirect to home page or any other appropriate route after successful deletion
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
      // Handle error as needed
    }
  }
}
