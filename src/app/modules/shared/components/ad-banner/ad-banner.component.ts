import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.scss']
})
export class AdBannerComponent implements OnInit, AfterViewInit {


  @Input() slotId: string;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    setTimeout(() => {
      try {
        (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
      } catch (e) {
        console.log(e);
      }
    }, 3000);

  }
}

