import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { liveScoreModel } from './model/live_score.model';
import { ScoreComponent } from './components/score/score.component';

const routes: Routes = [
  {
    path: '2019',
    component: ScoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Wc2019RoutingModule { }
