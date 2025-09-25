import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { BookmarksComponent } from './features/bookmarks/bookmarks.component';
import { ArticleDetailsComponent } from './features/article-details/article-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'bookmarks', component: BookmarksComponent },
  { path: 'article/:id', component: ArticleDetailsComponent }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
