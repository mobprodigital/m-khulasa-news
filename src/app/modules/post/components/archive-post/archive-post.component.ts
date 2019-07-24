import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppLangServiceService } from 'src/app/services/app-lang-service/app-lang-service.service';
import { AppLangEnum } from 'src/app/enum/app-lang.enum';

@Component({
  selector: 'app-archive-post',
  templateUrl: './archive-post.component.html',
  styleUrls: ['./archive-post.component.scss']
})
export class ArchivePostComponent implements OnInit {
  public lang;

  public categoryId: string;
  private routerSubscribe: Subscription;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private langserive: AppLangServiceService) {
    this.routerSubscribe = this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.getCategoryId();

      }
    })

    this.langserive.langChangedEmitter.subscribe(
      () => {
        this.lang = this.langserive.selectedAppLang
      }
    );

  }
  public getCategoryId() {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id')
  }
  ngOnInit() {
    this.lang = this.langserive.selectedAppLang
  }
  ngOnDestroy(): void {
    this.routerSubscribe.unsubscribe();
  }
}
