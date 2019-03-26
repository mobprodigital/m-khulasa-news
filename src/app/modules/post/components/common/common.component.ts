import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit {
  public height: number;
  constructor() {

   let height= screen.height
    this.height = height-200;
  }

  ngOnInit() {
  }

}
