import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-archive-post',
  templateUrl: './archive-post.component.html',
  styleUrls: ['./archive-post.component.scss']
})
export class ArchivePostComponent implements OnInit {

  public categoryId: string;
  private routerSubscribe: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.routerSubscribe = this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.getCategoryId();
      }
    })
  }
  public getCategoryId() {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id')
  }
  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.routerSubscribe.unsubscribe();
  }
}
