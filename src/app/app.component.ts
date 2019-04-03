import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'khulasa-news';

  constructor(private router: Router) {
    router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', ev.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }
}
