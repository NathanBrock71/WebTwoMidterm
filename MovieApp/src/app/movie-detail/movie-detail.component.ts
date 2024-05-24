import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieServiceService } from '../services/movie.service.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent {
  constructor(private route: ActivatedRoute, private movieService: MovieServiceService){
  }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void{
    this.movieService.getMovieById();
  }
}
