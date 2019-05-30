import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post/post.service';
import { PostTypeEnum } from 'src/app/enum/post-type.enum';
import { PostModel } from 'src/app/model/post.model';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { AppLangServiceService } from 'src/app/services/app-lang-service/app-lang-service.service';
import { AppLangEnum } from 'src/app/enum/app-lang.enum';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss']
})
export class SinglePageComponent implements OnInit {
  private routerSubscribe: Subscription;
  public pageSlug: string;
  public page: PostModel;
  public errorMsg: string = "";
  public loader: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private postService: PostService,
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private langservice: AppLangServiceService
  ) {
    this.routerSubscribe = this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.getPostSlug()
      }
    })
  }

  public getPostSlug() {
    this.pageSlug = this.activatedRoute.snapshot.paramMap.get('slug');

    if (this.pageSlug === 'cricket-score') {

      let csUrl = this.langservice.selectedAppLang === AppLangEnum.Hindi ? 'https://hindi.khulasa-news.com/cricket-score/' : 'https://khulasa-news.com/cricket-score/'

      this.httpClient.get(csUrl, {
        responseType: 'text'
      }).subscribe(
        success => {
          const table = success.split('<!--table-split-->')[1];
          this.loader = false

          let p = new PostModel()
          p.content = table;
          this.page = p;

        },
        err => {
          console.log(err);
        },
        () => {
          console.log('completed');

        }
      )
    }
    else {
      if (this.pageSlug) {
        this.loader = true;
        this.page = null;
        this.getpost()
      }
    }

  }
  public getpost() {
    this.errorMsg = '';
    window.scroll({
      top: 0,
      // behavior: "smooth"
    });
    this.postService.getPostByPostId(this.pageSlug, PostTypeEnum.Page)
      .then(postData => {
        this.page = postData;
        this.loader = false;
      })
      .catch(err => { this.errorMsg = err; this.loader = false })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.routerSubscribe.unsubscribe();
  }

}
