import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FixtureModel, BattingModel, TeamModel, RunsModel } from '../model/fixture.model';

@Injectable({
  providedIn: 'root'
})
export class Wc2019Service {

  private baseurl = 'https://cricapi.khulasa-news.com/cricketApi/';


  constructor(private httpClient: HttpClient) {

  }

  public getAllFixtures(params: HttpParams) {
    return new Promise((resolve, reject) => {
      this.httpClient.get('https://cricapi.khulasa-news.com/cricketApi/getAllfixtures.php', { params: params }).
        subscribe((res: any) => {
          this.handleResponse(res)
            .then(data => { resolve(data) })
            .catch(err => { reject(err) });
        },
          err => { reject("something went worng") },
          () => { }
        )
    })
  }
  public getLiveScore(params: HttpParams) {
    return new Promise((resolve, reject) => {
      this.httpClient.get('https://cricapi.khulasa-news.com/cricketApi/getLiveScores.php', { params: params })
        .subscribe((res: any) => {
          this.handleResponse(res)
            .then(data => { resolve(data) })
            .catch(err => { reject(err) });
        }),
        err => {
          reject('something went worng');
        },
        () => { }
    })
  }

  public handleResponse(response: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (response.status) {
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });
  }

  getFixtures(): Promise<FixtureModel[]>;
  getFixtures(fixtureId: Number): Promise<FixtureModel>;
  getFixtures(fixtureId?: number): Promise<FixtureModel[] | FixtureModel> {
    return new Promise((resolve, reject) => {

      let params = new HttpParams().set('league_id', '18').set('season_id', '23');
      if (fixtureId) {
        params = params.set('fixtureId', fixtureId.toString());
      }

      this.httpClient.get(this.baseurl + 'getAllfixtures.php', {
        params: params
      }).subscribe(
        (resp: {
          data: any,
          message: string,
          status: boolean
        }) => {
          if (resp.status === true) {
            if (resp.data && resp.data.length > 0) {
              const fixArr = this.parseFixture(resp.data);
              resolve(fixArr);
            } else {
              reject('No data found');
            }
          } else {
            reject(resp.message);
          }
        },
        err => {
          reject(err);
        },
        () => {

        }
      );
    });
  }

  public getLiveFixtures(): Promise<FixtureModel[]> {
    return new Promise((resolve, reject) => {
      this.getFixtures().then(fixs => {

        const liveStatusArr: string[] = [
          'Delayed',
          'Dinner',
          'Lunch',
          'Innings Break',
          '1st Innings',
          '2nd Innings',
          '3rd Innings',
          '4th Innings',
          'ns',
          'ns.',
          'Tea Break',
          'Int',
          'Int.',
          'postp',
          'postp.',
        ];
        const abanStatusArr = [

          'aban',
          'aban.',
          'cancl',
          'cancl.',

        ];
        const currentdDate: Date = new Date();
        currentdDate.setHours(24, 0, 0, 0);
        const liveFixes = fixs.filter(f => {
          return (f.starting_at <= currentdDate) &&
            (liveStatusArr.some(s => s.toLowerCase() === f.status.toLowerCase()));
        });
        if (liveFixes && liveFixes.length > 0) {
          resolve(liveFixes);
        } else {
          reject('No live matches');
        }
      }).catch(err => {
        reject('No live matches');

      });
    });
  }


  private parseFixture(data: any[]): FixtureModel[] {
    let fixArr: FixtureModel[] = [];

    if (data && data.length > 0) {
      fixArr = data.map(d => {
        const fix = new FixtureModel();
        fix.batting = [];
        if (d.batting && d.batting.length > 0) {
          fix.batting = this.parseBatting(d.batting);
        }

        fix.id = parseInt(d.id, 10);
        fix.live = parseInt(d.live, 10) === 1;
        fix.localteam = null;
        if (d.localteam) {
          fix.localteam = this.parseTeamModel(JSON.parse(d.localteam));
        }

        fix.localteam_id = parseInt(d.localteam_id, 10);
        fix.note = d.note;
        fix.round = d.round;
        fix.runs = [];

        if (d.runs && d.runs.length > 0) {
          fix.runs = this.parseRuns(d.runs);
        }

        fix.season_id = parseInt(d.season_id, 10);
        fix.starting_at = new Date(d.starting_at);
        fix.status = d.status;
        fix.toss_won_team_id = parseInt(d.toss_won_team_id, 10);
        fix.total_overs_played = parseFloat(d.total_overs_played);
        fix.visitorteam = null;
        if (d.visitorteam) {
          fix.visitorteam = this.parseTeamModel(JSON.parse(d.visitorteam));
        }

        fix.visitorteam_id = parseInt(d.visitorteam_id, 10);
        fix.winner_team_id = parseInt(d.winner_team_id, 10);

        return fix;
      });

    }
    return fixArr;
  }

  private parseTeamModel(curentTeam: any): TeamModel {
    const _team = new TeamModel();
    _team.code = curentTeam.code;
    _team.country_id = parseInt(curentTeam.country_id, 10);
    _team.id = parseInt(curentTeam.id, 10);
    _team.image_path = curentTeam.image_path;
    _team.name = curentTeam.name;
    return _team;
  }

  private parseRuns(runsArr: any[]): RunsModel[] {
    return runsArr.map(run => {
      const _run = new RunsModel();
      _run.fixture_id = parseInt(run.fixture_id, 10);
      _run.id = parseInt(run.id, 10);
      _run.inning = parseInt(run.inning, 10);
      _run.overs = parseFloat(run.overs);
      _run.pp1 = run.pp1;
      _run.pp2 = run.pp2;
      _run.pp3 = run.pp3;
      _run.score = parseInt(run.score, 10);
      _run.team_id = parseInt(run.team_id, 10);
      _run.wickets = parseInt(run.wickets, 10);
      return _run;
    });
  }

  private parseBatting(battingArr: any[]): BattingModel[] {
    return battingArr.map(currentBatt => {
      const bat = new BattingModel();
      bat.active = (currentBatt.active === true);
      bat.ball = parseInt(currentBatt.ball, 10);
      bat.batsmanout_id = parseInt(currentBatt.batsmanout_id, 10);
      bat.bowling_player_id = parseInt(currentBatt.bowling_player_id, 10);
      bat.catch_stump_player_id = parseInt(currentBatt.catch_stump_player_id, 10);
      bat.fixture_id = parseInt(currentBatt.fixture_id, 10);
      bat.four_x = parseInt(currentBatt.four_x, 10);
      bat.fow_balls = parseInt(currentBatt.fow_balls, 10);
      bat.fow_score = parseInt(currentBatt.fow_score, 10);
      bat.id = parseInt(currentBatt.id, 10);
      bat.player_id = parseInt(currentBatt.player_id, 10);
      bat.rate = parseInt(currentBatt.rate, 10);
      bat.score = parseInt(currentBatt.score, 10);
      bat.six_x = parseInt(currentBatt.score, 10);
      bat.team_id = parseInt(currentBatt.team_id, 10);
      return bat;
    });
  }

}
