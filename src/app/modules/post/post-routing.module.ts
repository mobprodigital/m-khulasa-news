import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonComponent } from './components/common/common.component';
import { ArchivePostComponent } from './components/archive-post/archive-post.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { HomeComponent } from './components/home/home.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SinglePageComponent } from './components/single-page/single-page.component';

const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      {
        path: 'category/:id',
        component: ArchivePostComponent
      },
      {
        path: 'search/:searchTerm',
        component: SearchResultsComponent
      },
      {
        path: 'page/:slug',
        component: SinglePageComponent
      },
      {
        path: ':slug',
        component: SinglePostComponent
      },
      {
        path: ':slug/:lang',
        component: SinglePostComponent
      },
      {
        path: '',
        component: HomeComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
