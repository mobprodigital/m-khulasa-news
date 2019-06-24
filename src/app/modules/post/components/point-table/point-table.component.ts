import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pointTableModel } from 'src/app/modules/wc-2019/model/pointTable.model';

@Component({
  selector: 'app-point-table',
  templateUrl: './point-table.component.html',
  styleUrls: ['./point-table.component.scss']
})
export class PointTableComponent implements OnInit {
  public pointTableData: pointTableModel[] = [];
  public errMsg;
  public loader: boolean = true;
  constructor(private http: HttpClient) { }

  public getPointTable() {
    this.http.get("https://cricapi.khulasa-news.com/cricketApi/getTeamPoints.php").subscribe(
      (res: any) => { this.pointTableData = this.parsePointTable(res.data) },
      err => { this.errMsg = err },
      () => { this.loader = false }
    )
  }

  private parsePointTable(data: any[]) {
    let pt: pointTableModel[];
    if (data) {
      pt = data.map(tb => {
        let _pt: pointTableModel = new pointTableModel();
        _pt.teamCode = tb.team_code;
        _pt.teamImage = tb.team_image;
        _pt.playedMatch = tb.played_matches;
        _pt.wonMatch = tb.won_matches;
        _pt.lostMatch = tb.lost_matches;
        _pt.nrr = parseFloat(tb.NRR);
        _pt.points = parseInt(tb.points);
        return _pt
      })
      return pt;
    }

  }

  ngOnInit() {
    this.getPointTable()
  }

}
