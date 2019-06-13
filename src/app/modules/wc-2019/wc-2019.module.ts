import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Wc2019RoutingModule } from './wc-2019-routing.module';
import { ScoreComponent } from './components/score/score.component';
import { FixturesListComponent } from './components/fixtures-list/fixtures-list.component';


@NgModule({
  declarations: [ScoreComponent, FixturesListComponent],
  imports: [
    CommonModule,
    Wc2019RoutingModule
  ]
})
export class Wc2019Module { }
