import { Component, OnInit } from '@angular/core';
import { Wc2019Service } from '../../service/wc-2019.service';

@Component({
  selector: 'app-fixtures-list',
  templateUrl: './fixtures-list.component.html',
  styleUrls: ['./fixtures-list.component.scss']
})
export class FixturesListComponent implements OnInit {

  public fixList: any[] = [];

  constructor(private wcService: Wc2019Service) {
    wcService.getFixtures().then(fixData => {
      this.fixList = fixData;
    });
  }

  ngOnInit() {
  }

}
