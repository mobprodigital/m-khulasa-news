import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonComponent } from './components/common/common.component';
import { ArchivePostComponent } from './components/archive-post/archive-post.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { HomeComponent } from './components/home/home.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SinglePageComponent } from './components/single-page/single-page.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { WorldCupArchiveComponent } from './components/world-cup-archive/world-cup-archive.component';
import { SingleWorldCupPostComponent } from './components/single-world-cup-post/single-world-cup-post.component';
import { PointTableComponent } from './components/point-table/point-table.component';

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
        path: 'world-cup',
        loadChildren: 'src/app/modules/wc-2019/wc-2019.module#Wc2019Module'
      },
      {
        path: 'point-table',
        component: PointTableComponent
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
      {
        path: '**',
        component: NotFoundComponent
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
