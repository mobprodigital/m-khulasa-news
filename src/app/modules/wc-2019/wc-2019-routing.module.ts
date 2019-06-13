import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScoreComponent } from './components/score/score.component';
import { FixturesListComponent } from './components/fixtures-list/fixtures-list.component';

const routes: Routes = [
  {
    path : '',
    component : FixturesListComponent
  },
  {
    path: 'full-scorecard/:fixid',
    component: ScoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Wc2019RoutingModule { }
