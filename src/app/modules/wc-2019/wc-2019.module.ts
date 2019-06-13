import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Wc2019RoutingModule } from './wc-2019-routing.module';
import { ScoreComponent } from './components/score/score.component';


@NgModule({
  declarations: [ScoreComponent],
  imports: [
    CommonModule,
    Wc2019RoutingModule
  ]
})
export class Wc2019Module { }
