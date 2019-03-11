import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonComponent } from './components/common/common.component';
import { ArchivePostComponent } from './components/archive-post/archive-post.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'category/:id',
        component: ArchivePostComponent
      },
      {
        path: '/:slug',
        component: SinglePostComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
