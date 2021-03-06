import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post/post.service';
import { PostTypeEnum } from 'src/app/enum/post-type.enum';
import { PostModel } from 'src/app/model/post.model';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { AppLangServiceService } from 'src/app/services/app-lang-service/app-lang-service.service';
import { AppLangEnum } from 'src/app/enum/app-lang.enum';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';


@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  @ViewChild('singlepostcontainer') maincontainer: ElementRef;

  private routerSubscribe: Subscription;
  public postSlug: string;
  public post: PostModel;

  public errorMsg: string = "";
  public loader: boolean = true;
  public ytVideo: boolean = false;
  public youTubeUrl: SafeResourceUrl;
  public relatedPostList: PostModel[] = [];
  public relatedPostError: string = '';
  public relatedPostLoader: boolean = true;

  public lang;
  @ViewChild('postContent') postContent: ElementRef;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private appLangService: AppLangServiceService,
    private localStorage: LocalStorageService
  ) {
    this.routerSubscribe = this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.getPostSlug();
        this.scrollToTop();

      }
    })

    this.appLangService.langChangedEmitter.subscribe(
      () => {
        this.lang = this.appLangService.selectedAppLang
      }
    );
  }


  public getPostSlug() {
    this.postSlug = this.activatedRoute.snapshot.paramMap.get('slug');
    const lang = this.activatedRoute.snapshot.paramMap.get('lang');
    if (lang && (this.appLangService.selectedAppLang !== lang)) {
      this.appLangService.selectedAppLang = lang === AppLangEnum.English ? AppLangEnum.English : AppLangEnum.Hindi;
    }
    if (this.postSlug) {
      this.loader = true;
      this.post = null;
      this.ytVideo = false;
      this.errorMsg = '';

      this.getpost();
    }
  }

  public getpost() {
    this.postService.getPostByPostId(this.postSlug, PostTypeEnum.Post)
      .then(postData => {
        if (postData) {
          this.post = postData;
          if (this.post.categoryList.some(c => c.id === 47)) {
            let Url = this.geturl(this.post.content);
            if (Url) {
              this.trustedUrl(Url)
            }
            this.ytVideo = true;
          }
          this.contantLinkOpenSameURL();
          this.getRelatedPost();

        }
      })
      .catch(err => {
        this.errorMsg = err;
        this.relatedPostLoader = false;
        this.relatedPostList = [];
        this.relatedPostError = 'no data fonud'
      })
      .finally(() => {
        this.loader = false;
      })
  }


  private trustedUrl(url) {
    this.youTubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public getRelatedPost() {
    this.relatedPostLoader = true;
    this.relatedPostList = [];
    this.relatedPostError = '';
    this.postService.getRelatedPostByPostId(this.post.id.toString())
      .then(relatedpost => { this.relatedPostList = relatedpost })
      .catch(err => this.relatedPostError = err)
      .finally(() => { this.relatedPostLoader = false });
  }

  private geturl(iframeString: string): string | null {
    let tempDiv: HTMLDivElement = document.createElement('div');
    tempDiv.innerHTML = iframeString;
    let ytIframe: HTMLIFrameElement = tempDiv.querySelector('iframe');
    if (ytIframe) {
      return ytIframe.src;
    }
    else {
      return null;
    }
  }

  public contantLinkOpenSameURL() {
    setTimeout(() => {
      let contant: HTMLElement = this.postContent.nativeElement;
      let aTagList = contant.querySelectorAll('a');
      if (aTagList && aTagList.length > 0) {
        for (let i = 0; i < aTagList.length; i++) {
          let href = (aTagList[i].getAttribute('href'));
          if (href.includes("khulasa-news.com")) {
            if (href.includes("category")) {
              let slug = href.split('/')[4];
              aTagList[i].addEventListener("click", (event) => {
                event.preventDefault();
                this.router.navigate(['category', slug]);
              });
            }
            else if (href.includes("?s=")) {
              let slug = href.split('=')[1];
              aTagList[i].addEventListener("click", (event) => {
                event.preventDefault();
                this.router.navigate(['search', slug]);
              });
            }
            else {
              let slug = href.split('/')[3];
              aTagList[i].addEventListener("click", (event) => {
                event.preventDefault();
                this.router.navigateByUrl('/' + slug);
              });
            }
          }
        }
      }
    }, 500);
  }

  private scrollToTop() {
    let main: HTMLDivElement = this.maincontainer.nativeElement;
    if (main) {
      main.scroll({
        top: 0,
        //  behavior: "smooth"
      });
    }
  }
  ngOnInit() {
    this.lang = this.appLangService.selectedAppLang
  }

  ngOnDestroy(): void {
    this.routerSubscribe.unsubscribe();
  }


}
