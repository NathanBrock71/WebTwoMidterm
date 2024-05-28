import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { HomeComponent } from './home/home.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieUpdateComponent } from './movie-update/movie-update.component';

const routes: Routes = [
  { path: 'movies', component: MovieListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'detail/:_id', component: MovieDetailComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: MovieCreateComponent },
  {path: 'update/:_id', component: MovieUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
