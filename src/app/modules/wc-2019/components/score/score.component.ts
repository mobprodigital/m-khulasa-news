import { Component, OnInit } from '@angular/core';
import { fixtureModel } from '../../model/fixture.model';
import { liveScoreModel } from '../../model/live_score.model';
import { Wc2019Service } from '../../service/wc-2019.service';
import { HttpParams } from '@angular/common/http';
import { battingModel } from '../../model/batting.model';
import { bowlingModel } from '../../model/bowling.model';
import { runModel } from '../../model/runs.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { scoreBoardType } from 'src/app/enum/scoreBoard.enum';
import { MatchTypeEnum } from 'src/app/enum/match-type.enum';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {


  public fixturesList: fixtureModel[] = [];
  public liveScore: liveScoreModel[];
  public scoreCard: string = 'localTeam';
  public fixId: string;
  public isVisitarTeam: boolean;
  private timer: any;
  public MTOneDay = MatchTypeEnum.oneDay;
  public MTTest = MatchTypeEnum.test;
  public MTTest5 = MatchTypeEnum.test5;
  public MTt20 = MatchTypeEnum.t20;
  public MTt20i = MatchTypeEnum.t20i;
  public MTt10 = MatchTypeEnum.t10;
  
  private routerSubscribe: Subscription;
  public localTeamStatus: string;
  public visitarTeamStatus: string;

  public visitarTBattingLSB: string;
  public visitarTBowlingLSB: string;
  public localTBattingLSB: string;
  public localTBowlingLSB: string;

  public visitarTBattingFSB: string;
  public visitarTBowlingFSB: string;
  public localTBattingFSB: string;
  public localTBowlingFSB: string;

  public isSetScoreBoard: boolean;
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
constructor(private httpService: Wc2019Service, private activatedRouter: ActivatedRoute, private route: Router) {
  this.routerSubscribe = route.events.subscribe(ev => {
    if (ev instanceof NavigationEnd) {
      this.fixId = activatedRouter.snapshot.paramMap.get('fixid');
      this.scoreCard = "localTeam";
      this.isVisitarTeam = true;
      this.isSetScoreBoard = true;
      this.getLiveScore();
      this.timer = setInterval(() => { this.getLiveScore(); }, 20000);
    }
  })
}

  // public getAllFixtures() {
  //   let params = new HttpParams().set("league_id", '18').set('season_id', '23')
  //   this.httpService.getAllFixtures(params)
  //     .then((data: any[]) => {
  //       this.fixturesList = this.parseFixtures(data);
  //       if (this.fixturesList && this.fixturesList.length > 0) {
  //         this.getLiveScore();
  //         setInterval(() => {
  //           this.getLiveScore();
  //         }, 10000)
  //       }
  //     })
  //     .catch(err => { console.log(err) })
  // }

  public getLiveScore() {

  // let date = new Date()
  // let liveMatch: fixtureModel[] = this.fixturesList.filter(f => (parseInt(f.live) == 1) && (this.matchStaus.indexOf(f.status) > -1) && (f.date <= date));
  // let liveMatchFixtureId = liveMatch.map(lm => lm.id);

  if (this.fixId) {
    let params = new HttpParams().set('fixtureId', this.fixId.toString());
    this.httpService.getLiveScore(params)
      .then((data: any[]) => {
        this.liveScore = this.parseLiveScore(data);
        console.log(this.liveScore)


        if (this.isVisitarTeam && this.liveScore[0].batting.length > 0 && this.liveScore[0].batting[0].teamId == this.liveScore[0].visitarTeam.id) {
          this.scoreCard = "visitarTeam";
          this.isVisitarTeam = false;
        }
        if (this.liveScore[0].status === "Finished" || this.liveScore[0].status === "NS" || this.liveScore[0].status === "Aban" || this.liveScore[0].status === 'Cancl') {
          if (this.timer) {
            window.clearTimeout(this.timer)
          }
        }
        if (this.isSetScoreBoard) {
          this.setScoreBoard();
        }
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

  public setScoreBoard() {
  if (this.liveScore[0].loaclTeamBatting.length) {
    if (this.liveScore[0].loaclTeamBatting[0].scoreboard == scoreBoardType.S1) {
      this.localTBattingFSB = scoreBoardType.S1;
      this.visitarTBowlingFSB = scoreBoardType.S1;
      this.localTBattingLSB = scoreBoardType.S3;
      this.visitarTBowlingLSB = scoreBoardType.S3;
      this.visitarTBattingFSB = scoreBoardType.S2;
      this.localTBowlingFSB = scoreBoardType.S2;
      this.visitarTBattingLSB = scoreBoardType.S4;
      this.localTBowlingLSB = scoreBoardType.S4;
    }
    else {
      this.visitarTBattingFSB = scoreBoardType.S1;
      this.localTBowlingFSB = scoreBoardType.S1;
      this.visitarTBattingLSB = scoreBoardType.S3;
      this.localTBowlingLSB = scoreBoardType.S3;
      this.localTBattingFSB = scoreBoardType.S2
      this.visitarTBowlingFSB = scoreBoardType.S2;
      this.localTBattingLSB = scoreBoardType.S4;
      this.visitarTBowlingLSB = scoreBoardType.S4;
    }
  }
  if (this.liveScore[0].visiterTeamBatting.length) {
    if (this.liveScore[0].visiterTeamBatting[0].scoreboard == scoreBoardType.S1) {
      this.visitarTBattingFSB = scoreBoardType.S1;
      this.localTBowlingFSB = scoreBoardType.S1;
      this.visitarTBattingLSB = scoreBoardType.S3;
      this.localTBowlingLSB = scoreBoardType.S3;
      this.localTBattingFSB = scoreBoardType.S2
      this.visitarTBowlingFSB = scoreBoardType.S2;
      this.localTBattingLSB = scoreBoardType.S4;
      this.visitarTBowlingLSB = scoreBoardType.S4
    }
    else {
      this.localTBattingFSB = scoreBoardType.S1;
      this.visitarTBowlingFSB = scoreBoardType.S1;
      this.localTBattingLSB = scoreBoardType.S3;
      this.visitarTBowlingLSB = scoreBoardType.S3;
      this.visitarTBattingFSB = scoreBoardType.S2;
      this.localTBowlingFSB = scoreBoardType.S2;
      this.visitarTBattingLSB = scoreBoardType.S4;
      this.localTBowlingLSB = scoreBoardType.S4;
    }
  }
  this.isSetScoreBoard = false;
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
      _liveScore.fixture_id = parseInt(f.id, 10);
      _liveScore.status = f.status;
      _liveScore.localTeam = JSON.parse(f.localteam);
      _liveScore.matchType = f.type;
      _liveScore.visitarTeam = JSON.parse(f.visitorteam);
      _liveScore.batting = this.parseBatting(f.batting);
      _liveScore.bowling = this.parseBowling(f.bowling);
      _liveScore.localTeamBowling = this.parseBowling(f.bowling, f.localteam_id);
      _liveScore.loaclTeamBatting = this.parseBatting(f.batting, f.localteam_id);
      _liveScore.visiterTeamBowling = this.parseBowling(f.bowling, f.visitorteam_id);
      _liveScore.visiterTeamBatting = this.parseBatting(f.batting, f.visitorteam_id);
      _liveScore.runs = this.parseRun(f.runs);
      if (_liveScore.localTeam.id == _liveScore.tossWinTeamId) {
        _liveScore.tossWinTeamName = _liveScore.localTeam.name;
      }
      else if (_liveScore.visitarTeam.id == _liveScore.tossWinTeamId) {
        _liveScore.tossWinTeamName = _liveScore.visitarTeam.name;
      }
      return _liveScore;
    })
  }
  return lScore;
}

  public parseBatting(batting: any[], teamid ?) {
  let Batting: battingModel[] = [];
  if (batting) {
    Batting = batting.map(bt => {
      let _batting: battingModel = new battingModel();
      _batting.teamId = bt.team_id
      _batting.playerId = bt.player_id;
      _batting.playerName = bt.playerName;
      if (bt.playerImage == 'https://cdn.sportmonks.com') {
        _batting.playerImagePath = 'assets/images/news/default.jpg';
      }
      else {
        _batting.playerImagePath = bt.playerImage;
      }
      _batting.ball = bt.ball;
      _batting.score = bt.score;
      _batting.sRate = bt.rate;
      _batting.four = bt.four_x;
      _batting.six = bt.six_x;
      _batting.scoreboard = bt.scoreboard;
      if (bt.bowling_player_id || bt.catch_stump_player_id || bt.batsmanout_id) {
        _batting.playerStatus = '(out)'
      }
      else {
        _batting.playerStatus = '( * )'

      }
      _batting.bowlingPlayerId = bt.bowling_player_id;
      _batting.catchStumPlayerId = bt.catch_stump_player_id
      _batting.batsmanoutId = bt.batsmanout_id
      return _batting
    })
  }
  if (teamid) {
    return Batting.filter(b => b.teamId == teamid);
  }
  else {
    return Batting;
  }
}

  public parseBowling(bowling: any[], teamid ?) {
  let Bowling: bowlingModel[] = [];
  if (bowling) {
    Bowling = bowling.map(bw => {
      let _bowling: bowlingModel = new bowlingModel();
      // if (bw.team_id == teamid) {
      _bowling.teamId = bw.team_id;
      _bowling.playarId = bw.player_id;
      _bowling.overs = bw.overs;
      _bowling.medians = bw.medians
      _bowling.runs = bw.runs;
      _bowling.wickets = bw.wickets;
      _bowling.wide = bw.wide;
      _bowling.noBall = bw.noball;
      _bowling.playarName = bw.playerName;
      _bowling.scoreboard = bw.scoreboard;

      if (bw.playerImage == 'https://cdn.sportmonks.com') {
        _bowling.playerImage = 'assets/images/news/default.jpg';
      }

      else {
        _bowling.playerImage = bw.playerImage || 'assets/images/news/default.jpg';
      }
      // }
      return _bowling;
    })
  }
  if (teamid) {
    return Bowling.filter(b => b.teamId == teamid);

  }
  else {
    return Bowling;

  }

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
  return runs;
}

  public getTeamRun(teamId: string) {
  const currentFix: liveScoreModel = this.liveScore[0];
  let score = '0/0 (0)';
  if (currentFix) {
    if (currentFix.runs && currentFix.runs.length > 0) {
      const runlist = currentFix.runs.filter(r => r.teamId === parseInt(teamId, 10));
      if (runlist.length > 1) {
        let i = runlist.length - 1
        let run = runlist[i]
        if (run) {
          score = '';
          score += run.score ? run.score.toString() : '0';
          score += (run.wicket ? '/' + run.wicket.toString() : '/0');
          score += (run.over ? '(' + run.over + ')' : '(0)');
        }
      }
    }
  }
  return score;
}



  public getTeamRunF(teamId: string) {
  const currentFix: liveScoreModel = this.liveScore[0];
  let score = '0/0 (0)';
  if (currentFix) {
    if (currentFix.runs && currentFix.runs.length > 0) {
      const run = currentFix.runs.find(r => r.teamId === parseInt(teamId, 10));
      if (run) {
        score = '';
        score += run.score ? run.score.toString() : '0';
        score += (run.wicket ? '/' + run.wicket.toString() : '/0');
        score += (run.over ? '(' + run.over + ')' : '(0)');
      }
    }
  }
  return score;
}

ngOnInit() {

}
ngOnDestroy(): void {
  this.routerSubscribe.unsubscribe();
}
}











