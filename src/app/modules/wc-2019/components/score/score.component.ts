import { Component, OnInit } from '@angular/core';
import { fixtureModel } from '../../model/fixture.model';
import { liveScoreModel } from '../../model/live_score.model';
import { HttpService } from '../../service/http.service';
import { HttpParams } from '@angular/common/http';
import { battingModel } from '../../model/batting.model';
import { bowlingModel } from '../../model/bowling.model';
import { runModel } from '../../model/runs.model';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {


  public fixturesList: fixtureModel[] = [];
  public liveScore: liveScoreModel[];
  public scoreCard: string = 'localTeam'
  public matchStaus: string[] = [
    // 'NS',
    // 'Aban',
    // 'Cancl',
    // 'Postp',
    // 'Finished',
    'Delayed',
    'Dinner',
    'Lunch',
    'Innings Break',
    '1st Innings',
    '2nd Innings',
    '3rd Innings',
    '4th Innings',
    // 'Stump Day 1',
    // 'Stump Day 2',
    // 'Stump Day 3',
    // 'Stump Day 4',
    'Tea Break',
    'Int.',
  ];
  constructor(private httpService: HttpService) { }

  public getAllFixtures() {
    let params = new HttpParams().set("league_id", '18').set('season_id', '23')
    this.httpService.getAllFixtures(params)
      .then((data: any[]) => {
        this.fixturesList = this.parseFixtures(data);
        if (this.fixturesList && this.fixturesList.length > 0) {
          this.getLiveScore();
          setInterval(() => {
            this.getLiveScore();
          }, 10000)
        }
      })
      .catch(err => { console.log(err) })
  }
  public getLiveScore() {
    console.log('live score')
    let date = new Date()
    let liveMatch: fixtureModel[] = this.fixturesList.filter(f => (parseInt(f.live) == 1) && (this.matchStaus.indexOf(f.status) > -1) && (f.date <= date));
    let liveMatchFixtureId = liveMatch.map(lm => lm.id);

    if (liveMatchFixtureId && liveMatchFixtureId.length > 0) {
      let params = new HttpParams().set("league_id", '18').set('season_id', '23').set('fixtureId', liveMatchFixtureId.toString());
      this.httpService.getLiveScore(params)
        .then((data: any[]) => {
          this.liveScore = this.parseLiveScore(data)
        })
        .catch(err => { console.log(err) });
    }

  }

  public parseFixtures(fixtures: any[]) {
    let fixturels: fixtureModel[] = [];
    if (fixtures && fixtures.length > 0) {
      fixturels = fixtures.map(f => {
        let _fls: fixtureModel = new fixtureModel();
        _fls.id = f.id;
        _fls.date = new Date(f.starting_at);
        _fls.live = f.live;
        _fls.status = f.status;
        return _fls
      })
    }
    return fixturels
  }

  public parseLiveScore(score: any[]) {
    let lScore: liveScoreModel[] = [];
    if (score) {
      lScore = score.map(f => {
        let _liveScore: liveScoreModel = new liveScoreModel();
        _liveScore.localTeamId = f.localteam_id;
        _liveScore.round = f.round;
        _liveScore.visitarTeamId = f.visitorteam_id
        _liveScore.note = f.note;
        _liveScore.tossWinTeamId = f.toss_won_team_id;
        _liveScore.elected = f.elected;
        _liveScore.localTeam = JSON.parse(f.localteam);
        _liveScore.visitarTeam = JSON.parse(f.visitorteam);
        _liveScore.batting = this.parseBatting(f.batting);
        _liveScore.bowling = this.parseBowling(f.bowling);
        _liveScore.runs = this.parseRun(f.runs);
        if (_liveScore.localTeam.id == _liveScore.tossWinTeamId) {
          _liveScore.tossWinTeamName = _liveScore.localTeam.name;
        }
        else {
          _liveScore.tossWinTeamName = _liveScore.visitarTeam.name;
        }
        return _liveScore;
      })
    }
    return lScore;
  }



  public parseBatting(batting: any[]) {
    let Batting: battingModel[] = [];
    if (batting) {
      Batting = batting.map(bt => {
        let _batting: battingModel = new battingModel();
        _batting.teamId = bt.team_id
        _batting.playerId = bt.player_id;
        _batting.playerName = bt.playerName;
        _batting.playerImagePath = bt.playerImage;
        _batting.ball = bt.ball;
        _batting.score = bt.score;
        _batting.sRate = bt.rate;
        _batting.four = bt.four_x;
        _batting.six = bt.six_x;
        return _batting
      })
    }
    return Batting
  }

  public parseBowling(bowling: any[]) {
    let Bowling: bowlingModel[] = [];
    if (bowling) {
      Bowling = bowling.map(bw => {
        let _bowling: bowlingModel = new bowlingModel();
        _bowling.teamId = bw.team_id;
        _bowling.playarId = bw.player_id;
        _bowling.overs = bw.overs;
        _bowling.medians = bw.medians
        _bowling.runs = bw.runs;
        _bowling.wickets = bw.wickets;
        _bowling.wide = bw.wide;
        _bowling.noBall = bw.noball;
        _bowling.playarName = bw.playerName;
        _bowling.playerImage = bw.playerImage;
        return _bowling;
      })
    }
    return Bowling;
  }

  public parseRun(run: any[]) {
    let runs: runModel[];
    if (run) {
      runs = run.map(r => {
        let _runs: runModel = new runModel();
        _runs.teamId = r.team_id;
        _runs.inning = r.inning;
        _runs.score = r.score;
        _runs.wicket = r.wickets;
        _runs.over = r.overs;
        return _runs
      })
    }
    return runs
  }



  ngOnInit() {
    this.getAllFixtures();

  }

}










