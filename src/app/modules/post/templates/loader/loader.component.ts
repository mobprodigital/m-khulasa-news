import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() count: number;
  public loaderList: Array<number> = Array(10);

  constructor() { }

  ngOnInit() {
    this.loaderList = Array(this.count);
  }

}
