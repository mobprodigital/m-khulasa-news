import { Component, OnInit } from '@angular/core';
import { Wc2019Service } from '../../service/wc-2019.service';
import { FixtureModel } from '../../model/fixture.model';

@Component({
  selector: 'app-fixtures-list',
  templateUrl: './fixtures-list.component.html',
  styleUrls: ['./fixtures-list.component.scss']
})
export class FixturesListComponent implements OnInit {

  public fixList: FixtureModel[] = [];

  constructor(private wcService: Wc2019Service) {
    wcService.getFixtures().then(fixData => {
      this.fixList = fixData;
    });
  }


  public getTeamRun(teamId: number, fixId: number) {
    const currentFix: FixtureModel = this.fixList.find(f => f.id === fixId);
    let score = '0/0 (0)';
    if (currentFix) {
      if (currentFix.runs && currentFix.runs.length > 0) {
        const run = currentFix.runs.find(r => r.team_id === teamId);
        if (run) {
          score = '';
          score += run.score ? run.score.toString() : '0';
          score += (run.wickets ? '/' + run.wickets.toString() : '/0');
          score += (run.overs ? '(' + run.overs + ')' : '(0)');
        }
      }
    }
    return score;
  }

  public isPastMatch(ifx: FixtureModel): boolean {
    if (ifx) {
      return ifx.starting_at < new Date();
    } else {
      return false;
    }
  }

  ngOnInit() {
  }

}
